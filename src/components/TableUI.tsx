import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface TableUIProps {
  data: OpenMeteoResponse;
}

function formatHour(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function combineArrays(labels: string[], values1: number[]) {
  return labels.map((label, index) => ({
    id: index,
    label,
    value1: values1[index],
  }));
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },

  {
    field: 'label',
    headerName: 'Hora',
    width: 125,
    valueFormatter: (value: string) => formatHour(value),
    
  },

  {
    field: 'value1',
    headerName: 'Temperatura (°C)',
    width: 160,
  },

  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenarlas',
    sortable: false,
    hideable: false,
    width: 260,
    valueGetter: (_, row) =>
      `${formatDateTime(row.label)} → ${row.value1} °C`,
  },
];

export default function TableUI({ data }: TableUIProps) {

  const labels = data.hourly.time;          // ["2025-12-17T00:00", ...]
  const temps = data.hourly.temperature_2m; // [22.2, 22.1, ...]

  const rows = combineArrays(labels, temps);

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
