type WeatherField =
    | 'temperature_2m'
    | 'apparent_temperature'
    | 'wind_speed_10m'
    | 'relative_humidity_2m';

export interface OpenMeteoResponse {
    current: Record<WeatherField, number>;
    current_units: Record<WeatherField, string>;
}