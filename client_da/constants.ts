export const XHR_BASE_PATH = '/_napi/da-browse/';
export const API_BASE_PATH = `${XHR_BASE_PATH}api`;
export const SHARED_API_BASE_PATH = `${XHR_BASE_PATH}shared_api`;

export const OFFSET_TRACKING_PAGE_SIZE = 24;

export enum ApiGetEndpoint {
  DailyDeviations = '/dailydeviations',
  Faceted = '/faceted',
  Tags = '/tags',
}

export enum ApiPostEndpoint {}

export enum Pages {
  Search = 'search',
  Faceted = 'faceted',
  DailyDeviation = 'daily-deviation',
  Tag = 'tag',
}

export enum BiView {
  Search = 'search',
  Browse = 'browse',
}
