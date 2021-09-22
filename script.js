// SELLECTORS
const playButton = document.querySelector('.btn');
const pageContainer = document.querySelector('.page-container');
const choices = document.querySelectorAll('.choice');
const pages = document.querySelectorAll('.page');
const pageLength = pages.length;
const timer = document.querySelector('.timer');
const score = document.querySelector('.score');

let activePage = 0;
let currentScore;
let min = 0;
let sec = 0;

// EVENT LISTENERS
playButton.addEventListener('click', moveToNextPage);
choices.forEach(choice => {
  choice.addEventListener('click', (e) => {moveToNextPage(); playGame(e)}, true)
})

// FUNCTIONS
// transition pages
function moveToNextPage () {
  const pageHeight = pageContainer.clientHeight;
  activePage++
  pageContainer.style.transform = `translateY(-${activePage * pageHeight}px)`
}

function playGame(e) {

  // if it's a start.
  if ( pages[2].lastElementChild.tagName !== 'IMG' ) {
    currentScore = -1;

    setInterval(runtime, 1000);
    generateInsect(e.currentTarget.lastElementChild.src)
  } else {
    // if it has been already started.
    e.target.style.transform = 'scale(0.1)'
    setTimeout(() => {e.target.remove()}, 500);
    generateInsect(e.target.src)
    generateInsect(e.target.src)

    // when the score hits 20
    if ( currentScore === 19 ) {
      const message = document.querySelector('.message');
      message.style.display = 'block';
    }
  }

  // add points by 1
  updateScore()
  score.innerHTML = `Score: ${currentScore}`

  // click event listner for catching insect
  setTimeout(() => {
    document.querySelectorAll('.insect-img').forEach(img => 
    img.addEventListener('click', playGame))
  }, 500)
}

// generate insect images
function generateInsect(image) {
  const img = document.createElement('img');
  img.className = 'insect-img';
  img.src = `${image}`;
  img.style.top = `${randomNumber()}vh`;
  img.style.left = `${randomNumber()}vw`;
  img.style.transform = `rotate(${randomNumber()*4}deg)`;

  setTimeout(() => {
    pages[2].appendChild(img);
  }, 500);
}

// generate random number for the position of the image
function randomNumber() {
  return Math.random() * 90;
}

// add points by 1
function updateScore() {
  return currentScore++;
}

// set runtime
function runtime() {
  if (sec === 59) {
    min++;
    sec = 0;
  } else {
    sec++;
  }
  timer.innerHTML = `Time: ${min.toLocaleString(undefined, {minimumIntegerDigits:2})}:${sec.toLocaleString(undefined, {minimumIntegerDigits:2})}`;
}