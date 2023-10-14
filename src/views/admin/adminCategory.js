// import * as Api from "/api.js";
// 관리자가 아니라면 튕겨내는 기능 구현 예정

// 화면이 들어가는 공간
const listContainer = document.querySelector('#list-container');
// 카테고리 관리 버튼
const orderBtn = document.querySelector('#order-btn');
const itemBtn = document.querySelector('#items-btn');
const categoryBtn = document.querySelector('#category-btn');
// 모달창
const categoryAddBox = document.querySelector('#modal-container');

// 버튼에 이벤트 넣기

// *******************************************************************
document.addEventListener('DOMContentLoaded', () => {
  // 데이터 로드 후 로컬스토리지에 저장
  loadJsonAndSave();
  categoryBtn.addEventListener('click', clickedCategory);
});
async function loadJsonAndSave() {
  try {
    const response = await fetch('../data/adminCategory.json');
    const data = await response.json();
    localStorage.setItem('adminCategory', JSON.stringify(data));
  } catch (error) {
    console.error('Failed to load JSON', error);
  }
}

// *******************************************************************
// 카테고리 관리 버튼
async function clickedCategory() {
  // 화면 초기화 (모달창 지우거)
  listContainer.innerHTML = '';
  categoryAddBox.innerHTML = '';

  // 사이드바: 상품관리 하단에 버튼 있다면 지우기
  const itemsBtn_add = document.querySelector('#items-btn__add');

  if (itemsBtn_add.innerText !== '') {
    itemsBtn_add.innerText = '';
  }

  // 주문관리의 페이지 있다면 지우기
  const page_list = document.querySelector('#page_list');
  if (page_list.innerHTML !== '') {
    page_list.innerHTML = '';
  }
  orderBtn.style.backgroundColor = 'white';
  orderBtn.style.color = 'black';
  itemBtn.style.backgroundColor = 'white';
  itemBtn.style.color = 'black';
  categoryBtn.style.backgroundColor = 'black';
  categoryBtn.style.color = 'white';

  // 리스트 출력
  makeCategoryList();
}

