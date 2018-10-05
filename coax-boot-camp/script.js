const imgStore = [
  'https://images.pexels.com/photos/1275929/pexels-photo-1275929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=9060',
  'https://images.pexels.com/photos/1451074/pexels-photo-1451074.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=450&w=560',
  'https://images.pexels.com/photos/1460880/pexels-photo-1460880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=200',
  'https://images.pexels.com/photos/1437629/pexels-photo-1437629.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=500',
  'https://images.pexels.com/photos/87284/ocean-seacoast-rocks-water-87284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=426&w=400',
  'https://images.pexels.com/photos/885880/pexels-photo-885880.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=150&w=1260',
  'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

let interval;
let timer;
let shuffleStore = [];
let len;
let timeD = 10000;
let timeI = 5000;
let width;
let height;
let i;
let img;
let delayValue;
let intervalValue;

let winWidth = window.innerWidth - 50;
let winHeight = window.outerHeight - 150;

let root = document.getElementById('root');
let option = document.getElementById('option');
let submitBtn = document.getElementById('btn');


const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};


const appendImg = (time) => {
  option.style.display = 'none';
  img = document.createElement('img');
  shuffleStore = shuffle(imgStore.slice());
  len = shuffleStore.length - 1;
  i = 0;
  img.src = shuffleStore[i];
  root.appendChild(img);
  interval = setInterval(slider, time)
  imgDidMount()
};


const slider = () => {
  if (img !== undefined) {
    rm(img)
  }
  const appendSlider = () => {
    img = document.createElement('img');
    i === len ? i = 0: i++
    img.src = shuffleStore[i];
    root.appendChild(img);
    imgDidMount();
  }
  setTimeout(appendSlider, 600)
};


const imgDidMount = () => img.onload = () => {
  fadeIn(img)
  width = img.naturalWidth
  height = img.naturalHeight
  if (height >= winHeight) {
    img.style.height = winHeight;
    img.style.top = 25
  }
  else {
    img.style.top = Math.floor(Math.random() * ((winHeight - img.height) - 25) + 25);
  }
  if (width >= winWidth) {
    img.style.width = winWidth;
  }
  img.style.left = Math.floor(Math.random() * ((winWidth - img.width) - 25) + 25 );
};


const fadeIn = (el) => {
    let fadeEffect = setInterval(() => {
        if (el.style.opacity < 1) {
          let numOp = +el.style.opacity
          numOp += 0.2;
          el.style.opacity = numOp
        } else {
          clearInterval(fadeEffect);
        }
    }, 50);
};


const fadeOut = (el) => {
    let fadeEffect = setInterval(() => {
        if (el.style.opacity > 0) {
          let numOp = +el.style.opacity
          numOp -= 0.2;
          el.style.opacity = numOp
        } else {
          clearInterval(fadeEffect);
        }
    }, 50);
};


const runTimer = (time) => {
  timer = setTimeout(appendImg, time, timeI);
}


const manageTimer = () => {
  clearInterval(timer);
  clearInterval(interval);
  if (img !== undefined) {
    rm(img)
  }
  setTimeout(() => { option.style.display = 'flex'; }, 200)
  runTimer(timeD);
}


const rm = (img) => {
  fadeOut(img)
  setTimeout(() => {img.remove()}, 500);
}


const changeOption = () => {
  delayValue = document.getElementById('delay').value;
  intervalValue = document.getElementById('interval').value;
  timeD = delayValue !== '' && delayValue >= 2 ? delayValue * 1000 : 10000;
  timeI = intervalValue !== '' && intervalValue >=2 ? intervalValue * 1000: 5000;
}


document.addEventListener('mousedown', manageTimer)
document.addEventListener('mousemove', manageTimer)
document.addEventListener('keydown', manageTimer)
document.addEventListener('scroll', manageTimer)
submitBtn.addEventListener('mousedown', changeOption)


runTimer(timeD)
