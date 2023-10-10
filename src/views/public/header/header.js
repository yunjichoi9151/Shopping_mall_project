// 헬스보충제 클릭 시 - 탄수화물 보충제 이동
function categoryCarbohydrateMove(event) {
  event.preventDefault();
  window.location.href = "../category/carbohydrate.html";
}
// 단백질 클릭 시 - 단백질 보충제 이동
function categoryProteinMove(event) {
  event.preventDefault();
  window.location.href = "../category/protein.html";
}
// 아미노산 클릭 시 - 아미노산 보충제 이동
function categoryAminoMove(event) {
  event.preventDefault();
  window.location.href = "../category/amino.html";
}
// 영양제 클릭 시 - 영양제 이동
function categoryNutrientsMove(event) {
  event.preventDefault();
  window.location.href = "../category/nutrients.html";
}
// 헬스용품 클릭 시 - 헬스용품 이동
function categoryFitnessMove(event) {
  event.preventDefault();
  window.location.href = "../category/fitness.html";
}
// 다이어트 클릭 시 - 다이어트 이동
function categoryDietMove(event) {
  event.preventDefault();
  window.location.href = "../category/diet.html";
}

// 로고 클릭 시 - home 으로 이동
function homeMove(event) {
  event.preventDefault();
  window.location.href = "../home/home.html";
}
// 사람 클릭 시 - mypage 으로 이동
function mypageMove(event) {
  event.preventDefault();
  window.location.href = "../mypage/mypage.html";
}
// 장바구니 클릭 시 - cart 으로 이동
function cartMove(event) {
  event.preventDefault();
  window.location.href = "../cart/cart.html";
}

document.addEventListener("DOMContentLoaded", function () {
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

// 검색
function executeSearch() {
  const input = document.getElementById("searchInput");
  const searchTerm = input.value.trim(); // 공백 제거

  if (searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
  } else {
    alert("검색어를 입력해주세요.");
  }
}
