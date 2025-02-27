gsap.registerPlugin(ScrollTrigger);

const animationBreakpoint = 767;
const vh = window.innerHeight;
let footerScrollTriggerObj;
let footerTimeline = gsap.timeline();

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > animationBreakpoint) {
        initScrollAnimations()
    }
})

function initScrollAnimations() {
    footerScrollAnimation()    
}

function footerScrollAnimation() {
    const footer = document.querySelector('[data-js="siteFooter"]')

    if(!footer) return
    
    const footerHeight = footer.offsetHeight
    const addTimeFooter = 400;

    footerScrollTriggerObj = ScrollTrigger.create({
        trigger: footer,
        pin: true,
        start: "bottom bottom",
        end: () => "+=" + addTimeFooter + '%',
        scrub: 1.5,
        animation: footerTimeline,
        markers: true
    });

    footerTimeline.fromTo('[data-js="footerText"]', {
        x: '74%',
    }, {
        x: "0",
        duration: 0.6,
        ease: "none",
    }, "0");

    footerTimeline.fromTo('[data-js="footerMenu"]', {
        x: '120%',
    }, {
        x: "0",
        duration: 0.1,
        ease: "none",
    }, ">");

    //пересчёт скроллтриггера после переключения табов
    /*const tabsBlocks = document.querySelectorAll('[data-js="tabsBlock"]');

    if(tabsBlocks.length > 0) {
        tabsBlocks.forEach(tabsBlock => {
            tabsBlock.addEventListener("tabChange", function() {
                console.log(this)
            })
        })
    }*/

}