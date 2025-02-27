gsap.registerPlugin(ScrollTrigger);

const animationBreakpoint = 767;
const vh = window.innerHeight;
let footerScrollTriggerObj;
const footerTimeline = gsap.timeline();

$(document).ready(function (){
    console.log('ready')
    if (window.innerWidth > animationBreakpoint) {
        //initScrollAnimations()
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
        end: "+=200%",
        scrub: 1.5,
        anticipatePin: 1,
        pinSpacing: false,
        animation: footerTimeline,
        invalidateOnRefresh: true,
        markers: true
    });

    function addFooterAnimation() {
        footerTimeline.fromTo('[data-js="footerText"]', {
            right: '-120%',
        }, {
            right: "30%",
            duration: 1,
            ease: "none",
            onComplete: () => {
                console.log("text")
            },
            onUpdate: () => {
                console.log("text updt")
            }
        }, "0")

        footerTimeline.fromTo('[data-js="footerMenu"]', {
            x: '120%',
        }, {
            x: "0",
            duration: 0.1,
            ease: "none",
            onComplete: () => {
                console.log("menu")
            },
            onUpdate: () => {
                console.log("menu updt")
            }
        }, ">-=0.2");
    
    }

}