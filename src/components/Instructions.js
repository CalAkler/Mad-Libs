import { useState } from 'react';

const Instructions = () => {
  const [seePopUp, setSeePopUp] = useState(false);

  return (
    <>
      <p className="instructions">Fill out the form to create your own 
        <span
          className="help"
          onMouseEnter={() => setSeePopUp(true)}
          onMouseLeave={() => setSeePopUp(false)}
        >
          mad-lib
        </span>!
      </p>
      {
        seePopUp ? (
          <div className="popUp">
            <h3>Wait, what's a mad-lib?</h3>
            <p>A classic word game in which you're given a story template with several words missing. </p>
            <p>Prompts are given to create these words yourself before they're inserted into the story.</p>
            <p>The result is often nonsense, but always hilarious!</p>
          </div>
        ) : null
      }
    </>
  )
}

export default Instructions;