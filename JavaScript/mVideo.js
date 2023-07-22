 videojs('my-video', {
    controls: true,
  
    plugins: {
        hotkeys: {
            volumeStep: 0.1,
            seekStep: 60, //second
            enableFullscreen: true,
            enableMute: true,
            enableNumbers: true,
            enableVolumeScroll: true,
        }
    }
})

 console.log('hi');