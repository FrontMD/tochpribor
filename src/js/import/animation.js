
gsap.registerPlugin(ScrollTrigger);
let footerScrollTriggerObj;
let footerTimeline = gsap.timeline();

$(document).ready(function (){
    const animationBreakpoint = 767;

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
    
    const topOffset = window.innerWidth > 1420 ? '80px' : '61px';

    addFooterAnimation()
    footerScrollTriggerObj = ScrollTrigger.create({
        trigger: '[data-js="siteFooter"]',
        pin: true,
        start: () => "top " + topOffset,
        end: "+=250%",
        scrub: 2,
        anticipatePin: 1,
        animation: footerTimeline,
        invalidateOnRefresh : true,
        markers: true
    });

    function addFooterAnimation() {
        const vw = window.innerWidth

        if(vw > 1800) {
            footerTimeline.fromTo('[data-js="footerLeft"]', {
                opacity: '1',
            }, {
                opacity: "1",
                duration: 0.1,
                ease: "none",
            }, "<-=1")
    
            footerTimeline.fromTo('[data-js="footerText"]', {
                right: '-120%',
            }, {
                right: "30%",
                duration: 1,
                ease: "none",
            }, "<-=2")
    
            footerTimeline.fromTo('[data-js="footerMenu"]', {
                x: '120%',
            }, {
                x: "0",
                duration: 0.3,
                ease: "none",
            }, ">-=0.3")

        } else if(vw > 1160){
            footerTimeline.fromTo('[data-js="footerleft"]', {
                opacity: '1',
            }, {
                opacity: "1",
                duration: 0.1,
                ease: "none",
            }, "<-=1")
    
            .fromTo('[data-js="footerText"]', {
                right: '-180%',
            }, {
                right: "41%",
                duration: 1,
                ease: "none",
            }, "<-=2")
    
            footerTimeline.fromTo('[data-js="footerMenu"]', {
                x: '120%',
            }, {
                x: "0",
                duration: 0.3,
                ease: "none",
            }, ">-=0.3")
        }  else if(vw > 1023) {
            footerTimeline.fromTo('[data-js="footerleft"]', {
                opacity: '1',
            }, {
                opacity: "1",
                duration: 0.1,
                ease: "none",
            }, "<-=1")
    
            .fromTo('[data-js="footerText"]', {
                right: '-240%',
            }, {
                right: "45%",
                duration: 1,
                ease: "none",
            }, "<-=2")
    
            footerTimeline.fromTo('[data-js="footerMenu"]', {
                x: '120%',
            }, {
                x: "0",
                duration: 0.3,
                ease: "none",
            }, ">-=0.3")
        } else if(vw > 767) {
            footerTimeline.fromTo('[data-js="footerleft"]', {
                opacity: '1',
            }, {
                opacity: "1",
                duration: 0.1,
                ease: "none",
            }, "<-=1")
    
            .fromTo('[data-js="footerText"]', {
                right: '-115%',
            }, {
                right: "65%",
                duration: 1,
                ease: "none",
            }, "<-=2")
    
            footerTimeline.fromTo('[data-js="footerMenu"]', {
                x: '120%',
            }, {
                x: "0",
                duration: 0.3,
                ease: "none",
            }, ">-=0.3")
        }

    
    }

}