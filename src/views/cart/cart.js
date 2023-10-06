const cartItems = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const shipPriceElement = document.getElementById("ship-price");

// !!!! 서버에서 장바구니 정보 받아와서 products로 넣어줘야함 !!!!
const products = [
  {
    id: 1,
    name: "지웨이 프로틴 쉐이커",
    quantity: 1,
    price: 30000,
  },
  {
    id: 2,
    name: "지웨이 게이너",
    quantity: 1,
    price: 50000,
  },
  { id: 3, name: "지웨이 요가 매트", quantity: 1, price: 10000 },
  { id: 4, name: "지웨이 3kg 아령", quantity: 1, price: 15000 },
  { id: 5, name: "지웨이 마라 닭가슴살", quantity: 1, price: 20000 },
  { id: 6, name: "지웨이 비타민", quantity: 1, price: 25000 },
];

// 카드 내의 아이템 정렬
function renderCartItems() {
  cartItems.innerHTML = "";
  let totalPrice = 0;

  // 장바구니에 들어있는 상품들 td 형태로 만들어줌
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="product-image.jpg" alt="${
              product.id
            }사진" width="50"></td>
            <td>${product.name}</td>
            <td>
                <button class="quantity-btn" onclick="decreaseQuantity(${
                  product.id
                })">-</button>
                <input type="number" class="quantity-input" value="${
                  product.quantity
                }" min="1">
                <button class="quantity-btn" onclick="increaseQuantity(${
                  product.id
                })">+</button>
            </td>
            <td>${product.price * product.quantity}원</td>
            <td><button class="delete-btn" >X</button></td>
        `;

    cartItems.appendChild(row);
    totalPrice += product.price * product.quantity;
  });

  // 장바구니 내 상품 삭제 기능
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeItem(products[index].id); // 해당 제품의 id를 전달하여 removeItem 함수 호출
    });
  });

  totalPriceElement.textContent = totalPrice;

  // 총 주문금액이 0원이거나 10만원 이상이면 배송비 0 원
  // 총 주문금액이 1~99999 원 사이면 배송비 3000원
  if (totalPrice >= 100000) {
    shipPrice = 0;
  } else if (totalPrice < 100000 && totalPrice > 0) {
    shipPrice = 3000;
  } else {
    shipPrice = 0;
  }
  shipPriceElement.textContent = shipPrice;
}

function updateTotalPrice() {
  let totalPrice = 0;

  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });

  // 총 주문금액이 0원이거나 10만원 이상이면 배송비 0 원
  // 총 주문금액이 1~99999 원 사이면 배송비 3000원
  if (totalPrice >= 100000) {
    shipPrice = 0;
  } else if (totalPrice > 0) {
    shipPrice = 3000;
  } else {
    shipPrice = 0;
  }

  // 총 주문금액과 배송비 화면에 표시
  totalPriceElement.textContent = totalPrice;
  shipPriceElement.textContent = shipPrice;
}
renderCartItems();

// 카트의 각 제품 수량 증가 클릭 시 실행
function increaseQuantity(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    product.quantity += 1;
    updateTotalPrice(); // 총 주문금액 업데이트
    renderCartItems(); // 장바구니 아이템을 다시 렌더링하여 화면에 반영
  }
}

// 카트의 각 제품 수량 감소 클릭 시 실행
function decreaseQuantity(productId) {
  const product = products.find((item) => item.id === productId);
  if (product && product.quantity > 1) {
    product.quantity -= 1;
    updateTotalPrice(); // 총 주문금액 업데이트
    renderCartItems(); // 장바구니 아이템을 다시 렌더링하여 화면에 반영
  }
}

// 카트의 각 제품 삭제 버튼 클릭 시 실행
function removeItem(productId) {
  const index = products.findIndex((product) => product.id === productId);
  if (index !== -1) {
    products.splice(index, 1);

    // 카트 내의 아이템 재배열
    renderCartItems();
  }
}

// 주문하기 버튼 클릭 시 실행
function order() {
  if (products.length === 0) {
    alert("장바구니에 담은 상품이 없습니다.");
  } else {
    // 장바구니 상품 정보를 Json 문자열로 변환
    const cartInfo = JSON.stringify(products);
    // 장바구니 정보를 localStorage에 저장
    localStorage.setItem("cartInfo", cartInfo);
    // 주문하기 페이지로 이동
    window.location.href = "../order/order.html";
  }
}

// 계속 쇼핑하기 버튼 클릭 시 실행
function continueShopping() {
  // 계속 쇼핑하기 - 홈 경로로 이동
  window.location.href = "../home/home.html";
}
