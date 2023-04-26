Category();

function Category() {
  fetch("http://localhost:8080/api/dynamic-procedure/FillAllCategory", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((x) => {
      const data = x["#result-set-1"]
        .map((y) => {
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
    .then((res) => res.json())
    .then((x) => {
      const data = x["#result-set-1"]
        .map((y) => {
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