// *******************************************************************
// 카테고리 리스트 출력
async function makeCategoryList() {
  const admin_category_title = document.createElement('div');
  admin_category_title.innerHTML = `
    <div class="item_header_wrap">
      <div class="item_title">카테고리 관리</div>
    </div>`;
  listContainer.appendChild(admin_category_title);
  while (listContainer.children[1]) {
    listContainer.removeChild(listContainer.children[1]);
  }
  const dataStr = localStorage.getItem('adminCategory');
  const categories = JSON.parse(dataStr).data;
  console.log(categories, '########');
  // 모든 카테고리 불러옴
  // const categories = (await Api.get('/api/categories/all')).data;
  // 리스트가 들어갈 공간
  const admin_category_parent = document.createElement('div');
  admin_category_parent.classList.add('admin_category_parent');

  const admin_category_head = document.createElement('div');
  admin_category_head.classList.add('admin_category_head');
  admin_category_head.innerText = '대분류';
  admin_category_parent.appendChild(admin_category_head);

  const admin_category_items = document.createElement('div');
  admin_category_items.classList.add('admin_category_items');
  admin_category_parent.appendChild(admin_category_items);
  // 대분류만 가져오기
  const mainCategories = categories.filter(
    (category) => category.parentCategoryId === null
  );
  const admin_wrap_all = document.createElement('div');
  admin_wrap_all.classList.add('admin_wrap_all');

  // 대분류를 admin_category_items에 추가하기
  mainCategories.forEach((category) => {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('admin_category_item'); // 스타일을 적용할 클래스
    categoryItem.innerHTML = `
      <div class="admin_category_item_text">
      ${category.name}</div>`; // 카테고리 이름
    const categoryItemBtnWrap = document.createElement('div');
    categoryItemBtnWrap.classList.add('admin_category_item_btnWrap');
    const modifyBtn = document.createElement('button');
    modifyBtn.classList.add('admin_category_modify');
    modifyBtn.innerHTML = `<img src="../public/img/modify.png"/>`;
    categoryItemBtnWrap.appendChild(modifyBtn);
    modifyBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // 상위의 클릭 이벤트 방지
      modifyCategory(category._id, category.name);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('admin_category_delete');
    deleteBtn.innerHTML = `<img src="../public/img/delete.png"/>`;
    categoryItemBtnWrap.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // 상위의 클릭 이벤트 방지
      delCategory(category._id);
      categoryItem.remove(); // DOM에서 해당 아이템 삭제
    });
    categoryItem.appendChild(categoryItemBtnWrap);
    admin_category_items.appendChild(categoryItem);
    // 대분류 아이템 클릭 이벤트 추가
    categoryItem.addEventListener('click', function () {
      // 모든 대분류 아이템의 배경색을 원래대로 되돌림
      const allCategoryItems = document.querySelectorAll(
        '.admin_category_item'
      );

      allCategoryItems.forEach((item) => {
        item.classList.remove('selected');
      });

      // 클릭된 아이템에 selected 클래스 추가
      this.classList.add('selected');
      showSubcategories(category._id); // 소분류 목록을 표시하는 함수를 호출
    });
  });
  const mainCategoryAdd = document.createElement('div');
  mainCategoryAdd.classList.add('main_category_add_btn');
  mainCategoryAdd.textContent = '+ 추가';
  admin_category_parent.appendChild(mainCategoryAdd);
  mainCategoryAdd.addEventListener('click', () => addCategory(null));
  admin_wrap_all.appendChild(admin_category_parent);
  // 소분류 목록을 보여주는 함수
  const admin_subcategory_parent = document.createElement('div');
  admin_subcategory_parent.classList.add('admin_subcategory_parent');

  const admin_subcategory_head = document.createElement('div');
  admin_subcategory_head.classList.add('admin_category_head');
  admin_subcategory_head.innerText = '소분류';
  admin_subcategory_parent.appendChild(admin_subcategory_head);

  const admin_subcategory_items = document.createElement('div');
  admin_subcategory_items.classList.add('admin_subcategory_items');
  admin_subcategory_parent.appendChild(admin_subcategory_items);

  admin_wrap_all.appendChild(admin_subcategory_parent); // 이 부분을 먼저 추가
  listContainer.appendChild(admin_wrap_all);
  // 소분류 목록을 보여주는 함수
  function showSubcategories(parentId) {
    // 이전에 표시된 소분류 아이템을 모두 제거
    const existingSubcategoryItems = document.querySelectorAll(
      '.admin_subcategory_item'
    );
    existingSubcategoryItems.forEach((item) => item.remove());

    // 이미 존재하는 "추가" 버튼을 확인하고 삭제
    const existingAddButton = document.querySelector('.sub_category_add_btn');
    if (existingAddButton) {
      existingAddButton.remove();
    }

    // 소분류를 필터링
    const subcategories = categories.filter(
      (category) => category.parentCategoryId === parentId
    );

    // 소분류 아이템 생성
    subcategories.forEach((subcategory) => {
      const subcategoryItem = document.createElement('div');
      subcategoryItem.classList.add('admin_subcategory_item');
      subcategoryItem.innerHTML = `<div class="admin_subcategory_item_text">${subcategory.name}</div>`;
      const subcategoryItemBtnWrap = document.createElement('div');
      subcategoryItemBtnWrap.classList.add('admin_subcategory_item_btnWrap');
      const submodifyBtn = document.createElement('button');
      submodifyBtn.classList.add('admin_subcategory_modify');
      submodifyBtn.innerHTML = `<img src="../public/img/modify.png"/>`;
      subcategoryItemBtnWrap.appendChild(submodifyBtn);
      submodifyBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // 상위의 클릭 이벤트 방지
        modifyCategory(subcategory._id, subcategory.name);
      });
      const subdeleteBtn = document.createElement('button');
      subdeleteBtn.classList.add('admin_subcategory_delete');
      subdeleteBtn.innerHTML = `<img src="../public/img/delete.png"/>`;
      subcategoryItemBtnWrap.appendChild(subdeleteBtn);
      subdeleteBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // 상위의 클릭 이벤트 방지
        delCategory(subcategory._id);
        subcategoryItem.remove(); // DOM에서 해당 아이템 삭제
      });
      subcategoryItem.appendChild(subcategoryItemBtnWrap);
      admin_subcategory_items.appendChild(subcategoryItem);
    });
    const subCategoryAdd = document.createElement('div');
    subCategoryAdd.classList.add('sub_category_add_btn');
    subCategoryAdd.textContent = '+ 추가';
    admin_subcategory_parent.appendChild(subCategoryAdd);
    subCategoryAdd.addEventListener('click', () => addCategory(parentId));
    admin_wrap_all.appendChild(admin_subcategory_parent);
  }
  listContainer.appendChild(admin_wrap_all);
}
// *******************************************************************
// 추가 버튼 함수
// 카테고리 추가 함수
function addCategory(parentId = null) {
  const categoryName = prompt('새로운 카테고리 이름을 입력하세요');

  // 사용자가 입력을 취소하거나 빈 문자열을 입력했을 경우
  if (!categoryName || categoryName.trim() === '') {
    return; // 함수 종료
  }

  // 새로운 카테고리 객체 생성
  const newCategory = {
    _id: Date.now().toString(), // 임시 ID 값 (실제 서버 환경에서는 다르게 처리해야 함)
    name: categoryName,
    items: [{}],
    parentCategoryId: parentId,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    deletedAt: null,
    __v: 0,
  };

  // 카테고리 데이터 로컬스토리지에 추가
  const dataStr = localStorage.getItem('adminCategory');
  const categories = JSON.parse(dataStr).data;
  categories.push(newCategory);
  localStorage.setItem('adminCategory', JSON.stringify({ data: categories }));

  alert('카테고리가 추가되었습니다');
  makeCategoryList();
}
// *******************************************************************
// 삭제 버튼 함수
// 카테고리 삭제 함수
function delCategory(id) {
  const confirmation = confirm('정말로 이 카테고리를 삭제하시겠습니까?');
  if (confirmation) {
    const dataStr = localStorage.getItem('adminCategory');
    const categories = JSON.parse(dataStr).data;
    const updatedCategories = categories.filter(
      (category) => category._id !== id && category.parentCategoryId !== id
    );
    localStorage.setItem(
      'adminCategory',
      JSON.stringify({ data: updatedCategories })
    );
    alert('삭제되었습니다');
    makeCategoryList();
  }
}

// *******************************************************************
// 수정버튼 함수
function modifyCategory(id, oldValue) {
  const newName = prompt('수정할 카테고리 이름으로 입력하세요', oldValue);
  if (newName && newName !== oldValue) {
    const dataStr = localStorage.getItem('adminCategory');
    const categories = JSON.parse(dataStr).data;
    const updatedCategories = categories.map((category) => {
      if (category._id === id) {
        category.name = newName;
      }
      return category;
    });
    localStorage.setItem(
      'adminCategory',
      JSON.stringify({ data: updatedCategories })
    );
    alert('수정되었습니다');
    makeCategoryList();
  }
}
