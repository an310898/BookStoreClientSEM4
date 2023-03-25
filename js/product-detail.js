const bookId = window.location.href.split("?id=")[1];
// console.log(bookId)

fetch("http://localhost:8080/api/dynamic-procedure/FindBookById", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    BookId: bookId,
  }),
})
  .then((res) => res.json())
  .then((x) => {
    const description = x["#result-set-1"]
      .map((x) => {
        return x.Description;
      })
      .join("");
    // console.log(description);
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

fetch("http://localhost:8080/api/dynamic-procedure/GetBookCommentByBoodId", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    BookId: bookId,
  }),
})
  .then((res) => res.json())
  .then((x) => {
    const data = x["#result-set-1"]
      .map((y) => {
        const date = new Date(y.CreatedDate);
        return `<div class="col-sm-12" style="margin-bottom:20px">
            <ul>
                <li><a href=""><i class="fa fa-user"></i>${y.UserName}</a></li>
                <li><a href=""><i class="fa fa-calendar-o"></i>${(dateFormat =
                  date.getHours() +
                  ":" +
                  date.getMinutes() +
                  ", " +
                  date.toDateString())}</a></li>
            </ul>
            <p>${y.Comment}</p>
           
        </div>`;
      })
      .join("");
    document.getElementById("review").innerHTML = data;
  });

function submitReview() {
  const userNameReviewInput = document.getElementById("userNameReview");
  userNameReviewInput.style.border = "none";
  const userNameEmailInput = document.getElementById("userEmailReview");
  userNameEmailInput.style.border = "none";
  const userNameCommentInput = document.getElementById("userComment");
  userNameCommentInput.style.border = "none";
  const userName = document.getElementById("userNameReview").value;
  const userEmail = document.getElementById("userEmailReview").value;
  const userComment = document.getElementById("userComment").value;
  const userRate = document.querySelector('input[name="rating"]:checked').value;

  console.log(userName);
  console.log(userEmail);
  console.log(userComment);
  console.log(userRate);

  if (
    userName.length == 0 ||
    userEmail.length == 0 ||
    userComment.length == 0 ||
    isValidEmail(userEmail)
  ) {
    if (userName.length == 0) {
      userNameReviewInput.style.border = "1px solid red";
    }
    if (userEmail.length == 0 || isValidEmail(userEmail)) {
      userNameEmailInput.style.border = "1px solid red";
    }
    if (userComment.length == 0) {
      userNameCommentInput.style.border = "1px solid red";
    }
    return;
  }

  fetch("http://localhost:8080/api/dynamic-procedure/SaveCommentByBook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BookId: bookId,
      Rate: userRate,
      UserName: userName,
      UserEmail: userEmail,
      Comment: userComment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data["#result-set-1"]);
    });
}

const form = document.getElementById("rating-form");
const labels = form.querySelectorAll(".rating label");

labels.forEach(function (label) {
  label.addEventListener("click", function () {
    const rating = this.previousElementSibling.value;

    labels.forEach(function (label) {
      label.classList.remove("active");
    });

    for (let i = 0; i < rating; i++) {
      labels[i].classList.add("active");
    }
  });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
