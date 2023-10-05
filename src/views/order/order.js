document.addEventListener("DOMContentLoaded", function () {
  // localStorage에서 장바구니 정보를 불러옴
  const cartInfo = localStorage.getItem("cartInfo");
  // JSON 문자열을 JavaScript 객체로 변환
  const products = JSON.parse(cartInfo);
  const totalPrice = calculateTotalPrice(products);
  const orderItems = document.getElementById("order-items");
  const orderTotalPrice = document.getElementById("total-price");
  orderTotalPrice.textContent = `${totalPrice} 원`;

  renderOrderItems(products, orderItems);
});

function calculateTotalPrice(products) {
  let totalPrice = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice;
}

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
