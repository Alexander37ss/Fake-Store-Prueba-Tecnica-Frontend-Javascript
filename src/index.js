const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

let storePagination = 5;

localStorage.setItem('pagination', storePagination);

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => card(product));
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  getData(`${API}${pagination(5)}`);
}
loadData();
const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach(entry => {
    entry.target.classList.toggle('card', entry.isIntersecting);
    if(entry.isIntersecting) intersectionObserver.unobserve(entry);
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

loadData()