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
    mediaImages: document.querySelectorAll('.hero_media_image')
};

const init = ()=> {
    //alert('Для лучшего погружения, советуем открыть сайт на ПК');
    gsap.set(hero.titles, {autoAlpha: 0, yPercent: -101});
    gsap.set(hero.media, {autoAlpha: 0, xPercent: -100, yPercent: -25});
    gsap.set(hero.mediaImages, {xPercent: -100});
    gsap.set('.hero_title_row:nth-child(3)', {xPercent: -50, x: 'unset'});
    animateHero();
    initFadeInAnimation();
}

const animateHero = ()=> {
    const tl = gsap.timeline({defaults:{duration: 2, ease: 'expo.inOut'}});
    tl.to(hero.media, {xPercent: 0, autoAlpha: 1}, 0)
    .to(hero.mediaImages, {xPercent: 0, stagger: 0.016}, 0.16)
    .to(hero.titles, {autoAlpha: 1, yPercent: 0, stagger: 0.016}, 2)
    .to(hero.media, {yPercent: 0}, 2)
}

window.addEventListener('DOMContentLoaded', init)