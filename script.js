//Define the variables
let sumText = document.getElementById("sum")
let dealerSumText = document.getElementById("dealerSum")
let greeting = document.getElementById("greeting")
let score = document.getElementById("score")
let cardLeft = document.getElementById("cardLeft")
let startButton = document.getElementById("startButton")
let cardButton = document.getElementById("cardButton")
let noButton = document.getElementById("no")
let newGame = document.getElementById("newGame")
let roundButton = document.getElementById(`newRound`)
let cards = []
let playerCards = []
let dealerCards = []
let playerScore = 0;
let dealerScore = 0;
let randomIndex;
let dealerRandom;
let sum;
let sumDealer;
let yesCount = 2;
let dCount = 2;
let dCards = []
let pCards = []

//Set unnecessary buttons as disabled
cardButton.disabled = true
noButton.disabled = true
roundButton.disabled = true

//Create function to start game
function startGame(){
    //Set necessary buttons as enabled
    cardButton.disabled = false
    noButton.disabled = false
    //Define variables to select random numbers for Dealer and Player
    dealerRandom = Math.floor(Math.random() * cards.length)
    randomIndex = Math.floor(Math.random() * cards.length)
    //Create a loop for deal cards and remove cards which are used
    for (let i = 0 ; i < 2 ; i++)
    {
        dealerCards.push(cards[dealerRandom])
        playerCards.push(cards[randomIndex])
        //Show the picture of selected cards to Player
        pCards[i].src = `cards/${cards[randomIndex]}.jpg`
        dCards[i].src = `cards/${cards[dealerRandom]}.jpg`
        cards.splice(dealerRandom, 1)
        cards.splice(randomIndex, 1)
    }
    //Show just one card of dealer
    dCards[1].hidden = true
    //Change greeting message to ask if user wants a card
    greeting.textContent = "Want to draw a card?"
    //Create conditional statements to check is there any joker, king or queen. If there is, add 10; if there isn't just add numbers
    if (playerCards[0] === 11 || playerCards[0] === 12 || playerCards[0] === 13)
    {
        sum = playerCards[1] + 10
        if (playerCards[1] === 11 || playerCards[1] === 12 || playerCards[1] === 13)
        {
            sum = 20
        }
    }
    else if(playerCards[1] === 11 || playerCards[1] === 12 || playerCards[1] === 13)
    {
        sum = playerCards[0] + 10
        if (playerCards[0] === 11 || playerCards[0] === 12 || playerCards[0] === 13)
        {
            sum = 20
        }
    }
    else
    {
        sum = playerCards[0] + playerCards[1]
    }
    //If there is ace and sum isn't over 21, let ace as 11.
    if ((sum + 10) <= 21)
    {
        if (playerCards[0] === 1 || playerCards[1] === 1)
        {
            sum += 10
        }
    }
    //Print sum
    sumText.textContent = `Sum: ${sum}`
    //If there is blackjack, run the no function
    if(sum === 21)
    {
        no()
    }
    else
    {
        greeting.textContent = "Want to draw a card?"
    }
    //Print how many card left
    cardLeft.textContent = `Total ${cards.length} card left`

    //If cards are out, end game. Set buttons as disabled
    if (cards.length <= 0)
    {
        cardButton.disabled = true
        startButton.disabled = true
        noButton.disabled = true
        roundButton.disabled = true
        newGame.disabled = false

    }

    startButton.disabled = true
}

function yes() {
    //Define variables to select random numbers if Player wants a card
    randomIndex = Math.floor(Math.random() * cards.length)
    //Give one card to Player and remove the card from cards list
    playerCards.push(cards[randomIndex])
    cards.splice(randomIndex, 1)
    //Show the picture of selected card to user
    pCards[yesCount].src = `cards/${cards[randomIndex]}.jpg`
    //Add one to yesCount for select cards from pictures
    yesCount += 1
    //Show how many card left
    cardLeft.textContent = `Total ${cards.length} card left`
    //Create conditional statements to check is there any joker, king or queen. If there is, add 10; if there isn't just add numbers
    if (cards[randomIndex] === 11 || cards[randomIndex] === 12 || cards[randomIndex] === 13)
    {
        sum += 10
    }
    else
    {
        sum += cards[randomIndex]
    }
    if ((sum + 10) <= 21)
    {
        if (playerCards[0] === 1 || playerCards[1] === 1)
        {
            sum += 10
        }
    }
    //Print sum
    sumText.textContent = `Sum: ${sum}`
    //If sum is over 21. Run the no function and add one to Dealer Score
    if (sum > 21)
    {
        greeting.textContent = "You crashed. Want to play new round?"
        cardButton.disabled = true
        newGame.disabled = false
        no()
    }
    //If there is blackjack. Run the no function
    else if(sum === 21)
    {
        cardButton.disabled = true
        newGame.disabled = false
        no()
    }
    else
    {
        greeting.textContent = "Want to draw a card?"
    }
    //If cards are out, end game. Set buttons as disabled
    if (cards.length <= 0)
    {
        cardButton.disabled = true
        startButton.disabled = true
        noButton.disabled = true
        roundButton.disabled = true
        newGame.disabled = false

    }
}

