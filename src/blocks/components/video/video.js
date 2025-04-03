function videos() {
    const videos = document.querySelectorAll("[data-js='video']");

    if(videos.length < 1) return

    videos.forEach(video => {
        const videoPlayBtn = video.querySelector("[data-js='videoBtnPlay']");
        const videoFrame = video.querySelector("[data-js='videoFrame']");
        const videoPoster = video.querySelector("[data-js='videoPoster']");
        const videoPosterSrc = videoPoster.querySelector('img').getAttribute('src')

        if(videoPlayBtn) {
            videoPlayBtn.addEventListener('click', () => {
                videoPlayBtn.remove()
                videoPoster.remove()
    
                if(videoFrame.dataset.video.includes('rutube') || videoFrame.dataset.video.includes('vkvideo') || videoFrame.dataset.video.includes('vk.com')) {
                    videoFrame.innerHTML = videoFrame.dataset.video
        
                    let player = videoFrame.querySelector('iframe')
                    let playerSrc = player.getAttribute('src')
        
                    if(playerSrc.includes('rutube')) {
                        player.addEventListener("load", function() {
                            player.contentWindow.postMessage(JSON.stringify({
                                type: 'player:play',
                                data: {}
                            }), '*');
                        })
                    }
                } else {
                    const videoLayout = `
                                            <video controls="controls" poster="${videoPosterSrc}">
                                                <source src="${videoFrame.dataset.video}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                                            </video>
                                        `
                    videoFrame.innerHTML = videoLayout
    
                    videoFrame.querySelector('video').play()
                }
            })
        }
    
    })
 
}