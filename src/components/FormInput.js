// form input dynamically created from API 

const FormInput = (props) => {
  return (
    <li className={props.class}>
      <label htmlFor={`${props.for}UserInput`}>{props.prompt}</label>
      <input 
        type="text" 
        id={`${props.id}UserInput`}
        onChange={props.change}
        value={props.value} 
        required={props.required}
      />
    </li>
  )
}

export default FormInput;
