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

  const emailInput = document.getElementById("email"); // 이메일 입력 요소 가져오기
  const nameInput = document.getElementById("name"); // 이름 입력 요소 가져오기
  const phoneInput = document.getElementById("phone"); // 전화번호 입력 요소 가져오기
  const addressInput = document.getElementById("address"); // 주소 입력 요소 가져오기

  memberSpan.textContent = `${user.name} 님 안녕하세요`;

  // 각 입력 요소의 value 속성을 설정하여 사용자 정보를 업데이트
  emailInput.value = user.email;
  nameInput.value = user.name;
  phoneInput.value = user.phone;
  addressInput.value = user.address;
}

// 예를 들어, id가 "1"인 사용자의 정보를 불러오려면:
fetchUserData("1");

// 정보 수정 모달 열기
function openEditModal() {
  document.getElementById("editInfoModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}

// 회원탈퇴 모달 열기
function openDelModal() {
  document.getElementById("delInfoModal").style.display = "block";
  document.getElementById("delModalOverlay").style.display = "block";
}

// 모든 모달 닫기
function closeModal() {
  document.getElementById("editInfoModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
  document.getElementById("delInfoModal").style.display = "none";
  document.getElementById("delModalOverlay").style.display = "none";
}

// 정보수정 눌렀을 때 모달 띄우기
document
  .querySelector(".leftBar li:nth-child(2) a")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openEditModal();
  });

// 탈퇴 눌렀을 때 모달 띄우기
document
  .querySelector(".leftBar li:nth-child(3) a")
  .addEventListener("click", function (event) {
    event.preventDefault();
    openDelModal();
  });

// 탈퇴
const deleteUserBtn = document.getElementById("deleteUser");
deleteUserBtn.addEventListener("click", deleteUser);

async function deleteUser(e) {
  e.preventDefault();

  try {
    // 현재 사용자의 이메일을 가져와서 PUT 요청을 보냄
    const userOrder = localStorage.getItem("orderInfo");
    const userEmail = JSON.parse(userOrder).email;
    const encodedEmail = encodeURIComponent(userEmail);

    console.log("여기");

    const res = await axios.delete(`/api/user/delete/${encodedEmail}`);

    console.log("저기");
    alert(`${userEmail} 님, 회원 탈퇴 되었습니다.`);
    window.location.href = "/";
  } catch (err) {
    console.error(err);
    alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
  }
}
