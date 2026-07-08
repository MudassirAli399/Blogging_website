export default  async  function SearchPost({
    title = "",
    IncrementNumber = 0
}){

    if(!title){
        return false
    }
    console.log("title for Searching:--",title,IncrementNumber)

    const response = await fetch(import.meta.env.VITE_SEARCH_POST,{
        method:"POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TitleForSearch : title,
          IncrementNumber : IncrementNumber
        }),
      });
      const data = await response.json();
      if(data){
      
       
        return (data)
      }
      else{
        return false
      }
    }
