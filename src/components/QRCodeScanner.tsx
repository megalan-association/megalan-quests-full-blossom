/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = ({setScanned} : {setScanned: CallableFunction}) => {
  const [scannedCodes, setScannedCodes] = useState("");
  function onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setScannedCodes(decodedText);

    // send the request to the backend
    // if the result is true 
    setScanned(true);
  }

  function onScanFailure(error:string) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    setScanned("");
    console.warn(`Code scan error = ${error}`);
  }

  useEffect(() => {
    

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <h1>Where is Starman</h1> */}
      <p>description</p>
      <div id="reader" className="w-full"></div>
      <div>{scannedCodes}</div>
      {/* <button onClick={activateLasers}>Activate Lasers</button> */}
    </div>
  );
};

export default QRCodeScanner;
