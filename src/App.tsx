import { Grid } from '@mui/material';
import { useState } from 'react';
import './App.css';
import AlertUI from './components/AlertUI';
import ChartUI from './components/ChartUI';
import HeaderUI from './components/HeaderUI';
import IndicatorUI from './components/IndicatorUI';
import SelectorUI from './components/SelectorUI';
import TableUI from './components/TableUI';
import useFetchData from './hooks/useFetchData';

function App() {

    const [ciudad, setCiudad] = useState('Guayaquil');
    const clima = useFetchData(ciudad);

    return (
        <Grid container spacing={5} sx={{ justifyContent: 'center', alignItems: 'center' }}>

                {/* Encabezado */}
            <Grid size={{ xs: 12, md: 12 }}>
                <HeaderUI />
            </Grid>

            {/* Alertas */}
            <Grid size={{ xs: 12, md: 12 }}
                container sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>

                <AlertUI description="No se prevén lluvias" />
                <AlertUI description="Índice UV alto" severity="warning" variant="filled" />

            </Grid>

            {/* Selector */}
            <SelectorUI cityInput={ciudad} onCityChange={setCiudad} />

            {/* Indicadores */}
            <Grid container spacing={2} size={{ xs: 12, md: 9 }}>
                {clima && (
                    <>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <IndicatorUI
                                title="Temperatura (2 m)"
                                description={`${clima.current.temperature_2m} ${clima.current_units.temperature_2m}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <IndicatorUI
                                title="Temperatura aparente"
                                description={`${clima.current.apparent_temperature} ${clima.current_units.apparent_temperature}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <IndicatorUI
                                title="Velocidad del viento"
                                description={`${clima.current.wind_speed_10m} ${clima.current_units.wind_speed_10m}`}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 3 }}>
                            <IndicatorUI
                                title="Humedad relativa"
                                description={`${clima.current.relative_humidity_2m} ${clima.current_units.relative_humidity_2m}`}
                            />
                        </Grid>
                    </>
                )}
            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, md: 6 }}>
                {clima?.hourly && <ChartUI clima={clima} />}
            </Grid>

            {/* Tabla */}
            <Grid size={{ xs: 12, md: 6 }}>
                {clima?.hourly && (
                    clima.hourly_units
                        ? <TableUI clima={clima} />
                        : <p>Faltan las unidades del pronóstico por hora.</p>
                )}
            </Grid>

            {/* Información adicional */}
            <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

        </Grid>
    );
}

export default App;