// 신상품
async function newLoadProducts() {
  try {
    const response = await fetch('../data/diet.json');
    const products = await response.json();
    document.getElementById('diteContainer');
    const container = document.querySelector('.diteContainer');

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
//디테일 페이지 이동
async function loadProductDetail() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const response = await fetch('../data/diet.json');
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
