import './App.css';
import FormInput from './FormInput';
import Template from './Template';
import DatabaseResult from './DatabaseResult';
import { useEffect, useState, Fragment } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import database from './firebase';

function App() {
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [madLibTitle, setMadLibTitle] = useState('');
  const [madLibResult, setMadLibResult] = useState('');
  const [author, setAuthor] = useState('');
  const [previousMadLibs, setPreviousMadLibs] = useState([]);
  const [inputList, setInputList] = useState([{ 
    prompt: "", 
    value: "" 
  }]);


  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=16`)
      .then(res => res.json())
      .then(jsonRes => {
        setInputList(jsonRes.blanks.map((blank) => {
          return {prompt: blank, value: ""};
        }));
        setMadLibTemplate(jsonRes.value);
        setMadLibTitle(jsonRes.title);
      })

    const dbRef = ref(database);
    
    onValue(dbRef, snapshot => {
      const dbData = snapshot.val();
      const newArray = [];

      for (let propertyName in dbData) {
        const storedMadLibs = {
          key: propertyName,
          title: dbData[propertyName].title,
          author: dbData[propertyName].author,
          madLib: dbData[propertyName].story
        }
        newArray.push(storedMadLibs);
      }      
      setPreviousMadLibs(newArray);
    })
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    let combinedArray = [];
    for (let i = 0; i < madLibTemplate.length - 1; i++) {
      combinedArray.push(madLibTemplate[i]);
      const word = inputList[i] ? inputList[i].value : "";
      combinedArray.push(word);
    }

    const madLibString = combinedArray.join('');
    setMadLibResult(madLibString);

    // push to firebase
    const dbRef = ref(database);
    const madLibData = {
      title: madLibTitle,
      author: `by ${author}`,
      story: madLibString 
    }
    push(dbRef, madLibData);
  }

  const handleChange = (e, index) => {
    const updatedInputList = [...inputList];
    updatedInputList[index].value = e.target.value;
    setInputList(updatedInputList);
  }

  const handleAuthor = (e) => {
    setAuthor(e.target.value)
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
                inputList.map((input, index) => {
                  return (
                    <FormInput
                      key={index}
                      prompt={input.prompt}
                      change={(e) => {handleChange(e, index)}}
                      value={input.value}
                      required
                    />
                  )
                })
              }
              <label htmlFor="userName">Pseudonym <span>How would you like to be credited?</span></label>
              <input 
                type="text" 
                id="userName"  
                onChange={handleAuthor}
                required
              />
            </ul>

            <button>Get Mad-Lib</button>
          </form>

          <Template
            title={madLibTitle}
            author={author}
            madLib={madLibResult}
          />

          {
            previousMadLibs.map((madLib, index) => {
              return (
                <Fragment
                  key={madLib.key}
                >
                  { 
                    previousMadLibs.length !== index + 1 ?
                      <DatabaseResult 
                        title={madLib.title}
                        author={madLib.author}
                        madLib={madLib.madLib}
                      />
                    : null
                  }
                </Fragment>
              )
            })
          }
          {
          
          }
        </div>
      </main>
      <footer>
        <p>Made by Cal Akler at <a href="https://junocollege.com/">Juno College</a>, 2021. Data courtesy of the <a href="https://madlibz.herokuapp.com/api">Madlibz API</a>.</p>
      </footer>
    </div>
  )
}

export default App;