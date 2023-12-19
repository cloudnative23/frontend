"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import SettingsIcon from '@mui/icons-material/Settings';
import { Roboto } from 'next/font/google'
import axios from "axios";
import Swal from "sweetalert2";

const inter = Roboto({ subsets: ['latin'], weight: ["400", "700"]})

export default function Login() {

  const router = useRouter()

  function registration(event) {
    router.push("/login/register")
  }

  function login(event) {
    // Get values from the form
    event.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Prepare the data for the request
    var data = {
        email: email,
        password: password
    };

    // Make a POST request using the Fetch API
    axios.post(`${process.env.NEXT_PUBLIC_API_ROOT}/login`, data, { withCredentials: true }
    )
      .then(response => {
        if (!response.ok) {
          // alert('ok')
          //console.log(JSON.stringify(response));
          //throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        // Handle the successful login response
        //alert(data);
        router.push("/login/choose")
      })
      .catch(error => {
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
    <div className="flex flex-col items-center bg-[#F4F4F4] items-stretch">
      <nav className="flex flex-row justify-between p-2">
        <div>TSMC COMMUTING</div>
        <SettingsIcon />
      </nav>
      <div className="w-11/12 self-center mt-8">
        <div className="bg-white text-center rounded-xl">登入</div>
      </div>

      <div className={`pt-16 mb-0 text-center text-[#757575] font-bold tracking-widest text-xl ${inter.className}`}>TSMC</div>
      <div className={`pt-0.5 mt-0 text-center text-[#757575] font-bold tracking-widest text-xl ${inter.className}`}>COMMUTING </div>


      <form onSubmit={login} className="mt-16 flex flex-col">
        <div className="flex justify-between items-stretch mb-2">
          <label for="email" className="px-2">Email:</label>
          <input type="text" id="email" name="email" required size="23" className="rounded-xl px-1 mx-1"/>
        </div>
        <div className="flex justify-between items-stretch mt-2">
          <label for="password" className="px-2">Password:</label>
          <input type="password" id="password" name="password" required size="23" className="rounded-xl px-1 mx-1" />
        </div>
        
        <button type="submit" className="self-center text-center w-3/12 mt-16 pt-0.5 pb-0.5 rounded-xl bg-[#757575] text-white">登入</button>
      </form>

      <button type="button" onClick={registration} className="self-center text-center w-3/12 mt-4 pt-0.5 pb-0.5 rounded-xl bg-white text-[#757575]">註冊</button>
    </div>
  );
}
