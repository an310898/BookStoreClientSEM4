fetch("http://localhost:8080/api/dynamic-procedure/FillAllCategory", {
  method: "POST",
})
  .then((res) => res.json())
  .then((x) => {
    const data = x["#result-set-1"]
      .map((y) => {
        return `<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title"><a href="#">${y.Name}</a></h4>
			</div>
		</div>`;
      })
      .join("");
    document.getElementById("book-category").innerHTML = data;
  });

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
