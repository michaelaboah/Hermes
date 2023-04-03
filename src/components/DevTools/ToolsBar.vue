<template>
  <div class="flex flex-row">
    <div
      class="relative top-0 h-screen w-64 bg-gray-900 rounded-md flex flex-col mr-4"
    >
      <h2 class="text-center pt-4">Selections</h2>
      <div class="flex justify-center h-screen">
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

      <div class="flex h-20 place-content-center space-x-4 my-4">
        <n-button type="primary" @click="subscribe"> Subscribe </n-button>
        <n-button type="warning" @click="disconnect"> Disconnect </n-button>
      </div>
    </div>

    <div class="relative flex flex-col">
      <!-- <LWChart
        v-if="lineData.length > 1"
        :line-data="lineData"
        :type="'lineVolume'"
        :chart-options="chartOptions"
        :series-options="seriesOptions"
        :autosize="true"
        ref="lwChart"
        class="h-80 w-full"
      /> -->
      <div>
        <h3 class="place-content-center">Logs</h3>
        <n-scrollbar class="relative flex max-h-80">
          {{ logData }}
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//@ts-nocheck
import { reactive, ref } from "vue";
import { NSelect, NButton, NScrollbar } from "naive-ui";
import LWChart from "../Charts/LWChart.vue";
import { BaseData } from "../../@types/models";

const chartOptions = ref({});
const seriesOptions = ref({ color: "rgb(45, 77, 205)" });

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

let lineData = ref<Object[]>([{ time: Date.now(), value: Date.now() }]);
let logData = ref<Object[]>([]);

async function getSymbols() {
  const { exchange } = selected;
  if (exchange !== null) {
    const response = await fetch(
      `https://api.goquant.io/symbols?exchange=${exchange}`
    );
    let temp: string[] = await response.json();
    symbols.value = temp.map((x) => {
      return { label: x, value: x };
    });
  } else {
    valid.value = false;
  }
}

const socket = new WebSocket("wss://api.goquant.io/ws");

async function subscribe() {
  // socket =
  const { symbol, asset, type, exchange } = selected;
  socket.send(
    `{"event":"subscribe", "channel":"${exchange}.${asset}.${type}.${symbol}"}`
  );
  socket.onopen = async (event) => {
    console.log("WebSocket connection opened");
  }; // When a message is received over the WebSocket connection

  socket.onmessage = async (event) => {
    let rawData: string | ArrayBuffer = event.data;
    if (typeof rawData !== "string") {
      console.log("Invalid message data");
      return;
    }

    let parsedData: BaseData | undefined = JSON.parse(rawData);

    if (!parsedData) {
      console.log("This object is undefined");
      return;
    }

    let diff = Date.now() - parsedData.time["gq"]["gqReceived"]["utc"];
    setTimeout(async () => {
      logData.value.push(parsedData!);
      lineData.value.push({
        time: Date.now(),
        value: Math.abs(diff),
      });

      console.log(Math.abs(diff));
    }, 2 * 1000);
    // Print the received message to the output div
  }; // When the WebSocket connection is closed
}

async function disconnect() {
  // if (socket) {
  // }
  socket.close();
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
