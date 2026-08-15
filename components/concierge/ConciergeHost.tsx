"use client";

import ConciergeTrigger from "@/components/concierge/ConciergeTrigger";
import ConciergePanel from "@/components/concierge/ConciergePanel";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function ConciergeHost() {
  const { open } = useConcierge();

  return (
    <>
      <ConciergePanel />
      {!open ? (
        <>
          <ConciergeTrigger variant="float" />
          <ConciergeTrigger variant="mobile-bar" />
        </>
      ) : null}
    </>
  );
}
