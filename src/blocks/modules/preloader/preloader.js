document.addEventListener('DOMContentLoaded', ()=> {
	preloader()
})

function preloader() {
	const preloaderSection = document.querySelector('[data-js="preloader"]')

	if(!preloaderSection) return

	lockBody()

	const preloaderAnim = preloaderSection.querySelector('[data-js="preloaderAnim"]')

	if(preloaderAnim) {
		const preloaderAnimEx = lottie.loadAnimation({
            name: 'preloader',
            wrapper: preloaderAnim,
            animType: 'svg',
            loop: false,
            autoplay: false,
            path: 'public/preloader/preloader.json'
        });

        preloaderAnimEx.setSpeed(1)

		preloaderAnimEx.play()

		console.log(preloaderAnimEx)

	} else {
		removePreloader()
	}

	function removePreloader() {
		preloaderSection.remove()
	}
}
