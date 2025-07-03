//datasets
 const words = [
    "apple", "brave", "crane", "doubt", "eagle", "frost", "giant", "happy", "index", "joker",
    "knife", "lemon", "magic", "noble", "ocean", "piano", "queen", "raven", "scale", "tiger",
    "unity", "vital", "wheat", "xenon", "yield", "zebra", "angry", "blush", "candy", "dance",
    "eager", "flame", "grape", "haste", "ivory", "jelly", "karma", "light", "mango", "nasty",
    "orbit", "peace", "quiet", "royal", "sword", "tulip", "urban", "vixen", "whale", "xylem",
    "young", "zesty", "admit", "beach", "clear", "drama", "entry", "fable", "glide", "honor",
    "issue", "judge", "kiosk", "lunar", "motel", "novel", "oxide", "proud", "quilt", "risky",
    "siren", "trust", "uncle", "vapor", "wound", "xenon", "yearn", "zonal", "alien", "bison",
    "cheer", "ditch", "elope", "froze", "grind", "hover", "icing", "jumpy", "kayak", "latch",
    "mirth", "nerdy", "oxide", "proxy", "query", "rider", "smile", "tease", "ultra", "vouch"
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
    return word.split('').sort(() => Math.random() - 0.5).join(''); 
  } ,
  check : function(input){
    input = input.toLowerCase();
    this.lives--;
    if(input==this.word){
      return 'you won';
    }else{
      if(this.lives==0){
        this.reset();
        return 'you lost';
      }
      
      const wrongWords = [];
      input.split('').forEach((letter)=>{
        if(!this.word.includes(letter)){
          wrongWords.push(letter);
        }
      });
      return wrongWords;
    }
  },
  getLives : function(){
    return this.lives;
  } ,
  reset : function(){
    this.lives = 0;
    this.word = '';
    console.log('reset done!');
  }
}









//ui logic
const gameBoardEl = document.querySelector('.game-board');
const startBtnEl = document.querySelector('.start-btn');
let word ='      ';

startBtnEl.style.display = 'none';
renderGame();


//renders game-board!
function renderGame(){
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
    // game.reset();


        
} 



















