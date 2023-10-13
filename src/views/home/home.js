// 슬라이드
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const sliderContent = document.querySelector('.sliderContent');

function moveToSlide(index) {
  currentIndex = index;
  sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.addEventListener('DOMContentLoaded', function () {
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    moveToSlide(currentIndex);
  }

  setInterval(nextSlide, 3000);
});

// 신상품
async function newLoadProducts() {
  try {
    const response = await fetch('../data/newItem.json');
    const products = await response.json();
    document.getElementById('newProductContainer');
    const container = document.querySelector('.newProductContainer');

    products.map((product) => {
      const productLink = document.createElement('a');
      productLink.href = `/detail?id=${product.id}`;

      const productDiv = document.createElement('div');
      productDiv.className = 'productItem';

      const img = document.createElement('img');
      img.className = 'productImg';
      img.src = product.imgSrc;
      productDiv.appendChild(img);

      const productName = document.createElement('p');
      productName.className = 'productName';
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productPrice = document.createElement('b');
      productPrice.className = 'productPrice';
      productPrice.textContent = product.price;
      productDiv.appendChild(productPrice);

      productLink.appendChild(productDiv);
      container.appendChild(productLink);
    });
  } catch (error) {
    console.error('Error loading products:', error.message);
  }
}

newLoadProducts();

//신상품 디테일 페이지 이동
async function loadNewProductDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const response = await fetch('../data/newItem.json');
    const products = await response.json();

    const product = products.find((p) => p.id.toString() === productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    document.querySelector('.itemName').textContent = product.name;
    document.querySelector('.categoryName').textContent = product.category;
    document.querySelector('.price').textContent = product.price;
    document.querySelector('.mainImg').src = product.imgSrc;
    document.querySelector('.detailImg').src = product.detailImgUrl;

    // Detail images
    const detailImgWrap = document.querySelector('.detailImgWrap');
    // Remove any existing images
    detailImgWrap.innerHTML = '';
    product.detailImgUrl.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'detailImg';
      detailImgWrap.appendChild(img);
    });
  } catch (error) {
    console.error('Error loading product details:', error.message);
  }
}

// 페이지가 로드되면 loadProductDetail 함수 실행
document.addEventListener('DOMContentLoaded', loadNewProductDetail);

// 베스트 아이템 불러오기
async function loadProducts() {
  try {
    const response = await fetch('../data/bestItem.json');
    const products = await response.json();

    const container = document.querySelector('.productContainer');

    products.forEach((product) => {
      const productLink = document.createElement('a');
      productLink.href = `/detail?id=${product.id}`;

      const productDiv = document.createElement('div');
      productDiv.className = 'productItem';

      const img = document.createElement('img');
      img.className = 'productImg';
      img.src = product.imgSrc;
      productDiv.appendChild(img);

      const productName = document.createElement('p');
      productName.className = 'productName';
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productPrice = document.createElement('b');
      productPrice.className = 'productPrice';
      productPrice.textContent = product.price;
      productDiv.appendChild(productPrice);

      productLink.appendChild(productDiv);
      container.appendChild(productLink);
    });
  } catch (error) {
    console.error('Error loading products:', error.message);
  }
}

loadProducts();

//베스트 디테일 페이지 이동
async function loadProductDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const response = await fetch('../data/bestItem.json');
    const products = await response.json();

    const product = products.find((p) => p.id.toString() === productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    document.querySelector('.itemName').textContent = product.name;
    document.querySelector('.categoryName').textContent = product.category;
    document.querySelector('.price').textContent = product.price;
    document.querySelector('.mainImg').src = product.imgSrc;
    document.querySelector('.detailImg').src = product.detailImgUrl;

    // Detail images
    const detailImgWrap = document.querySelector('.detailImgWrap');
    // Remove any existing images
    detailImgWrap.innerHTML = '';
    product.detailImgUrl.forEach((url) => {
      const img = document.createElement('img');
      img.src = url;
      img.className = 'detailImg';
      detailImgWrap.appendChild(img);
    });
  } catch (error) {
    console.error('Error loading product details:', error.message);
  }
}

// 페이지가 로드되면 loadProductDetail 함수 실행
document.addEventListener('DOMContentLoaded', loadProductDetail);
