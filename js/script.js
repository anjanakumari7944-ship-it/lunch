const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const bgSong = document.getElementById("bgSong");
const vinylImg = document.getElementById("vinylImg");


/* =====================================
   Vinyl only spins while the song is
   actually playing.
===================================== */

if (bgSong && vinylImg) {

    bgSong.addEventListener("play", () => {
        vinylImg.classList.add("spinning");
    });

    bgSong.addEventListener("pause", () => {
        vinylImg.classList.remove("spinning");
    });

    bgSong.addEventListener("ended", () => {
        vinylImg.classList.remove("spinning");
    });

}


/* =====================================
   Resume the song from where it left
   off on the previous page, so it
   plays continuously across pages
   instead of restarting.
===================================== */

if (bgSong) {

    const savedTime = sessionStorage.getItem("bgSongTime");

    if (savedTime !== null) {

        bgSong.addEventListener("loadedmetadata", () => {
            bgSong.currentTime = parseFloat(savedTime);
        });

    }

    window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("bgSongTime", bgSong.currentTime);
    });

}


/* =====================================
   Try to play the song the instant the
   page loads. If the browser blocks
   autoplay (very common on iPhone/Safari
   right after a page navigation), show a
   clear tap-to-play button AND let the
   very next tap anywhere on the page
   resume it, so nothing gets missed.
===================================== */

if (bgSong) {

    bgSong.play().catch(() => {

        const fallback = document.createElement("button");
        fallback.className = "play-song-fallback";
        fallback.textContent = "♪ PLAY SONG";

        fallback.addEventListener("click", () => {
            bgSong.play();
            fallback.remove();
        });

        document.body.appendChild(fallback);

    });

}


/* =====================================
   Make sure the song is playing, then
   move to the next page.
===================================== */

function playSongThenGoTo(destination) {

    if (bgSong) {
        bgSong.play().catch(() => {
            /* autoplay was blocked - navigation still proceeds */
        });
    }

    /* navigate right away (no delay) so the browser still treats
       the next page's load as a direct result of this click, which
       is what lets it autoplay the song on the new page */
    window.location.href = destination;

}


/* =====================================
   YES BUTTON
===================================== */

if (yesButton) {

    yesButton.addEventListener("click", () => {

        playSongThenGoTo("yes.html");

    });

}


/* =====================================
   NO BUTTON
   Just a normal, clickable button
===================================== */

if (noButton) {

    noButton.addEventListener("click", () => {

        playSongThenGoTo("no.html");

    });

}
