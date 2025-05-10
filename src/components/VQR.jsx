import { useEffect, useRef, useState } from "react";
import { usePolling } from "../hooks/usePolling";

const VQR = ({
  queryId,
  qrcodeOwner,
  metadata,
  onScan,
  onInit,
  encryptionKey,
  mode,
  app,
  ...props
}) => {

  const theRef = useRef(null);

  useEffect(() => {
    if (onScan) {
      window.addEventListener("vqronscan", onScan, false);
    }
    if (onInit) {
      window.addEventListener("vqroninit", onInit, false);
    }
    return () => {
      if (onScan) {
        window.removeEventListener("vqronscan", onScan, false);
      }
      if (onInit) {
        window.removeEventListener("vqroninit", onInit, false);
      }
    };
  }, []);

  useEffect(() => {
    const jqueryLoad = document.createElement("script");
    jqueryLoad.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js";
    jqueryLoad.async = false;
    document.body.appendChild(jqueryLoad);

    const jqueryQrCodeLoad = document.createElement("script");
    jqueryQrCodeLoad.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js";
    jqueryQrCodeLoad.async = false;
    document.body.appendChild(jqueryQrCodeLoad);

    return () => {
      document.body.removeChild(jqueryLoad);
      document.body.removeChild(jqueryQrCodeLoad);
    };
  }, []);

  const [jqueryLoaded, setJqueryLoaded] = useState(false);
  const [jqueryQrCodeLoaded, setJqueryQrCodeLoaded] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const [stop] = usePolling(
    () => {
      if (typeof window.jQuery !== "undefined") {
        setJqueryLoaded(true);
      }
      if (typeof window.jQuery?.fn?.qrcode !== "undefined") {
        setJqueryQrCodeLoaded(true);
      }
    },
    500,
    [window.jQuery, window.jQuery?.fn?.qrcode]
  );

  useEffect(() => {
    if (jqueryLoaded && jqueryQrCodeLoaded) {
      stop();
      // let query: HTMLElement;
      // let script: HTMLScriptElement;

      const script = window.document.createElement("script");
      script.textContent =
        ";window.vqronscan = function(data) {window.dispatchEvent(new CustomEvent('vqronscan', {detail: data}))}; window.vqroninit = function(data) {window.dispatchEvent(new CustomEvent('vqroninit', {detail: data}))};";
      script.async = false;
      document.body.appendChild(script);

      const query = window.document.createElement("div");
      query.classList.add("sharering-query");
      query.setAttribute("queryId", queryId); // TODO
      query.setAttribute("mode", mode);
      query.setAttribute("qrcodeOwner", qrcodeOwner); // TODO
      if (metadata) {
        query.setAttribute("metadata", metadata);
      }
      query.setAttribute("onscan", "vqronscan");
      query.setAttribute("oninit", "vqroninit");
      if (app) {
        query.setAttribute("app", app);
      }
      const qrcontent = window.document.createElement("div");
      qrcontent.classList.add("qrcode-content");
      const qrcode = window.document.createElement("div");
      qrcode.id = "qrcode";
      qrcontent.appendChild(qrcode);
      query.appendChild(qrcontent);
      theRef.current?.appendChild(query);

      setDomLoaded(true);

      return () => {
        if (query) {
          theRef.current?.removeChild(query);
        }
        if (script) {
          document.body.removeChild(script);
        }
      };
    }
  }, [jqueryLoaded, jqueryQrCodeLoaded]);

  useEffect(() => {
    if (domLoaded) {
      const queryScriptLoad = document.createElement("script");
      queryScriptLoad.src =
        "https://raw.githack.com/ShareRing/vql-javascript-library/master/sharering.query.lib.test.min.js";
      queryScriptLoad.async = false;
      document.body.appendChild(queryScriptLoad);

      return () => {
        document.body.removeChild(queryScriptLoad);
      };
    }
  }, [domLoaded]);

  return (
    <>
      <div {...props} ref={theRef}></div>
    </>
  );
}

export default VQR