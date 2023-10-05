// 슬라이드
window.onload = function () {
  loadHeader();
  loadFooter();
};

//상수 환경변수로 인식 = 대문자 개발자끼리 관습!
// 나중에는 URL 이 n개가 되었을때 URL 파일을 만들어주는 것도 좋음!
const HEADER_URL = "../public/header/header.html";
const FOOTER_URL = "../public/footer/footer.html";

// header.html 불러오기
function loadHeader() {
  fetch(HEADER_URL)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById("headerHtml").innerHTML = data;
    });
}

// footer.html 불러오기
function loadFooter() {
  fetch(FOOTER_URL)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById("footerHtml").innerHTML = data;
    });
}

// innerHTML 와 Element DOM API의 장단점의 비교와 분석을 해야된다.
// GPT 지양 >> 개념 예시만 물어보도록 하기
// onload(이벤트리스너) 에도 적절한지에 대해 생각해보기
