import { useCallback, useState } from "react";

type JsonData = { [key: string]: any };

type UseFetchReturnType = {
  data: JsonData | null;
  isLoading: boolean;
  isError: boolean;
  statusCode: number | null;
  fetchData: (
    url: URL,
    method?: string,
    jsonData?: JsonData,
    transformer?: (data: any) => any,
  ) => void;
};

const useFetch = (defaultIsLoading: boolean = false): UseFetchReturnType => {
  const [data, setData] = useState<JsonData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(defaultIsLoading);
  const [isError, setIsError] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const fetchData = useCallback(
    async (
      url: URL,
      method: string = "GET",
      jsonData?: JsonData,
      transformer?: (data: any) => any,
    ) => {
      setIsError(false);
      setIsLoading(true);
      setStatusCode(null);

      const headers: { [key: string]: string } = {};
      const options: { [key: string]: any } = {
        method,
        headers: headers,
      };

      if (jsonData != null) {
        options.headers = {
          ...options.headers,
          "Content-Type": "application/json",
        };
        options["body"] = JSON.stringify(jsonData);
      }

      try {
        const response = await fetch(url.href, options);
        setStatusCode(response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(transformer ? transformer(json) : json);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, isLoading, isError, statusCode, fetchData };
};

export default useFetch;
