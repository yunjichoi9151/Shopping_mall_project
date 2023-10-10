const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const passwordConfirmInput = document.querySelector("#passwordConfirmInput");
const phoneNumberInput = document.querySelector("#phoneNumberInput");
const postCodeInput = document.querySelector("#postCodeInput");
const addressInput = document.querySelector("#addressInput");
const detailAddressInput = document.querySelector("#detailAddressInput");

const findAddressBtn = document.querySelector("#findAddressBtn");
findAddressBtn.addEventListener("click", findDaumAddress);

// Daum 우편번호 서비스 활용
// https://postcode.map.daum.net/guide 참조
function findDaumAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postCodeInput.value = data.zonecode;
      addressInput.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      detailAddressInput.focus();
    },
  }).open();
}

// 회원가입 진행
const joinSubmitBtn = document.querySelector("#submitButton");
joinSubmitBtn.addEventListener("click", handleJoin);

async function handleJoin(e) {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumberInput.value;
  const postalCode = postCodeInput.value;
  const address = addressInput.value;
  const detailAddress = detailAddressInput.value;

  // 유저 주소 한번에 저장
  const userAddress = `(${postalCode}) ${address} ${detailAddress}`;

  // 이메일 양식 검사
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  // 이메일이 양식에 맞으면 true, 틀리면 false 반환
  const checkEmail = regex.test(email);

  // 연락처 양식 검사
  const phoneNum = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  // true, false 반환
  const checkphoneNumber = phoneNum.test(phoneNumber);

  if (name.length < 2) {
    nameInput.focus();
    return alert("이름을 2글자 이상 입력해주세요.");
  } else if (!checkEmail) {
    emailInput.focus();
    return alert("이메일을 제대로 입력해주세요.");
  } else if (password.length < 8) {
    passwordInput.focus();
    return alert("비밀번호를 8자리 이상 입력해주세요.");
  } else if (password !== passwordConfirm) {
    passwordConfirmInput.focus();
    return alert("비밀번호 확인이 일치하지 않습니다.");
  } else if (!checkphoneNumber) {
    phoneNumberInput.focus();
    return alert("연락처 입력을 확인해주세요.");
  } else if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === "" ||
    passwordConfirmInput.value === "" ||
    phoneNumberInput.value === "" ||
    postCodeInput.value === "" ||
    addressInput.value === "" ||
    addressInput.value === "" ||
    detailAddressInput.value === ""
  ) {
    alert("빈 칸 없이 모두 입력해주세요.");
  }
  // 서버와의 통신으로 post 요청
  try {
    // 회원가입 요청한 회원의 정보들
    const joinUserData = { name, email, password, phoneNumber, userAddress };
    // 서버, db 와의 통신으로 회원가입 진행해야함
    /*
    // 서버 요청으로 사용자 정보 보내줘야함
    const join = await Api.post("/api/users/join", userData);
    localStorage.setItem("token", join.token);
    localStorage.setItem("token", join.refreshToken);
    localStorage.setItem("loggedIn", "true");

    alert(`정상적으로 회원가입되었습니다.`);

    */

    // 홈으로 보내줌
    window.location.href = "/";
  } catch (err) {
    console.error(err);
  }
}
