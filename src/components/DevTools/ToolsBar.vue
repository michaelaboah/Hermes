<template>
  <div class="flex flex-row">
    <div class="flex flex-col lg:flex-row h-screen w-64">
      <div
        class="relative lg:top-0 lg:h-full lg:w-64 bg-gray-900 rounded-md lg:mr-4 flex flex-col flex-grow-0 lg:flex-grow"
      >
        <h2 class="text-center pt-4">Selections</h2>
        <div class="flex justify-center lg:h-auto lg:justify-start">
          <ul class="w-full space-y-5 px-3">
            <li>
              <n-select
                class="w-full h-8"
                v-model:value="selected.exchange"
                filterable
                placeholder="Please Select Exchange"
                :options="exchangeOptions"
              />
            </li>
            <li>
              <n-select
                class="w-full h-8"
                v-model:value="selected.asset"
                filterable
                placeholder="Please Select Asset Class"
                :options="assetOptions"
              />
            </li>

            <li>
              <n-select
                class="w-full h-8"
                v-model:value="selected.type"
                filterable
                placeholder="Please Select Data Type"
                :options="typesOptions"
              />
            </li>

            <li>
              <n-select
                class="w-full h-8"
                v-model:value="selected.symbol"
                filterable
                placeholder="Please Select Symbol"
                @focus="getSymbols"
                :options="symbols"
              />
            </li>
          </ul>
        </div>

        <div class="flex flex-grow h-screen"></div>

        <div class="flex lg:h-20 lg:place-content-center lg:space-x-4 my-4">
          <n-button type="primary" @click="subscribe"> Subscribe </n-button>
          <n-button type="warning" @click="disconnect"> Disconnect </n-button>
        </div>
      </div>
    </div>
    <div class="flex grow max-w-7xl">
      <div
        class="grid gap-1 grid-cols-2 grid-rows-2 place-items-center w-screen"
      >
        <n-card class="bg-gray-800 grow h-4/5">
          <LWChart
            v-if="lineData.length > 1"
            :line-data="lineData"
            :type="'lineVolume'"
            :chart-options="chartOptions"
            :series-options="seriesOptions"
            :autosize="true"
            ref="lwChart"
            class="w-full h-full"
          />
          <div v-else class="m-auto">
            <n-empty description="No data">
              <template #extra>
                <n-icon> </n-icon>
              </template>
            </n-empty>
          </div>
        </n-card>
        <n-card class="grow h-4/5 bg-gray-800 text-white"
          >Mean Max Min Avg RTT
          <n-scrollbar class="relative flex max-h-80 text-white">
            {{ diffCache }}
          </n-scrollbar>
        </n-card>
        <n-card class="grow h-4/5 bg-gray-800 text-white">
          <n-scrollbar class="relative flex max-h-80 text-white">
            {{ lineData }}
          </n-scrollbar>
        </n-card>
        <n-card class="grow h-4/5 bg-gray-800 text-white pb-4">
          <n-h2 class="text-center lg:text-left text-white">Logs</n-h2>
          <n-config-provider :hljs="hljs">
            <n-scrollbar class="relative flex max-h-80">
              <n-card v-for="log in logData" class="bg-gray-800">
                <n-code
                  word-wrap
                  :code="JSON.stringify(log, null, '\t')"
                  language="json"
                  class="w-full flex bg-gray-700"
                />
              </n-card>
            </n-scrollbar>
          </n-config-provider>
        </n-card>
      </div>
    </div>
    <div class="flex w-1"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  NSelect,
  NButton,
  NScrollbar,
  NConfigProvider,
  NCode,
  NEmpty,
  NIcon,
  NCard,
  NH2,
} from "naive-ui";
// import { CaChartLineSmooth } from "@kalimahapps/vue-icons";
import hljs from "highlight.js";
import json from "highlight.js/lib/languages/json";
import LWChart from "../Charts/LWChart.vue";
// import { BaseData } from "../../@types/models";

hljs.registerLanguage("json", json);

const chartOptions = ref({});
const seriesOptions = ref({ color: "rgb(45, 77, 205)" });
let test = '{"event":"subscribe","channel":"coinbase.spot.book.BTC-USD"}';
const exchangeOptions = ref([
  { label: "Coinbase", value: "coinbase" },
  { label: "Bitfinex", value: "bitfinex" },
  { label: "Binance", value: "binance" },
  { label: "Kraken", value: "kraken" },
]);

const assetOptions = ref([
  { label: "Spot", value: "spot" },
  // { label: "Bitfinex", value: "bitfinex" },
  // { label: "Binance", value: "binance" },
  // { label: "Kraken", value: "kraken" },
]);

const typesOptions = ref([
  { label: "Ticker", value: "ticker" },
  { label: "Trade", value: "trade" },
  { label: "Book", value: "book" },
  // { label: "Kraken", value: "kraken" },
]);

let symbols = ref<any[]>([]);
let valid = ref(true);

let selected = reactive({
  exchange: null,
  asset: null,
  type: null,
  symbol: null,
});

let lineData = ref<Object[]>([{ time: Date.now(), value: 0 }]);
let logData = ref<Object[]>([]);

async function getSymbols() {
  const { exchange } = selected;
  if (exchange !== null) {
    const response = await fetch(import.meta.env.VITE_SYMBOLS_API + exchange);
    let temp: string[] = await response.json();
    symbols.value = temp.map((x) => {
      return { label: x, value: x };
    });
  } else {
    valid.value = false;
  }
}

const socket = new WebSocket(import.meta.env.VITE_SOCKET_API);
const diffCache = ref<number[]>([]);
const logCache: Object[] = [];
let timer = false;

async function subscribe() {
  const { symbol, asset, type, exchange } = selected;
  socket.send(
    `{"event":"subscribe", "channel":"${exchange}.${asset}.${type}.${symbol}"}`
  );
  socket.onopen = async (event) => {
    console.log("WebSocket connection opened");
  }; // When a message is received over the WebSocket connection
  timer = true;
  socket.onmessage = async (event) => {
    let rawData: string | ArrayBuffer = event.data;
    if (typeof rawData !== "string") {
      console.log("Invalid message data");
      return;
    }

    let parsedData: any | undefined = JSON.parse(rawData);

    if (!parsedData) {
      console.log("This object is undefined");
      return;
    }

    // console.log(difference - 10000);
    if (parsedData) {
      let difference = Date.now() - parsedData.time["gq"]["gqReceived"]["utc"];
      diffCache.value.push(Math.abs(difference));

      logCache.push(parsedData);
    }
    // Print the received message to the output div
  }; // When the WebSocket connection is closed
}

setInterval(async () => {
  if (timer) {
    lineData.value.push({
      value: diffCache.value[1],
      time: Date.now(),
    });

    logData.value.push(logCache[1]);

    logCache.length = 0;
    diffCache.value.length = 0;
  }
}, 10 * 1000);

async function disconnect() {
  // if (socket) {
  // }
  socket.close();
  timer = false;
}

function handleSubscription() {
  switch (selected.type as unknown as string) {
    case "ticker":
      break;

    default:
      break;
  }
}
</script>
