const bookId = window.location.href.split("?id=")[1]
// console.log(bookId)

fetch("http://localhost:8080/api/dynamic-procedure/FindBookById", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        BookId: bookId
    })
    })
    .then((res) => res.json())
    .then((x) => {
        const description = x["#result-set-1"].map(x=>{
            return x.Description
        }).join("");
        console.log(description)
        const data = x["#result-set-1"]
        .map((y) => {
            return `<div class="col-sm-5">
            <div class="view-product">
                <img src="${y.Image}" alt="" />
            </div>
           

        </div>
        <div class="col-sm-7">
            <div class="product-information"><!--/product-information-->
                <img src="images/product-details/new.jpg" class="newarrival" alt="" />
                <h2>${y.Name}</h2>
                <p>Book ID: ${bookId}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span style="display:flex">
                    <span>${y.Price} đ</span>
                   
                    <button type="button" class="btn btn-fefault cart">
                        <i class="fa fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </span>
                <p><b>Tác giả:</b> ${y.Author}</p>
                <p><b>Nhà cung cấp</b> ${y.PublishingCompany}</p>
                <p><b>Ngôn ngữ</b>:</b> ${y.Language}</p>
            </div><!--/product-information-->
        </div>`;
        })
        .join("");
        document.getElementById("item-details").innerHTML = data;

        document.getElementById("details").innerText = description;
    });

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