//Create no function to if Player lose or there is blackjack
function no(){
    //Show the dealer's second card
    dCards[1].hidden = false
    //Set new round button as enabled
    roundButton.disabled = false
    //Define a random number to deal a random card to Dealer
    dealerRandom = Math.floor(Math.random() * cards.length)
    //Create conditional statements to check is there any joker, king or queen. If there is, add 10; if there isn't just add numbers
    if (dealerCards[0] === 11 || dealerCards[0] === 12 || dealerCards[0] === 13)
    {
        sumDealer = dealerCards[1] + 10
        if (dealerCards[1] === 11 || dealerCards[1] === 12 || dealerCards[1] === 13)
        {
            sumDealer = 20
        }
    }
    else if(dealerCards[1] === 11 || dealerCards[1] === 12 || dealerCards[1] === 13)
    {
        sumDealer = dealerCards[0] + 10
        if (dealerCards[0] === 11 || dealerCards[0] === 12 || dealerCards[0] === 13)
        {
            sumDealer = 20
        }
    }
    else
    {
        sumDealer = dealerCards[0] + dealerCards[1]
    }
    //If there is ace and sum is not over 21, let ace as 11
    if ((sumDealer + 10) < 17)
    {
        if (dealerCards[0] === 1 || dealerCards[1] === 1)
        {
            dealerCards.push(cards[dealerRandom])
            cards.splice(dealerRandom, 1)
            //Show dealer's new card
            dCards[dCount].src = `cards/${cards[dealerRandom]}.jpg`
            dCount += 1
            sumDealer += cards[dealerRandom]
            sumDealer += 10
        }
    }
    //If sum of Dealer cards is less than 17, deal a card to Dealer
    while (sumDealer < 17)
    {
        //Deal a card to Dealer and remove that card from cards list
        dealerCards.push(cards[dealerRandom])
        cards.splice(dealerRandom, 1)
        if (cards[dealerRandom] === 11 || cards[dealerRandom] === 12 || cards[dealerRandom] === 13)
        {
            sumDealer += 10
        }
        else
        {
            sumDealer += cards[dealerRandom]
        }
        //Show dealer's new card
        dCards[dCount].src = `cards/${cards[dealerRandom]}.jpg`
        dCount += 1
    }
    //Decide who will win
    if (sumDealer > 21 && sum > 21)
    {
        playerScore += 0
        dealerScore += 0
    }
    else if(sumDealer > 21 && sum <= 21)
    {
        playerScore += 1
    }
    else if(sumDealer <= 21 && sum > 21)
    {
        dealerScore += 1
    }
    else if(sumDealer >= sum)
    {
        dealerScore += 1
    }
    else if(sum === 21 && sumDealer !== 21)
    {
        greeting.textContent = "Blackjack. Want to play new round?"
        playerScore += 1
    }
    else if((sumDealer && sum) === 21)
    {
        greeting.textContent = "Two Blackjack. Dealer won. Want to play new round?"
        dealerScore += 1
    }
    else
    {
        playerScore += 1
    }
    //Print the scores
    score.textContent = `Total Score: Dealer [ ${dealerScore} ] - [ ${playerScore} ] You`
    //Print the sum of Dealer
    dealerSumText.textContent = `Dealer Sum: ${sumDealer}`
    //Set unnecessary buttons as disabled
    noButton.disabled = true
    cardButton.disabled = true
    dCount = 2
    //If cards are out, end the game
    if (cards.length <= 0)
    {
        cardButton.disabled = true
        startButton.disabled = true
        noButton.disabled = true
        roundButton.disabled = true
        newGame.disabled = false

    }
}

//Create a function to start new round
function newRound(){
    //Reset dealer's and player's cards
    dealerCards = []
    playerCards = []
    //Reset sum
    sum = 0
    yesCount = 2
    //Reset texts
    dealerSumText.textContent = "Dealer Sum: ?"
    sumText.textContent = "Sum: "

    //Show card's backside at the beginning of each round
    for (let i = 0 ; i < 6 ; i++)
    {
        dCards[i].src = `cards/backside.jpg`
        pCards[i].src = `cards/blueBackside.jpg`
    }

    //Start new round
    startGame()
}

//If game is over and clicked to restart button, restart game
function restartGame(){
    location.reload()
}

//Add cards picture holders
for (let i = 1 ; i < 7 ; i++)
{
    dCards.push(document.getElementById(`dCard${i}`))
    pCards.push(document.getElementById(`pCard${i}`))
}

//Add card's backsides to show at the beginning of each round
for (let i = 0 ; i < 6 ; i++)
{
    dCards[i].src = `cards/backside.jpg`
    pCards[i].src = `cards/blueBackside.jpg`
}

//Add 120 cards to the cards list
for (let i = 1 ; i < 11 ; i++){
    for (let j = 0 ; j < 12 ; j++)
    {
        cards.push(i)
    }
}

//Add 12 joker, 12 king and 12 queen to the cards list
for (let i = 0 ; i < 12 ; i++)
{
    cards.push(11)
    cards.push(12)
    cards.push(13)

}

//Shuffle cards
for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]
}
