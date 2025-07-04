'use strict';
// slect element
// selecting by queryslector
const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const score0El=document.querySelector('#score--0');
const score1El=document.getElementById("score--1");       //selecting by id
const current0El=document.getElementById("current--0");
const current1El=document.getElementById("current--1");

const diceEl=document.querySelector(".dice");
const btnNew=document.querySelector(".btn--new");
const btnRoll=document.querySelector(".btn--roll");
const btnHold=document.querySelector(".btn--hold");

let playing, activePlayer,currentScore,scores;
function init(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
}

init();

score0El.textContent=0;
score1El.textContent=0;

const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currentScore=0;
        activePlayer=activePlayer===0 ? 1:0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function(){
    if(playing){
    // generate a random number
    let dice=Math.trunc(Math.random()*6)+1;

    //select the dice according tpo random number
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${dice}.png`;

    //checked for roll 1:  

    if(dice!==1){
        //add the dice in current score
        currentScore +=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        //current0El.textContent=currentScore; selecting element directly
    } else{
        //switch to next player
        switchPlayer();
    }
}
})

btnHold.addEventListener('click',function(){
    if(playing){
    // adding current score to active player score
    
    scores[activePlayer] +=currentScore;
    document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

    //if more than 100 then win
    if(scores[activePlayer]>=50){
        playing=false;
        diceEl.classList.add('hidden');
        //finish the game
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }else{
        //switch player
    
        switchPlayer();

    }
    }

})

btnNew.addEventListener('click',init);
