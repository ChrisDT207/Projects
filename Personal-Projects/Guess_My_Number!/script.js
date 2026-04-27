'use strict';

let number = Math.trunc(Math.random() * 20)+1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function() 
{
    let guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (!guess) 
    {
        document.querySelector('.message').textContent = '⛔ No number!'
    }
    else if (guess === number) 
    {
        document.querySelector('.number').textContent = number
        document.querySelector('.message').textContent = '🎉 Correct Number!'; 
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        
        if (score > highscore) 
        {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;    
        }
    }
    else if (guess !== number) 
    {
      if (score > 1) 
        {
            document.querySelector('.message').textContent = guess > number ? '📈Too high!' : '📉 Too low!';  
            score--; 
            document.querySelector('.score').textContent = score;    
        }
        else
        {
            document.querySelector('.message').textContent = '💥 You lost the game!'
            document.querySelector('.score').textContent = 0
        }      
    }
});

document.querySelector('.again').addEventListener('click', function () 
{
    score = 20;
    number = Math.trunc(Math.random() * 20)+1;
    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem'
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222'
});