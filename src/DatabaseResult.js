// renders previous stories from database onto page

const DatabaseResult = (props) => {
  return (
    <div className="databaseResult">
      <h2>{props.title}</h2>
      <h3>{props.author}</h3>
      <p>{props.madLib}</p>
      <button
        className="deleteButton"
        onClick={props.delete}
      >X</button>
    </div>
  )
}

export default DatabaseResult;