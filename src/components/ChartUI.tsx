import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
    clima: OpenMeteoResponse;
}

export default function ChartUI({ clima }: ChartUIProps) {
    const { hourly, hourly_units } = clima;
    const horas = hourly.time.map((fechaHora) => fechaHora.slice(11, 16));

    return (
        <>
            <Typography variant="h6">Temperatura y viento por hora</Typography>

            <LineChart
                height={320}
                xAxis={[{ data: horas, scaleType: 'point' }]}
                yAxis={[
                    { id: 'temperatura' },
                    { id: 'viento', position: 'right' },
                ]}
                series={[
                    {
                        data: hourly.temperature_2m,
                        label: `Temperatura (${hourly_units.temperature_2m})`,
                        yAxisId: 'temperatura',
                    },
                    {
                        data: hourly.wind_speed_10m,
                        label: `Viento (${hourly_units.wind_speed_10m})`,
                        yAxisId: 'viento',
                    },
                ]}
            />
        </>
    );
}