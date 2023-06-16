import { useEffect, useState } from "react";

const useApi = (url: string) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState(false);

    const fetchApi = (url: string) => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setLoading(false);
                setData(json);
            })
            .catch((err) => {
                setError(true);
            });
    };

    useEffect(() => {
        fetchApi(url);
    }, []);

    return { loading, data, error };
};

export default useApi;