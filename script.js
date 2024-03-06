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
  const slide = document.getElementById(`sp-slide-${userNumber}`);
  const slideItems = slide.querySelectorAll("img, video");
  const slideWidth = document.getElementById(`sp-slide-${userNumber}-wrap`).clientWidth;

  // 슬라이드 이동 함수
  function moveToNextSlide() {
    // 마지막 슬라이드 직전까지 슬라이드 이동 처리
    if (slideNum < slideItems.length - 1) {
      slideNum++;
      slide.style.transition = "transform 0.5s ease";
      slide.style.transform = `translateX(-${slideWidth * slideNum}px)`;
    } else {
      // 마지막 슬라이드에서는 트랜지션 없이 첫 번째 슬라이드로 이동
      slide.style.transition = "none";
      slide.style.transform = "translateX(0px)";

      // 트랜지션 없이 즉시 첫 번째 위치로 이동한 후, 다음 루프에서 slideNum을 1로 설정하여
      // 첫 번째 실제 슬라이드 다음의 슬라이드로 부드럽게 전환되도록 준비
      setTimeout(() => {
        slideNum = 1;
        slide.style.transition = "transform 0.5s ease";
        slide.style.transform = `translateX(-${slideWidth * slideNum}px)`;
      }, 20); // transition 복구 전 짧은 지연 추가
    }
  }

  // 비디오 재생 처리 함수
  function handleVideoPlay() {
    const currentItem = slideItems[slideNum];
    if (currentItem.tagName === "VIDEO") {
      clearInterval(intervalId); // 비디오 재생 중에는 interval 중지
      currentItem.play().catch((error) => console.error("비디오 자동 재생 실패:", error));
      currentItem.onended = () => {
        // 비디오 재생이 끝나면 다음 슬라이드로 이동
        moveToNextSlide();
        startAutoSlide();
      };
    }
  }

  // 자동 슬라이드 시작 함수
  function startAutoSlide() {
    clearInterval(intervalId); // 기존 interval이 있으면 클리어
    intervalId = setInterval(() => {
      moveToNextSlide();
      handleVideoPlay();
    }, 2000); // 2초마다 슬라이드 이동
  }

  startAutoSlide(); // 슬라이드쇼 시작
}

window.onload = function () {
  slideShow(1);
  slideShow(2);
  slideShow(3);
  slideShow(4);
  slideShow(5);
  slideShow(6);
};
