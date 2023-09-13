import { useState } from "react";
import QRCodeScanner from "~/components/QRCodeScanner";


const CompleteTask = () => {

  const [scanned, setScanned] = useState(false);


  
  
  
  return(<>
  {!scanned ? 
  <QRCodeScanner setScanned={setScanned} />
   : <div>Confirmed</div>
  }
  </>);

}

export default CompleteTask;