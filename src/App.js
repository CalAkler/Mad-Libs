// components
import FormInput from './components/FormInput';
import Template from './components/Template';
import DatabaseResult from './components/DatabaseResult';
import Instructions from './components/Instructions';
// hooks
import { useEffect, useState, Fragment } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
// firebase config
import database from './firebase';
// styles
import './App.css';

function App() {
  // define state variables
  const [madLibTemplate, setMadLibTemplate] = useState([]);
  const [madLibTitle, setMadLibTitle] = useState('');
  const [madLibResult, setMadLibResult] = useState('');
  const [author, setAuthor] = useState('');
  const [serverDown, setServerDown] = useState(false);
  const [previousMadLibs, setPreviousMadLibs] = useState([]);
  const [inputList, setInputList] = useState([{
    prompt: "",
    value: ""
  }]);

  // function to call api
  useEffect(() => {
    fetch(`https://madlibz.herokuapp.com/api/random?minlength=10&maxlength=16`)
      .then(res => {
        if (res.statusText === "OK") {
          return res.json()
            .then(jsonRes => {
              // store all mad-lib data in state variables  
              setInputList(jsonRes.blanks.map((blank) => {
                return { prompt: blank, value: "" };
              }));
              setMadLibTemplate(jsonRes.value);
              setMadLibTitle(jsonRes.title);
            })
        } else {
          throw new Error();
        }
      }).catch(() => {
        setServerDown(true);
      })
  }, []);

  // function to create final madlib result string from user-submitted array and original api value array, then store result in state
  const handleSubmit = e => {
    e.preventDefault();
    let combinedArray = [];
    for (let i = 0; i < madLibTemplate.length - 1; i++) {
      combinedArray.push(madLibTemplate[i]);
      // since inputList will always have one less item than madLibTemplate, check if inputList[i] exists, then push to combinedArray
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

    // setup subscription to firebase database and store result in state
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
  }

  // function to listen for user input changes and update inputList value
  const handleChange = (e, index) => {
    const updatedInputList = [...inputList];
    updatedInputList[index].value = e.target.value;
    setInputList(updatedInputList);
  }

  // listen for user input change and store in state
  const handleAuthor = (e) => {
    setAuthor(e.target.value)
  }

  // function to delete entry from database (and page)
  const handleDelete = (keyOfEntry) => {
    const specificNodeRef = ref(database, keyOfEntry);
    remove(specificNodeRef);
  }

  // render JSX
  return (
    <div className="App">
      <header>
        <h1>Mad-Libs!</h1>
      </header>
      <main>
        {
          serverDown ? (
            <h2 className="instructions">We're having trouble accessing the server at the moment. Please try again later! 😵</h2>
          ) : (
            <div className="wrapper">
              <Instructions />
              <form onSubmit={handleSubmit}>
                <ul>
                  {
                    inputList.map((input, index) => {
                      return (
                        <FormInput
                          key={index}
                          prompt={input.prompt}
                          change={(e) => { handleChange(e, index) }}
                          value={input.value}
                          for={input.value}
                          id={input.value}
                          required
                        />
                      )
                    })
                  }
                  <FormInput
                    for="userName"
                    class="userName"
                    prompt={<>Pseudonym: <span>how would you like to be credited?</span></>}
                    type="text"
                    id="userName"
                    change={handleAuthor}
                    required
                  />
                </ul>
                <button className="madLibsButton">Get Mad-Lib</button>
              </form>
              <Template
                title={madLibTitle}
                author={author}
                madLib={madLibResult}
              />
              <p className="instructions">Not happy with your result? Refresh to submit another, then scroll down to the bottom and you can delete it!</p>
              {
                previousMadLibs.map((madLib, index) => {
                  return (
                    <Fragment key={madLib.key}>
                      { // don't want to re-render new entry from db since it's already on the page
                        previousMadLibs.length !== index + 1 ?
                          <DatabaseResult
                            title={madLib.title}
                            author={madLib.author}
                            madLib={madLib.madLib}
                            item={madLib.key}
                            delete={() => handleDelete(madLib.key)}
                          />
                          : null
                      }
                    </Fragment>
                  )
                })
              }
            </div>
          )
        }
      </main>
      <footer>
        <p>Made by Cal Akler at <a href="https://junocollege.com/">Juno College</a>, 2021.</p>
        <p>Data courtesy of the <a href="https://madlibz.herokuapp.com/api">Madlibz API</a>.</p>
      </footer>
    </div>
  )
}

export default App;