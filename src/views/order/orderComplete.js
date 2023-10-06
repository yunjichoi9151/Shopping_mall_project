// localStorage에서 주문 정보를 가져옴
const orderInfoJSON = localStorage.getItem("orderInfo");
const orderInfo = JSON.parse(orderInfoJSON);

// 주문 정보를 화면에 표시
if (orderInfo) {
  document.getElementById("order-total-price").textContent =
    orderInfo.totalPrice + "원";
  document.getElementById("order-name").textContent = orderInfo.recipient;
  document.getElementById("order-phone").textContent = orderInfo.contact;
  document.getElementById("order-address").textContent = orderInfo.address;
  document.getElementById("order-detail-address").textContent =
    orderInfo.detailAddress;
  document.getElementById("order-date").textContent = orderInfo.orderTime;
} else {
  // 주문 정보가 없는 경우 처리 (예를 들어, 주문 정보가 올바르게 전달되지 않은 경우)
  alert("주문 정보를 가져올 수 없습니다.");
  // 이 경우 메인 페이지 등으로 이동하거나 다른 처리를 수행할 수 있습니다.
}

// 홈으로 가기
const homeButton = document.getElementById("homeBtn");
homeButton.addEventListener("click", () => {
  window.location.href = "../home/home.html";
});
