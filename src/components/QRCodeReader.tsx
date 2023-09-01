import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = () => {
  const [data, setData] = useState('null');
  console.log("hasjdfa")

  useEffect(()=> {
    console.log("alskjdfhalskjdf")
  }, [data]);

  return (
    <>
    {data !== 'null' ? <div>{data}</div> :  
      <QrReader
      constraints={{
        facingMode: "environment"
      }
      }
        onResult={(result, error) => {
          console.log("hello")
          // console.log(result)
          console.log(result, "res");
          if (!!result) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            setData(result.getText());
          }
          
          // if (result!== null && result !== undefined) {
          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          //   setData(result.getText())
          //   console.log(result)
          // }

          if (!!error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            console.log(error.message);
          }
        }}
        containerStyle={{ width: '100%' }}
        scanDelay={100}
      />}
      {/* <p>{data}</p> */}
    </>
  );
};


export default QRScanner;