var numberOfDrumsButtons = document.querySelectorAll(".drum").length;


for (var i = 0; i < numberOfDrumsButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
}

document.addEventListener("keypress", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "a":
            var audio1 = new Audio("sounds/bubbles.mp3");
            audio1.play();
            break;
        case "s":
            var audio2 = new Audio("sounds/clap.wav");
            audio2.play();
            break;
        case "d":
            var audio3 = new Audio("sounds/clay.mp3");
            audio3.play();
            break;
        case "f":
            var audio4 = new Audio("sounds/confetti.mp3");
            audio4.play();
            break;
        case "g":
            var audio5 = new Audio("sounds/corona.mp3");
            audio5.play();
            break;
        case "h":
            var audio6 = new Audio("sounds/flash-1.mp3");
            audio6.play();
            break;
        case "j":
            var audio7 = new Audio("sounds/flash-2.mp3");
            audio7.play();
            break;
        case "k":
            var audio8 = document.querySelector("sounds/flash-3.mp3");
            audio8.play();
            break;
        case "l":
            var audio9 = document.querySelector("sounds/glimmer.mp3");
            audio9.play();
            break;
        case "z":
            var audio10 = document.querySelector("sounds/hihat.wav");
            audio10.play();
            break;
        case "x":
            var audio11 = document.querySelector("sounds/kick.wav");
            audio11.play();
            break;
        case "c":
            var audio12 = document.querySelector("sounds/moon.mp3");
            audio12.play();
            break;
        case "v":
            var audio13 = document.querySelector("sounds/openhat.wav");
            audio13.play();
            break;
        case "b":
            var audio14 = document.querySelector("sounds/pinwheel.mp3");
            audio14.play();
            break;
        case "n":
            var audio15 = document.querySelector("sounds/piston-1.mp3");
            audio15.play();
            break;
        case "m":
            var audio16 = document.querySelector("sounds/piston-2.mp3");
            audio16.play();
            break;
        case "q":
            var audio21 = document.querySelector("sounds/ride.wav");
            audio21.play();
            break;
        case "w":
            var audio22 = document.querySelector("sounds/spiral.mp3");
            audio22.play();
            break;
        case "e":
            var audio23 = document.querySelector("sounds/splits.mp3");
            audio23.play();
            break;
        case "r":
            var audio24 = document.querySelector("sounds/squiggle.mp3");
            audio24.play();
            break;
        case "t":
            var audio25 = document.querySelector("sounds/strike.mp3");
            audio25.play();
            break;
        case "y":
            var audio26 = document.querySelector('.sounds/suspension.mp3');
            audio26.play();
            break;
        case "u":
            var audio27 = document.querySelector("sounds/tom-1.mp3");
            audio27.play();
            break;
        case "i":
            var audio28 = document.querySelector("sounds/tom-2.mp3");
            audio28.play();
            break;
        case "o":
            var audio29 = document.querySelector("sounds/tom-3.mp3");
            audio29.play();
            break;
        case "p":
            var audio30 = document.querySelector("sounds/tom-4.mp3");
            audio30.play();
            break;
        default: console.log(key);

    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}
