import useSWR from "swr";

import userFetcher from "./api-user";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", userFetcher, {
    refreshInterval: 1000 * import.meta.env.VITE_SECRET_KEY_LIFE_TIME,
  });

  const loading = !data && !error;
  const loggedOut = error;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
