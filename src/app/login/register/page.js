"use client";

import { Roboto } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import Swal from "sweetalert2";

const inter = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export default function Login() {
  const router = useRouter();

  function login(event) {
    // Get values from the form
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var again = document.getElementById("again").value;
    var name = document.getElementById("name").value;
    var avatar = document.getElementById("avatar").value;
    var phone = document.getElementById("phone").value;

    if (again != password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password not consistent.",
      });
      return;
    }

    // Prepare the data for the request
    var data = {
      email: email,
      password: password,
      name: name,
      avatar: avatar,
      phone: phone,
    };

    // Make a POST request using the Fetch API
    axios
      .post(`${process.env.NEXT_PUBLIC_API_ROOT}/register`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.ok) {
          // alert('ok')
          //console.log(JSON.stringify(response));
          //throw new Error('Network response was not ok');
        }
      })
      .then((data) => {
        // Handle the successful login response
        //alert(data);
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: "Your account has been established.",
        });
        router.push("/");
      })
      .catch((error) => {
        // Handle errors
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.message}`,
        });
        // console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <div className="flex flex-col items-center items-stretch bg-[#F4F4F4]">
      <nav className="flex flex-row justify-between p-2">
        <div>TSMC COMMUTING</div>
        <SettingsIcon />
      </nav>
      <div className="mt-8 w-11/12 self-center">
        <div className="rounded-xl bg-white text-center">
          請輸入郵件與密碼以註冊帳號
        </div>
      </div>

      <div
        className={`mb-0 pt-16 text-center text-xl font-bold tracking-widest text-[#757575] ${inter.className}`}
      >
        TSMC
      </div>
      <div
        className={`mt-0 pt-0.5 text-center text-xl font-bold tracking-widest text-[#757575] ${inter.className}`}
      >
        COMMUTING{" "}
      </div>

      <form onSubmit={login} className="mt-8 flex flex-col">
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="email" className="px-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="password" className="px-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="agian" className="px-2">
            Password Again:
          </label>
          <input
            type="password"
            id="again"
            name="again"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="name" className="px-2">
            您的名字:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="avatar" className="px-2">
            頭像網址:
          </label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>
        <div className="mb-2 mt-2 flex items-stretch justify-between">
          <label for="phone" className="px-2">
            您的電話:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            size="23"
            className="rounded-xl px-1"
          />
        </div>

        <button
          type="submit"
          className="mt-16 w-3/12 self-center rounded-xl bg-[#757575] pb-0.5 pt-0.5 text-center text-white"
        >
          註冊
        </button>
      </form>
    </div>
  );
}
