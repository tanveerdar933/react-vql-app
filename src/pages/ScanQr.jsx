import { useEffect, useRef } from "react";

const ScanQr = () => {
  const qrRef = useRef(null);
  function onScan(data) {
    //do something with the result
    console.log('onScan', data);
  }
  function onInit(data) {
    console.log('onInit', data);
  }
  useEffect(() => {
    if (qrRef && qrRef.current) {
      qrRef.current.setAttribute("queryId", "6565c38081738c00554d0334");
      qrRef.current.setAttribute("qrcodeOwner", "shareledger129j2ru5mvj9v2c7af9ym8keu844ca27myasuue");
      qrRef.current.addEventListener("oninit", onInit);
      qrRef.current.addEventListener("onscan", onScan);
    }
    return () => {
      qrRef.current.removeEventListener("oninit", onInit);
      qrRef.current.removeEventListener("onscan", onScan);
    }
  }, [qrRef]);


  return (
    <div
      ref={qrRef}
      id="qrContainer"
      mode="dynamic"
      app="Identifi Me"
      className="sharering-query"
    >
      <div className="qrcode-content">
        <div id="qrcode"></div>
      </div>
    </div>
  )
}

export default ScanQr