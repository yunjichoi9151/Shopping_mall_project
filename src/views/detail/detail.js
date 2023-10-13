// import * as Api from '../api';
// import axios from '../../../node_modules/axios/dist/esm/axios.min.js';
import { addCommas, convertNumber } from "../functions.js";

const itemMainImg = document.querySelector(".mainImg");
const itemCategory = document.querySelector(".categoryName");
const itemName = document.querySelector(".itemName");
const itemPrice = document.querySelector(".price");
// const itemDeliveryHow = document.querySelector('.deliveryHowInfo');
// const itemDeliveryPrice = document.querySelector('.deliveryPriceInfo');
// const itemDeliveryWhen = document.querySelector('.deliveryWhenInfo');
const itemDetailImg = document.querySelector(".detailImg");
const minusBtn = document.querySelector(".minusButton");
const plusBtn = document.querySelector(".plusButton");
const salesCount = document.querySelector(".salesCount");
const buyNowBtn = document.querySelector(".buyNowButton");
const cartBtn = document.querySelector(".moveTocartButton");

let id, quantity;

function createProductData() {
  return {
    name: itemName.innerHTML,
    quantity: quantity,
    img: itemMainImg.src,
    price: convertNumber(itemPrice.innerHTML),
  };
}

function addProductToCart() {
  saveData(createProductData());
  const moveToCart = confirm(
    "상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?"
  );
  if (moveToCart) {
    window.location.href = "../cart/cart.html";
  }
}

function buyProduct() {
  // localStorage.removeItem('cartInfo');
  // localStorage.setItem('cartInfo', JSON.stringify([createProductData()]));

  const newProduct = createProductData();

  // 기존 cartInfo에 새로운 상품을 추가
  existingCartInfo.push(newProduct);
  // 수정된 cartInfo를 로컬스토리지에 저장
  localStorage.setItem("cartInfo", JSON.stringify(existingCartInfo));

  window.location.href = "../order/order.html";
}

// localStorage에 상품 정보 저장
function saveData(product) {
  const cartInfo = JSON.parse(localStorage.getItem("cartInfo")) || [];
  const existingProduct = cartInfo.find((p) => p.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cartInfo.push(product);
  }
  localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
}

// 물건 수량 조절, 버튼 이벤트
document.addEventListener("DOMContentLoaded", function () {
  quantity = 1;
  plusBtn.addEventListener("click", function () {
    quantity++;
    salesCount.innerText = quantity;
  });
  minusBtn.addEventListener("click", function () {
    if (quantity > 1) {
      quantity--;
      salesCount.innerText = quantity;
    }
  });
  getDetail();
  cartBtn.addEventListener("click", addProductToCart);

  buyNowBtn.addEventListener("click", function () {
    const buyNow = confirm("바로 구매하시겠습니까?");
    if (buyNow) {
      buyProduct();
    }
  });
});

// GET 상세페이지 data
async function getDetail() {
  // const res = await Api.get(
  //   '/api/items',
  //   `${localStorage.getItem('itemDetail')}`
  // );

  // 임시 테스트용
  const res = await axios.get("../data/itemDetail.json");

  const {
    _id,
    name,
    category,
    price,
    // deliveryHow,
    // deliveryPrice,
    // deliveryWhen,
    mainImgUrl,
    detailImgUrl,
  } = res.data;

  id = _id;
  itemName.innerHTML = name;
  itemCategory.innerHTML = category;
  itemPrice.innerHTML = `${addCommas(price)}원`;
  // itemDeliveryHow.innerHTML = deliveryHow;
  // itemDeliveryPrice.innerHTML = `${addCommas(deliveryPrice)}원`;
  // itemDeliveryWhen.innerHTML = deliveryWhen;
  itemMainImg.src = mainImgUrl;
  itemDetailImg.src = detailImgUrl;
}
