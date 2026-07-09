import React, { use } from "react";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from "react-redux";
import { updateblogpost } from "../../store/Slice";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { Controller } from "react-hook-form";
import RTE from "./RTE.jsx";



export default function AddPostForm({
    URL=import.meta.env.VITE_ADD_POST
}) {
   
   const dispatch = useDispatch();
   const id = useSelector((state)=>state.user.Authentication.id)

    const BlogValue = useSelector((state) => state.user.BlogPost);
    const title = useSelector((state)=>state.user.BlogPost.title);
    if(id){
   
    const { register, handleSubmit,control,reset,formState: { errors } } = useForm(
        {
            defaultValues: {
                usertitle: BlogValue.title,
                userSummary: BlogValue.Summary,
                content: BlogValue.Content
                
                
            },
        }
    )
    React.useEffect(() => {
        reset({
            usertitle: BlogValue.title || "",
            userSummary: BlogValue.Summary || "",
            content: BlogValue.Content || "",
        })
    },[BlogValue])
    
    
    

   console.log("State after clicking on update button:-- ",BlogValue)
    const Imagetostring = new String(BlogValue.image)
    console.log("Image after clicking on update button:-- ",Imagetostring)
    const ImageforUpdate = Imagetostring.slice(46,Imagetostring.length)
    console.log("Image after slicing:-- ",ImageforUpdate)


    
    const Submit = async (data) => {
        console.log("data for adding post:-- ",data);
        const date = new Date()
        console.log(date)
        const formData = new FormData();
        if(title){
            formData.append("imageforupdate",ImageforUpdate)
            formData.append("dateforupdate",BlogValue.date)
        }
        else{
            formData.append("date",date)
        }
        formData.append("titleforupdate",title)
        formData.append("userid", id);
        formData.append("title", data.usertitle);
        formData.append("summary", data.userSummary);
        formData.append("content", data.content);
        formData.append("image", data.userImage[0].name);
        

        console.log("formdata that will send to backend:-- ",formData.entries());

        console.log(data.userImage[0].name)

        console.log("State :-- ",BlogValue)
        const res = await fetch(URL, {
            method: "POST",
            body: formData
            });
            const result = await res.json();
            if(result){
                console.log("result from backend:-- ",result);
                alert(result.message)
                dispatch(updateblogpost({title:"",Summary:"",Content:""}))
            }
             
    }
    return (
        <>

        <div style={{margin:"50px"}}>
            <h1 style={{textAlign:"center"}}>Add Blog</h1>
            <form onSubmit={handleSubmit(Submit)}>
            
            <Input
            
            
            label="Title"
            type="text"
            placeholder="Enter Your Blog's Title"
            name="usertitle"
            classname="inputforposttitle"
            divid="divforpost"
            labelid="labelforpost"

            {...register("usertitle",{
                required: "Title is required",
            })}
            
            />
            {errors.usertitle && <p style={{ color: 'red',marginLeft:"20%" }}>{errors.usertitle.message}</p>}
            <Input
            
            label="Summary"
            type="text"
            placeholder="Enter Your Content's Summary And Summary Shouldnot exceed more than 3 lines"
            name="userSummary"
            classname="inputforpostsummary"
            divid="divforpost"
            labelid="labelforpost"
            {...register("userSummary",{
                required: "Summary is required",
            })}
            />
            {errors.userSummary && <p style={{ color: 'red',marginLeft:"20%" }}>{errors.userSummary.message}</p>}
            <Input
          
            label="Image URL"
            type="file"
            placeholder="Enter YourBlog's Image URL"
            name="userImage"
            classname="inputforpostimage"
            divid="divforpost"
            labelid="labelforpost"
            accept="image/png, image/jpeg, image/jpg"
            {...register("userImage",{
                required: "Image is required",
               
            })}
            />
            {errors.userImage && <p style={{ color: 'red',marginLeft:"20%" }}>{errors.userImage.message}</p>}
            <div style={{marginTop:"20px"}}>
           <Controller
                
                 name="content"
                 control={control}
                 rules={{ required: "Content is required" }}
                 render={({ field }) => (
                <RTE
                value={field.value}
                onChange={field.onChange}
                />
                

            )}
            
            />
            {errors.content && <p style={{ color: 'red',marginLeft:"20%" }}>{errors.content.message}</p>}
            </div>
            <center>
            <Button
            width="200px"
            marginTop="20px"

           
               
            /></center>
            
            </form>   

        </div>
        

        

        </>
    )
}
else{
    return(<>
    <h1>You are not logged in</h1>
    </>)
}}