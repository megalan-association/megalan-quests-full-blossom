import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "~/layouts/Layout";

const NotParticipantPage = () => {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    if (seconds === 0) {
      router.push("/admin/dashboard");
    }
    setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <Layout>
      <div className="flex h-[60dvh] w-full flex-col items-center justify-center px-4">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="font-body text-2xl font-semibold text-brown md:text-5xl">
            You are Not an Participant
          </div>
          <div className="font-body text-lg font-medium text-brown md:text-2xl">
            Going back to Admin Dashboard in {seconds} Seconds
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NotParticipantPage;
