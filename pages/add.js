import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { create } from "../services/employees";

const Add = () => {
  const router = useRouter();

  const [fieldAddress, setFieldAddress] = useState([
    {
      address: "",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    birthDate: "",
    address: "",
  });

  const handleAddNewAddressField = () => {
    setFieldAddress([
      ...fieldAddress,
      {
        address: "",
      },
    ]);
  };

  const handleRemoveAddressField = (index) => {
    const list = [...fieldAddress];
    list.splice(index, 1);
    setFieldAddress(list);
    setForm({
      ...form,
      address: list?.map((result) => result?.address),
    });
  };

  const handleOnChangeAddess = (event, index) => {
    const { name, value } = event?.target;

    const list = [...fieldAddress];
    list[index][name] = value;
    setFieldAddress(list);
    setForm({
      ...form,
      address: list?.map((result) => result?.address),
    });
  };

  const handleSubmit = async () => {
    if (
      form?.name !== "" &&
      form?.email !== "" &&
      form?.mobile !== "" &&
      form?.birthDate !== "" &&
      form?.address !== ""
    ) {
      const data = {
        name: form?.name,
        email: form?.email,
        mobile: form?.mobile,
        birthDate: form?.birthDate,
        address: JSON.stringify(form?.address),
      };
      const response = await create(data);
      if (response?.data?.statusCode === 201) {
        router.replace("/");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `${response?.data?.message || "Successfully created data!"}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.data?.message || "Something went wrong!"}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please fill in all the fields.`,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Add Employee - Test Teravin by Gusman Wijaya, S.Kom</title>
      </Head>
      <div className="h-screen justify-center items-center py-20 px-[400px] space-y-5 bg-white">
        <h4 className="font-bold">Add Employee</h4>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Name</h6>
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              className="border w-[300px] text-sm"
              onChange={(event) =>
                setForm({ ...form, name: event?.target?.value })
              }
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Email</h6>
          <input
            type="email"
            name="email"
            className="border w-[300px] text-sm"
            onChange={(event) =>
              setForm({ ...form, email: event?.target?.value })
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Mobile</h6>
          <input
            type="number"
            name="mobile"
            className="border w-[300px] text-sm"
            onChange={(event) =>
              setForm({ ...form, mobile: event?.target?.value })
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Birth Date</h6>
          <input
            type="date"
            name="birthDate"
            className="border w-[300px] text-sm"
            onChange={(event) =>
              setForm({ ...form, birthDate: event?.target?.value })
            }
          />
        </div>
        <div className="flex flex-row justify-between space-x-20">
          <h6 className="text-sm whitespace-nowrap">Address</h6>
          <div className="flex flex-col">
            {fieldAddress?.length > 0 &&
              fieldAddress?.map((value, index) => (
                <div key={index} className="flex flex-row">
                  <input
                    onChange={(event) => handleOnChangeAddess(event, index)}
                    name="address"
                    type="text"
                    className="border w-[277px] text-sm"
                    value={fieldAddress[index]?.address}
                  />
                  {fieldAddress?.length !== 1 &&
                    fieldAddress?.length - 1 !== index && (
                      <button
                        onClick={() => handleRemoveAddressField(index)}
                        type="button"
                        className="border"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 12h-15"
                          />
                        </svg>
                      </button>
                    )}
                  {fieldAddress?.length - 1 === index && (
                    <button
                      onClick={handleAddNewAddressField}
                      type="button"
                      className="border"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-row justify-end items-center space-x-4 pt-24">
          <button
            onClick={() => router.back()}
            type="button"
            className="border p-1 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="border p-1 text-sm"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Add;
