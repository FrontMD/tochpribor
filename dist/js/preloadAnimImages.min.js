function preloadAnimImages() {

	const homeIntro = document.querySelector('[data-js="homeIntro"]');

    if(!homeIntro) return

	const imagesCount = 210
	
	for(let i = 0; i < imagesCount; i++) {
		let img = new Image();
		img.src = '/local/templates/touchpribor/dist/public/renders/render-0/images/seq_0_' + i + '.webp'
	}
}

preloadAnimImages()