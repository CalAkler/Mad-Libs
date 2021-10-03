const FormInput = (props) => {

  return (
    <li>
      <label htmlFor={`${props.value}UserInput`}>{props.prompt}</label>
      <input 
        type="text" 
        id={`${props.value}UserInput`}
        onChange={props.change}
        value={props.value} 
        required={props.required}
      />
    </li>
  )
}

export default FormInput;
