
import React from "react"

import LoginAccount from "./Loginaccount.js"

export default  async  function MakeAccount({
    username="",
    password="",
    email=""
}){

    if(!username || !password || !email){
        return false
    }

    const response = await fetch(import.meta.env.VITE_CREATE_ACCOUNT,{
        method:"POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });
      const data = await response.json();
      if(data.status=="success"){
        return data
      }
      else{
        return false
      }
    }
