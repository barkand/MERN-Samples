import useSWR from "swr";

import userFetcher from "./api-user";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;
  const loggedOut = error;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
