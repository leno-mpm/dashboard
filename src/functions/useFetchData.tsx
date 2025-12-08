import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface UseFetchResult {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}


export default function useFetchData(): UseFetchResult {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


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
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error};

}