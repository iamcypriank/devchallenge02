//ui-logic

let coinFlipBtnEl = document.querySelector('.flip-btn');
coinFlipBtnEl.addEventListener('click',function(e){
    let coin = document.querySelector('#coin');
    coin.classList.toggle('coin-active');
    setTimeout(()=>{
        coin.classList.toggle('coin-active');
        if(game.flip()=='heads'){
            coin.setAttribute('src','resources/heads.svg');
            document.querySelector('p.result').textContent='Heads';
        }else{
            coin.setAttribute('src','resources/tails.svg');
            document.querySelector('p.result').textContent='Tails';
        }
    },500);
    
});



//logic-part
let game ={
    result :  ['heads','tails'],
    flip : function(){
        return  this.result[Math.floor(Math.random()*2)];
    }
}
