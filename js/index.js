function Category() {
  fetch("http://localhost:8080/api/dynamic-procedure/FillAllCategory", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]
        .map(y => {
          return `	<a href="shop.html/?id=${y.Id}" class="fhs_column_center">
					<img class=" lazyloaded" src="${y.ImageURL}" >
					<div class="fhs_nowrap_two fhs_center_center" style="margin-top: 16px; font-size: 1.23em;">${y.Name}</div>
					</a>`;
        })
        .join("");
      document.getElementById("book-category").innerHTML = data;
    });
}

function listNewBook() {
  fetch("http://localhost:8080/api/dynamic-procedure/listNewBook", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]
        .map(y => {
          return `<div class="col-sm-3">
		<div class="product-image-wrapper">
			<a href="product-details.html?id=${y.Id}" class="single-products">
					<div class="productinfo text-center">
						<div class=product-image><img src="${y.Image}" alt="" /></div>
						<div class=product-info>
              <div style="flex-grow: 1;">
              <h2>${y.Price} đ</h2>
						  <p class="book-name">${y.Name}</p>
              </div>
            </div>
						
					</div>
					
			</a>
			<button onclick="addToCart(${y.Id})" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</button>
		</div>
	</div>`;
        })
        .join("");
      document.getElementById("new-item").innerHTML =
        '<h2 class="title text-center">Sản phẩm mới</h2>' + data;
    });
}
function CategoryTabData(categoryId) {
  const formData = {
    CategoryId: categoryId,
  };

  fetch("http://localhost:8080/api/dynamic-procedure/CategoryTabData", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      const dataNewBook = x["#result-set-1"]
        .map(y => {
          //   console.log(y);
          return `
             <div class="col-6">
      <li class="fhs_product_basic swiper-slide swiper-slide-active">
        <div class="item-inner">
          <div class="ma-box-content">
            <div class="products clear">
              <div class="product images-container">
                <a
                  href="product-details.html?id=${y.Id}"
                  title="${y.Name}"
                  class="product-image"
                  ><div class="product-image">
                    <img
                      class="lazyloaded"
                      src="${y.Image}"
                      data-src="${y.Image}"
                      alt="${y.Name}" /></div
                ></a>
              </div>
            </div>
            <div style="display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;">
              <div>
                <h2 class="product-name-no-ellipsis">
                  <a href="product-details.html?id=${y.Id}" title="${y.Name}"
                    >${y.Name}</a
                  >
                </h2>
                <div class="price-label">
                  <span class="price m-price-font fhs_center_left"
                    >${y.Price} đ</span
                  >
                </div>
                <div class="fhs-rating-container">
                  <div class="ratings fhs-no-mobile-block">
                    <div class="rating-box">
                      <div class="rating" style="width: ${y.rate * 20}%"></div>
                    </div>
                    <div class="amount">(${y.countComment})</div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onclick="addToCart(${y.Id}) "
                  title="Thêm giỏ hàng"
                  class="btn_add_cart"
                  style="">
                  <div class="btn_add_cart_icon"></div>
                  <span> Thêm giỏ hàng </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
        `;
        })
        .join("");
      const dataFavBook = x["#result-set-2"]
        .map(y => {
          return `
            <div class="col-6">
      <li class="fhs_product_basic swiper-slide swiper-slide-active">
        <div class="item-inner">
          <div class="ma-box-content">
            <div class="products clear">
              <div class="product images-container">
                <a
                  href="product-details.html?id=${y.Id}"
                  title="${y.Name}"
                  class="product-image"
                  ><div class="product-image">
                    <img
                      class="lazyloaded"
                      src="${y.Image}"
                      data-src="${y.Image}"
                      alt="${y.Name}" /></div
                ></a>
              </div>
            </div>
            <div style="display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;">
              <div>
                <h2 class="product-name-no-ellipsis">
                  <a href="product-details.html?id=${y.Id}" title="${y.Name}"
                    >${y.Name}</a
                  >
                </h2>
                <div class="price-label">
                  <span class="price m-price-font fhs_center_left"
                    >${y.Price} đ</span
                  >
                </div>
                <div class="fhs-rating-container">
                  <div class="ratings fhs-no-mobile-block">
                    <div class="rating-box">
                      <div class="rating" style="width: ${y.rate * 20}%"></div>
                    </div>
                    <div class="amount">(${y.countComment})</div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onclick="addToCart(${y.Id}) "
                  title="Thêm giỏ hàng"
                  class="btn_add_cart"
                  style="">
                  <div class="btn_add_cart_icon"></div>
                  <span> Thêm giỏ hàng </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
        `;
        })
        .join("");
      //   console.log(dataFavBook);
      switch (categoryId) {
        case 1:
          document.querySelector("#van-hoc-moi .row").innerHTML = dataNewBook;
          document.querySelector("#van-hoc-danh-gia-cao .row").innerHTML =
            dataFavBook;
          break;
        case 2:
          document.querySelector("#nuoi-day-con-moi .row").innerHTML =
            dataNewBook;
          document.querySelector("#nuoi-day-con-danh-gia-cao .row").innerHTML =
            dataFavBook;
          break;
        case 3:
          document.querySelector("#thieu-nhi-moi .row").innerHTML = dataNewBook;
          document.querySelector("#thieu-nhi-danh-gia-cao .row").innerHTML =
            dataFavBook;
          break;
        case 4:
          document.querySelector("#tam-ly-ky-nang-moi .row").innerHTML =
            dataNewBook;
          document.querySelector(
            "#tam-ly-ky-nang-danh-gia-cao .row"
          ).innerHTML = dataFavBook;
          break;
        case 5:
          document.querySelector("#tieu-su-hoi-ky-moi .row").innerHTML =
            dataNewBook;
          document.querySelector(
            "#tieu-su-hoi-ky-danh-gia-cao .row"
          ).innerHTML = dataFavBook;
          break;
      }
    });
}
$(document).ready(function () {
  Category();
  CategoryTabData(1);
  CategoryTabData(2);
  CategoryTabData(3);
  CategoryTabData(4);
  CategoryTabData(5);
});
