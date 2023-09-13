/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { api } from "~/utils/api";

const QRCodeScanner = ({setScanned} : {setScanned: CallableFunction}) => {
  const [scannedCodes, setScannedCodes] = useState("");

  const completeTaskMutation = api.admin.completeTask.useMutation();

  function onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);

    const userID = decodedText.split("|")[0];
    const taskID = decodedText.split("|")[1];

    if (!(userID &&taskID)) return;



    completeTaskMutation.mutateAsync({
      userId: userID,
      taskId: taskID
    }).then(() => {
      setScanned(true);

    }).catch((error) => {
      console.log(error);
    });
  
    
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
      { fps: 5, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>Scan the Users QrCode</p>
      <div id="reader" className="w-full"></div>
      {/* <button onClick={activateLasers}>Activate Lasers</button> */}
    </div>
  );
};

export default QRCodeScanner;
