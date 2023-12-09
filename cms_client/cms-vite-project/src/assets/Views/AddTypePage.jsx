import React from "react";
import { Outlet, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddTypePage() {
    const url = "https://server.shellinwinata.tech/";
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    };
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    //function to handle adding new data
    const handleAddTypes = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`${url}types`, { name }, config);
            console.log(data);
            navigate("/cms/typelist");
            Swal.fire({
                title: "Success!",
                text: `Add new Type ${name}`,
                icon: "sucess",
                confirmButtonText: "Cool",
            });
        } catch (error) {
            setError(error);
            Swal.fire({
                title: "Error!",
                text: `${error.response.data.message}`,
                icon: "error",
                confirmButtonText: "Cool",
            });
        }
    };

    return (
        <>
            <div className="pt-10">
                <form className="max-w-md mx-auto" onSubmit={handleAddTypes}>
                    <h1 className="pb-5 text-gray-700">
                        Add New Type/Category
                    </h1>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            type="name"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            for="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Type
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Outlet />
        </>
    );
}

export default AddTypePage;
