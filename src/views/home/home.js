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
async function newLoadProducts() {
  try {
    const response = await fetch("../data/newItem.json");
    const products = await response.json();
    document.getElementById("newProductContainer");
    const container = document.querySelector(".newProductContainer");

    products.map((product) => {
      const productLink = document.createElement("a");
      productLink.href = product.link || "#";

      const productDiv = document.createElement("div");
      productDiv.className = "productItem";

      const img = document.createElement("img");
      img.className = "productImg";
      img.src = product.imgSrc;
      productDiv.appendChild(img);

      const productName = document.createElement("p");
      productName.className = "productName";
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productPrice = document.createElement("b");
      productPrice.className = "productPrice";
      productPrice.textContent = product.price;
      productDiv.appendChild(productPrice);

      productLink.appendChild(productDiv);
      container.appendChild(productLink);
    });
  } catch (error) {
    console.error("Error loading products:", error.message);
  }
}

newLoadProducts();
