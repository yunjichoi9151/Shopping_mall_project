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
// 우편번호
const postCodeInput = document.querySelector("#postcode");
const postCode = postCodeInput.value;

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

// 주문요약 화면 출력
const orderSumText = document.getElementById("order-sum-text");
const orderSumNum = document.getElementById("order-sum-num");
orderSumText.textContent = `주문금액 [ ${totalPrice}원 ] + 배송비 [ ${shipPrice}원 ]`;
orderSumNum.textContent = `총 결제금액 [ ${totalPrice + shipPrice} 원]`;
// 주소찾기 버튼 클릭시 실행
const findAddressBtn = document.getElementById("find-address");
findAddressBtn.addEventListener("click", daumAddress);

// Daum 우편번호 서비스 활용
// https://postcode.map.daum.net/guide 참조
function daumAddress() {
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
      postcodeInput.value = data.zonecode;
      addressInput.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      detailAddressInput.focus();
    },
  }).open();
}

// 주문하기로 넘어온 아이템 그려줌
function renderOrderItems(products, element) {
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td><img src="${product.img}" alt="${
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

const sameAsAccountCheckbox = document.getElementById("order-same");
const recipientInput = document.getElementById("recipient");
const contactInput = document.getElementById("contact");
const postcodeInput = document.getElementById("postcode");
const addressInput = document.getElementById("address");
const detailAddressInput = document.getElementById("detail-address");

// 주문자 정보와 동일 radio 버튼 클릭 시 계정 정보로 작성란 채워줌
sameAsAccountCheckbox.addEventListener("change", () => {
  if (sameAsAccountCheckbox.checked) {
    // !! 서버로부터 계정 정보 받아온 로직 추가해야함 !!
    const accountInfo = getAccountInfo();

    // 가져온 계정 정보를 주문 정보에 넣어줌
    recipientInput.value = accountInfo.recipient;
    contactInput.value = accountInfo.contact;
    postcodeInput.value = accountInfo.postcode;
    addressInput.value = accountInfo.address;
    detailAddressInput.value = accountInfo.detailAddress;
    nameInput.value = accountInfo.recipient;
    phoneInput.value = accountInfo.contact;
    emailInput.value = accountInfo.email;
  } else {
    // 체크를 해제하면 필드를 비워줌
    recipientInput.value = "";
    contactInput.value = "";
    postcodeInput.value = "";
    addressInput.value = "";
    detailAddressInput.value = "";
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
  }
});

// 계정 정보 불러오는 함수 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
function getAccountInfo() {
  // 서버 API를 호출하여 데이터를 받아오고 return 해줌 !!! 구현필요
  const userData = {};
  return {
    // 예시 - 목업 data !!!!!
    // recipient: userData.recipient,
    recipient: "홍길동",
    contact: "010-5118-1571",
    postcode: "12345",
    address: "서울시 양천구 목동동로 50",
    detailAddress: "목동아파트 12단지 ",
    email: "abc@abc.com",
  };
}
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

// 빈 칸이 있으는지 확인
const deliveryNoteSelect = document.getElementById("delivery-note");

sameAsAccountCheckbox.addEventListener("change", () => {
  if (sameAsAccountCheckbox.checked) {
    // 가져온 계정 정보를 주문 정보에 넣어줌
    recipientInput.value = accountInfo.recipient;
    contactInput.value = accountInfo.contact;
    postcodeInput.value = accountInfo.postcode;
    addressInput.value = accountInfo.address;
    detailAddressInput.value = accountInfo.detailAddress;
  } else {
    // 체크를 해제하면 필드를 비워줌
    recipientInput.value = "";
    contactInput.value = "";
    postcodeInput.value = "";
    addressInput.value = "";
    detailAddressInput.value = "";
  }
});

const address = addressInput.value;
const detailAddress = detailAddressInput.value;

const nameInput = document.getElementById("name");
const buyer = nameInput.value;
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const buyerEmail = emailInput.value;
// 동의버튼
const orderAgreeCheckbox = document.getElementById("order-agree");
// 결제수단
const paymentCard = document.getElementById("credit-card");
const paymentCash = document.getElementById("bank-transfer");

// 결제하기 눌렀을 때
const orderSubmitButton = document.getElementById("submit-order");
orderSubmitButton.addEventListener("click", handleOrder);

async function handleOrder(e) {
  e.preventDefault();
  const currentDate = new Date();

  // 2023-10-05 15:30:00 형식으로 시간과 날짜 만들어줌
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const orderFormatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // 주문완료로 넘겨줄 주문 관련 정보
  const orderInfo = {
    postCode: postcodeInput.value,
    totalPrice: totalPrice,
    orderTime: orderFormatDate,
    recipient: recipientInput.value,
    contact: contactInput.value,
    address: addressInput.value,
    detailAddress: detailAddressInput.value,
    email: emailInput.value,
    orderProducts: products,
  };
  const userAddress = `(${orderInfo.postCode}) ${orderInfo.address} ${orderInfo.detailAddress}`;
  // 빈 칸 있을 때
  if (
    nameInput.value === "" ||
    phoneInput.value === "" ||
    emailInput.value === "" ||
    recipientInput.value === "" ||
    contactInput.value === "" ||
    postcodeInput.value === "" ||
    addressInput.value === "" ||
    detailAddressInput.value === ""
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
  } else {
    try {
      // 모두 제대로 됐을 때
      const orderInfoJSON = JSON.stringify(orderInfo);
      localStorage.setItem("orderInfo", orderInfoJSON);

      const orderData = {
        buyer: orderInfo.recipient,
        buyerEmail: orderInfo.email,
        address: userAddress,
        orderInfo: products,
        totalPrice: orderInfo.totalPrice,
      };
      console.log(orderData);

      const res = await axios.post("/api/order", orderData);
      alert(`${orderInfo.recipient} 님, 주문 완료 되었습니다.`);
      window.location.href = "../order/orderComplete.html";
    } catch (err) {
      console.error(err);
      alert("주문에 실패했습니다. 다시 시도해주세요.");
    }
  }
}
