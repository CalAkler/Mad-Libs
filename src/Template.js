const Template = (props) => {
  return (
   <div className="template">
     <h3>{props.title}</h3>
     <h4>by {props.author}</h4>
     <p>{props.madLib}</p>
     <button className="delete">X</button>
   </div>
  )
}

export default Template;