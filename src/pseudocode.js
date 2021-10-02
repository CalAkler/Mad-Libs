// MVP GOAL: Create a mad-libs app that takes user inputs to generate a short story, a few sentences long. Store result in database and display on page

// State items: 
  // [formSubmitted, setFormSubmitted] 
  // inputs
  
// create FormInput child component that includes text inputs asking for:
  // adjective, noun, verb, name, city, etc. which will be used to populate story Template
    // store values as props on submit
  // "Get Mad-Lib" submit button
    // require all fields to be entered

// create Template child component for story that returns:  
  // <h3> - title
  // <p> - body of story
  // <p> - author
  // pass as props the user input values, e.g. userAdj, userNoun, userVerb, etc.
 
// When "Get Mad-Lib" button is clicked:
  // render Template component to page with variables filled in
  // save mad-lib to firebase 
  // also display last 5 mad-libs created by previous users
  // include a button to delete mad-lib from page and database
  // include another button to make a new mad-lib (refresh page)  

// STRETCH GOALS:  
  // integrate an api to display a relevant image based on a word or theme the user gave
    // tie it to a specific noun they submit

  // Create several templates based on genre, which user can select at start
      // instead of creating a new variable with each input, push values to a new array e.g. spyWords, westernWords
      // access array items in each separate Template