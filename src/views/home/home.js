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

// 신상품

// 신상품 슬라이드

// 베스트
async function loadProducts() {
  try {
    const response = await fetch("../data/bestItem.json");
    const products = await response.json();

    const container = document.querySelector(".productContainer");

    products.map((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "productItem";

      const img = document.createElement("img");
      img.className = "productImg";
      img.src = product.imgSrc;

      const productName = document.createElement("p");
      productName.className = "productName";
      productName.textContent = product.name;

      const productPrice = document.createElement("b");
      productPrice.className = "productPrice";
      productPrice.textContent = product.price;

      productDiv.appendChild(img);
      productDiv.appendChild(productName);
      productDiv.appendChild(productPrice);

      container.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error loading products:", error.message);
  }
}

loadProducts();
