"use client";

import axios from "axios";

export default function App() {
  // alert(process.env.NEXT_PUBLIC_API_ROOT)

  let a = axios
    .post(
      `${process.env.NEXT_PUBLIC_API_ROOT}/login`,
      {
        email: "user3@example.com",
        password: "pa$$word",
      },
      { withCredentials: true },
    )
    .then((res) => {
      alert(JSON.stringify(res, null, 2));
    })
    .catch((err) => {
      alert(JSON.stringify(err, null, 2));
    });

  return <>{}</>;
}
