import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const COORDENADAS: Record<string, { latitude: number; longitude: number }> = {
    Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
    Quito: { latitude: -0.1807, longitude: -78.4678 },
    Cuenca: { latitude: -2.9001, longitude: -79.0059 },
};

export default function useFetchData(ciudad: string) {
    const [resultado, setResultado] = useState<{
        ciudad: string;
        clima: OpenMeteoResponse;
    } | null>(null);

    useEffect(() => {
        const coordenadas = COORDENADAS[ciudad];
        if (!coordenadas) return;

        const API_URL =
            `https://api.open-meteo.com/v1/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}` +
            '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m' +
            '&hourly=temperature_2m,wind_speed_10m' +
            '&forecast_days=1' +
            '&timezone=America%2FGuayaquil';

        const controller = new AbortController();

        async function obtenerDatos() {
            try {
                const respuesta = await fetch(API_URL, { signal: controller.signal });
                if (!respuesta.ok) {
                    throw new Error(`Open-Meteo respondió con ${respuesta.status}`);
                }

                const clima: OpenMeteoResponse = await respuesta.json();
                if (!controller.signal.aborted) {
                    setResultado({ ciudad, clima });
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error('No se pudo consultar el clima', error);
                }
            }
        }

        void obtenerDatos();
        return () => controller.abort();
    }, [ciudad]);

    return resultado?.ciudad === ciudad ? resultado.clima : null;
}