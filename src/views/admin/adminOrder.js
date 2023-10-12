// 관리자가 아니라면 튕겨내는 기능 구현 예정
// 리스트 들어가는 공간
// import * as Api from '../public/api/api.js';
const listContainer = document.querySelector('#list-container');
// 주문 관리 버튼
const orderBtn = document.querySelector('#order-btn');
// 모달창
const modalBox = document.querySelector('#modal-container');
const page_list = document.querySelector('#page_list');

orderBtn.addEventListener('click', clickedOrder);

// *******************************************************************
// 주문 조회 클릭
async function clickedOrder() {
  // 화면 초기화
  listContainer.innerHTML = '';
  modalBox.innerHTML = '';

  // 상품관리, 카테고리관리 하단에 버튼 있다면 지우기
  const categoryBtn_add = document.querySelector('#category-btn__add');
  const itemsBtn_add = document.querySelector('#items-btn__add');
  if (categoryBtn_add.innerText !== '') {
    categoryBtn_add.innerText = '';
  }
  if (itemsBtn_add.innerText !== '') {
    itemsBtn_add.innerText = '';
  }

  if (page_list.innerHTML === '') {
    // pagenation();
  }
  orderBtn.style.backgroundColor = 'black';
  orderBtn.style.color = 'white';

  makeOrderList();
  console.log('is in?');
}

// 리스트 출력 함수
async function makeOrderList() {
  // 주문 리스트 데이터 받아오기
  let data;
  try {
    // data = (await Api.get(`/api/orders?page=${page}`)).data;
    const res = await axios.get('/api/admin');
    data = res.data;
    console.log(data);
  } catch (err) {
    window.location.reload();
  }
  // console.log(data);
  //한 사람의 주문정보 넣기
  const admin_order_title = document.createElement('div');
  admin_order_title.innerHTML = `<div class="order_title">주문 관리</div>`;
  listContainer.appendChild(admin_order_title);
  const titleBox = document.createElement('div');
  titleBox.className = 'orderBox_title';
  titleBox.innerHTML = `
    <p class="orderBox_date">주문일시</p>
    <p class="orderBox_num">주문번호</p>
    <p class="orderBox_item">주문상품</p>
    <p class="orderBox_ship">배송상태</p>
    <p class="orderBox_info">고객정보</p>
    <p class="orderBox_change">주문변경</p>
  `;
  listContainer.appendChild(titleBox);
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].createdAt);
    const orderBox = document.createElement('div');
    orderBox.className = 'orderBox box';

    // ------------------------------------------------
    // orderBox = orderBox_order + orderBox_user + orderBox_btn
    //상품배송정보
    const orderBox_order = document.createElement('div');
    orderBox_order.className = 'orderBox_order';

    //주문날짜, 주문시간, 주문번호
    const orderBox_order_date = document.createElement('div');
    orderBox_order_date.className = 'orderBox_order_date';
    const DATE = data[i].createdAt;
    console.log(DATE);
    // console.log(data[i].itemInfo);

    //날짜랑 시간 분리해서 출력
    orderBox_order_date.innerHTML = `
        <p class="orderBox_date">${DATE.slice(0, 10)}<br>${DATE.slice(
      11,
      19
    )}</p>
        <p class="orderBox_num">${data[i]._id}</p>
    `;

    // 주문상품
    const orderBox_order_items = document.createElement('div');
    orderBox_order_items.className = 'orderBox_item';
    for (let j = 0; j < data[i].itemInfo.length; j++) {
      console.log(data[i].itemInfo[j]);
      const item = document.createElement('p');
      item.innerText = `${data[i].itemInfo[j]}`;
      orderBox_order_items.appendChild(item);
    }

    // 상품수량
    // const orderBox_order_amount = document.createElement('div');
    // orderBox_order_amount.innerHTML = `<p>${data[i].itemAmount}</>`;

    // 배송상태
    const orderBox_order_shippingState = document.createElement('p');
    orderBox_order_shippingState.innerHTML = `<div class="orderBox_ship">${data[i].status}</div>`;

    // 요청메세지(배송메시지)
    // const orderBox_order_shippingMsg = document.createElement('p');
    // orderBox_order_shippingMsg.innerText = data[i].요청사항;

    orderBox_order.appendChild(orderBox_order_date);
    orderBox_order.appendChild(orderBox_order_items);
    // orderBox_order.appendChild(orderBox_order_amount);
    orderBox_order.appendChild(orderBox_order_shippingState);
    // orderBox_order.appendChild(orderBox_order_shippingMsg);

    // -------------------------------------------------------
    // 주문자 정보
    const orderBox_user = document.createElement('div');
    orderBox_user.className = 'orderBox_info';

    orderBox_user.innerHTML = `
      <div>${data[i].buyer.name}</div>
      <div>${data[i].buyer.email}</div>
      <div>${data[i].buyer.phoneNumber}</div>
    `;

    const orderBox_btn = document.createElement('div');
    orderBox_btn.className = 'orderBox_btn';
    orderBox_btn.id = data[i]._id;
    // <label>배송상태변경</label>
    orderBox_btn.innerHTML = `
      <select class="orderBox_btn_select">
      <option>배송준비중</option>
      <option>배송중</option>
      <option>배송완료</option>
      </select> 
      <button class="orderBox_btn_delBtn button is-dark">주문삭제</button>
        `;

    // ------------------------------------------------------
    // listContainer에 모든 box 삽입
    orderBox.appendChild(orderBox_order);
    orderBox.appendChild(orderBox_user);
    orderBox.appendChild(orderBox_btn);
    listContainer.appendChild(orderBox);
  }

  // 주문 삭제 버튼 이벤트 추가
  delOrder();

  // 배송 상태 변경 이벤트 추가
  changeShippingState();
}

// *******************************************************************
// 주문 삭제 구현 함수
function delOrder() {
  // 주문삭제 버튼
  const orderBox_btn_delBtns = document.querySelectorAll(
    '.orderBox_btn_delBtn'
  );

  orderBox_btn_delBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.parentElement.id;
      await axios.delete(`/api/admin`, '', {
        id: id,
        reson: 'orderCancel',
      });
      alert('삭제되었습니다!');
      clickedOrder();
    });
  });
}

// *******************************************************************
// 배송상태 변경 구현 함수
function changeShippingState() {
  // 배송상태 변경
  const orderBox_btn_selects = document.querySelectorAll(
    '.orderBox_btn_select'
  );
  orderBox_btn_selects.forEach((select) => {
    select.addEventListener('change', async () => {
      const id = select.parentElement.id;
      // 선택된 배송상태
      const changedState = select.value;
      await Api.patch('/api/orders', '', {
        id: id,
        reson: changedState,
      });
      alert('배송상태가 변경되었습니다');
      clickedOrder();
    });
  });
}
