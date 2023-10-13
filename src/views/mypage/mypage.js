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
  const subAddressInput = document.getElementById("subAddress"); // 서브주소 입력 요소 가져오기

  memberSpan.textContent = `${user.name} 님 안녕하세요`;

  // 각 입력 요소의 value 속성을 설정하여 사용자 정보를 업데이트
  emailInput.value = user.email;
  nameInput.value = user.name;
  phoneInput.value = user.phone;
  addressInput.value = user.address;
  subAddressInput.value = user.subAddress;
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

// 정보수정 주소찾기
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을 때 실행할 코드를 작성하는 부분
      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      var addr = data.address; // 최종 주소 변수

      // 주소 정보를 해당 필드에 넣는다.
      document.getElementById("address").value = addr;
    },
  }).open();
}

document.getElementById("address").addEventListener("click", searchAddress);

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
    alert("회원 탈퇴완료.");
  }
}

// // 주문조회 가져오기
// async function fetchSpecificUsers() {
//   try {
//     const response = await fetch("../data/itemDetail.json");
//     const users = await response.json();

//     const specificUsers = users.filter((user) =>
//       [15, 18, 20].includes(user.id)
//     );

//     specificUsers.forEach((user) => {
//       updateOrderInfo(user);
//     });
//   } catch (error) {
//     console.error("Failed to fetch user data:", error);
//   }
// }

// function updateOrderInfo(user) {
//   user.orders.forEach((order) => {
//     const orderBox = document.querySelector(".orderListBox");

//     const orderWrapper = document.createElement("div");
//     orderWrapper.classList.add("orderListWapper");

//     // 상품 이미지 요소 생성 및 속성 설정
//     const productImg = document.createElement("img");
//     productImg.src = order.productImage;
//     productImg.alt = order.productName;
//     orderWrapper.appendChild(productImg);

//     // 상품 이름 요소 생성 및 텍스트 설정
//     const orderText = document.createElement("div");
//     orderText.classList.add("orderText");
//     const productName = document.createElement("span");
//     productName.classList.add("orderProductName");
//     productName.textContent = order.productName;
//     orderText.appendChild(productName);
//     orderWrapper.appendChild(orderText);

//     // 상품 가격 및 수량 요소 생성 및 텍스트 설정
//     const orderPriceBox = document.createElement("div");
//     orderPriceBox.classList.add("orderPrice");
//     const priceSpan = document.createElement("span");
//     priceSpan.textContent = order.price + "원";
//     const quantitySpan = document.createElement("span");
//     quantitySpan.textContent = order.quantity + "개";
//     orderPriceBox.appendChild(priceSpan);
//     orderPriceBox.appendChild(quantitySpan);
//     orderText.appendChild(orderPriceBox);

//     // 상품 상태 및 취소 버튼 요소 생성 및 텍스트 설정
//     const orderFinish = document.createElement("div");
//     orderFinish.classList.add("orderFinish");
//     orderFinish.textContent = "입금완료";
//     orderWrapper.appendChild(orderFinish);
//     const cancelButton = document.createElement("button");
//     cancelButton.textContent = "취소";
//     orderWrapper.appendChild(cancelButton);

//     // 만든 요소를 페이지에 추가
//     orderBox.appendChild(orderWrapper);
//   });
// }

// fetchSpecificUsers();
