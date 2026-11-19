import { Box, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
    clima: OpenMeteoResponse;
}

export default function TableUI({ clima }: TableUIProps) {
    const { hourly, hourly_units } = clima;

    const rows = hourly.time.map((fechaHora, index) => ({
        id: fechaHora,
        hora: fechaHora.slice(11, 16),
        temperatura: hourly.temperature_2m[index],
        viento: hourly.wind_speed_10m[index],
    }));

    const columns: GridColDef[] = [
        { field: 'hora', headerName: 'Hora', width: 80 },
        {
            field: 'temperatura',
            headerName: `Temperatura (${hourly_units.temperature_2m})`,
            type: 'number',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'viento',
            headerName: `Viento (${hourly_units.wind_speed_10m})`,
            type: 'number',
            flex: 1,
            minWidth: 120,
        },
    ];

    return (
        <>
            <Typography variant="h6">Pronóstico por hora</Typography>
            <Box sx={{ height: 320, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} hideFooter />
            </Box>
        </>
    );
}