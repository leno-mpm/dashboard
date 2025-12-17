import { useState } from 'react'
import { Grid } from '@mui/material';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';

import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';

//Nuevo

function App() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const {data, loading, error } = useFetchData(selectedOption);
  
  return (
    <>
      <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}><HeaderUI></HeaderUI></Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
          <AlertUI description="No se preveen lluvias" />
        </Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

        {/* Indicadores */}
        {loading && <p>Cargando indicadores...</p>}
          {error && <p>Error al cargar datos: {error}</p>}
          {data && (<Grid container size={{ xs: 12, md: 9 }}>
          
            <>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Temperatura (2m)"
                  description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Temperatura aparente"
                  description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Velocidad del viento"
                  description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title="Humedad relativa"
                  description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
                />
              </Grid>
            </>
         
        </Grid> )}




        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          {!loading && !error && data && (
            <ChartUI data={data} />
          )}
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          {!loading && !error && data && (
            <TableUI data={data} />
          )}
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
    </>
  )
}

export default App
