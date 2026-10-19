'use strict';

// Khởi tạo AOS có kiểm tra để trang vẫn hoạt động nếu CDN không tải được.
if (window.AOS) {
  AOS.init({ duration: 650, once: true, offset: 70, easing: 'ease-out-cubic', disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
}

const menuToggle = document.querySelector('#menuToggle');
const primaryNav = document.querySelector('#primaryNav');
const searchToggle = document.querySelector('#searchToggle');
const searchPanel = document.querySelector('#searchPanel');
const searchInput = document.querySelector('#searchInput');
const clearSearch = document.querySelector('#clearSearch');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const productCards = [...document.querySelectorAll('.product-card')];
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');
const cartButton = document.querySelector('#cartButton');
const cartDialog = document.querySelector('#cartDialog');
const closeCart = document.querySelector('#closeCart');
const checkoutButton = document.querySelector('#checkoutButton');
const cartCount = document.querySelector('#cartCount');
const cartItems = document.querySelector('#cartItems');
const cartTotal = document.querySelector('#cartTotal');
const toast = document.querySelector('#toast');
const newsletterForm = document.querySelector('#newsletterForm');
const newsletterMessage = document.querySelector('#newsletterMessage');

let activeFilter = 'Tất cả';
let cart = [];
let toastTimer;

const formatPrice = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(amount);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateMenu(isOpen) {
  primaryNav.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng');
}

menuToggle.addEventListener('click', () => updateMenu(!primaryNav.classList.contains('open')));
primaryNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => updateMenu(false)));

searchToggle.addEventListener('click', () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) searchInput.focus();
});
clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  filterProducts();
  searchInput.focus();
});
searchInput.addEventListener('input', filterProducts);

function filterProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase('vi');
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matchesCategory = activeFilter === 'Tất cả' || card.dataset.category === activeFilter;
    const searchText = `${card.dataset.name} ${card.dataset.category} ${card.textContent}`.toLocaleLowerCase('vi');
    const matchesQuery = !query || searchText.includes(query);
    const isVisible = matchesCategory && matchesQuery;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  resultCount.textContent = `${String(visibleCount).padStart(2, '0')} sản phẩm`;
  emptyState.hidden = visibleCount !== 0;
  if (window.AOS) AOS.refreshHard();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    filterProducts();
  });
});

document.querySelectorAll('[data-category-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const category = link.dataset.categoryLink;
    const filterButton = filterButtons.find((button) => button.dataset.filter === category);
    if (filterButton) filterButton.click();
  });
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ name, price, quantity: 1 });
  renderCart();
  showToast(`Đã thêm “${name}” vào giỏ hàng.`);
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  renderCart();
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartCount.textContent = String(itemCount);
  cartTotal.textContent = formatPrice(total);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Giỏ hàng đang trống.</p>';
    return;
  }

  cartItems.innerHTML = cart.map((item) => `
    <article class="cart-item">
      <div><h3>${escapeHTML(item.name)}</h3><p>${item.quantity} × ${formatPrice(item.price)}</p><button type="button" data-remove="${escapeHTML(item.name)}">Xóa sản phẩm</button></div>
      <strong>${formatPrice(item.price * item.quantity)}</strong>
    </article>
  `).join('');
  cartItems.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => removeFromCart(button.dataset.remove)));
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

document.querySelectorAll('[data-add]').forEach((button) => {
  button.addEventListener('click', () => addToCart(button.dataset.add, Number(button.dataset.price)));
});

cartButton.addEventListener('click', () => {
  if (typeof cartDialog.showModal === 'function') cartDialog.showModal();
  else cartDialog.setAttribute('open', '');
  document.body.classList.add('dialog-open');
});
function dismissCart() {
  if (typeof cartDialog.close === 'function') cartDialog.close();
  else cartDialog.removeAttribute('open');
  document.body.classList.remove('dialog-open');
}
closeCart.addEventListener('click', dismissCart);
checkoutButton.addEventListener('click', () => {
  dismissCart();
  showToast('Cảm ơn bạn đã ghé LUNE! Đây là bản demo chưa có thanh toán thật.');
});
cartDialog.addEventListener('click', (event) => {
  if (event.target === cartDialog) dismissCart();
});
cartDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailInput = document.querySelector('#emailInput');
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }
  newsletterMessage.textContent = 'Cảm ơn bạn! Đây là bản demo nên email chưa được lưu vào hệ thống.';
  emailInput.value = '';
});
