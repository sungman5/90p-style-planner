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

function slideShow(userNumber) {
  let slideNum = 0;
  let intervalId;
  const slideWrapId = `sp-slide-${userNumber}-wrap`;
  const slide = document.getElementById(`sp-slide-${userNumber}`);
  const slideItems = slide.querySelectorAll("img, video");
  let slideWidth = document.getElementById(slideWrapId).clientWidth;

  function updateSlideWidth() {
    slideWidth = document.getElementById(slideWrapId).clientWidth;
    // 현재 슬라이드 위치에 맞게 transform 업데이트
    slide.style.transform = `translateX(-${slideWidth * slideNum}px)`;
  }

  function moveToNextSlide() {
    if (slideNum < slideItems.length - 1) {
      slideNum++;
    } else {
      slideNum = 0; // 마지막 슬라이드에서 첫 번째 슬라이드로 리셋
      slide.style.transition = "none"; // 트랜지션 없이 즉시 첫 번째 위치로 이동
    }
    setTimeout(() => {
      // transition 복구 및 슬라이드 이동
      slide.style.transition = "transform 0.5s ease";
      slide.style.transform = `translateX(-${slideWidth * slideNum}px)`;
    }, 20);
  }

  function handleVideoPlay() {
    const currentItem = slideItems[slideNum];
    if (currentItem.tagName === "VIDEO") {
      clearInterval(intervalId);
      currentItem.play().catch((error) => console.error("비디오 자동 재생 실패:", error));
      currentItem.onended = () => {
        startAutoSlide();
      };
    }
  }

  function startAutoSlide() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      moveToNextSlide();
      handleVideoPlay();
    }, 2000);
  }

  // 화면 리사이즈에 따른 슬라이드 너비 업데이트 이벤트 리스너
  window.addEventListener("resize", updateSlideWidth);

  startAutoSlide();
}

window.onload = function () {

slideShow(1);
  slideShow(2);
  slideShow(3);
  slideShow(4);
  slideShow(5);
  slideShow(6);
};
