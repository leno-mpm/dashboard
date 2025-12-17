import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface ChartUIProps {
  data: OpenMeteoResponse;
}

export default function ChartUI({ data }: ChartUIProps) {

  const points = data.hourly.time.map((time, i) => ({
    x: i, 
    hourLabel: new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    fullDate: new Date(time).toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: data.hourly.temperature_2m[i],
    wind: data.hourly.wind_speed_10m[i],
  }));

  return (
    <>
      <Typography variant="h5" component="div" gutterBottom>
        Gráfico de temperatura y velocidad del viento por hora
      </Typography>

      <LineChart
        height={300}
        xAxis={[{
          data: points.map(p => p.x),
          valueFormatter: (value: number | null) => {
            return value !== null ? points[value]?.hourLabel ?? '' : ''; // Verificamos si el valor no es null
          },
          tickMinStep: 3,
        }]}
        series={[
          {
            data: points.map(p => p.temperature),
            label: 'Temperatura (°C)',
            valueFormatter: (value: number | null, context: { dataIndex: number }) => {
              return value !== null 
                ? `${points[context.dataIndex].fullDate} — ${value} °C`
                : ''; // Verificamos si el valor no es null
            },
          },
          {
            data: points.map(p => p.wind),
            label: 'Velocidad del viento (m/s)',
            valueFormatter: (value: number | null, context: { dataIndex: number }) => {
              return value !== null 
                ? `${points[context.dataIndex].fullDate} — ${value} m/s`
                : ''; // Verificamos si el valor no es null
            },
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
}
