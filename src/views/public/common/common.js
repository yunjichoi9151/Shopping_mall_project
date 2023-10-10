// 슬라이드
document.addEventListener("DOMContentLoaded", function () {
  loadHeader();
  loadFooter();
});

//상수 환경변수로 인식 = 대문자 개발자끼리 관습!
// 나중에는 URL 이 n개가 되었을때 URL 파일을 만들어주는 것도 좋음!
const HEADER_URL = "../public/header/header.html";
const HEADER_CSS_URL = "../public/header/header.css";
const HEADER_JS_URL = "../public/header/header.js";

const FOOTER_URL = "../public/footer/footer.html";
const FOOTER_CSS_URL = "../public/footer/footer.css";

// header불러오기
async function loadHeader() {
  try {
    // header.html 불러오기
    const response = await fetch(HEADER_URL);
    const data = await response.text();
    document.getElementById("headerHtml").innerHTML = data;

    // header.css 불러오기
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = HEADER_CSS_URL;
    document.head.appendChild(linkElement);

    // header.js 불러오기
    const scriptElement = document.createElement("script");
    scriptElement.src = HEADER_JS_URL;
    document.body.appendChild(scriptElement);
  } catch (error) {
    console.error("Error loading header:", error.message);
  }
}

// footer불러오기
async function loadFooter() {
  try {
    // footer.html 불러오기
    const response = await fetch(FOOTER_URL);
    const data = await response.text();
    document.getElementById("footerHtml").innerHTML = data;

    // footer.css 불러오기
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = FOOTER_CSS_URL;
    document.head.appendChild(linkElement);
  } catch (error) {
    console.error("Error loading header:", error.message);
  }
}

// innerHTML 와 Element DOM API의 장단점의 비교와 분석을 해야된다.
// GPT 지양 >> 개념 예시만 물어보도록 하기
// onload(이벤트리스너) 에도 적절한지에 대해 생각해보기

// 베스트 아이템 불러오기
async function loadProducts() {
  try {
    const response = await fetch("../data/bestItem.json");
    const products = await response.json();

    const container = document.querySelector(".productContainer");

    products.forEach((product) => {
      const productLink = document.createElement("a");
      productLink.href = `../detail/detail.html?id=${product.id}`;

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

loadProducts();
