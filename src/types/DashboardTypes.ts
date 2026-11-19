type WeatherField =
    | 'temperature_2m'
    | 'apparent_temperature'
    | 'wind_speed_10m'
    | 'relative_humidity_2m';

export interface OpenMeteoResponse {
    current: Record<WeatherField, number>;
    current_units: Record<WeatherField, string>;

    hourly: {
        time: string[];
        temperature_2m: number[];
        wind_speed_10m: number[];
    };
    hourly_units: {
        temperature_2m: string;
        wind_speed_10m: string;
    };
}