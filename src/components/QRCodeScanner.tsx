/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = () => {
  const [scannedCodes, setScannedCodes] = useState("");
  const [scanning, setScanning] = useState(true);
  // function activateLasers() {
  //   var decodedText = "asdf";
  //   var decodedResult = "asdfasdfasdf";
  //   console.log(scannedCodes);

  //   setScannedCodes(scannedCodes.concat([{ decodedText, decodedResult }]));
  // }
  function onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    setScannedCodes(decodedText);
  }

  function onScanFailure(error:string) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  useEffect(() => {
    

    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
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
