import { ChartingLibraryWidgetOptions } from 'tradingview-api/lib/library.min';
import { ResolutionString } from './datafeed/library.min';

export const WIDGET_OPTIONS: Partial<ChartingLibraryWidgetOptions> = {
  interval: '60' as ResolutionString,
  container_id: 'tv_chart_container',
  library_path: '/charting_library/',
  custom_css_url: '/charting_library_style.css',
  disabled_features: [
    'hide_last_na_study_output',
    'header_symbol_search',
    'header_compare',
    'header_interval_dialog_button',
    'show_interval_dialog_on_key_press',
    'header_saveload',
    'remove_library_container_border',
    'go_to_date',
    'timeframes_toolbar',
    'volume_force_overlay',
    'legend_widget',
    'header_widget',
    'adaptive_logo',
  ],
  enabled_features: [
    'hide_last_na_study_output',
    'side_toolbar_in_fullscreen_mode',
    'countdown',
    'legend_widget',
    // "hide_left_toolbar_by_default"
  ],
  autosize: true,
  studies_overrides: {
    'bollinger bands.median.color': '#20C978',
    'bollinger bands.upper.linewidth': 7,
    'volume.options.showLegend': true,
  },
  theme: 'Dark',
  overrides: {
    'paneProperties.background': '#181828',
    'symbolWatermarkProperties.color': '#f5f8fa',
    'mainSeriesProperties.candleStyle.upColor': '#20C978',
    'mainSeriesProperties.candleStyle.downColor': '#F83A5B',
    'paneProperties.vertGridProperties.color': 'rgba(255, 255, 255, 0.05)',
    'paneProperties.horzGridProperties.color': 'rgba(255, 255, 255, 0.05)',
    'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.2)',
    'scalesProperties.textColor': '#6e7491',
    'scalesProperties.backgroundColor': '#17182e',
    'paneProperties.legendProperties.showLegend': true,
    'paneProperties.legendProperties.showStudyTitles': true,
    volumePaneSize: 'medium',
  },
  toolbar_bg: '#181828',
  timezone: 'exchange',
};
