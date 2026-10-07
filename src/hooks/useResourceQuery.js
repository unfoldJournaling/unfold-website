import { useSyncExternalStore } from "react";
import { useSearchParams } from "react-router-dom";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export default function useResourceQuery(defaultCategory = "All") {
  const [params, setParams] = useSearchParams();
  // Static HTML is unfiltered; apply URL state after hydration without replacing it.
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  function update(name, value, fallback = "") {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value && value !== fallback) next.set(name, value);
      else next.delete(name);
      return next;
    }, { replace: true, preventScrollReset: true });
  }
  return {
    hydrated,
    query: hydrated ? params.get("q") || "" : "",
    category: hydrated ? params.get("topic") || defaultCategory : defaultCategory,
    reset: () => setParams({}, { replace: true, preventScrollReset: true }),
    setQuery: (value) => update("q", value),
    setCategory: (value) => update("topic", value, defaultCategory),
  };
}
