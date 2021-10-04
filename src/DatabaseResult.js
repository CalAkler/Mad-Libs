const DatabaseResult = (props) => {
  return (
    <div className="databaseResult">
      <h3>{props.title}</h3>
      <h4>{props.author}</h4>
      <p>{props.madLib}</p>
    </div>
  )
}

export default DatabaseResult;