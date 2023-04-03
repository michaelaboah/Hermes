<script setup lang="ts">
//@ts-nocheck
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  defineExpose,
  defineProps,
  type ExtractPropTypes,
} from "vue";

//@ts-expect-error
import resize from "vue-resize-directive";
import {
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";
type LiveChartTypes =
  | "line"
  | "area"
  | "baseline"
  | "histogram"
  | "candlestick"
  | "bar";
const props = defineProps({
  type: {
    type: String,
    default: "line",
  },
  volumeData: {
    type: Array,
    required: false,
  },
  lineData: {
    type: Array,
    required: false,
  },
  ohlcData: {
    type: Array,
    required: false,
  },
  autosize: {
    default: true,
    type: Boolean,
  },
  chartOptions: {
    type: Object,
  },
  seriesOptions: {
    type: Object,
  },
  timeScaleOptions: {
    type: Object,
  },
  priceScaleOptions: {
    type: Object,
  },
});

// ******* Variables for storing chart instances

let series: ISeriesApi<any> | null; // For now this will be used for single series charts
let histSeries: ISeriesApi<"Histogram"> | null;
let lineSeries: ISeriesApi<"Line"> | null;
let areaSeries: ISeriesApi<"Area"> | null;
let candleSeries: ISeriesApi<"Candlestick"> | null;
let barSeries: ISeriesApi<"Bar"> | null;
let chart: IChartApi | null;

const chartContainer = ref<HTMLDivElement | undefined>();
// **************************
// ******* Exposed Functions *******
const fitContent = () => {
  if (!chart) return;
  chart.timeScale().applyOptions({
    timeVisible: true,
    fixLeftEdge: true,
    ticksVisible: true,
  });
  chart.timeScale().fitContent();
};
fitContent();
const getChart = () => {
  return chart;
};

defineExpose({ fitContent, getChart });
// ******* Exposed Functions *******

// Auto resizes the chart when the browser window is resized.
function resizeHandler() {
  if (!chart || !chartContainer.value) return;
  const dimensions = chartContainer.value.getBoundingClientRect();
  chart.resize(dimensions.width, dimensions.height);
}

const currentLocale = window.navigator.languages[0];

const customPriceFormatter = Intl.NumberFormat(currentLocale, {
  style: "currency",
  currency: "USD",
}).format;

// Creates the chart series and sets the data.
const addSeriesAndData = (props: Readonly<ExtractPropTypes<any>>): void => {
  if (chart) {
    switch (props.type) {
      case "line":
        series = chart.addLineSeries(props.seriesOptions);
        break;

      case "area":
        console.log("Area");
        series = chart.addAreaSeries(props.seriesOptions);
        break;

      case "baseline":
        console.log("Baseline");
        series = chart.addBaselineSeries(props.seriesOptions);
        break;

      case "histogram":
        series = chart.addHistogramSeries(props.seriesOptions);
        break;

      case "candlestick":
        series = chart.addCandlestickSeries(props.seriesOptions);
        break;

      case "bar":
        series = chart.addBarSeries(props.seriesOptions);
        break;

      case "lineVolume":
        lineSeries = chart.addLineSeries({ ...props.seriesOptions });
        chart.applyOptions({
          layout: {
            textColor: "#e3e3e3",
            background: { color: "#18181c", type: ColorType.Solid },
          },

          grid: {
            vertLines: { color: "#444" },
            horzLines: { color: "#444" },
          },
        });

        lineSeries.applyOptions({ color: "#FFA500" });
        lineSeries!.setData(props.lineData);
        histSeries = chart.addHistogramSeries({
          color: "#26a69a",
          priceFormat: {
            type: "volume",
          },
          priceScaleId: "",
          ...props.seriesOptions,
        });

        histSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.9,
            bottom: 0,
          },
        });

        histSeries!.setData(props.volumeData);

        // chart.priceScale('').applyOptions({
        //     // Difference between
        //     scaleMargins: {
        //         top: 0.7,
        //         bottom: 0,
        //     },
        // });

        break;

      case "areaVolume":
        areaSeries = chart.addAreaSeries({ ...props.seriesOptions });
        areaSeries!.setData(props.lineData);
        histSeries = chart.addHistogramSeries({
          color: "#26a69a",
          priceFormat: {
            type: "volume",
            minMove: 0.01,
          },
          priceScaleId: "",
          ...props.seriesOptions,
        });

        histSeries!.setData(props.volumeData);

        histSeries.priceScale().applyOptions({
          // Difference between
          scaleMargins: {
            top: 0.9,
            bottom: 0,
          },
        });
        break;

      case "candleStickVolume":
        candleSeries = chart.addCandlestickSeries({ ...props.seriesOptions });
        chart.applyOptions({
          localization: {
            priceFormatter: customPriceFormatter,
          },
        });

        candleSeries!.setData(props.lineData);
        histSeries = chart.addHistogramSeries({
          color: "#26a69a",
          priceFormat: {
            type: "volume",
          },
          priceScaleId: "",
          ...props.seriesOptions,
        });

        histSeries!.setData(props.volumeData);

        histSeries.priceScale().applyOptions({
          // Difference between
          scaleMargins: {
            top: 0.9,
            bottom: 0,
          },
        });
        break;

      case "":
      default:
        break;
    }
    // lineSeries!.setData(props.lineData)
    // series!.setData(props.data);
  }
};

