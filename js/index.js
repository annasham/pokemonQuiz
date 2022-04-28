let pokemonTable = "https://api.airtable.com/v0/appHJWZB9ZABuyLRt/Imported%20table?api_key=keyg6Lpx3a26X8yIt"
let questionsTable = "https://api.airtable.com/v0/appHJWZB9ZABuyLRt/Questions?api_key=keyg6Lpx3a26X8yIt"

//call api
let quizArray = [];
let pokemonArray = [];

//array to hold all quiz questions
let questionContainer = [];

//variables need to access in html
const quizQuestions = document.getElementById("quiz-questions");
const nextQuestions = document.getElementById("next-questions");
const questionanswers = document.getElementById("question-answers");

//data fetch
async function fetchData(url){
  let response = await fetch(url);
  let jsonData = await response.json();
  return jsonData;
}

async function changeQuestion(){

  let currentQuestion = sessionStorage.getItem("currentQuestion");
  currentQuestion++; //incrementation
  sessionStorage.setItem("currentQuestion", currentQuestion); //putting it back in memory

  let quizArray2 = await sessionStorage.getItem("quizArray");
  quizArray2 = JSON.parse(quizArray2);
  document.getElementById('question').innerHTML = quizArray2[currentQuestion].fields.questions;
  document.getElementById('a1').innerHTML = quizArray2[currentQuestion].fields.answerOne;
  document.getElementById('a2').innerHTML = quizArray2[currentQuestion].fields.answerTwo;
  document.getElementById('a3').innerHTML = quizArray2[currentQuestion].fields.answerThree;
  document.getElementById('a4').innerHTML = quizArray2[currentQuestion].fields.answerFour;
  document.getElementById("pokemonImage1").src = quizArray2[currentQuestion].fields.answerOneImage;
  document.getElementById("pokemonImage2").src = quizArray2[currentQuestion].fields.answerTwoImage;
  document.getElementById("pokemonImage3").src = quizArray2[currentQuestion].fields.answerThreeImage;
  document.getElementById("pokemonImage4").src = quizArray2[currentQuestion].fields.answerFourImage;
}

async function getData(){
  let pokemonData = await fetchData(pokemonTable); //fetches pokemon data
  let questionData = await fetchData(questionsTable); //fetches questions
//  data.records[0].fields.pokemon;

// alert(pokemonData.records.length);
// alert(JSON.stringify(pokemonData));
  for(let i = 0; i<pokemonData.records.length; i++){
    pokemonArray.push(pokemonData.records[i]);
  }

  for(let i = 0; i<questionData.records.length; i++){
    quizArray.push(questionData.records[i]);
  }

//stores data based on user session

  sessionStorage.setItem("quizArray", JSON.stringify(quizArray));
  sessionStorage.setItem("currentQuestion", "-1");
  let answerArray = [];
  sessionStorage.setItem("answerArray", JSON.stringify(answerArray));
  sessionStorage.setItem("pokemonArray", JSON.stringify(pokemonArray));

}

//grabbing answerArray from first question, as user answer the question,
//it puts index of whhat they answered in the session

async function logAnswer(answerIndex){

  let answerArray = JSON.parse(sessionStorage.getItem("answerArray"));
  answerArray.push(answerIndex);
  // alert (answerArray);
  sessionStorage.setItem("answerArray", JSON.stringify(answerArray));



//retreive currentQuestion

let currentQuestion = sessionStorage.getItem("currentQuestion");
// alert(currentQuestion);
if (currentQuestion == 4){
  calcResults();
}
else {
  changeQuestion();
}
}

//get value of selected data

function calcResults(){

var category1 = 0;
var category2 = 0;
var category3 = 0;
var category4 = 0;
let answerArray = JSON.parse(sessionStorage.getItem("answerArray"));

for(let i = 0; i<answerArray.length; i++){
    if(answerArray[i]==0){
      category1++;
    }
    if(answerArray[i]==1){
      category2++;
    }
    if(answerArray[i]==2){
      category3++;
    }
    if(answerArray[i]==3){
      category4++;
    }
  }
  var maxNumber = Math.max(category1, category2, category3, category4);
  var winningCategory = 0;

  switch (maxNumber){
    case category1:
      winningCategory = 1;
      break;
    case category2:
      winningCategory = 2;
      break;
    case category3:
      winningCategory = 3;
      break;
    case category4:
      winningCategory = 4;
      break;
  }

  let pokemonArray = JSON.parse(sessionStorage.getItem("pokemonArray"));
  let resultFlag = false;

  for (let i = 0; i<100; i++){
    var pokemonNumber = Math.floor(Math.random()*99);
      if(pokemonArray[pokemonNumber].fields.answerGroup==winningCategory){
        sessionStorage.setItem("resultPokemon", JSON.stringify(pokemonArray[pokemonNumber]));
        resultFlag = true;
        break;
      }
  }
  if (resultFlag == false){
    sessionStorage.setItem("resultPokemon", JSON.stringify(pokemonArray[0]));
  }


  window.location.href = 'results.html';
  // alert(JSON.parse(sessionStorage.getItem("answerArray")));

}

function showResults(){
  let resultPokemon = JSON.parse(sessionStorage.getItem("resultPokemon"));
  // alert(resultPokemon.fields.pokemon);
  document.getElementById('response').innerHTML = resultPokemon.fields.pokemon + '!';
  document.getElementById("responseImage").src = resultPokemon.fields.image;
  document.getElementById("personality").innerHTML = resultPokemon.fields.Personality;

}




// storing the variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');


function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }
