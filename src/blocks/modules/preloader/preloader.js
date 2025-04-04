/*const imagesCount = 210

for(let i = 0; i < imagesCount; i++) {
	let img = new Image();
	img.src = 'public/renders/render-0/images/seq_0_' + i + '.webp'
	console.log('грузим картинку ' + i)
}*/

document.addEventListener('DOMContentLoaded', ()=> {
	preloader()
})

function preloader() {
	const preloaderSection = document.querySelector('[data-js="preloader"]')

	if(!preloaderSection) return

	lockBody()

	const preloaderAnim = preloaderSection.querySelector('[data-js="preloaderAnim"]')

	if (typeof window.distPath == 'undefined') {
        window.distPath = '';
    }

	if(preloaderAnim) {
		const preloaderAnimEx = lottie.loadAnimation({
            name: 'preloader',
            wrapper: preloaderAnim,
            animType: 'svg',
            loop: false,
            autoplay: false,
            path: `${window.distPath}public/preloader/preloader.json`
        });

		preloaderAnimEx.addEventListener('config_ready', () => {
			preloaderAnimEx.setSpeed(0.32)
			preloaderAnimEx.play()
		})
		
		preloaderAnimEx.addEventListener('complete', () => {
			setTimeout(removePreloader, 300)
		})
		
		const preloaderProgress = preloaderSection.querySelector('[data-js="preloaderProgress"]')

		if(preloaderProgress) {
			preloaderAnimEx.addEventListener('drawnFrame', (e) => {
				preloaderProgress.innerHTML = Math.ceil(e.currentTime / e.totalTime * 100)
			})
		}


	} else {
		removePreloader()
	}

	function removePreloader() {
		preloaderSection.classList.remove('active');
		setTimeout(() => {preloaderSection.dispatchEvent(new CustomEvent('preloaderComplete'))}, 500);
	}

	preloaderSection.addEventListener('preloaderComplete', unlockBody)
}
