const contentWrap = document.querySelector('.contentWrap');
const menuWrap = document.querySelector('.menuWrap');

document.addEventListener('DOMContentLoaded', function () {
  async function loadContent(contentPath) {
    try {
      const res = await axios.get(contentPath);
      contentWrap.innerHTML = res.data;
    } catch (err) {
      console.error('Axios error: ', err);
    }
  }

  loadContent('./adminOrder.html');

  menuWrap.addEventListener('click', function (e) {
    e.preventDefault();
    let contentPath;
    switch (e.target.classList[0]) {
      case 'orderMenu':
        contentPath = './adminOrder.html';
        break;
      case 'productMenu':
        contentPath = './adminProduct.html';
        break;
      case 'categoryMenu':
        contentPath = './adminCategory.html';
        break;
      default:
        return;
    }

    loadContent(contentPath);
  });
});
