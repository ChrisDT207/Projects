'use strict';

const number = Math.trunc(Math.random() * 20)+1;
document.querySelector('.number').textContent = number

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
        document.querySelector('.message').textContent = '🎉 Correct Number!'; 
    }
    else if (guess > number) 
    {
        document.querySelector('.message').textContent = '📈Too high!';    
    }
    else if (guess < number) 
    {
        document.querySelector('.message').textContent = '📉 Too low!'    
    }
});