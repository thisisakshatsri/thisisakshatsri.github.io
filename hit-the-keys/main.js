window.addEventListener('keydown', function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.play();
    audio.currentTime = 0;
    console.log(audio);
    key.classList.add('playing');
});
const key = document.querySelectorAll('.key');
   key.forEach(key => key.addEventListener('transitionend', function(e){
       if(e.propertyName !== 'transform') return;
       this.classList.remove('playing');
   }));