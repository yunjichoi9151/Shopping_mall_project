// import * as Api from '/api.js';
// 관리자가 아니라면 튕겨내는 기능 구현 예정

// 리스트 들어가는 공간
const listContainer = document.querySelector('#list-container');
// 상품 관리 버튼
const orderBtn = document.querySelector('#order-btn');
const itemBtn = document.querySelector('#items-btn');
const categoryBtn = document.querySelector('#category-btn');
// 모달창
const modalBox = document.querySelector('#modal-container');
// 카테고리 목록 불러옴
// let categories = (await axios.get('../data/adminCategory.json')).data;

// *******************************************************************
document.addEventListener('DOMContentLoaded', () => {
  // 데이터 로드 후 로컬스토리지에 저장
  loadJsonAndSave();
  itemBtn.addEventListener('click', clickedItem);
});
async function loadJsonAndSave() {
  try {
    const response = await fetch('../data/adminItem.json');
    const data = await response.json();
    localStorage.setItem('adminItem', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to load JSON', error);
  }
}

// *******************************************************************
// 상품조회 버튼
async function clickedItem(e) {
  // 모달창 띄워져 있다면 없애기
  listContainer.innerHTML = '';
  modalBox.innerHTML = '';
  // 사이드바 카테고리 하단에 추가 있다면 삭제
  const categoryBtn_add = document.querySelector('#category-btn__add');
  if (categoryBtn_add.innerText !== '') {
    categoryBtn_add.innerText = '';
  }
  // 주문관리의 페이지 있다면 지우기
  const page_list = document.querySelector('#page_list');
  if (page_list.innerHTML !== '') {
    page_list.innerHTML = '';
  }

  // 상품추가 버튼 생성
  // if (document.querySelector('#items-btn__add').innerText === '') {
  //   addItemBtn();
  // }
  orderBtn.style.backgroundColor = 'white';
  orderBtn.style.color = 'black';
  itemBtn.style.backgroundColor = 'black';
  itemBtn.style.color = 'white';
  categoryBtn.style.backgroundColor = 'white';
  categoryBtn.style.color = 'black';

  // 카테고리 셀렉터 구현
  makeCategorySelecter();

  // 전체 상품 리스트 출력
  // makeItemsList('전체보기');
}

// *******************************************************************
// 카테고리 셀렉트 생성, 구현

async function makeCategorySelecter() {
  // const itemsCategorySelecter = document.querySelector(
  //   '#itemsCategorySelecter'
  // );
  const admin_item_title = document.createElement('div');
  admin_item_title.innerHTML = `
    <div class="item_header_wrap">
      <div class="item_title">상품 관리</div>
      <button class="item_add_btn">+ 상품 추가</button>
    </div>`;
  listContainer.appendChild(admin_item_title);
  const titleBox = document.createElement('div');
  titleBox.className = 'itemBox_title';
  titleBox.innerHTML = `
    <p class="itemBox_img">이미지</p>
    <p class="itemBox_name">이름</p>
    <p class="itemBox_price">가격</p>
    <p class="itemBox_category">카테고리</p>
    <p class="itemBox_date">생성날짜</p>
    <p class="itemBox_change">상품변경</p>
  `;
  listContainer.appendChild(titleBox);
  // 카테고리 데이터 새로고침 (카테고리 추가하고 넘어왔을 시 대비)
  // let categories = (await axios.get('../data/adminCategory.json')).data.data;
  // console.log(categories);
  // // option에 카테고리 + 미설정 넣음
  // categories.forEach((category) => {
  //   let option = document.createElement('option');
  //   option.innerText = category.name;
  //   itemsCategorySelecter.appendChild(option);
  // });

  // let noOption = document.createElement('option');
  // noOption.innerText = '미설정';
  // itemsCategorySelecter.appendChild(noOption);

  // 이벤트리스너 넣음
  // itemsCategorySelecter.addEventListener('change', async () => {
  // const pickCategoryName = itemsCategorySelecter.value;
  makeItemsList();
  // });
  // 클릭하면 해당 카테고리 값의 데이터 return
  // makeIemsList에 data 넘겨줌
}

// *******************************************************************
// 상품리스트 출력 함수
async function makeItemsList() {
  while (listContainer.children[2]) {
    listContainer.removeChild(listContainer.children[2]);
  }
  let data;
  try {
    const dataStr = localStorage.getItem('adminItem');
    data = JSON.parse(dataStr);
    console.log(data, '?');
  } catch (err) {
    window.location.reload();
  }
  for (let i = 0; i < data.length; i++) {
    const itemData = data[i];
    console.log(itemData);
    const itemBox = document.createElement('div');
    itemBox.className = 'itemBox';
    itemBox.innerHTML = `
      <img src=${itemData.mainImgUrl} class="itemBox_img" width="70"/>
      <div class="itemBox_name">${itemData.name}</div>
      <div class="itemBox_price">${new Intl.NumberFormat().format(
        itemData.price
      )}</div>
      <div class="itemBox_category">${itemData.category}</div>
      <div class="itemBox_date">${itemData.createdAt.slice(0, 10)}</div>
      <div id=${itemData._id} class="itemBox_btn">
        <button class="itemBox_btn_modifyBtn">상품수정</button>
        <button class="itemBox_btn_deleteBtn">상품삭제</button>
      </div>
    `;
    listContainer.appendChild(itemBox);
  }

  // 상품 삭제 버튼
  delItem();
  // 상품 판매시작 버튼
  // restartSaleItem();
  // 상품 수정 버튼
  modifyItem();
  addItemBtn();
}

// *******************************************************************
// 상품 수정 버튼
function modifyItem() {
  const itemBox_btn_modifyBtn = document.querySelectorAll(
    '.itemBox_btn_modifyBtn'
  );

  // 모달 안에 폼 넣기
  itemBox_btn_modifyBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.parentElement.id;
      const itemData = JSON.parse(localStorage.getItem('adminItem')).find(
        (item) => item._id === id
      );
      modalBox.innerHTML = `
      <form id="modal-container__inner" enctype="multipart/form-data">
        <p id="modalTitle">상품 수정</p>
        <div id="modalBox-name">
          <p>상품명</p>
          <input id="modalBox_nameInput" value="${itemData.name}"/>
        </div>
        <div id="modalBox-category">
          <p>카테고리</p>
          <select id="modalBox_categorySelect" value="${itemData.category}"></select>
        </div>
        <div id="modalBox-price">
          <p>가격</p>
          <input id="modalBox_priceInput" value="${itemData.price}"/>
        </div>
        <div id="modalBox-img">
          <p>이미지 URL</p>
          <input id="modalBox_imgInput" value="${itemData.mainImgUrl}"/>
        </div>
        <div id="modalBox_btns">
          <input type="submit" id="modalBox_doneBtn" class="button is-dark" value="수정 완료"></input>
          <button id="modalBox_cancelBtn" class="button is-dark">취소</button>
        </div>
      </form>
    `;

      const modalBox_categorySelect = document.querySelector(
        '#modalBox_categorySelect'
      );
      const dataStr = localStorage.getItem('adminCategory');
      console.log('wjwjwjwj');
      const categories = JSON.parse(dataStr).data;
      console.log('category', categories);

      categories.forEach((category) => {
        modalBox_categorySelect.innerHTML += `
      <option  ${itemData.category === category.name ? 'selected' : ''}>${
          category.name
        }</option>
    `;
      });

      const modalBox_form = document.querySelector('#modal-container__inner');

      modalBox_form.addEventListener('submit', (event) => {
        event.preventDefault();

        const modalBox_nameInput = document.querySelector(
          '#modalBox_nameInput'
        );
        const modalBox_categorySelect = document.querySelector(
          '#modalBox_categorySelect'
        );
        const modalBox_priceInput = document.querySelector(
          '#modalBox_priceInput'
        );
        const modalBox_imgInput = document.querySelector('#modalBox_imgInput');

        const name = modalBox_nameInput.value;
        const category = modalBox_categorySelect.value;
        const price = modalBox_priceInput.value;
        const mainImgUrl = modalBox_imgInput.value;

        if (!/[0-9]/.test(price)) {
          return alert('가격에 숫자를 입력해주세요');
        }

        const items = JSON.parse(localStorage.getItem('adminItem'));
        const itemIndex = items.findIndex((item) => item._id === id);

        items[itemIndex] = {
          ...items[itemIndex],
          name: name,
          category: category,
          price: price,
          mainImgUrl: mainImgUrl,
        };

        localStorage.setItem('adminItem', JSON.stringify(items));

        alert('수정했습니다');
        modalBox.innerHTML = '';
        makeItemsList();
        console.log('why?');
      });

      // 취소 버튼
      const modalBox_cancelBtn = document.querySelector('#modalBox_cancelBtn');
      modalBox_cancelBtn.addEventListener('click', () => {
        modalBox.innerHTML = '';
      });
    });
  });
}

