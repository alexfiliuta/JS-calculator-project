let doing = false;
let audio = false;
let spinningBar = document.getElementById("status");

const win = new Audio("resources/sounds/win.mp3");
const lose = new Audio("resources/sounds/lose.mp3");
const coin = [new Audio("resources/sounds/coin.mp3"),new Audio("resources/sounds/coin.mp3"),new Audio("resources/sounds/coin.mp3")];
const spin = [new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3"),new Audio("resources/sounds/spin.mp3")];

function randomInt(min, max){
	return Math.floor((Math.random() * (max-min+1)) + min);
}

function toggleAudio(){
	if (!audio){
		audio = !audio;
		for (var x of spin){
			x.volume = 0.5;
		}
		for (var x of coin){
			x.volume = 0.5;
		}
		win.volume = 1.0;
		lose.volume = 1.0;
	}else{
		audio = !audio;
		for (var x of spin){
			x.volume = 0;
		}
		for (var x of coin){
			x.volume = 0;
		}
		win.volume = 0;
		lose.volume = 0;
	}
	document.getElementById("audio").src = "resources/icons/audio"+(audio?"On":"Off")+".png";
}

function testWin() {
    var slot1 = document.getElementById("slot1").className;
	var slot2 = document.getElementById("slot2").className;
	var slot3 = document.getElementById("slot3").className;

	if (((slot1 == slot2 && slot2 == slot3) ||
		(slot1 == slot2 && slot3 == "a7") ||
		(slot1 == slot3 && slot2 == "a7") ||
		(slot2 == slot3 && slot1 == "a7") ||
		(slot1 == slot2 && slot1 == "a7") ||
		(slot1 == slot3 && slot1 == "a7") ||
		(slot2 == slot3 && slot2 == "a7") ) && !(slot1 == slot2 && slot2 == slot3 && slot1=="a7")){
		spinningBar.innerHTML = "YOU WIN!";
		win.play();
	}else{
		spinningBar.innerHTML = "YOU LOSE!"
		lose.play();
	}
	doing = false;
}

function spinSlot(slotId, counter, total, interval, soundIndex) {
    if (counter >= total) {
        coin[soundIndex].play();
        clearInterval(interval);
        if (soundIndex === 2) {
            testWin();
        }
        return;
    }

    let slotTile = document.getElementById(slotId);
    let nextClassNameIndex = parseInt(slotTile.className.substring(1)) + 1;
    if (nextClassNameIndex > 7) {
        nextClassNameIndex = 1; 
    }
    slotTile.className = "a" + nextClassNameIndex;

    if (soundIndex === 2) {
        spin[(counter % spin.length)].play();
    }
}

function doSlot() {
    if (doing) {
        return null;
    }
    doing = true;
    const numChanges = randomInt(1, 4) * 7;
    let numSlot1 = numChanges + randomInt(1, 7);
    let numSlot2 = numChanges + 2 * 7 + randomInt(1, 7);
    let numSlot3 = numChanges + 4 * 7 + randomInt(1, 7);

    spinningBar.innerHTML = "SPINNING";
    let slots = ['slot1', 'slot2', 'slot3'];
    let counts = [numSlot1, numSlot2, numSlot3];
    let intervals = [];

    slots.forEach((slot, index) => {
        let counter = 0;
        intervals[index] = setInterval(() => {
            spinSlot(slot, counter++, counts[index], intervals[index], index);
        }, 50);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    toggleAudio();
});
document.getElementById("gameplay").addEventListener("click", function() {
    doSlot();
});
document.getElementById("audio").addEventListener("click", function() {
    toggleAudio();
});
