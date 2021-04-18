// deno-lint-ignore-file camelcase

type availableLanguages = "fr" | "en" | "es";
type propertyLangType = `lang_${availableLanguages}`;

type StringWrappedInObjectType = {
  value: string;
};

type StringWrappedInObjectArrayType = [StringWrappedInObjectType];

type WithPropertyLang = {
  [key in propertyLangType]?: StringWrappedInObjectArrayType;
};

interface CurrentConditionType extends WithPropertyLang {
  FeelsLikeC: string;
  FeelsLikeF: string;
  cloudcover: string;
  humidity: string;
  localObsDateTime: string;
  observation_time: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  temp_C: string;
  temp_F: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: StringWrappedInObjectArrayType;
  weatherIconUrl: StringWrappedInObjectArrayType;
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

interface NearestAreaType {
  areaName: StringWrappedInObjectArrayType;
  country: StringWrappedInObjectArrayType;
  latitude: string;
  longitude: string;
  population: string;
  region: StringWrappedInObjectArrayType;
  weatherUrl: StringWrappedInObjectArrayType;
}

type RequestType = {
  query: string;
  type: "LatLon";
};

interface WeatherHourlyType extends WithPropertyLang {
  DewPointC: string;
  DewPointF: string;
  FeelsLikeC: string;
  FeelsLikeF: string;
  HeatIndexC: string;
  HeatIndexF: string;
  WindChillC: string;
  WindChillF: string;
  WindGustKmph: string;
  WindGustMiles: string;
  chanceoffog: string;
  chanceoffrost: string;
  chanceofhightemp: string;
  chanceofovercast: string;
  chanceofrain: string;
  chanceofremdry: string;
  chanceofsnow: string;
  chanceofsunshine: string;
  chanceofthunder: string;
  chanceofwindy: string;
  cloudcover: string;
  humidity: string;
  precipInches: string;
  precipMM: string;
  pressure: string;
  pressureInches: string;
  tempC: string;
  tempF: string;
  time: string;
  uvIndex: string;
  visibility: string;
  visibilityMiles: string;
  weatherCode: string;
  weatherDesc: StringWrappedInObjectArrayType;
  weatherIconUrl: StringWrappedInObjectArrayType;
  winddir16Point: string;
  winddirDegree: string;
  windspeedKmph: string;
  windspeedMiles: string;
}

interface WeatherType {
  astronomy: [
    {
      moon_illumination: string;
      moon_phase: string;
      moonrise: string;
      moonset: string;
      sunrise: string;
      sunset: string;
    },
  ];
  avgtempC: string;
  avgtempF: string;
  date: string;
  hourly: WeatherHourlyType[]; // only 8 ?
  maxtempC: string;
  maxtempF: string;
  mintempC: string;
  mintempF: string;
  sunHour: string;
  totalSnow_cm: string;
  uvIndex: string;
}

export interface WttrInPayload {
  current_condition: [CurrentConditionType];
  nearest_area: [NearestAreaType];
  request: [RequestType];
  weather: [WeatherType];
}
