export interface Holding {
  id: string;
  symbol: string;
  name: string;
  image: any;
  currentPrice: number;
  qty: number;
  total: number;
  priceChangePercentageInCurrency7d: number;
  holdingValueChange7d: number;
  sparklineIn7d: {
    value: any[];
  };
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: 1;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
  sparkline_in_7d: { price: any[] };
  price_change_percentage_7d_in_currency: number;
}
