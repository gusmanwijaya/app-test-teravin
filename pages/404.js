import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.back();
    }, 3000);
  }, [router]);

  return (
    <>
      <Head>
        <title>
          Error 404 Not Found - Test Teravin by Gusman Wijaya, S.Kom
        </title>
      </Head>
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-xl lg:text-3xl font-bold text-slate-700 bg-clip-text text-center">
          Opps! We lost you. <br />{" "}
          <span className="text-base lg:text-xl text-slate-500 font-light">
            Page not found.
          </span>{" "}
        </h1>
      </section>
    </>
  );
}
