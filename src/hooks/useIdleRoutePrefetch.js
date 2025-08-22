import { useEffect } from "react";
import { scheduleIdlePrefetch } from "../utils/routePrefetch";

export default function useIdleRoutePrefetch() {
  useEffect(() => {
    scheduleIdlePrefetch();
  }, []);
}
