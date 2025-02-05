console.log(window)
gsap.registerPlugin(ScrollTrigger);

const animationBreakpoint = 767;
const vh = window.innerHeight

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > animationBreakpoint) {
        //initScrollAnimations()
    }
})

function initScrollAnimations() {

    footerScrollAnimation()

    const pageLayout = document.querySelector('[data-js="pageLayout"]')

    if(!pageLayout) return

    const animType = pageLayout.dataset.anim;

    switch(animType) {
        case 'home':
            homeScrollAnimation()
            break
        default:
            break
    }
        
}

function footerScrollAnimation() {
    const footer = document.querySelector('[data-js="siteFooter"]')

    if(!footer) return

    /*const trigger = footer.closest('body').querySelector('.site-main')
    trigger.style.zIndex = '10'
    trigger.style.height = '100vh'
    trigger.style.maxHeigth = '100vh'
    const addTimeFooter = 200;
    const topOffset = (vh - footer.offsetHeight) + 'px'
    console.log(trigger)*/
    
    const footerTimeline = gsap.timeline();
    const pinWrap = document.createElement('div');
    const pin = document.createElement('div');
    const main = document.querySelector('.site-main')
    const mainHeight = main.offsetHeight
    const footerHeight = footer.offsetHeight
    const contentHeight = mainHeight + footerHeight

    main.before(pinWrap)
    pinWrap.appendChild(pin)
    pin.appendChild(main)
    pin.appendChild(footer)
    
    footer.closest('body').style.height = contentHeight + 'px'

    scrollTriggerObject = ScrollTrigger.create({
        trigger: pinWrap,
        pin: true,
        start: `top top`,
        end: `+=${contentHeight - vh}px`,
        scrub: 1,
        animation: footerTimeline,
        pinSpacing: false
    });
    
    footerTimeline.fromTo(pin, {
		y: "0",
	}, {
		y: `-${mainHeight - vh + footerHeight}px`,
		duration: 2.2,
		ease: "none",
	}, "0");

    footerTimeline.fromTo(pin, {
		y: `-${mainHeight - vh + footerHeight}px`,
	}, {
		y: `-${contentHeight - vh}px`,
		duration: 0.3,
		ease: "none",
	}, ">");

    footerTimeline.fromTo('[data-js="footerText"]', {
        x: '70%',
	}, {
		x: "0",
		duration: 0.5,
		ease: "none",
	}, "<-0.1");

    footerTimeline.fromTo('[data-js="footerMenu"]', {
        x: '120%',
	}, {
		x: "0",
		duration: 0.1,
		ease: "none",
	}, ">-0.1");

    footerTimeline.fromTo('[data-js="footerLeft"]', {
        opacity: '0',
	}, {
		opacity: "1",
		duration: 0.1,
		ease: "none",
	}, "<");
}

function homeScrollAnimation() {
    console.log('анимация главной')
}