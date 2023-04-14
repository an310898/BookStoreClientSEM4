function CheckOutCart() {
  if (getCookie("arrayCart").length === 0) {
    return;
  }
  const formData = {
    ArrayCart: getCookie("arrayCart").slice(
      1,
      getCookie("arrayCart").length - 1
    ),
  };

  fetch("http://localhost:8080/api/dynamic-procedure/CheckOutCart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((x) => {
      const data = x["#result-set-1"]
        .map((y) => {
          let formatMoney = parseInt(y.ToMoney).toLocaleString("vi-VN");

          return `<div class="item-product-cart">
            <div class="img-product-cart">
              <a
                class="product-image"
                href="product-details.html?id=${y.BookId}"
                ><img
                  src="${y.Image}"
                  width="120"
                  height="120"
                  alt="${y.Name}"
              /></a>
            </div>
            <div class="group-product-info">
              <div class="info-product-cart">
                <div>
                  <h2 class="product-name-full-text">
                    <a
                      href="product-details.html?id=${y.BookId}"
                      >${y.Name}</a
                    >
                  </h2>
                  <p class="item-msg notice">
                    
                  </p>
                </div>
                <div class="price-original">
                  <div class="cart-price">
                    <div class="cart-fhsItem-price">
                      <div><span class="price">${y.Price} đ</span></div>
                      <div class="fhsItem-price-old">
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="number-product-cart">
                <div class="product-view-quantity-box">
                  <div class="product-view-quantity-box-block" style="border:none">
                    <div>${y.total}</div>
                  </div>
                  <div
                    class="product-view-icon-remove-mobile"
                    style="display: none"
                  >
                    <a
                      onclick="deleteItem(this,${y.BookId});"
                      title="Remove item"
                      class="btn-remove-mobile-cart"
                      ><i
                        class="fa fa-trash-o"
                        style="font-size: 22px"
                      ></i
                    ></a>
                  </div>
                </div>
                <div class="cart-price-total">
                  <span class="cart-price"
                    ><span class="price">${formatMoney} đ</span></span
                  >
                </div>
              </div>
            </div>
            <div class="div-of-btn-remove-cart">
              <a
                onclick="deleteItem(this,${y.BookId});"
                title="Remove Item"
                class="btn-remove-desktop-cart"
                ><i class="fa fa-trash-o" style="font-size: 22px"></i
              ></a>
            </div>
          </div>
          <div class="border-product"></div>
          `;
        })
        .join("");

      document.getElementById("cart-body").innerHTML = data;
    });
}
function totalCart() {
  if (getCookieArrayCart().length === 0) {
    document.querySelectorAll(".btn-checkout").forEach((elem) => {
      elem.classList.add("btn-checkout-disable");
      elem.setAttribute("disabled", "");
    });
    document.querySelectorAll(".total-price").forEach((element) => {
      element.innerText = "0 đ";
    });
    document.getElementsByClassName("total-price-mobile")[0].innerText = "0 đ";
    return;
  }
  document.querySelectorAll(".btn-checkout").forEach((elem) => {
    elem.classList.remove("btn-checkout-disable");
  });
  const formData = {
    ArrayCart: getCookie("arrayCart").slice(
      1,
      getCookie("arrayCart").length - 1
    ),
  };

  fetch("http://localhost:8080/api/dynamic-procedure/totalCart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((x) => {
      const formatMoney =
        x["#result-set-1"][0].totalMoney.toLocaleString("vi-VN");

      document.querySelectorAll(".total-price").forEach((element) => {
        element.innerText = formatMoney;
      });
      document.getElementsByClassName("total-price-mobile")[0].innerText =
        formatMoney;
    });
}

function deleteItem(elem, BookId) {
  //   console.log("BookId: " + BookId);
  const arrayCart = JSON.parse(getCookie("arrayCart"));

  for (let i = 0; i < arrayCart.length; i++) {
    if (arrayCart[i] === BookId) {
      //   console.log("delete index: " + i);
      arrayCart.splice(i, 1);
      i--;
    }
  }
  let date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = `arrayCart=[${arrayCart}];expires=${date.toGMTString()};path=/`;

  CheckOutCart();
  totalCart();
}

function initScript() {
  CheckOutCart();
  totalCart();
}
initScript();
