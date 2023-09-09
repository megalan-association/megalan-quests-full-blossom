import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import BackgroundImageLayout from "~/layouts/BackgroundImageLayout";
import { authOptions } from "~/server/auth";

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <BackgroundImageLayout imageURL="/two-cherry-branch-bg.png">
      <section
        id="login"
        className="flex w-full flex-col items-center justify-center p-8"
      >
        <div className="flex w-full flex-row justify-start p-2 font-heading text-2xl font-semibold text-brown outline-none md:container">
          <h1>Login / Sign up</h1>
        </div>
        <h2 className="w-full pt-16 text-left font-heading text-xl font-medium text-green md:container">
          Sign in with
        </h2>
        <div className="w-full space-y-4 pb-16 pt-4 md:container">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => void signIn(provider.id)}
                className="flex w-full flex-row items-center justify-center rounded-xl border-2 border-green bg-light-green p-4"
              >
                <p className="font-heading text-xl font-medium text-green">
                  {provider.name}
                </p>
              </button>
            </div>
          ))}
        </div>
      </section>
    </BackgroundImageLayout>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}

export default Login;
