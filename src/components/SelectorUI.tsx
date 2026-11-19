import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectorUIProps {
    cityInput: string;
    onCityChange: (city: string) => void;
}

export default function SelectorUI({ cityInput, onCityChange }: SelectorUIProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id="city-label">Ciudad</InputLabel>
            <Select
                labelId="city-label"
                label="Ciudad"
                value={cityInput}
                onChange={(event) => onCityChange(event.target.value)}
            >
                <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                <MenuItem value="Quito">Quito</MenuItem>
                <MenuItem value="Cuenca">Cuenca</MenuItem>
            </Select>

            {cityInput && <p>Información del clima en {cityInput}</p>}
        </FormControl>
    );
}