const fullscreenButton = document.getElementById("fullscreenButton");
const canvas2 = document.getElementById("canvas");

fullscreenButton.addEventListener("click", (event) => {
    event.preventDefault();
    if(window.document.fullscreen){
        fullscreenButton.src = "src/fullscreen.png";
        window.document.exitFullscreen();
    }
    else{
        fullscreenButton.src = "src/cancel.png";
        canvas2.requestFullscreen();
    }
});