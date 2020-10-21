const app= () =>{

    const song=document.querySelector('.song')
    const play=document.querySelector('.play')
    const outline=document.querySelector('.moving-outline circle')
    const video=document.querySelector('.vid-container video')

    // Lagu
    const sounds=document.querySelectorAll('.sound-picker button')
    // waktu muncul
    const timeDisplay=document.querySelector('.time-display')
    const timeSelect = document.querySelectorAll ('.time-select button')
    // Dapatkan panjang dari outline
    const outlineLength=outline.getTotalLength()
    // Durasi lamanya
    let fakeDuration=600

        outline.style.strokeDasharray=outlineLength
        outline.style.strokeDashoffset=outlineLength

    // Pilih Musiknya
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src=this.getAttribute('data-sound')
            video.src=this.getAttribute('data-video')
            checkPlay(song)
        })
    });

    // Jalankan musiknya
    play.addEventListener('click',()=>{
        checkPlay(song)
    })


    // Pilih musiknya
    timeSelect.forEach(opsi => {
        opsi.addEventListener('click',function () {
            fakeDuration = this.getAttribute('data-time')
            timeDisplay.textContent=`${Math.floor(fakeDuration / 60)} :  ${fakeDuration%60  }`
        })
    });

    // Buat fungsi untuk memulai dan stopkan lagu
    const checkPlay=song=>{
        if (song.paused) {
            video.play()
            song.play()
            play.src='./svg/pause.svg'
    }else{
            video.pause()
            song.pause()
            play.src='./svg/play.svg'
    }
}
    
song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;

  outline.style.strokeDashoffset = progress;
    //  Animasikan Teks nya
  timeDisplay.textContent = `${minutes}:${seconds}`;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};
}

app()