onMounted(async () => {
  chart = createChart(chartContainer.value!, { ...props.chartOptions });
  chart;
  addSeriesAndData(props);

  if (props.priceScaleOptions) {
    chart.priceScale("").applyOptions(props.priceScaleOptions);
  }

  if (props.timeScaleOptions) {
    chart.timeScale().applyOptions(props.timeScaleOptions);
  }

  chart.timeScale().fitContent();

  if (props.autosize) {
    window.addEventListener("resize", resizeHandler);
  }
});

onUnmounted(() => {
  if (chart) {
    chart.remove();
    chart = null;
  }

  if (series) {
    series = null;
  }
});

// ******* Watchers
/*
    * Watch for changes to any of the component properties.

    * If an options property is changed then we will apply those options
    * on top of any existing options previously set (since we are using the
    * `applyOptions` method).
    * 
    * If there is a change to the chart type, then the existing series is removed
    * and the new series is created, and assigned the data.
    * 
    */
// window.addEventListener('resize', () => {
//     console.log("Resizing")
//     chart!.resize(window.innerWidth, window.innerHeight)
// });

watch({ autosize: props.autosize }, (enabled) => {
  console.log("resized");
  if (!enabled) {
    window.removeEventListener("resize", resizeHandler);
    return;
  }
});

watch(
  () => props.type,
  (newType) => {
    if (series && chart) {
      chart.removeSeries(series);
    }
    addSeriesAndData(props);
  }
);

// ******** Data watchers
watch(props.volumeData, (newData) => {
  if (series) {
    series.setData(newData);
  }

  if (histSeries) {
    histSeries.setData(newData as any[]);
  }
});

// Single Value Data
watch(props.lineData, (newData) => {
  // console.log(newData)
  if (lineSeries) {
    lineSeries.setData(newData as any[]);
  }

  if (areaSeries) {
    areaSeries.setData(newData as any[]);
  }
});

// Single Value Data
watch(props.ohlcData, (newData) => {
  // console.log(newData)
  if (candleSeries && props.ohlcData.length > 1) {
    candleSeries.update(newData[newData.length - 1] as any);
  } else {
    candleSeries!.setData(newData as any[]);
  }

  if (barSeries) {
    barSeries.setData(newData as any[]);
  }
});

// ******** Data watchers

watch(props.chartOptions!, (newOptions) => {
  if (!chart) return;
  chart.applyOptions(newOptions!);
});

watch(props.seriesOptions!, (newOptions) => {
  if (!series) return;
  series.applyOptions(newOptions);
});

watch(props.priceScaleOptions!, (newOptions) => {
  if (!chart) return;
  chart.priceScale("").applyOptions(newOptions!);
});

watch(props.timeScaleOptions!, (newOptions) => {
  if (!chart) return;
  chart.timeScale().applyOptions(newOptions!);
});

const resizeObserver = new ResizeObserver((entries) => {
  if (!entries[0]) return;
  const { width, height } = entries[0].contentRect;
  console.log(width);
  if (chart) {
    chart.applyOptions({ width, height });
  }
});

function resizeChart() {
  if (chartContainer.value) {
    console.log("Resizing");
    resizeObserver.observe(chartContainer.value);
  }
}
// ******* Watchers
</script>

<template>
  <div
    class="h-full w-full flex"
    v-resize="resizeChart"
    ref="chartContainer"
  ></div>
</template>
