import { Card, CardContent, Typography } from '@mui/material';

interface IndicatorUIProps {
    title: string;
    description: string;
}

export default function IndicatorUI({ title, description }: IndicatorUIProps) {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="body2">{title}</Typography>
                <Typography variant="h6">{description}</Typography>
            </CardContent>
        </Card>
    );
}