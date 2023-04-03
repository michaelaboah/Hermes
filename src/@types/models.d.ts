type Quote = {
  askPrice: number;
  askQty: number;
  bidPrice: number;
  bidQty: number;
  percentPriceChange: number;
  priceChange: number;
  quoteVolume: number;
};

type Ask = {
  count?: number;
  price?: number;
  timestamp?: number;
  volume?: number;
};

type Bid = Ask;

type Time = {
  closeTime?: number;
  eventTime?: number;
  gqPublished: string;
  openTime?: number;
};

type Trade = {
  liquidity?: null;
  makerOrderId: number;
  price: number;
  sequence: number;
  side: string;
  takerOrderId: string;
  timestamp: number;
  tradeId: string;
  volume: number;
};

type BaseData = {
  type: "book" | "trade" | "ticker" | "hb";
  assetClass: string;
  channel: string;
  exchange: string;
  symbol: string;
  time: Time;
};

export type TradeData = BaseData & {
  trades: Trade[];
};

export type BookData = BaseData & {
  asks: Ask[];
  bids: Bid[];
};
export type TickerData = BaseData & {
  quote: Quote;
  trade: {
    firstTradeId: number;
    lastTradeQty: number;
    numTrades: number;
    weightedAvgPrice: number;
  };
  ohlcv: {
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    volume: number;
  };
};

export type Exchanges = "coinbase" | "bitfinex" | "kraken" | "binance";

export type OHLCV = {
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  volume: number;
};

export type OHLC = {
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
};

export type OHLCChart = {
  close: number;
  high: number;
  low: number;
  open: number;
};
