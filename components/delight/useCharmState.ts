"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_CHARM_STATE,
  readCharmState,
  subscribeCharmState,
  writeCharmState,
  type CharmState,
} from "@/lib/charm-storage";

export function useCharmState() {
  const [state, setState] = useState<CharmState>(DEFAULT_CHARM_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readCharmState());
    setReady(true);
    return subscribeCharmState(setState);
  }, []);

  const update = useCallback((partial: Partial<CharmState>) => {
    setState(writeCharmState(partial));
  }, []);

  return { state, ready, update };
}
