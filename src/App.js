import './App.css';
import Template from './Template';
import FormInput from './FormInput';
import { useEffect, useState } from 'react';


function App() {
  const [madLibForm, setMadLibForm] = useState([]);

  useEffect(() => {
    fetch(`http://madlibz.herokuapp.com/api/random?minlength=10&maxlength=15`)
      .then(res => res.json())
      .then(jsonRes => {
        setMadLibForm(jsonRes.blanks);
        console.log(jsonRes);
      })
  }, []);

  return (
    <div className="App">
      <h1>Mad-Libs!</h1>

      {/* {
        madLibForm.map((blank) => {
          return (
            <Form
              
            />
          )
        })
      } */}


      <form>
        <ul>
          <FormInput />
        </ul>
      </form>
    </div>
    
  )
}

export default App;
