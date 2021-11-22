const Stack = require('./Stack.js');
const prompt = require('prompt-sync')();
// ------------------------------
// Initialization
// ------------------------------
const backPages = new Stack()
const nextPages = new Stack()
let currentPage = 'Start Page'
// ------------------------------
// Helper Functions
// ------------------------------
const showCurrentPage = (action) => {
  console.log(`\n${action}`)
  console.log(`Current page = ${currentPage}`)
  console.log('Back page = ', backPages.peek())
  console.log('Next page = ', nextPages.peek())
}

const newPage = (page) => {
  backPages.push(currentPage)
  currentPage = page
  while(!nextPages.isEmpty()){
    nextPages.pop()
  }
  showCurrentPage("NEW: ")
}

const backPage = () => {
  nextPages.push(currentPage)
  currentPage = backPages.pop()
  showCurrentPage("BACK: ")
}

const nextPage = () => {
  backPages.push(currentPage)
  currentPage = nextPages.pop()
  showCurrentPage("NEXT: ")
}
/*
 * The following strings are used to prompt the user
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------
let finish = false
let showBack = false
let showNext = false

showCurrentPage("DEFAULT: ")

while(finish === false){
  let instructions = baseInfo
  if(!backPages.isEmpty()){
    instructions = `${instructions}, ${backInfo}`
    showBack = true
  }else{
    showBack = false
  }
  if(!nextPages.isEmpty()){
    instructions = `${instructions}, ${nextInfo}`
    showNext = true
  }else{
    showNext = false
  }
  instructions  = `${instructions}, ${quitInfo}.`
  console.log(instructions);
  const answer = prompt(question)
  const lowerCaseAnswer = answer.toLowerCase()
  if((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q') ){
    newPage(answer)
  }else if(showBack && lowerCaseAnswer === 'b'){
    backPage()
  }else if(showNext && lowerCaseAnswer === 'n'){
    nextPage()
  }else if(!showBack && lowerCaseAnswer === 'b'){
    console.log('There are no previous pages!')
  }else if(!showNext && lowerCaseAnswer === 'n'){
    console.log('There is no next page')
  }else if(lowerCaseAnswer === 'q'){
    finish = true
  }
}
  // ------------------------------
  // User Interface Part 2
  // ------------------------------

