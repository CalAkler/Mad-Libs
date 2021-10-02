const FormInput = (props) => {

  return (
    <li>
      <label htmlFor={`${props.prompt}UserInput`}>{props.prompt}</label>
      <input 
        type="text" 
        id={`${props.prompt}UserInput`}
        onChange={props.change}
        value={props.value} 
        // required
      />
    </li>
  )
}

export default FormInput;