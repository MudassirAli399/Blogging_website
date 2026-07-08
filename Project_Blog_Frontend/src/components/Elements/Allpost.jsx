import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { login } from "../../store/Slice";

export default function Session() {
  const dispatch = useDispatch();
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
    
        const response = await fetch(import.meta.env.VITE_GET_SESSION, {
          method: "GET",
          
          credentials: "include", 
        });

        if (response.ok) {
          const data = await response.json();

          
          dispatch(login({ id: data.id, status:true,email:data.email,username:data.username }));
          setData(true)

          
    }
    else{
      console.log("error");
      
    };
    }
    fetchSession();
    
  }, []); 

  return data;
}