// *******************************************************************
// 상품추가 버튼
function addItemBtn() {
  //추가할 버튼 생성
  const item_add_btn = document.querySelector('.item_add_btn');

  item_add_btn.addEventListener('click', async () => {
    modalBox.innerHTML = `
      <form id="modal-container__inner" enctype="multipart/form-data">
        <p id="modalTitle">상품 추가</p>
        <div id="modalBox-category">
          <p>카테고리</p>
          <select id="modalBox_categorySelect"></select>
        </div>
          <div id="modalBox-name">
            <p>상품명</p>
            <input id="modalBox_nameInput"/>
          </div>
          <div id="modalBox-price">
            <p>가격</p>
            <input id="modalBox_priceInput"/>
          </div>
          <div id="modalBox-img">
            <p>이미지</p>
            <input id="modalBox_imgInput"/>
          </div>
          <div id="modalBox_btns">
            <input type="submit" value="추가하기" id="modalBox_doneBtn" class="button is-dark"></input>
            <button id="modalBox_cancelBtn" class="button is-dark">취소</button>
          </div>
      </form>
    `;

    // 카테고리값 받아와서 select의 option 값으로 넣기
    const modalBox_categorySelect = document.querySelector(
      '#modalBox_categorySelect'
    );
    const dataStr = localStorage.getItem('adminCategory');
    console.log('wjwjwjwj');
    const categories = JSON.parse(dataStr).data;
    console.log('category', categories);

    categories.forEach((category) => {
      modalBox_categorySelect.innerHTML += `
     <option>${category.name}</option>
  `;
    });

    // 전체 폼 불러오기
    const modalBox_form = document.querySelector('#modal-container__inner');

    // 추가완료 처리: 폼에 submit 이벤트 넣기
    modalBox_form.addEventListener('submit', async (event) => {
      // 새로고침 방지
      event.preventDefault();

      // 폼 내부 input 불러오기
      const modalBox_nameInput = document.querySelector('#modalBox_nameInput');
      const modalBox_categorySelect = document.querySelector(
        '#modalBox_categorySelect'
      );
      const modalBox_priceInput = document.querySelector(
        '#modalBox_priceInput'
      );
      const modalBox_imgInput = document.querySelector('#modalBox_imgInput');

      // 이미지 파일 데이터 받아오기

      // 입력값 받아오기
      const name = modalBox_nameInput.value;
      const category = modalBox_categorySelect.value;
      const price = modalBox_priceInput.value;
      const mainImgUrl = modalBox_imgInput.value;

      if (!/[0-9]/.test(price)) {
        return alert('가격에 숫자를 입력해주세요');
      }

      // 추가 요청 보내기
      let items = JSON.parse(localStorage.getItem('adminItem')) || [];
      const newItem = {
        _id: (items.length + 1).toString(),
        name: name,
        category: category,
        price: price,
        mainImgUrl: mainImgUrl,
        createdAt: new Date().toISOString(),
      };
      items.push(newItem);
      localStorage.setItem('adminItem', JSON.stringify(items));
      alert('상품이 추가되었습니다.');
      // const result = await res.json();
      // alert(result.msg);
      modalBox.innerHTML = '';
      makeItemsList();
    });

    // 취소 버튼
    const modalBox_cancelBtn = document.querySelector('#modalBox_cancelBtn');
    modalBox_cancelBtn.addEventListener('click', () => {
      modalBox.innerHTML = '';
    });
  });
}

