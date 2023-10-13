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
// 사람 클릭 시 - login 으로 이동
function mypageMove(event) {
  event.preventDefault();

  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  if (isLoggedIn) {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail === "soon@gmail.com") {
      window.location.href = "../admin/admin.html";
    } else {
      // 로그인되어 있는 경우
      window.location.href = "../mypage/mypage.html"; // 마이페이지 경로로 이동
    }
  } else {
    // 로그인되어 있지 않은 경우
    window.location.href = "../login/login.html"; // 로그인 페이지로 이동
  }
}
// 장바구니 클릭 시 - cart 으로 이동
function cartMove(event) {
  event.preventDefault();
  window.location.href = "../cart/cart.html";
}

//검색
function executeSearch() {
  const input = document.getElementById("searchInput");
  const searchTerm = input.value.trim(); // 공백 제거

  if (searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
  } else {
    alert("검색어를 입력해주세요.");
  }
}
