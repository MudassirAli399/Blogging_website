import react from "react";
import Logout from "../../Backend/Logoutaccount";
import { useSelector } from "react-redux";
function Logoutaccount() {
    const email = useSelector((state) => state.user.Authentication.email);
    if(email){
        const status = Logout(email=email)
        if(status){
            alert("Logout successfully")
        }
    }
    else{
        alert("You are not logged in")
    }
}
export default Logoutaccount