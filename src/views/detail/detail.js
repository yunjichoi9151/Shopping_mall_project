// import * as Api from '../api';
// import axios from '../../../node_modules/axios/dist/esm/axios.min.js';
import { addCommas, convertNumber } from '../functions.js';

const itemMainImg = document.querySelector('.mainImg');
const itemCategory = document.querySelector('.categoryName');
const itemName = document.querySelector('.itemName');
const itemPrice = document.querySelector('.price');
const itemDeliveryHow = document.querySelector('.deliveryHowInfo');
const itemDeliveryPrice = document.querySelector('.deliveryPriceInfo');
const itemDeliveryWhen = document.querySelector('.deliveryWhenInfo');
const itemDetailImg = document.querySelector('.detailImg');
const minusBtn = document.querySelector('.minusButton');
const plusBtn = document.querySelector('.plusButton');
const salesCount = document.querySelector('.salesCount');
const buyNowBtn = document.querySelector('.buyNowButton');
const cartBtn = document.querySelector('.moveTocartButton');

let id, quantity;

// 물건 수량 조절
document.addEventListener('DOMContentLoaded', function () {
  quantity = 1;
  plusBtn.addEventListener('click', function () {
    quantity++;
    salesCount.innerText = quantity;
  });
  minusBtn.addEventListener('click', function () {
    if (quantity > 1) {
      quantity--;
      salesCount.innerText = quantity;
    }
  });
  getDetail();
});

// GET 상세페이지 data
async function getDetail() {
  // const res = await Api.get(
  //   '/api/items',
  //   `${localStorage.getItem('itemDetail')}`
  // );

  // 임시 테스트용
  const res = await axios.get('../data/itemDetail.json');

  const {
    _id,
    name,
    category,
    price,
    deliveryHow,
    deliveryPrice,
    deliveryWhen,
    mainImgUrl,
    detailImgUrl,
  } = res.data;

  id = _id;
  itemName.innerHTML = name;
  itemCategory.innerHTML = category;
  itemPrice.innerHTML = `${addCommas(price)}원`;
  itemDeliveryHow.innerHTML = deliveryHow;
  itemDeliveryPrice.innerHTML = `${addCommas(deliveryPrice)}원`;
  itemDeliveryWhen.innerHTML = deliveryWhen;
  itemMainImg.src = mainImgUrl;
  itemDetailImg.src = detailImgUrl;
}

// DB 생성 & 데이터 저장
function saveData(salesCount, storeName) {
  if (window.indexedDB) {
    const databaseName = 'cart';
    const version = 1;
    const request = indexedDB.open(databaseName, version);

    const data = {
      id: id,
      name: itemName.innerHTML,
      category: itemCategory.innerHTML,
      price: convertNumber(itemPrice.innerHTML),
      deliveryHow: itemDeliveryHow.innerHTML,
      deliveryPrice: convertNumber(itemDeliveryPrice.innerHTML),
      deliveryWhen: itemDeliveryWhen.innerHTML,
      mainImgUrl: itemMainImg.innerHTML,
      detailImgUrl: itemDetailImg.innerHTML,
    };

    request.onupgradeneeded = function () {
      // 장바구니
      request.result.createObjectStore('items', { autoIncrement: true });
      // 바로구매
      request.result.createObjectStore('nowBuy', { keyPath: 'id' });
    };

    request.onsuccess = function () {
      localStorage.setItem('storeName', storeName);
      const objStore = request.result
        .transaction(`${storeName}`, 'readwrite')
        .objectStore(`${storeName}`);

      if (storeName == 'items') {
        isExist(data, objStore);
      } else {
        objStore.add(data);
      }
    };
    request.onerror = function (event) {
      alert(event.target.errorCode);
    };
  }
}

// 상품이 cart에 이미 담겨있는지 확인
function isExist(data, objStore) {
  const requestExists = objStore.get(`${data.id}`);
  requestExists.onerror = function (event) {
    console.log(event);
  };
  requestExists.onsuccess = function (event) {
    const record = event.target.result;
    if (record === undefined) {
      objStore.add(data);
      return;
    } else {
      record.sales += 1;
      var requestUpdate = objStore.put(record);
      requestUpdate.onerror = function (event) {
        console.log(event);
      };
      requestUpdate.onsuccess = function (event) {
        // console.log("Success")
      };
    }
  };
}

// cartBtn
cartBtn.addEventListener('click', function () {
  saveData(salesCount, 'items');
  const moveToCart = confirm(
    '상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?'
  );
  if (moveToCart) {
    window.location.href = '/cart';
  }
});

// buyNow
// login 여부 확인 로직 X
buyNowBtn.addEventListener('click', function () {
  const buyNow = confirm('바로 구매하시겠습니까?');
  if (buyNow) {
    saveData(salesCount, 'nowBuy');
    localStorage.setItem('keys', localStorage.getItem('itemDetail'));
    window.location.href = '/order';
    return;
  }
});
