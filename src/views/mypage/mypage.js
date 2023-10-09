// 임시로 만든 json입니다.
async function fetchUserData(userId) {
  try {
    const response = await fetch("../data/user.json");
    const users = await response.json();

    // userId에 해당하는 사용자 데이터 찾기.
    const user = users.find((u) => u.id === userId);
    if (user) {
      updateUserInfo(user);
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
  }
}

// 웹 페이지의 내용을 업데이트하는 함수
function updateUserInfo(user) {
  const memberSpan = document.querySelector(".username");
  const cumulativeTotalSpan = document.querySelector(".userCumulativeTotal");
  const pointSpan = document.querySelector(".userPoint");

  const emailInput = document.getElementById("email"); // 이메일 입력 요소 가져오기
  const nameInput = document.getElementById("name"); // 이름 입력 요소 가져오기
  const phoneInput = document.getElementById("phone"); // 전화번호 입력 요소 가져오기
  const addressInput = document.getElementById("address"); // 주소 입력 요소 가져오기

  memberSpan.textContent = `${user.name} 님 안녕하세요`;
  cumulativeTotalSpan.textContent = `누적 구매금액 : ${user.cumulativeTotal}`;
  pointSpan.textContent = user.point;

  // 각 입력 요소의 value 속성을 설정하여 사용자 정보를 업데이트
  emailInput.value = user.email;
  nameInput.value = user.name;
  phoneInput.value = user.phone;
  addressInput.value = user.address;
}

// 예를 들어, id가 "1"인 사용자의 정보를 불러오려면:
fetchUserData("1");

// 정보수정 모달
function openModal() {
  document.getElementById("editInfoModal").style.display = "block";
}

function closeModal() {
  document.getElementById("editInfoModal").style.display = "none";
}

document
  .querySelector(".leftBar li:nth-child(2) a")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
  });

// 회원탈퇴 모달
function showDeleteModal() {
  const modal = document.getElementById("confirmDeleteModal");
  modal.style.display = "block";
}

function closeDeleteModal() {
  const modal = document.getElementById("confirmDeleteModal");
  modal.style.display = "none";
}

// "회원탈퇴" 클릭 이벤트 추가
document
  .querySelector(".leftBar ul li:nth-child(3) a")
  .addEventListener("click", function (event) {
    event.preventDefault(); // 기본 클릭 이벤트 방지
    showDeleteModal();
  });
