"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import QRCodeScanner from "~/components/QRCodeScanner";
import NotAdminPage from "~/components/pages/NotAdminPage";
import NotLoggedInPage from "~/components/pages/NotLoggedInPage";
import UserPageLayout from "~/layouts/UserPageLayout";

const CompleteTask = () => {
  const [scanned, setScanned] = useState(false);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (scanned === true) {
      setTimeout(() => {
        setScanned(false);
      }, 1500);
    }

    return () => {};
  }, [scanned]);

  if (!(sessionData && sessionData.user)) return <NotLoggedInPage />;

  if (sessionData.user.type !== "ADMIN") return <NotAdminPage />;

  return (
    <UserPageLayout
      headingText="Complete Task"
      backHref="/admin/dashboard"
      backText="Back to Admin Dashboard"
    >
      <div className="h-full w-full p-4">
        <div className="h-full w-full space-y-4">
          <h3 className="font-heading text-xl font-medium text-brown">
            Scan the Users QrCode
          </h3>
          <QRCodeScanner setScanned={setScanned} />
          {scanned && (
            <h3 className="font-heading text-xl font-medium text-pink">
              Code Scanned Successfully !
            </h3>
          )}
        </div>
      </div>
    </UserPageLayout>
  );
};

export default CompleteTask;
