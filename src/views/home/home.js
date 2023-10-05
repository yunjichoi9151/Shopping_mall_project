// 슬라이드
window.onload = function () {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const sliderContent = document.querySelector(".sliderContent");

  function moveToSlide(index) {
    currentIndex = index;
    sliderContent.style.transform = `translateX(-${currentIndex * 1264}px)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }

  setInterval(nextSlide, 3000);
};
