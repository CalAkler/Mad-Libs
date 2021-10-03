import './App.css';
import FormInput from './FormInput';
import Template from './Template';
import { useEffect, useState } from 'react';


function App() {
  const [madLibBlanks, setMadLibBlanks] = useState([]);
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [madLibTitle, setMadLibTitle] = useState('');
  const [userInput, setUserInput] = useState('');
  const [wordList, setWordList] = useState([]);
  // const [author, setAuthor] = useState('');
  const [madLibResult, setMadLibResult] = useState('');



  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=14`)
      .then(res => res.json())
      .then(jsonRes => {
        setMadLibBlanks(jsonRes.blanks);
        setMadLibTemplate(jsonRes.value);
        setMadLibTitle(jsonRes.title);
        console.log(jsonRes);
      })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // firebase code if time

    setWordList([...wordList, userInput])

    // const userRes = [];
    // userRes.push(wordList)

    let combinedArray = [];
    for (let i = 0; i < madLibTemplate.length; i++) {
      combinedArray.push(madLibTemplate[i]);
      combinedArray.push(wordList[i]);
    }

    const madLibString = combinedArray.join('');
    console.log(madLibString);

    setMadLibResult(madLibString);

  }

  

  const handleChange = e => {
    setUserInput(e.target.value);
  }

  return (
    <div className="App">
      <header>
        <h1>Mad-Libs!</h1>
      </header>
      <main>
        <div className="wrapper"> 
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
              {/* <label htmlFor="userName">Pseudonym <span>How would you like to be credited?</span></label>
              <input type="text" id="userName" /> */}
            </ul>

            {/* disable button until all fields filled */}
            <button>Get Mad-Lib</button>
          </form>

          <Template
            title={madLibTitle}
            madLib={madLibResult}
          />
        </div>
      </main>
      <footer>
        <p>Made by Cal Akler at <a href="https://junocollege.com/">Juno College</a>, 2021. Data courtesy of the <a href="https://madlibz.herokuapp.com/api">Madlibz API</a>.</p>
      </footer>
    </div>
  )
}

export default App;