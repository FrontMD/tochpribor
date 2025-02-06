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
    const topOffset = (vh - footer.offsetHeight) + 'px'
    console.log(trigger)*/
    
    /*const pinWrap = document.createElement('div');
    const pin = document.createElement('div');
    const main = document.querySelector('.site-main')
    const mainHeight = main.offsetHeight
    const contentHeight = mainHeight + footerHeight
    main.before(pinWrap)
    pinWrap.appendChild(pin)
    pin.appendChild(main)
    pin.appendChild(footer)*/
    
    const footerTimeline = gsap.timeline();
    const footerHeight = footer.offsetHeight
    const addTimeFooter = 200;
    
    
    //footer.closest('body').style.height = contentHeight + 'px'

    scrollTriggerObject = ScrollTrigger.create({
        trigger: footer,
        pin: true,
        start: () => "top " + Math.ceil(vh - footerHeight)  + "px",
        end: () => "+=" + addTimeFooter + '%',
        scrub: 0,
        animation: footerTimeline,
        markers: true
    });
    
    /*footerTimeline.fromTo(pin, {
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
	}, ">");*/

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
    }, "<+=1.3");

}

function homeScrollAnimation() {
    console.log('анимация главной')
}