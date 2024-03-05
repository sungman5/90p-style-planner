/** @format */

// 무한 롤링 배너
let roller = document.querySelector(".sp-rolling-item");
roller.id = "sp-roller-1";
let cloneRoller = roller.cloneNode(true);
cloneRoller.id = "sp-roller-2";

document.querySelector(".sp-rolling-wrap").appendChild(cloneRoller);

roller.style.left = "0px";
document.getElementById("sp-roller-2").style.left = `${roller.offsetWidth}px`;

// 슬라이드
