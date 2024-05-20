import axios from "axios";
import {
  CryptoCurrenciesAPIResponseSchema,
  CryptoPriceSchema,
} from "../schema/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
  const {
    data: { Data },
  } = await axios(url);
  const result = CryptoCurrenciesAPIResponseSchema.safeParse(Data);

  if (result.success) {
    return result.data;
  }
}

export async function getCotization(pair: Pair) {
  const { currency, cryptocurrency } = pair;
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
  const {
    data: { DISPLAY },
  } = await axios(url);
  const result = CryptoPriceSchema.safeParse(DISPLAY[cryptocurrency][currency]);
  if (result.success) {
    return result.data;
  }
}
