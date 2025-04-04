const imagesCount = 210

for(let i = 0; i < imagesCount; i++) {
	let img = new Image();
	img.src = 'public/renders/render-0/images/seq_0_' + i + '.webp'
	console.log('грузим картинку ' + i)
}