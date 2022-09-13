import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { detail } from "../../services/employees";

const Detail = ({ oneData }) => {
  const router = useRouter();

  const dd = oneData?.birthDate.toString().split("-")[2];
  const MM = oneData?.birthDate.toString().split("-")[1];
  const YY = oneData?.birthDate.toString().split("-")[0];

  let month = "";

  if (MM === "01") {
    month = "January";
  } else if (MM === "02") {
    month = "February";
  } else if (MM === "03") {
    month = "March";
  } else if (MM === "04") {
    month = "April";
  } else if (MM === "05") {
    month = "May";
  } else if (MM === "06") {
    month = "June";
  } else if (MM === "07") {
    month = "July";
  } else if (MM === "08") {
    month = "August";
  } else if (MM === "09") {
    month = "September";
  } else if (MM === "10") {
    month = "October";
  } else if (MM === "11") {
    month = "November";
  } else if (MM === "12") {
    month = "December";
  }

  return (
    <>
      <Head>
        <title>Detail Employee - Test Teravin by Gusman Wijaya, S.Kom</title>
      </Head>
      <div className="h-screen justify-center items-center py-20 px-[400px] space-y-5 bg-white">
        <h4 className="font-bold">Detail Employee</h4>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">ID</h6>
          <div className="flex flex-col">
            <input
              type="text"
              name="id"
              className="w-[300px] text-sm bg-transparent"
              disabled={true}
              value={oneData?.id}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Name</h6>
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              className="w-[300px] text-sm bg-transparent"
              disabled={true}
              value={oneData?.name}
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Email</h6>
          <input
            type="email"
            name="email"
            className="w-[300px] text-sm bg-transparent"
            disabled={true}
            value={oneData?.email}
          />
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Mobile</h6>
          <input
            type="number"
            name="mobile"
            className="w-[300px] text-sm bg-transparent"
            disabled={true}
            value={oneData?.mobile}
          />
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Birth Date</h6>
          <input
            type="text"
            name="birthDate"
            className="w-[300px] text-sm bg-transparent"
            disabled={true}
            value={`${month} ${dd}, ${YY}`}
          />
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Address</h6>
          <input
            type="text"
            name="address"
            className="w-[300px] text-sm bg-transparent"
            disabled={true}
            value={oneData?.address}
          />
        </div>
        <div className="flex flex-row justify-end items-center space-x-4 pt-24">
          <button
            onClick={() => router.back()}
            type="button"
            className="p-1 text-sm"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;

export async function getServerSideProps({ params }) {
  const response = await detail(params?.id);

  return {
    props: {
      oneData: response?.data?.data || {},
    },
  };
}
