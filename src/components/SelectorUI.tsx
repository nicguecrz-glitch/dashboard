import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

export default function SelectorUI() {
    const [cityInput, setCityInput] = useState('');

    return (
        <FormControl fullWidth>
            <InputLabel id="city-label">Ciudad</InputLabel>
            <Select
                labelId="city-label"
                label="Ciudad"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
            >
                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                <MenuItem value="Quito">Quito</MenuItem>
                <MenuItem value="Cuenca">Cuenca</MenuItem>
            </Select>

            {cityInput && <p>Información del clima en {cityInput}</p>}
        </FormControl>
    );
}