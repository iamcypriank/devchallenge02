//datasets
const words = [
  "banana", "guitar", "pickle", "kitten", "button", "marvel", "puzzle", "jumper",
  "breeze", "planet", "rocket", "candle", "bubble", "bungee", "napkin", "snacks",
  "wizard", "goblin", "cactus", "parrot", "school", "monkey", "pillow", "zombie",
  "circus", "doodle", "donuts", "sneeze", "marble", "sprout", "wiggle", "noodle",
  "sprink", "waffle", "gloves", "rabbit", "scooby", "jumble", "tricky", "launch",
  "toybox", "magnet", "colors", "cookie", "castle", "sloppy", "gadget", "funnel",
  "jungle", "cobweb", "crayon", "laptop", "grapes", "bubble", "scoops", "stream",
  "bottle", "friend", "rescue", "bouncy", "cereal", "cheese", "napkin", "orange",
  "dragon", "flight", "splash", "pepper", "clover", "animal", "silver", "jumper",
  "switch", "copper", "scooby", "branch", "ballet", "bounce", "singer", "closet",
  "flight", "tickle", "goblet", "pepper", "sunset", "number", "socket", "glider",
  "fridge", "ribbon", "turkey", "wallet", "quartz", "kitten", "bubble", "saddle"
];




//game logic
const game = {
  lives : 0 ,
  word : '',
  scrambled : '',


    randomWord : function(){
      this.lives = 5;
      this.word = words[Math.floor(Math.random()*words.length)];
      this.scrambled = this.scramble(this.word);
      return this.scrambled;
      
    },



  scramble : function(word){
    let arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  } ,


  check : function(input){
    input = input.toLowerCase();
    this.lives--;
    if(input==this.word){
      return 0;
    }else{
        if(this.lives==0){
        this.reset();
        return -1;
    }
      
      const wrongWords = [];
      const rightWords = [];
      input.split('').forEach((letter)=>{
        if(!this.word.includes(letter)){
          wrongWords.push(letter);
        }else{
          wrongWords.push(' ');
        }
        if(this.word.includes(letter)){
          rightWords.push(letter);
        }else{
          rightWords.push(' ');
        }
      });
      return [wrongWords,rightWords];
    }
  },

  getLives : function(){
    return this.lives;
  } ,

  reset : function(){
    this.lives = 0;
    this.word = '';
    renderGame();
  }
}









//ui logic
const gameBoardEl = document.querySelector('.game-board');
const startBtnEl = document.querySelector('.start-btn');
let userWord ='';




//start game- 1st time
startBtnEl.addEventListener('click',function(e){
  startGame();
})


//starts fresh game
function startGame(){
  game.reset();
  userInput();

  //resets userinput;
  document.querySelector('.reset').addEventListener('click',function(e){
    userWord = '';
    let inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach((input)=>{
      input.value = '';
    })
  });

//generates another random word  or resets/
  document.querySelector('.random').addEventListener('click',function(e){
    startGame();
  });

}



//updates UI
function updateUI(result){

  //updates lives
  if(result==0){

    let text = `
    <div class="result-text-container">
    <p class="result-text">Congrats!</p>
    <p class="result-text">🎉🥳You won!🎉🥳</p>
    <div>`;
    gameBoardEl.innerHTML = text;
    confetti();
    setTimeout(()=>{
      startGame();
    },2000);
    return;
  }else if(result==-1){
    let text = `
    <div class="result-text-container">
    <p class="result-text">｡°(°¯᷄◠¯᷅°)°｡</p>
    <p class="result-text">You lost!</p>
    <div>`;
    gameBoardEl.innerHTML = text;
    setTimeout(()=>{
      startGame();
    },1500);
    return;
  }
  let lives = document.querySelectorAll('.lives');
  let mistakes = document.querySelector('.mistakes');
  lives[game.getLives()].classList.toggle('lost');
  if(result.length==2){
    mistakes.textContent = 'Mistakes : ';
    mistakes.style.display = 'flex';
    let text = '';
    for(let i=0;i<result[0].length;i++){
      text+=`${result[0][i]} `;
    }
    mistakes.textContent = 'Mistakes : '+text;
    mistakes.style.display = 'flex';

  }
  
}



// takes user input 
function userInput(){

  // input elements
  let inputs = document.querySelectorAll('input[type="text"]');

  
  // iterating over each element and adding event listener
  inputs.forEach((input,index)=>{
    // adding event listener
    input.addEventListener('input',function(e){
      //grabbing input
      const letter= input.value;
      //adding the input into string
      userWord+=letter;
      //checking if the word reached length of 6 
      if((userWord.trim()).length===6){
          //if yes checking if the user won and returns the result
          let result = game.check(userWord);
          updateUI(result);
      }
      
      //changing focus of input box once the input box is filled!
      if(letter.length===1 && index < inputs.length-1){
        inputs[index+1].focus();
      }
    })


    //changes focus back to previous input box if backspace clicked
    input.addEventListener('keydown',function(e){

      //checking if backspace is clicked
      if(e.key==='Backspace'){

        //defaulting input value
        input.value='';

        // deleting last word from user input
        userWord = userWord.slice(0,-1);
        //changing focus back to previous box
        if (index > 0) {
            inputs[index - 1].focus();
        }

      }
    })
  })
}


//renders game-board!
function renderGame(){

    //sets start-btn display property to none
    startBtnEl.style.display = 'none';
    gameBoardEl.innerHTML = `
    <div class="board">
                <h1 class="title">Word Scramblle</h1>
                <div class="screen-container">
                    <div class="screen">
                    <h1 class="word"></h1>
                    </div>

                    <div class="status">
                        <div class="tries">
                            <p class="life text">Lives</p>
                            <div class="lives"></div>
                            <div class="lives"></div>
                            <div class="lives"></div>
                            <div class="lives"></div>
                            <div class="lives"></div>
                        </div> 
                        <div class="mistakes text"> Mistakes :  </div>
                     </div>
                </div>
                
                <form action="" class="guess">
                    <input type="text" maxlength="1">
                    <input type="text" maxlength="1">
                    <input type="text" maxlength="1">
                    <input type="text" maxlength="1">
                    <input type="text" maxlength="1">
                    <input type="text" maxlength="1">
                </form>

                <div class="button-container">
                    <button class="random">Random</button>
                    <button class="reset">Reset</button>
                </div>
            </div>
    `;
    // reset game before starting
    userWord='';
    game.randomWord();
    document.querySelector('.screen').textContent=game.scrambled;
    

} 



















