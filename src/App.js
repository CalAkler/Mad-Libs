import './App.css';
import Template from './Template';
import FormInput from './FormInput';
import { useEffect, useState } from 'react';


function App() {
  const [madLibBlanks, setMadLibBlanks] = useState([]);
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=15`)
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

    const userRes = [];

    userRes.push(userInput)
    console.log(userRes);
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
        </ul>
        {/* disable button until all fields filled */}
        <button>Get Mad-Lib</button>
      </form>
    </div>
  )
}

export default App;