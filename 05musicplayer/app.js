// logic

const songs = [
    {
        title: "Iris",
        author: "The Goo Goo dolls",
        src: "src/song/song1.mp3",
        img: "src/cover/cover1.jpg",
    },
    {
        title: "A Change of Heart",
        author: "The 1975",
        src: "src/song/song2.mp3",
        img: "src/cover/song2.jpg",
    },
    {
        title: "back to friends",
        author: "Sombr ",
        src: "src/cover/song3.mp3",
        img: "src/cover/song3.jpg",
    },
    {
        title: "Do You Means",
        author: "The Chainsmokers",
        src: "src/cover/song4.mp3",
        img: "src/cover/song4.jpg",
    },
    {
        title: "War With Heaven",
        author: "Keshi",
        src: "src/cover/song5.mp3",
        img: "src/cover/song5.jpg",
    },
    
    
]


//music player
class MusicPlayer{
    constructor(songs , currentSong){
        this.songs = songs;
        this.currentSong = currentSong;
        this.song = new Audio('src/song/song'+currentSong+'.mp3');
    }

    playSong(){
       
        setTimeout(()=>{
            this.song.play();
            this.song.volume= .5;
            const currentSong = this.song;
            updateSongMeter(currentSong);
            update();
            
        },500)
              
    }

    pause(){
        this.song.pause();
    }

    changeLeft(){

        if(this.currentSong==1){
            this.currentSong=this.songs.length+1;
        }

        this.currentSong--;
        this.song.src = 'src/song/song'+this.currentSong+'.mp3';
        this.song.load();
        this.playSong();

    }

    changeRight(){
        this.song.pause();
        if(this.currentSong==this.songs.length){
            this.currentSong=0;
        }

        this.currentSong++;
        this.song.src = 'src/song/song'+this.currentSong+'.mp3';
        this.song.load();
        this.playSong();

    }

    changeFromMeter(value){
       this.song.currentTime = this.song.duration * (value/100);
    }

    getSongInfo(){
        return this.songs[this.currentSong-1];
    }

    getCurrentSong(){
        return [ this.currentSong , this.songs[this.currentSong-1]];
    }

}
let start = (Math.ceil(Math.random()*songs.length));
console.log(start);
let musicPlayer = new MusicPlayer(songs,start);
musicPlayer.playSong();










//UI logic 
document.querySelector('.play-pause').addEventListener('click',function(e){

    let El = e.target;
    (El.className.split(' ')[1]=='play') ? musicPlayer.playSong() : musicPlayer.pause();
    El.classList.toggle('play');

});

//left
document.querySelector('.play-left').addEventListener('click',function(e){
    musicPlayer.changeLeft();
})

//right
document.querySelector('.play-right').addEventListener('click',function(e){
    musicPlayer.changeRight();
})


// updates song info
function update(){
    const data = musicPlayer.getCurrentSong();
    const current = data[0];
    // updates ui
    document.querySelector('.cover').setAttribute('src','src/cover/song'+data[0]+'.jpg');
    document.querySelector('.name').textContent = data[1].title;
    document.querySelector('.author').textContent = data[1].author;
}

function updateSongMeter(song){

    let totalDuration = formatDuration(song.duration);
    document.querySelector('.right').textContent = totalDuration ;

    setInterval(()=>{
        current = formatDuration(song.currentTime);
        document.querySelector('.left').textContent = current;
        let progressBar = (Math.trunc((song.currentTime/song.duration) * 100));
        progressBar +='%';
        document.querySelector('.nested-meter').style.width=progressBar;
        if(song.ended){
            musicPlayer.changeRight();
        }
    },500);

}




function formatDuration(duration){
    let mins = String(Math.trunc(duration / 60));
    let secs = String(Math.trunc(duration % 60));
    if(mins.length<2){
        mins = '0'+mins;
    }

    if(secs.length<2){
        secs = '0'+secs;
    }

    return `${mins}:${secs}`;
}

document.querySelector('.progress').addEventListener('input',function(e){
    musicPlayer.changeFromMeter(e.target.value);
})