import React, { useEffect, useState } from 'react';
import { DataFeed, widget, GetBarsParams } from 'tradingview-api';
import {
  IChartingLibraryWidget,
  Bar,
  LibrarySymbolInfo,
  IBasicDataFeed,
  IDatafeedChartApi,
  IExternalDatafeed,
  IDatafeedQuotesApi,
  ChartingLibraryWidgetOptions,
} from 'tradingview-api/lib/library.min';
import { WIDGET_OPTIONS } from './data';
import _clone from 'lodash/clone';
import { ws } from './utils/socket';
import { apiGet } from './api';

/**
 * @key Server 端定义字段
 * @value value 对应 DataFeed.configuration.supported_resolutions
 */
// 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year
const intervalMap = {
  '1min': '1',
  '5min': '5',
  '15min': '15',
  '30min': '30',
  '60min': '60',
  '4hour': '240',
  '1day': '1D',
  '1mon': '1W',
  '1week': '1M',
};

const supportedResolutions = [
  '1',
  '5',
  '15',
  '30',
  '60',
  '240',
  'D',
  '1W',
  '1M',
];

type TradingViewProps = {
  symbolInfo: IApiSymbols;
};

type IntervalT = keyof typeof intervalMap;

const TradingView: React.FC<TradingViewProps> = (props) => {
  const { children } = props;
  const [symbol, setSymbol] = useState<string>('');
  const [_widget, setWidget] = useState<IChartingLibraryWidget>();
  const [interval, setInterval] = useState<IntervalT>('5min');
  const [datafeed, setDatafeed] = useState<DataFeed>(
    new DataFeed({
      getBars: (params) => getBars(params),
      fetchResolveSymbol: () => resolveSymbol(),
    })
  );

  const resolveSymbol = () => {
    return new Promise<LibrarySymbolInfo>((resolve) => {
      console.log();
      const info = props.symbolInfo;
      resolve({
        name: symbol.toLocaleUpperCase(),
        full_name: symbol.toLocaleUpperCase(),
        description: symbol.toLocaleUpperCase(),
        type: symbol,
        session: '24x7',
        exchange: 'HuoBi',
        listed_exchange: symbol,
        timezone: 'Asia/Shanghai',
        format: 'price',
        pricescale: Math.pow(10, info['price-precision']),
        minmov: 1,
        volume_precision: info['value-precision'],
        has_intraday: true,
        supported_resolutions: supportedResolutions,
      });
    });
  };
  const getBars = async (params: GetBarsParams) => {
    const size = window.innerWidth;
    if (params.resolution !== intervalMap[interval]) {
      unsubscribeKLine();
      for (let key in intervalMap) {
        if (intervalMap[key as IntervalT] === params.resolution) {
          setInterval(key as IntervalT);
        }
      }
    }
    const res = await apiGet<Array<IApiKLine>>('history_kline', void 0, {
      params: {
        symbol: symbol,
        period: interval,
        size: size > 2000 ? 2000 : size,
      },
    });
    if (
      params.resolution === intervalMap[interval] &&
      params.firstDataRequest &&
      res &&
      res.data.length
    ) {
      subscribeKLine();
    }
    console.log(res);

    if (!res || !res.data || !res.data.length) {
      return {
        bars: [],
        meta: { noData: true },
      };
    }
    const list: Bar[] = [];
    for (let i = 0; i < res.data.length; i++) {
      const item = res.data[i];
      list.push({
        time: item.id * 1000,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.vol,
      });
    }
    list.sort((l, r) => (l.time > r.time ? 1 : -1));
    return {
      bars: list,
      meta: {
        noData: !list.length,
      },
    };
  };

  const subscribeKLine = () => {
    ws.subscribe(
      `market.${symbol}.kline.${interval}`,
      {
        id: 'react-tv',
        sub: `market.${symbol}.kline.${interval}`,
      },
      (data) => {
        const tick = data.tick as IApiKLine;
        datafeed.updateKLine({
          time: tick.id * 1000,
          open: tick.open,
          high: tick.high,
          low: tick.low,
          close: tick.close,
          volume: tick.vol,
        });
      }
    );
  };

  const unsubscribeKLine = () => {
    ws.unsubscribe(`market.${symbol}.kline.${interval}`);
  };

  const onSetSymbol = (symbol: string) => {
    unsubscribeKLine();
    _widget?.setSymbol(symbol, intervalMap[interval], () => {
      // console.log("------setSymbol---------");
    });
  };

  const initTradingView = () => {
    const widgetOptions: ChartingLibraryWidgetOptions = _clone({
      ..._clone(WIDGET_OPTIONS),
      container_id: 'tv_chart_container',
      symbol: symbol,
      datafeed: datafeed,
      interval: interval,
      locale: 'en',
    });
    setWidget(new widget(widgetOptions));
  };

  useEffect(() => {
    initTradingView();
    return () => {
      _widget && _widget.remove();
    };
  }, []);

  return (
    <div className="kline">
      <div id="tv_chart_container"></div>
    </div>
  );
};
TradingView.defaultProps = {};

export default TradingView;
