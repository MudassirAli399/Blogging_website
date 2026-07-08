import React from "react";

 async function LoginAccount({
    useremail="",
    password="",
    
}){

    if(!useremail || !password){
        return false
    }

    const response = await fetch(import.meta.env.VITE_LOGIN_ACCOUNT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          useremail: useremail,
          password: password,
          
        }),
      });
      const data = await response.json();
      console.log(data);
       if(data){
        return data
       }
       else{
        return false
       }
      

}
export default LoginAccount