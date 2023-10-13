// 헬스보충제 클릭 시 - 탄수화물 보충제 이동
function categoryCarbohydrateMove(event) {
  event.preventDefault();
  window.location.href = '/carbohydrate';
}
// 단백질 클릭 시 - 단백질 보충제 이동
function categoryProteinMove(event) {
  event.preventDefault();
  window.location.href = '/protein';
}
// 아미노산 클릭 시 - 아미노산 보충제 이동
function categoryAminoMove(event) {
  event.preventDefault();
  window.location.href = '/amino';
}
// 영양제 클릭 시 - 영양제 이동
function categoryNutrientsMove(event) {
  event.preventDefault();
  window.location.href = '/nutrients';
}
// 헬스용품 클릭 시 - 헬스용품 이동
function categoryFitnessMove(event) {
  event.preventDefault();
  window.location.href = '/fitness';
}
// 다이어트 클릭 시 - 다이어트 이동
function categoryDietMove(event) {
  event.preventDefault();
  window.location.href = '/diet';
}

// 로고 클릭 시 - home 으로 이동
function homeMove(event) {
  event.preventDefault();
  window.location.href = '/';
}
// 사람 클릭 시 - login 으로 이동
function mypageMove(event) {
  event.preventDefault();
  window.location.href = '/login';
}
// 장바구니 클릭 시 - cart 으로 이동
function cartMove(event) {
  event.preventDefault();
  window.location.href = '/cart';
}

//검색
function executeSearch() {
  const input = document.getElementById('searchInput');
  const searchTerm = input.value.trim(); // 공백 제거

  if (searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
  } else {
    alert('검색어를 입력해주세요.');
  }
}
