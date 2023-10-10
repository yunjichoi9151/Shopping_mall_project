const loginInputEmail = document.querySelector("#emailInput");
const loginInputPassword = document.querySelector("#passwordInput");

// 회원가입
const doJoinBtn = document.querySelector("#doJoin");
doJoinBtn.addEventListener("click", goToJoin);

// 회원가입 페이지로 이동
function goToJoin() {
  // 경로 수정 필요 !!!!
  window.location.href = "../join/join.html";
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 아이디 찾기 버튼 클릭 시 모달 창 열기
const findIdBtn = document.querySelector("#findId");
findIdBtn.addEventListener("click", function () {
  const findIdModal = document.querySelector("#findIdModal");
  findIdModal.style.display = "block";
});

// 비밀번호 찾기 버튼 클릭 시 모달 창 열기
const findPasswordBtn = document.querySelector("#findPassword");
findPasswordBtn.addEventListener("click", function () {
  const findPasswordModal = document.querySelector("#findPasswordModal");
  findPasswordModal.style.display = "block";
});

// 모달 창의 닫기 버튼에 이벤트 리스너 추가
const closeBtns = document.querySelectorAll(".close");
closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener("click", function () {
    const modals = document.querySelectorAll(".modal");
    modals.forEach(function (modal) {
      modal.style.display = "none";
    });
  });
});

// 사용자가 모달 외부를 클릭하면 모달 창이 닫히도록 설정
window.addEventListener("click", function (event) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

// 아이디 찾기 폼 제출 시 동작 (임의의 동작, 실제 동작으로 대체)
const findIdForm = document.querySelector("#findIdForm");
const findIdResult = document.querySelector("#findIdResult");
findIdForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // 아이디 찾기 로직 추가 (가입된 이메일을 확인하고 결과를 findIdResult에 출력)
  const findNameInput = document.querySelector("#findName");
  const findName = findNameInput.value;
  const findPhoneNumberInput = document.querySelector("#findPhoneNumber");
  const findPhoneNumber = findPhoneNumberInput.value;

  // !!!! 구현 필요 !!!!
  // db의 회원정보 중 findPhoneNumber 와 일치하는 연락처를 가진 회원이 있으면
  // 그 아이디를 반환해줘야함
  findIdResult.innerText = "찾은 아이디 : example_id";
});

// 비밀번호 찾기 폼 제출 시 동작 (임의의 동작, 실제 동작으로 대체)
const findPasswordForm = document.querySelector("#findPasswordForm");
const findPasswordResult = document.querySelector("#findPasswordResult");
findPasswordForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // 비밀번호 찾기 기능 추가해야함 !!!!!
  findPasswordResult.innerText = "임시 비밀번호가 전송되었습니다.";
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 로그인
const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", handleLogin);

// 로그인 구현
async function handleLogin(e) {
  e.preventDefault();

  // 로그인 요청한 회원의 이메일과 비밀번호
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;

  // 두 칸 모두 작성되어 있고
  // 해당 아이디가 db에 있고
  // 비밀번호가 해당 아이디와 일치하면 로그인 진행
  // if문으로 그렇지 않을 때 alert 필요

  // 로그인 api 요청
  // 수정 필요 !!!!!
  /*
  try {
    const loginUserData = { userEmail, userPassword };

    const login = await Api.post("/api/users/login", loginUserData);
    const token = login.token;
    const refreshToken = login.refreshToken;
    console.log(token);
    console.log(refreshToken);
    // 로그인 성공, 토큰을 세션 스토리지에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("loggedIn", "true");
    // 기본 페이지로 이동
    window.location.href = "/";
    alert(`로그인되었습니다.`);

    // 로그인 성공
  } catch (err) {
    console.error(err);
  }
  */
}
