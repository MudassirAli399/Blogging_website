export default  async  function DeletePost({
    Datefordelete = ""
}){

    if(!Datefordelete){
        return false
    }
    console.log(Datefordelete)

    const response = await fetch(import.meta.env.VITE_DELETE_POST,{
        method:"POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Date : Datefordelete
        }),
      });
      const data = await response.json();
      if(data){
      
       
        return ("Deleted Successfully",data)
      }
      else{
        return false
      }
    }
