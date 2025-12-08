import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type OpenMeteoResponse } from "../types/DashboardTypes";

interface TableUIProps {
   data: OpenMeteoResponse;
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
   { field: 'label', headerName: 'Hora', width: 125 },
   { field: 'value1', headerName: 'Temperatura (°C)', width: 160 },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenarlas',
      sortable: false,
      hideable: false,
      width: 180,
      valueGetter: (_, row) => `A las ${row.label} → ${row.value1}°C`,
   },
];

export default function TableUI({ data }: TableUIProps) {

   const labels = data.hourly.time;                   // ej: ["2025-01-01T00:00", ...]
   const temps = data.hourly.temperature_2m;          // ej: [5.2, 4.8, ...]

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
