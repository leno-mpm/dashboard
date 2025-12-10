import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface UseFetchResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    "Guayaquil": { latitude: -2.1962, longitude: -79.8862 },
    Quito: { latitude: -0.1807, longitude: -78.4678 },
    Manta: { latitude: -0.9621, longitude: -80.7120 },
    Cuenca: { latitude: -2.9006, longitude: -79.0045 }
};

export default function useFetchData(selectedOption: string | null): UseFetchResult{

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const cityConfig = selectedOption != null? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    // URL correcta para Open Meteo
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`Error HTTPS: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(String(err));
                }

            } finally {
                setLoading(false);
            }

        };
        fetchData();

    }, [URL]); 
    return {data, loading, error };

}