let compScore = 0; // Computer score
let yourScore = 0; // User score

// Hand object library
const handOptions = {
    "stone": '<div class="hand stone user"><img src="/stone.png"></div>',
    "scissor": '<div class="hand scissor user"><img src="/scissor.png"></div>',
    "paper": '<div class="hand paper user"><img src="/hand.png"></div>'
}

// Pick user hand
const pickUserHand = (hand) => {
    console.log(hand);
    let hands = document.querySelector(".hands");
    hands.style.display = "none";
    let contest = document.querySelector(".contest");
    contest.style.display = "flex";  
    // Set the user's picked hand
    contest.querySelector(".userhand .handImageContainer").innerHTML = handOptions[hand];
    pickComputerHand(hand); // Pass user's hand to pickComputerHand function
}

// Pick user hand
const pickComputerHand = (userHand) => {
    let hands = ["stone", "scissor", "paper"];
    let cpHand = hands[Math.floor(Math.random() * 3)];
    console.log("cpHand", cpHand);  
    // Set the computer's picked hand
    document.querySelector(".contest .computerhand .handImageContainer").innerHTML = handOptions[cpHand];  
    referee(userHand, cpHand); // Call referee function with user's and computer's hand
}

// Winner determine
const referee = (userHand, cpHand) => {
    let decision = ""; 
    if (userHand === cpHand) {
        decision = "TIE UP!";
    } else if ((userHand === "paper" && cpHand === "scissor") ||
               (userHand === "stone" && cpHand === "paper") ||
               (userHand === "scissor" && cpHand === "stone")) {
        decision = "YOU LOSE!";
        compScore++; 
    } else {
        decision = "YOU WIN!";
        yourScore++; 
    }
    setDecision(decision);
    updateScoreboard(); 
}

// Update the decision
const setDecision = (decision) => {
    document.querySelector(".referee .decision h1").innerText = decision; // Update the referee's decision
}

// Update the score on the scoreboard
const updateScoreboard = () => {
    document.getElementById("compScore").querySelector("h1").innerText = compScore; 
    document.getElementById("yourScore").querySelector("h1").innerText = yourScore; 

     // Show "NEXT" button 
     const nextBtn = document.querySelector(".nextBtn");
    const hurraySection = document.querySelector(".hurray");
    if (yourScore > compScore && hurraySection.style.display === "none") {
        nextBtn.style.display = "block";
    } else {
        nextBtn.style.display = "none";
    }
}

// Hide wrapper section
const hideWrapper = () => {
    
    document.querySelector(".wrapper .contest").style.display = "none";
    document.querySelector(".wrapper .scoreboard").style.display = "none";
    document.querySelector(".wrapper .hands").style.display = "none";

    // Show the Hurray section
    showHurray();
}

// Show the Hurray section

const showHurray = () => {
    document.querySelector(".hurray").style.display = "block";
    const nextBtn = document.querySelector(".nextBtn");
    nextBtn.style.display = "none"; 
}

// Hide section
const hideHurray = () => {
    document.querySelector(".hurray").style.display = "none";
}

// Reset the game
const resetGame = () => {    
    // Reset hand images
    document.querySelector(".userhand .handImageContainer").innerHTML = "";
    document.querySelector(".computerhand .handImageContainer").innerHTML = ""; 
    // Show hands section
    document.querySelector(".hands").style.display = "flex";
    // Hide contest section
    document.querySelector(".contest").style.display = "none";
    
    updateScoreboard(); // Update the scoreboard after resetting the game
    setDecision(""); // Reset the referee's decision    
}

// Initialize scoreboard with initial scores (0)
updateScoreboard();

// Add event listener to "Play Again" button
const playAgainButton = document.querySelector(".newGame");
playAgainButton.addEventListener("click", resetGame);

// Add event listener to "Play Again" button in Hurray section
const playAgainHurrayButton = document.querySelector(".hurray .newGame");
playAgainHurrayButton.addEventListener("click", () => {
    resetGame();
    hideHurray();
    // Show game area alongside the scoreboard
    document.querySelector(".wrapper .scoreboard").style.display = "flex";
});

// Add event listener to "NEXT" button
const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", hideWrapper);

// Get the rule section and cross button
const rulesSection = document.querySelector('.rules');
const crossButton = document.querySelector('.cross');
const showRulesButton = document.getElementById('showRules');

// Function to show the rules section
function showRules() {
    rulesSection.style.display = 'block';
    crossButton.style.display = 'block'; // Show the cross button
}

// Function to hide the rules section
function hideRules() {
    rulesSection.style.display = 'none';
    crossButton.style.display = 'none'; // Hide the cross button
}

// Add click event listener for showing rules
showRulesButton.addEventListener('click', showRules);

// Add click event listener for hiding rules
crossButton.addEventListener('click', hideRules);

