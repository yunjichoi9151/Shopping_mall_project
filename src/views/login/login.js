const loginInputEmail = document.querySelector('#emailInput');
const loginInputPassword = document.querySelector('#passwordInput');

// 회원가입
const doJoinBtn = document.querySelector('#doJoin');
doJoinBtn.addEventListener('click', goToJoin);

// 회원가입 페이지로 이동
function goToJoin() {
  // 경로 수정 필요 !!!!
  window.location.href = '../join/join.html';
}

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 아이디 찾기 버튼 클릭 시 모달 창 열기
const findIdBtn = document.querySelector('#findId');
findIdBtn.addEventListener('click', function () {
  const findIdModal = document.querySelector('#findIdModal');
  findIdModal.style.display = 'block';
});

// 비밀번호 찾기 버튼 클릭 시 모달 창 열기
const findPasswordBtn = document.querySelector('#findPassword');
findPasswordBtn.addEventListener('click', function () {
  const findPasswordModal = document.querySelector('#findPasswordModal');
  findPasswordModal.style.display = 'block';
});

// 모달 창의 닫기 버튼에 이벤트 리스너 추가
const closeBtns = document.querySelectorAll('.close');
closeBtns.forEach(function (closeBtn) {
  closeBtn.addEventListener('click', function () {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function (modal) {
      modal.style.display = 'none';
    });
  });
});

// 사용자가 모달 외부를 클릭하면 모달 창이 닫히도록 설정
window.addEventListener('click', function (event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(function (modal) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// 아이디 찾기 폼 제출 시 동작
const findIdForm = document.querySelector('#findIdForm');
const findIdResult = document.querySelector('#findIdResult');
findIdForm.addEventListener('submit', handleFind);
async function handleFind(e) {
  e.preventDefault();
  // 아이디 찾기 기능
  const findNameInput = document.querySelector('#findName');
  const findName = findNameInput.value;
  const findPhoneNumberInput = document.querySelector('#findPhoneNumber');
  const findPhoneNumber = findPhoneNumberInput.value;

  const findData = { phoneNumber: findPhoneNumber };
  try {
    const res = await axios.post('/api/user/find', findData);
    if (res.data && res.data.email) {
      const userEmail = res.data.email;
      findIdResult.innerText = `아이디 : ${userEmail}`;
    } else {
      findIdResult.innerText = '사용자를 찾을 수 없습니다.';
    }
  } catch (err) {
    console.error(err);
  }
}

// 비밀번호 찾기 폼 제출 시 동작 (임의의 동작, 실제 동작으로 대체)
const findPasswordForm = document.querySelector('#findPasswordForm');
const findPasswordResult = document.querySelector('#findPasswordResult');
findPasswordForm.addEventListener('submit', function (event) {
  event.preventDefault();
  // 비밀번호 찾기 기능 추가해야함 !!!!!
  findPasswordResult.innerText = '임시 비밀번호가 전송되었습니다.';
});

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 로그인
const loginBtn = document.querySelector('#loginBtn');
loginBtn.addEventListener('click', handleLogin);

// 로그인 구현
async function handleLogin(e) {
  e.preventDefault();

  // 로그인 요청한 회원의 이메일과 비밀번호
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const loginUserData = { email, password };

    const res = await axios.post('/api/auth/login', loginUserData);

    console.log(res);
    console.log(res.data);

    // 로그인 성공 시 토큰을 세션 스토리지에 저장해주고 메인 페이지로 이동시킴
    const token = res.data.token;
    const refreshToken = res.data.refreshToken;
    const userName = res.data.name;
    const userEmail = loginUserData.email;

    console.log(token);
    console.log(refreshToken);

    // 로그인 성공, 토큰을 세션 스토리지에 저장
    localStorage.setItem('token', token);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('refeshToken', refreshToken);
    localStorage.setItem('userEmail', userEmail);

    // 기본 페이지로 이동
    window.location.href = '../home/home.html';
    alert(`${userName} 님, 로그인되었습니다.`);

    // 로그인 실패시 alert 창 띄움
  } catch (err) {
    console.error(err);
    alert('로그인이 실패하였습니다. 아이디와 비밀번호를 확인해주세요.');
  }
}
