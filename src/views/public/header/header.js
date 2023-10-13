// 헬스보충제 클릭 시 - 탄수화물 보충제 이동
function categoryCarbohydrateMove(event) {
  event.preventDefault();
  window.location.href = "/carbohydrate";
}
// 단백질 클릭 시 - 단백질 보충제 이동
function categoryProteinMove(event) {
  event.preventDefault();
  window.location.href = "/protein";
}
// 아미노산 클릭 시 - 아미노산 보충제 이동
function categoryAminoMove(event) {
  event.preventDefault();
  window.location.href = "/amino";
}
// 영양제 클릭 시 - 영양제 이동
function categoryNutrientsMove(event) {
  event.preventDefault();
  window.location.href = "/nutrients";
}
// 헬스용품 클릭 시 - 헬스용품 이동
function categoryFitnessMove(event) {
  event.preventDefault();
  window.location.href = "/fitness";
}
// 다이어트 클릭 시 - 다이어트 이동
function categoryDietMove(event) {
  event.preventDefault();
  window.location.href = "/diet";
}

// 로고 클릭 시 - home 으로 이동
function homeMove(event) {
  event.preventDefault();
  window.location.href = "/";
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
  window.location.href = "/cart";
}

// logout 기능 추가
function logOut(event) {
  event.preventDefault();
  alert("로그아웃 되었습니다.");
  // 로컬스토리지의 로그인 정보 false로 만들고
  // 유저 관련 정보 없애줌
  localStorage.setItem("loggedIn", false);
  localStorage.removeItem("userEmail");
  localStorage.removeItem("token");
  localStorage.removeItem("refeshToken");
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
