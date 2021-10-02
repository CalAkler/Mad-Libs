import './App.css';
import FormInput from './FormInput';
import Template from './Template';
import { useEffect, useState } from 'react';


function App() {
  const [madLibBlanks, setMadLibBlanks] = useState([]);
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [wordList, setWordList] = useState([]);
  const [author, setAuthor] = useState('');


  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=14`)
      .then(res => res.json())
      .then(jsonRes => {
        setMadLibBlanks(jsonRes.blanks);
        setMadLibTemplate(jsonRes.value);
        console.log(jsonRes);
      })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    
    // firebase code if time

    setWordList([...wordList, userInput])
    // console.log(wordList);


    const userRes = [];
    userRes.push(wordList)
    console.log(userRes);



    return (
      <Template 
        
      />
    )

  }

  const handleChange = e => {
    setUserInput(e.target.value);
  }

  return (
    <div className="App">
      <h1>Mad-Libs!</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {
            madLibBlanks.map((blank, index) => {
              return (
                <FormInput
                  key={index}
                  prompt={blank}
                  change={handleChange}
                  // value={userInput}
                />
              )
            })
          }
          <label htmlFor="userName">Pseudonym <span>How would you like to be credited?</span></label>
          <input type="text" id="userName" />
        </ul>
        
        {/* disable button until all fields filled */}
        <button>Get Mad-Lib</button>
      </form>
    </div>
  )
}

export default App;