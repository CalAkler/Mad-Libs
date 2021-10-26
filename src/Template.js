// renders completed story with user inputs inserted

const Template = (props) => {
  return (
   <div className="template">
     <h2>{props.title}</h2>
     <h3>by {props.author}</h3>
     <p>{props.madLib}</p>
   </div>
  )
}

export default Template;