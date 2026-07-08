import React from "react";
import "../CSS/Input.css" 
import { useId } from "react";
function Input({
  label,
  type,
  placeholder,
  name,
  classname,
  labelid,
  divid="", 
  ...props
},ref) {
  const id = useId()
  return (
    <div id={divid}>
      <label htmlFor={name} id={labelid}>{label}:</label> 
      <input
        type={type}
        id={id}
        className={classname}
        name={name}
        ref={ref} 
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}
export default React.forwardRef(Input)