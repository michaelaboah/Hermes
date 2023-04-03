<template>
  <div
    class="relative top-0 h-screen w-64 bg-gray-900 rounded-md flex flex-col"
  >
    <h2 class="text-center pt-4">Selections</h2>
    <div class="flex justify-center h-screen">
      <n-select
        class="w-full h-8"
        v-model:value="selected.exchange"
        multiple
        filterable
        placeholder="Please Select Exchange"
        :options="exchangeOptions"
      />
    </div>
    <!-- Message Box -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { NSelect } from "naive-ui";

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
  { label: "Binance", value: "binance" },
  { label: "Kraken", value: "kraken" },
]);

const selected = reactive({
  exchange: null,
  asset: null,
});
</script>
