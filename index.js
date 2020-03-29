let fruits = [
  {
    id: 1,
    title: "Apelle",
    price: 20,
    img: "https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg"
  },
  {
    id: 2,
    title: "Orange",
    price: 30,
    img:
      "https://previews.123rf.com/images/atoss/atoss1803/atoss180300084/97666503-orange-fruits-with-leaf.jpg"
  },
  {
    id: 3,
    title: "Mango",
    price: 40,
    img: "https://5.imimg.com/data5/YD/PM/MY-40752733/fresh-mango-500x500.jpg"
  }
];
const toHTML = fruit =>
  `
<div class="col">
          <div class="card">
            <img
              src=${fruit.img}
            />
            <div class="card-body">
              <h5 class="card-title">${fruit.title}</h5>

              <a href="#" class="btn btn-primary" data-btn = "price"
              data-id=${fruit.id} >See price</a>
              <a href="#" class="btn btn-danger" data-btn ="remove" data-id =${fruit.id}>Delete</a>
            </div>
          </div>
        </div>
  `;

function render() {
  const html = fruits.map(fruit => toHTML(fruit)).join("");

  document.querySelector("#fruits").innerHTML = html;
}
render();

const priceModal = $.modal({
  title: "Product price",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "CLose window",
      type: "primary",
      handler() {
        priceModal.close();
      }
    }
  ]
});

document.addEventListener("click", event => {
  let btnType = event.target.dataset.btn;
  //преобразовуем к числу
  let id = +event.target.dataset.id;
  let fruit = fruits.find(f => f.id === id);

  if (btnType === "price") {
    console.log("price", btnType);
    priceModal.open();
    priceModal.setContent(`
   <p>Price on ${fruit.title}: <strong>${fruit.price}UAH</strong></p>
   `);
  } else if (btnType === "remove") {
    $.confirm({
      title: "Are you sure ?",
      content: ` <p>You are delete fruit
            <strong> ${fruit.title} </strong></strong> </p>`
    })
      .then(() => {
        console.log("Remove");
        fruits = fruits.filter(f => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cancel");
      });
  }
});
