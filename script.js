let currentsong= new Audio();

// to convert seconds to minutes
function formattime(seconds){
    const min=Math.floor(seconds / 60)
    const remainingsec=Math.floor(seconds % 60)
    const formatedmin=String(min).padStart(2,'0')
    const formatedremainingsec=String(remainingsec).padStart(2,'0')
    return `${formatedmin}:${formatedremainingsec}`
}

const songs=[
    "Cosmic-Lish Grooves.mp3",
    "Headlands-National Sweetheart.mp3",
    "Night Shift-National Sweetheart.mp3",
    "Sweethearts-TrackTribe.mp3",
    "Sweethearts-TrackTribe.mp3",
    "Sweethearts-TrackTribe.mp3"

]

// displaying song list 
const songlist=document.querySelector('.songlist').getElementsByTagName('ul')[0]
for (const song of songs) {
    songlist.innerHTML=songlist.innerHTML + ` <li>
                            <img class="invert" src="music.svg" alt="">
                            <div class="sname">${song}</div>
                            <div class="playnow">
                                <img src="img/play.svg" alt="">
                            </div>
                        </li>`
                       
}
// displaying name of current playing song 
Array.from(document.querySelector('.songlist').getElementsByTagName('li')).forEach(e => {
    e.addEventListener('click',(element)=>{
        console.log(e.querySelector('.sname').innerHTML)
        playmusic(e.querySelector('.sname').innerHTML.trim())

    })
});

// bydefault
document.querySelector('.time').innerHTML="00:00 / 00:00"



// playing song
const playmusic=((track)=>{
currentsong.src="/Music/" + track
currentsong.play()
play.src="img/pause.svg"
document.querySelector('.songinfo').innerHTML=track
document.querySelector('.time').innerHTML="00:00 / 00:00";
})

// song buttons
play.addEventListener('click',()=>{
if(currentsong.paused){
    currentsong.play()
    play.src="img/pause.svg"
}else{
    currentsong.pause()
    play.src="img/play2.svg"
}
})
// event for track time
currentsong.addEventListener('timeupdate',()=>{
    // console.log(currentsong.currentTime, currentsong.duration)
    document.querySelector('.time').innerHTML= `${formattime(currentsong.currentTime)}/${formattime(currentsong.duration)}`
    document.querySelector('.circle').style.left=(currentsong.currentTime / currentsong.duration) * 100 + "%";

  
});


// moving seekbar 
document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent=(e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector('.circle').style.left=percent + "%";
    currentsong.currentTime=((currentsong.duration) *percent) /100;
})


// next button
next.addEventListener('click', () => {
    let currentSongUrl = currentsong.src; 
    // finding index of current song in array
    let currentindex = songs.findIndex(song => {
        let normalizedCurrentSongUrl = decodeURIComponent(currentSongUrl);
        let normalizedSong = decodeURIComponent(song);
        return normalizedCurrentSongUrl.includes(normalizedSong);
    });

    if (currentindex === -1) {
        console.log("Current song not found in the playlist.");
        return;
    }
    // Play the next song
    playmusic(songs[currentindex+1]);
    
});

// previous button
previous.addEventListener('click', () => {
    let currentSongUrl = currentsong.src; 
    // finding index of current song in array
    let currentindex = songs.findIndex(song => {
        let normalizedCurrentSongUrl = decodeURIComponent(currentSongUrl);
        let normalizedSong = decodeURIComponent(song);
        return normalizedCurrentSongUrl.includes(normalizedSong);
    });

    if (currentindex === -1) {
        console.log("Current song not found in the playlist.");
        return;
    }
    // Play the next song
    playmusic(songs[currentindex-1]);
});


