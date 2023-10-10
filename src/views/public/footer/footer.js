// // 슬라이드
// document.addEventListener("DOMContentLoaded", function () {
//   loadFooter();
// });

// //상수 환경변수로 인식 = 대문자 개발자끼리 관습!
// // 나중에는 URL 이 n개가 되었을때 URL 파일을 만들어주는 것도 좋음!
// const FOOTER_URL = "../public/footer/footer.html";

// // header.html 불러오기
// async function loadHeader() {
//   try {
//     const response = await fetch(HEADER_URL);
//     const data = await response.text();
//     document.getElementById("headerHtml").innerHTML = data;
//   } catch (error) {
//     console.error("Error loading header:", error.message);
//   }
// }
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
