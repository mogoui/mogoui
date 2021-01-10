import React, { memo, useEffect, useRef } from 'react';
import { storiesOf } from '@storybook/react';
import TradingView from './tradingView';
import { apiGet } from './api';
import { useState } from '@storybook/addons';
type SymbolModel = {
  symbol: string;
  symbolInfo?: IApiSymbols;
  symbolList: IApiSymbols[];
};
const defaultTradingView = () => {
  const [symbolModel, setSymbolModel] = useState<SymbolModel>({
    symbol: '',
    symbolInfo: void 0,
    symbolList: [],
  } as SymbolModel);

  useEffect(() => {
    fetchSymbolList();
  }, []);

  const fetchSymbolList = () => {
    apiGet<IApiSymbols[]>('common_symbols').then((res) => {
      if (!res || !res.data) {
        return;
      }
      const list: IApiSymbols[] = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i]['quote-currency'] === 'usdt') {
          list.push(res.data[i]);
        }
      }
      const symbol = list.length ? list[0].symbol : '';
      setSymbolModel({
        symbol: symbol,
        symbolInfo: list[0],
        symbolList: list,
      });
    });
  };
  return symbolModel.symbolInfo?.symbol ? (
    <TradingView symbolInfo={symbolModel.symbolInfo!} />
  ) : (
    <div></div>
  );
};

storiesOf('TradingView Component', module).add(
  'TradingView',
  defaultTradingView
);
