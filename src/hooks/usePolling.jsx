import { useEffect, useRef, useState } from "react";

const usePolling = (callback, ms = 1000, dependencies = []) => {
  const [dead, kill] = useState(false);
  const timeoutIdRef = useRef(null);
  useEffect(() => {
    if (dead) {
      return;
    }
    let _stopped = false;
    // Side note: preceding semicolon needed for IIFEs.
    (async function pollingCallback() {
      try {
        await callback();
      } finally {
        // Set timeout after it finished, unless stopped
        if (!_stopped) {
          timeoutIdRef.current = setTimeout(pollingCallback, ms);
        }
      }
    })();
    // Clean up if dependencies change
    return () => {
      _stopped = true; // prevent racing conditions
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [...dependencies, ms, dead]);

  return [() => kill(true), () => kill(false)];
}


export { usePolling };