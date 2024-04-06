const countdown = document.querySelector('.countdown');
const targetDate = new Date('2024-06-06T14:30:00');
setInterval(updateCountdown, 1000);
 
function updateCountdown() {
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

const helpers = {
  mm: undefined,
  sumArrayItems: (array, itemsToSum) => {
    return array.slice(0, itemsToSum).reduce((acc, val) => acc + val, 0)
  },
}

const pinSameHeightSections = () => {  
  document.querySelectorAll('.section--pinned').forEach((section) => {
    const itemsAmount = section.querySelectorAll('.item').length
    const itemHeight = (section.querySelectorAll('.item')[0].offsetHeight / window.innerHeight) * 100
    const overlap = 5
    const padding = 9
    const endValue = itemHeight + ((itemsAmount - 1) * overlap) + (padding * 2)

    ScrollTrigger.create({
      end: `100% ${endValue}%`,
      endTrigger: section,
      pin: true,
      pinSpacing: false,
      start: `0 ${padding}%`,
      trigger: section.querySelector('.column--left > div'),
    })

    ScrollTrigger.create({
      end: `100% ${endValue}%`,
      endTrigger: section,
      pin: true,
      pinSpacing: false,
      start: `0 ${padding}%`,
      trigger: section.querySelector('.column--center > div'),
    })

    section.querySelectorAll('.item').forEach((item, index) => {
      ScrollTrigger.create({
        end: `100% ${endValue}%`,
        endTrigger: section,
        onEnter: () => helpers.setMarker(section, index),
        onLeaveBack: () => helpers.setMarker(section, index === 0 ? index : index - 1),
        pin: true,
        pinSpacing: false,
        start: `0 ${padding + index * overlap}%`,
        trigger: item,
      })
    })
  })
}

const hero = {
    element: document.querySelector('.hero'),
    titles: document.querySelectorAll('.hero_title_row_text'),
    media: document.querySelectorAll('.hero_media'),
    mediaImages: document.querySelectorAll('.hero_media_image')
};

const init = ()=> {
    gsap.set(hero.titles, {autoAlpha: 0, yPercent: -101});
    gsap.set(hero.media, {autoAlpha: 0, xPercent: -100, yPercent: -25});
    gsap.set(hero.mediaImages, {xPercent: -100});
    gsap.set('.hero_title_row:nth-child(3)', {xPercent: -50, x: 'unset'});
    animateHero();
    initFadeInAnimation();
    updateCountdown();
    pinSameHeightSections();
}

const animateHero = ()=> {
    const tl = gsap.timeline({defaults:{duration: 5, ease: 'expo.inOut'}});
    tl.to(hero.media, {xPercent: 0, autoAlpha: 1}, 0)
    .to(hero.mediaImages, {xPercent: 0, stagger: 0.016}, 0.16)
    .to(hero.titles, {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
    .to(hero.media, {yPercent: 0}, 2)
}

window.addEventListener('load', init)