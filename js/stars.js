const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is exclusive and the minimum is inclusive
}

//START THE GAME & MUSIC

// audio
let audio = new Audio('../assets/sound/christmasSongs.mp3');
let $startButton = document.querySelector(".start__button");


$startButton.addEventListener("click", function () {
  var game = document.querySelector('.p5Canvas');
  game.style.display = 'inline-block';
  audio.loop = true;
  audio.play();
});






// ANIMATE THE STARS IN THE BACKGROUND
const maxX = window.innerWidth;
const maxY = window.innerHeight
const maxAnimation = 4;
const maxImages = 8;
const numberOfStars = 100;

const $starsHtml = document.querySelector('.stars');

let stars = [];

const createStars = () => {
  for (let i = 0; i < numberOfStars; i++) {
    const size = getRandomNumber(5, 15);
    stars.push(`<img class="starAnimation${getRandomNumber(1, maxAnimation)}" src="assets/img/background/star${getRandomNumber(1, maxImages)}.png" style="left:${getRandomNumber(0, maxX)}px; top: ${getRandomNumber(0, maxY)}px;" alt="background" width="${size}" height="${size}">`)
  }
  stars.forEach(star => {
    $starsHtml.innerHTML += star;
  })


};

createStars();

