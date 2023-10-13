// import { get, post, put, del } from "../../api";
// import axios from 'axios';

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
    console.log("load header");
    // header.css 불러오기
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = HEADER_CSS_URL;
    document.head.appendChild(linkElement);

    // header.html 불러오기
    const response = await fetch(HEADER_URL);
    const data = await response.text();
    document.getElementById("headerHtml").innerHTML = data;

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
  console.log("load footer");
  try {
    // footer.css 불러오기
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = FOOTER_CSS_URL;
    document.head.appendChild(linkElement);

    // footer.html 불러오기
    const response = await fetch(FOOTER_URL);
    const data = await response.text();
    document.getElementById("footerHtml").innerHTML = data;
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

// subNav 엑티브
document.addEventListener("DOMContentLoaded", function () {
  const subItem = document.querySelectorAll(".subNav li");
  // subNav active
  subItem.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.stopPropagation(); // 이벤트 전파 방지
      console.log("Clicked:", event.target); // 클릭된 요소를 콘솔에 표시
      // 모든 .sub-nav 내의 "active" 클래스를 제거
      subItem.forEach((item) => item.classList.remove("active"));

      // 클릭된 항목에 "active" 클래스 추가
      this.classList.add("active");
    });
  });

  // category URL 변경
  const currentURL = window.location.pathname;

  // 해당 URL에 따라 메뉴 항목에 클래스 추가
  if (currentURL.includes("carbohydrate")) {
    document
      .querySelector(".subMenu ul li:nth-child(1)")
      .classList.add("active");
  } else if (currentURL.includes("protein")) {
    document
      .querySelector(".subMenu ul li:nth-child(2)")
      .classList.add("active");
  } else if (currentURL.includes("amino")) {
    document
      .querySelector(".subMenu ul li:nth-child(3)")
      .classList.add("active");
  }
});

async function fetchCategoryData() {
  try {
    const res = await axios.get("/api/category");
    console.log(res.data);
    if (res.data && res.data.length > 0) {
      const ul = document.querySelector(".nav > ul"); // .nav 내부의 ul 선택
      res.data.forEach((category) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = category.name;
        a.addEventListener("click", function (event) {
          event.preventDefault();
          navigateToCategory(category.name); // 카테고리 이름을 바탕으로 이동하는 함수 호출
        });
        li.appendChild(a);
        ul.appendChild(li);
      });
    }
    console.log(res.status);
  } catch (err) {
    console.error(err);
  }
}

function navigateToCategory(categoryName) {
  switch (categoryName) {
    case "헬스보충제":
      window.location.href = "../category/carbohydrate.html"; // 헬스보충제 페이지로 이동
      break;
    case "영양제":
      window.location.href = "../category/nutrients.html"; // 영양제 페이지로 이동
      break;
    case "헬스용품":
      window.location.href = "../category/fitness.html"; // 헬스용품 페이지로 이동
      break;
    case "다이어트/보조식품":
      window.location.href = "../category/diet.html"; // 다이어트 페이지로 이동
      break;
    // 필요한 다른 카테고리도 위와 같은 방식으로 추가
    default:
      console.log("Unknown category:", categoryName);
  }
}

fetchCategoryData();