// *******************************************************************
// 상품 삭제 버튼
function delItem() {
  const itemBox_btn_deleteBtn = document.querySelectorAll(
    '.itemBox_btn_deleteBtn'
  );
  // 각 버튼에 이벤트리스너 적용
  itemBox_btn_deleteBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      // confirm으로 정말 삭제할 것인지 묻기
      if (!confirm('정말로 이 상품을 삭제하시겠습니까?')) {
        return;
      }

      const id = btn.parentElement.id;

      let items;
      try {
        // localStorage에서 데이터 가져오기
        const dataStr = localStorage.getItem('adminItem');
        items = JSON.parse(dataStr);
      } catch (err) {
        alert('데이터를 가져오는 데 실패했습니다.');
        return;
      }

      // 삭제할 아이템의 인덱스 찾기
      const itemIndex = items.findIndex((item) => item._id === id);

      // 인덱스를 찾지 못한 경우
      if (itemIndex === -1) {
        alert('삭제할 상품이 리스트에 없습니다.');
        return;
      }

      // 삭제 진행
      items.splice(itemIndex, 1);

      // localStorage 업데이트
      localStorage.setItem('adminItem', JSON.stringify(items));

      // 사용자에게 알리기
      alert('상품이 삭제되었습니다.');

      // 아이템 리스트 업데이트
      makeItemsList();
    });
  });
}

// *******************************************************************
// 상품 판매시작 버튼
// function restartSaleItem() {
//   const itemTableBody_row_restartBtns = document.querySelectorAll(
//     '.itemTableBody_row_restartBtn'
//   );

//   itemTableBody_row_restartBtns.forEach((btn) => {
//     btn.addEventListener('click', async () => {
//       const id = btn.parentElement.id;
//       await Api.patch(`/api/items/${id}`, '', {
//         name: undefined,
//         category: undefined,
//         price: undefined,
//         imageUrl: undefined,
//         itemDetail: undefined,
//         onSale: true,
//       });
//       alert('해당 상품이 판매 시작되었습니다.');
//       clickedItem();
//     });
//   });
// }
