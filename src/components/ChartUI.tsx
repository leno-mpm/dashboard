import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import { type OpenMeteoResponse } from "../types/DashboardTypes";


interface ChartUIProps {
   data: OpenMeteoResponse;
}

export default function ChartUI({data}: ChartUIProps) {
    const arrValues1 = data.hourly.temperature_2m;
    const arrValues2 = data.hourly.wind_speed_10m;
    const arrLabels = data.hourly.time;
   return (
      <>
         <Typography variant="h5" component="div">
            Gráfico de temperatura y velocidad del viento
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: arrValues1, label: 'Temperatura (°C)'},
               { data: arrValues2, label: 'Velocidad del viento (m/s)'},
            ]}
            xAxis={[{ scaleType: 'point', data: arrLabels }]}
         />
      </>
   );
}