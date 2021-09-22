# Insect Catch Game

![screen recording](https://media.giphy.com/media/w7yZiaIn95JhbL7rsI/giphy.gif?cid=790b76115e07ff20e0337a3df44f4bbeac48668b890b7a7a&rid=giphy.gif&ct=g)

## project notes

1. HTML

- h1: Catch The Insect
- button: Play Game
  =>
- h1: What is your "favorite" insect?
- in div
  Fly image
  Mosquito image
  Spider image
  Roach image
  =>
- Time: on the left top
  Score: on the right top
  insect image
- click
  generate the insect image \* 2
- when Score hits 20
  p: Are you anoyed yet?
  You are playing an impossible game!!

2. CSS

3. JavaScript

- click event listner
- transition pages
- random rotation image

---

Challenge from Brad Traversy & Florin Pop on Udemy '50 Projects in 50 Days'

---

## Takeaways from the instructor

1. HTML

- ul for insects-list
- li >button for individual insect

2. CSS

- btn:hover
- .screen.up {
  margin-top: -100vh;
  }
- .choose-insect-btn:active {
  background-color: rgba(255,255,255,0.7);
  }
- timer, score position: absolute
- .message {
  opacity: 0;
  left: 50%;
  transform: translate(-50%, -150%);
  transition: transform 0.4s ease-in;
  }
  .message.visible {
  transform: translate(-50%, 150%);
  opacity: 1;
  }

3. JavaScript

```


const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
let seconds = 0;
let score = 0;
let selected_insect = {};

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    selected_insect = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createInsect, 1000);
    startGame();
  })
})

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y} = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)">`

  insect.addEventListener('click', catchInsect);
  game_container.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x , y };
}

function catchInsect() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if ( score > 19 ) {
    message.classList.add('visible');
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
```
