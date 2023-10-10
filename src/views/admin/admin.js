const contentWrap = document.querySelector('.contentWrap');
const menuWrap = document.querySelector('.menuWrap');

document.addEventListener('DOMContentLoaded', function () {
  menuWrap.addEventListener('click', function (e) {
    e.preventDefault();
  });
});
