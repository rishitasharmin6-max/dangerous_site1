/* =========================================
   BIRTHDAY SETTINGS
========================================= */

/*
   Bangladesh time = UTC + 6

   Birthday:
   23 September 2026
   12:00 AM
*/
const BIRTHDAY = "2026-09-23T00:02:00+06:00";


/* =========================================
   ELEMENTS
========================================= */

const mysteryScreen =
    document.getElementById("mysteryScreen");

const countdownScreen =
    document.getElementById("countdownScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const countdown =
    document.getElementById("countdown");

const finalNumber =
    document.getElementById("finalNumber");

const soundButton =
    document.getElementById("soundButton");


/* =========================================
   STATE
========================================= */

let birthdayShown = false;

let countdownSequenceStarted = false;


/* =========================================
   CHECK TIME
========================================= */

function checkBirthdayTime() {

    const now = new Date();

    const target = new Date(BIRTHDAY);

    const difference = target - now;


    /*
       If birthday has already arrived
       show birthday immediately.
    */

    if (difference <= 0) {

        showBirthday();

        return;
    }


    /*
       Last 10 seconds:
       show 3...2...1
    */

    if (
        difference <= 10000 &&
        !countdownSequenceStarted
    ) {

        startFinalCountdown();

        return;
    }


    /*
       Normal countdown
    */

    const totalSeconds =
        Math.floor(difference / 1000);

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;


    countdown.textContent =
        `${String(hours).padStart(2, "0")}:` +
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`;
}


/* =========================================
   FINAL 3...2...1
========================================= */

function startFinalCountdown() {

    countdownSequenceStarted = true;

    mysteryScreen.classList.add("hidden");

    countdownScreen.classList.remove("hidden");


    let number = 3;

    finalNumber.textContent = number;


    const timer = setInterval(() => {

        number--;

        if (number > 0) {

            finalNumber.textContent = number;

            /*
               Restart animation
            */

            finalNumber.style.animation = "none";

            void finalNumber.offsetWidth;

            finalNumber.style.animation =
                "numberPop 1s ease";

        } else {

            clearInterval(timer);

            showBirthday();
        }

    }, 1000);
}


/* =========================================
   SHOW BIRTHDAY
========================================= */

function showBirthday() {

    if (birthdayShown) {
        return;
    }

    birthdayShown = true;


    mysteryScreen.classList.add("hidden");

    countdownScreen.classList.add("hidden");

    birthdayScreen.classList.remove("hidden");


    /*
       Start celebration
    */

    createConfetti();

    createBalloons();

    createSparkles();


    /*
       Try sound.
       Browser may block automatic audio.
    */

    tryStartMusic();
}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const container =
        document.getElementById("confetti");

    const pieces = 100;


    for (let i = 0; i < pieces; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            (3 + Math.random() * 4) + "s";


        piece.style.animationDelay =
            Math.random() * 2 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        /*
           Random shapes
        */

        const shapes = [
            "2px",
            "5px",
            "50%"
        ];

        piece.style.borderRadius =
            shapes[
                Math.floor(
                    Math.random() * shapes.length
                )
            ];


        container.appendChild(piece);
    }
}


/* =========================================
   BALLOONS
========================================= */

function createBalloons() {

    const container =
        document.getElementById("balloons");


    const balloonEmojis = [
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈",
        "🎈"
    ];


    balloonEmojis.forEach((emoji, index) => {

        const balloon =
            document.createElement("div");

        balloon.className =
            "balloon";

        balloon.textContent = emoji;


        balloon.style.left =
            (5 + Math.random() * 90) + "%";


        balloon.style.animationDuration =
            (7 + Math.random() * 5) + "s";


        balloon.style.animationDelay =
            (index * 0.5) + "s";


        container.appendChild(balloon);
    });
}


/* =========================================
   SPARKLES
========================================= */

function createSparkles() {

    const container =
        document.getElementById("sparkles");


    const sparkleSymbols = [
        "✨",
        "⭐",
        "💫",
        "✨",
        "🌟",
        "💖",
        "✨",
        "⭐"
    ];


    sparkleSymbols.forEach((symbol, index) => {

        const sparkle =
            document.createElement("div");

        sparkle.className =
            "sparkle-piece";

        sparkle.textContent =
            symbol;


        sparkle.style.left =
            (5 + Math.random() * 90) + "%";


        sparkle.style.top =
            (5 + Math.random() * 90) + "%";


        sparkle.style.animationDelay =
            (index * 0.4) + "s";


        container.appendChild(sparkle);
    });
}


/* =========================================
   CUTE BIRTHDAY MUSIC
========================================= */

/*
   We create a small melody using
   Web Audio API.

   No external audio file is required.
*/

let audioContext = null;


function playBirthdayMusic() {
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const notes = [
            // Happy Birthday style melody
            { n: 523.25, d: 0.28 }, // C
            { n: 523.25, d: 0.28 }, // C
            { n: 587.33, d: 0.50 }, // D
            { n: 523.25, d: 0.50 }, // C
            { n: 698.46, d: 0.50 }, // F
            { n: 659.25, d: 0.90 }, // E

            { n: 523.25, d: 0.28 },
            { n: 523.25, d: 0.28 },
            { n: 587.33, d: 0.50 },
            { n: 523.25, d: 0.50 },
            { n: 783.99, d: 0.50 }, // G
            { n: 698.46, d: 0.90 }, // F

            { n: 523.25, d: 0.28 },
            { n: 523.25, d: 0.28 },
            { n: 1046.50, d: 0.50 }, // High C
            { n: 880.00, d: 0.50 },   // A
            { n: 698.46, d: 0.50 },
            { n: 659.25, d: 0.50 },
            { n: 587.33, d: 0.90 },

            { n: 932.33, d: 0.28 }, // Bb
            { n: 932.33, d: 0.28 },
            { n: 880.00, d: 0.50 },
            { n: 698.46, d: 0.50 },
            { n: 783.99, d: 0.50 },
            { n: 698.46, d: 1.00 }
        ];

        let time = audioContext.currentTime + 0.05;

        notes.forEach(note => {
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(note.n, time);

            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.18, time + 0.04);
            gain.gain.setValueAtTime(0.18, time + note.d * 0.65);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                time + note.d
            );

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.start(time);
            oscillator.stop(time + note.d);

            time += note.d + 0.04;
        });

        soundButton.textContent = "🔊 Birthday music playing! 🎶";

    } catch (error) {
        console.log("Audio could not start:", error);
    }
}

/* =========================================
   TRY AUTOMATIC MUSIC
========================================= */

function tryStartMusic() {

    /*
       Chrome/mobile browsers may block
       audio without user interaction.

       So we try once.
       The button will always work.
    */

    try {

        playBirthdayMusic();

    } catch (error) {

        console.log(error);
    }
}


/* =========================================
   SOUND BUTTON
========================================= */

soundButton.addEventListener(
    "click",
    () => {

        playBirthdayMusic();

    }
);


/* =========================================
   START CLOCK
========================================= */

checkBirthdayTime();


setInterval(
    checkBirthdayTime,
    250
);