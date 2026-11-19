import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

const COORDENADAS: Record<string, { latitude: number; longitude: number }> = {
    Guayaquil: { latitude: -2.1962, longitude: -79.8862 },
    Quito: { latitude: -0.1807, longitude: -78.4678 },
    Cuenca: { latitude: -2.9001, longitude: -79.0059 },
};

interface ResultadoClima {
    ciudad: string;
    data: OpenMeteoResponse | null;
    error: string | null;
}

export default function useFetchData(ciudad: string) {
    const [resultado, setResultado] = useState<ResultadoClima | null>(null);
    const coordenadas = COORDENADAS[ciudad];

    useEffect(() => {
        if (!coordenadas) return;

        const apiUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}` +
            '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m' +
            '&hourly=temperature_2m,wind_speed_10m' +
            '&forecast_days=1' +
            '&timezone=America%2FGuayaquil';

        const controller = new AbortController();

        async function obtenerDatos() {
            try {
                const respuesta = await fetch(apiUrl, { signal: controller.signal });

                if (!respuesta.ok) {
                    throw new Error(`Open-Meteo respondió con ${respuesta.status}`);
                }

                const data: OpenMeteoResponse = await respuesta.json();

                if (!controller.signal.aborted) {
                    setResultado({ ciudad, data, error: null });
                }
            } catch (error) {
                if (controller.signal.aborted) return;

                console.error('No se pudo consultar el clima', error);
                setResultado({
                    ciudad,
                    data: null,
                    error: `No se pudo consultar el clima de ${ciudad}.`,
                });
            }
        }

        void obtenerDatos();
        return () => controller.abort();
    }, [ciudad, coordenadas]);

    const resultadoActual = resultado?.ciudad === ciudad ? resultado : null;

    return {
        data: resultadoActual?.data ?? null,
        loading: Boolean(coordenadas) && resultadoActual === null,
        error: coordenadas
            ? resultadoActual?.error ?? null
            : `La ciudad ${ciudad} no está disponible.`,
    };
}