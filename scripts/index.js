const countdown = document.querySelector('.countdown');
const targetDate = new Date('2024-06-06T14:30:00');
 
function updateCountdown() {
  setInterval(updateCountdown, 1000);
  const now = new Date();
  const remainingTime = targetDate - now;
 
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
 
  document.getElementById('days').innerText = days.toString().padStart(2, '0');
  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

gsap.registerPlugin(ScrollTrigger);
const initFadeInAnimation = () => {
    const fadeElements = document.querySelectorAll(".fade-in");
    fadeElements.forEach((element) => {
      gsap.set(element, { opacity: 0, y: 100, duration: 1, });
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });
    });
}

const hero = {
    element: document.querySelector('.hero'),
    titles: document.querySelectorAll('.hero_title_row_text'),
    media: document.querySelectorAll('.hero_media'),
    mediaImages: document.querySelectorAll('.hero_media_image'),
    albumMedia: document.querySelectorAll('.album_media'),
    albumMediaImages: document.querySelectorAll('.album_media_image')
};

const init = ()=> {
    var preloader = document.getElementById('preloader');
    var popUp = document.getElementById('popUp');
    preloader.style.display = 'none';
    if (document.title == 'Приглашение на свадьбу') {
      popUp.style.display = 'flex';
    }
    else if (document.title == 'Свадебный альбом') {
      continue_();
    }
}

const continue_ = ()=> {
  var popUp = document.getElementById('popUp');
  var mainContent = document.getElementById('mainContent');
  if (document.title == 'Приглашение на свадьбу') {
    popUp.style.display = 'none';
    mainContent.style.display = 'block';
    gsap.set(hero.titles, {autoAlpha: 0, yPercent: -101});
    gsap.set(hero.media, {autoAlpha: 0, xPercent: -100, yPercent: -25});
    gsap.set(hero.mediaImages, {xPercent: -100});
    updateCountdown();
  }
  else if (document.title == 'Свадебный альбом') {
    gsap.set(hero.titles, {autoAlpha: 0, yPercent: -101});
    gsap.set(hero.albumMedia, {autoAlpha: 0, xPercent: -100, yPercent: -15});
    gsap.set('.album_media_wrapper:nth-child(2)', {yPercent: -80, x: 'unset'});
    gsap.set('.album_media_wrapper:nth-child(3)', {yPercent: -160, x: 'unset'});
    gsap.set('.album_media_wrapper:nth-child(4)', {yPercent: -240, x: 'unset'});
    gsap.set(hero.albumMediaImages, {xPercent: -50});  
  }
  gsap.set('.hero_title_row:nth-child(3)', {xPercent: -50, x: 'unset'});
  animateHero();
  initFadeInAnimation();
}

const animateHero = ()=> {
  const tl = gsap.timeline({defaults:{duration: 5, ease: 'expo.inOut'}});
    if (document.title == 'Приглашение на свадьбу') {
      tl.to(hero.media, {xPercent: 0, autoAlpha: 1}, 0)
      .to(hero.mediaImages, {xPercent: 0, stagger: 0.016}, 0.16)
      .to(hero.titles, {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
      .to(hero.media, {yPercent: 0}, 2)
    }
    else if (document.title == 'Свадебный альбом') {
      tl.to(hero.albumMedia, {xPercent: 0, autoAlpha: 1}, 0)
      .to(hero.albumMediaImages, {xPercent: 0, stagger: 0.016}, 0.16)
      .to(hero.titles, {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2.5)
      .to(hero.albumMedia, {yPercent: 0}, 2)
      .to('.album_media_wrapper:nth-child(2)', {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
      .to('.album_media_wrapper:nth-child(3)', {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
      .to('.album_media_wrapper:nth-child(4)', {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
    }
}

function copyTextArtem() {
    navigator.clipboard.writeText("+79128000198");
    alert("Номер телефона скопирован");
}
function copyTextSabina() {
    navigator.clipboard.writeText("+79226761470");
    alert("Номер телефона скопирован");
}

window.addEventListener('load', init)