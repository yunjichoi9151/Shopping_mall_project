// 슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const sliderContent = document.querySelector(".sliderContent");

function moveToSlide(index) {
  currentIndex = index;
  sliderContent.style.transform = `translateX(-${currentIndex * 1264}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }

  setInterval(nextSlide, 3000);
});

// 신상품

// 신상품 슬라이드
async function loadNewProductsToContainer() {
  try {
    const response = await fetch("../data/newItem.json");
    const products = await response.json();
    const newProductWrap = document.querySelector(".newProductContainer");

    products.forEach((product) => {
      const newProductItem = document.createElement("a");
      newProductItem.className = "newProductItem";

      const newProductImg = document.createElement("img");
      newProductImg.src = product.imgSrc;
      newProductItem.appendChild(newProductImg);

      const newProductName = document.createElement("p");
      newProductName.className = "newProductName";
      newProductName.textContent = product.name;
      newProductItem.appendChild(newProductName);

      const newProductPrice = document.createElement("b");
      newProductPrice.className = "newProductPrice";
      newProductPrice.textContent = product.price;
      newProductItem.appendChild(newProductPrice);

      newProductWrap.appendChild(newProductItem);
    });

    setupDragFeature(); // 드래그 기능 활성화
  } catch (error) {
    console.error("Error loading new products:", error.message);
  }
}

let isDragging = false;
let startPointerPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;

const newProductContainer = document.querySelector(".newProductContainer");

function setupDragFeature() {
  newProductContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPointerPosition = e.clientX;
    previousTranslate = currentTranslate;
    newProductContainer.style.transition = "none";
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    newProductContainer.style.transition = "transform 0.3s";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const currentPointerPosition = e.clientX;
    currentTranslate =
      previousTranslate + (currentPointerPosition - startPointerPosition);

    const maxTranslate =
      newProductContainer.clientWidth -
      document.querySelector(".newItem").clientWidth;
    currentTranslate = Math.min(0, Math.max(-maxTranslate, currentTranslate));

    setSliderPosition();
  });
}

function setSliderPosition() {
  newProductWrap.style.transform = `translateX(${currentTranslate}px)`;
}

loadNewProductsToContainer();
