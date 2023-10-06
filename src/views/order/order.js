// localStorage에서 장바구니 정보를 불러옴
const cartInfo = localStorage.getItem("cartInfo");
// JSON 문자열을 JavaScript 객체로 변환
const products = JSON.parse(cartInfo);
// 총 주문금액
const totalPrice = calculateTotalPrice(products);
const orderItems = document.getElementById("order-items");
const orderTotalPrice = document.getElementById("total-price");
orderTotalPrice.textContent = `${totalPrice} 원`;
// 배송비
const shipPriceElement = document.getElementById("ship-price");
const shipPrice = calculateShipPrice(totalPrice);
shipPriceElement.textContent = `${shipPrice} 원`;

// 주문 상품 그려줌
renderOrderItems(products, orderItems);

// 총 주문금액 계산
function calculateTotalPrice(products) {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice;
}

// 배송비 계산
function calculateShipPrice(totalPrice) {
  let shipPrice = 0;
  if (totalPrice < 100000) {
    shipPrice = 3000;
  }
  return shipPrice;
}

// 주문하기로 넘어온 아이템 그려줌
function renderOrderItems(products, element) {
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td><img src="product-image.jpg" alt="${
                      product.id
                    }사진" width="50"></td>
                    <td>${product.name}</td>
                    <td>
                        ${product.quantity}
                    </td>
                    <td>${product.price * product.quantity}</td>
                `;
    element.appendChild(row);
  });
}

// const userSame = document.getElementById("user-same");
// userSame.addEventListener("change", function () {
//   if (this.checked) {
//     // 서버로부터 받아온 계정 정보로 교환 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
//     const userInformation = {
//       userName: "John Doe",
//       userContact: "123-456-7890",
//       userPostcode: "12345",
//       userAddress: "123 Main St",
//       userDetailsAddress: "Apt 4B",
//     };
//     // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

//     // 수령인, 연락처, 우편번호, 주소, 상세주소 입력란에 주문자 정보 값 채우기
//     document.getElementById("recipient").value = userInformation.userName;
//     document.getElementById("contact").value = userInformation.userContact;
//     document.getElementById("postcode").value = userInformation.userPostcode;
//     document.getElementById("address").value = userInformation.userAddress;
//     document.getElementById("details-address").value =
//       userInformation.userDetailsAddress;
//   }
// });

const sameAsAccountCheckbox = document.getElementById("order-same");
const recipientInput = document.getElementById("recipient");
const contactInput = document.getElementById("contact");
const postcodeInput = document.getElementById("postcode");
const addressInput = document.getElementById("address");
const detailsAddressInput = document.getElementById("details-address");

sameAsAccountCheckbox.addEventListener("change", () => {
  if (sameAsAccountCheckbox.checked) {
    // !! 서버로부터 계정 정보 받아온 로직 추가해야함 !!
    const accountInfo = getAccountInfo(); // 예시 함수, 서버로부터 정보를 가져오는 함수를 구현해야 합니다.

    // 가져온 계정 정보를 주문 정보에 넣어줌
    recipientInput.value = accountInfo.recipient;
    contactInput.value = accountInfo.contact;
    postcodeInput.value = accountInfo.postcode;
    addressInput.value = accountInfo.address;
    detailsAddressInput.value = accountInfo.detailsAddress;
  } else {
    // 체크를 해제하면 필드를 비워줌
    recipientInput.value = "";
    contactInput.value = "";
    postcodeInput.value = "";
    addressInput.value = "";
    detailsAddressInput.value = "";
  }
});

// 계정 정보 불러오는 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function getAccountInfo() {
  // 서버 API를 호출하여 데이터를 받아오고 return 해줌 !!! 구현필요
  const addressData = {};
  return {
    // 예시 - 목업 data !!!!!
    recipient: addressData.recipient,
    contact: "010-5118-1571",
    postcode: "12345",
    address: "서울시 양천구 목동동로 50",
    detailsAddress: "목동아파트",
  };
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 빈 칸이 있으는지 확인
const deliveryNoteSelect = document.getElementById("delivery-note");

// 주문완료로 넘겨줄 주문 관련 정보
const orderInfo = {
  totalPrice: totalPrice,
  recipient: recipientInput,
  contect: contactInput,
  address: addressInput,
  detailAdress: detailsAddressInput,
  orderTime: new Date(),
};

sameAsAccountCheckbox.addEventListener("change", () => {
  if (sameAsAccountCheckbox.checked) {
    // 가져온 계정 정보를 주문 정보에 넣어줌
    recipientInput.value = accountInfo.recipient;
    contactInput.value = accountInfo.contact;
    postcodeInput.value = accountInfo.postcode;
    addressInput.value = accountInfo.address;
    detailsAddressInput.value = accountInfo.detailsAddress;
  } else {
    // 체크를 해제하면 필드를 비워줌
    recipientInput.value = "";
    contactInput.value = "";
    postcodeInput.value = "";
    addressInput.value = "";
    detailsAddressInput.value = "";
  }
});

// 동의버튼
const orderAgreeCheckbox = document.getElementById("order-agree");
// 결제수단
const paymentCard = document.getElementById("credit-card");
const paymentCash = document.getElementById("bank-transfer");

// 결제하기 눌렀을 때
const orderSubmitButton = document.getElementById("submit-order");
orderSubmitButton.addEventListener("click", () => {
  // 빈 칸 있을 때
  if (
    nameInput.value === "" ||
    phoneInput.value === "" ||
    emailInput.value === "" ||
    recipientInput.value === "" ||
    contactInput.value === "" ||
    postcodeInput.value === "" ||
    addressInput.value === "" ||
    detailAddressInput.value === "" ||
    deliveryNoteSelect.value === ""
  ) {
    alert("주문 정보를 모두 작성해주세요.");
  }
  // 동의 안 되었을 때
  else if (!orderAgreeCheckbox.checked) {
    alert("구매조건 확인 및 결제진행에 동의해주세요.");
  }
  // 결제수단 결정 안 되었을 때
  else if (!paymentCard.checked && !paymentCash.checked) {
    alert("결제수단을 확인해주세요.");
  }
  // 모두 제대로 됐을 때
  else {
    const orderInfoJSON = Json.stringify(orderInfo);
    localStorage.setItem("orderInfo", orderInfoJSON);
    window.location.href = "../order/orderComplete.html";
  }
});
