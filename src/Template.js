const Template = (props) => {
  return (
   <div className="template">
     <h3>{props.title}</h3>
     <h4>by {props.author}</h4>
     <p>{props.madLib}</p>
   </div>
  )
}

export default Template;