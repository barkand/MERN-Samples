import useSWR from "swr";

export default function useTheme() {
  const { data, error } = useSWR(["mode"], fetcher, {
    refreshInterval: 500,
  });

  const loading = !data && !error;

  return {
    loading,
    mode: data,
  };
}

let fetcher = async (key: string) => localStorage.getItem(key);
