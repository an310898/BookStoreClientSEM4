const bookId = window.location.href.split("?id=")[1];
// console.log(bookId)

function subtractQty() {
  let qty = parseInt(document.querySelectorAll(".qty")[0].value);
  if (qty > 1) {
    document.querySelectorAll(".qty")[0].value = qty - 1;
    document.querySelectorAll(".qty")[1].value = qty - 1;
  } else {
    document.querySelectorAll(".qty")[0].value = 1;
    document.querySelectorAll(".qty")[1].value = 1;
  }
}
function addQty() {
  let qty = parseInt(document.querySelectorAll(".qty")[0].value);
  document.querySelectorAll(".qty")[0].value = qty + 1;
  document.querySelectorAll(".qty")[1].value = qty + 1;
}
const dataBook = findBookById();

function findBookById() {
  return fetch("http://1.52.115.73:8080/api/dynamic-procedure/FindBookById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BookId: bookId,
    }),
  })
    .then(res => res.json())
    .then(x => {
      return x["#result-set-1"][0];
    });
}

dataBook.then(x => {
  //   console.log(x);
  const image = document.querySelector("#image");
  const name = document.querySelector("h1");
  const nxb = document.querySelector("#nxb");
  const author = document.querySelector("#author");
  const desc = document.querySelectorAll(".desc_content");
  const bookid = document.querySelectorAll(".data_sku");
  const age = document.querySelectorAll(".data_age");
  const dataAuthor = document.querySelectorAll(".data_author");
  const dataPublisher = document.querySelectorAll(".data_publisher");
  const dataLanguages = document.querySelectorAll(".data_languages");
  const dataWeight = document.querySelectorAll(".data_weight");
  const dataSize = document.querySelectorAll(".data_size");
  const dataQtyOfPage = document.querySelectorAll(".data_qty_of_page");
  const dataBookLayout = document.querySelectorAll(".data_book_layout");
  const btnAddToCart = document.querySelectorAll(".btn-cart-to-cart");
  btnAddToCart[0].setAttribute("onclick", `addToCart(${bookId})`);
  btnAddToCart[1].setAttribute("onclick", `addToCart(${bookId})`);
  image.src = x.Image;
  image.title = x.Name;
  image.alt = x.Name;
  name.innerText = x.Name;
  nxb.innerText = x.PublishingCompany;
  author.innerText = x.Author;

  // DOM thông tin chi tiết sản phẩm
  for (let i = 0; i < 2; i++) {
    desc[i].innerHTML = x.Description;
    bookid[i].innerText = x.Id;
    age[i].innerText = x.Age;
    if (parseInt(x.Age) === 0) {
      age[i].parentElement.style = "display:none";
    }
    dataAuthor[i].innerText = x.Author;
    dataPublisher[i].innerText = x.PublishingCompany;
    dataLanguages[i].innerText = x.Language;
    dataWeight[i].innerText = x.Weight;
    dataSize[i].innerText = x.Size;
    dataQtyOfPage[i].innerText = x.Pages;
    dataBookLayout[i].innerText = x.CoverType;
  }
});

// fetch("http://1.52.115.73:8080/api/dynamic-procedure/FillAllCategory", {
//   method: "POST",
// })
//   .then((res) => res.json())
//   .then((x) => {
//     const data = x["#result-set-1"]
//       .map((y) => {
//         return `<div class="panel panel-default">
// 			<div class="panel-heading">
// 				<h4 class="panel-title"><a href="#">${y.Name}</a></h4>
// 			</div>
// 		</div>`;
//       })
//       .join("");
//     document.getElementById("book-category").innerHTML = data;
//   });
function GetBookCommentByBoodId() {
  fetch(
    "http://1.52.115.73:8080/api/dynamic-procedure/GetBookCommentByBoodId",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookId: bookId,
      }),
    }
  )
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]
        .map(y => {
          //   console.log(y);
          const date = new Date(y.CreatedDate);
          return `<li>
                            <div>
                              <div>${y.UserName}</div>
                              <div>${(dateFormat = date.toLocaleDateString(
                                "vi-VN",
                                {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              ))}</div>
                            </div>
                            <div>
                              <div class="fhs_center_left">
                                <div class="rating-box">
                                  <div class="rating" style="width: ${
                                    y.Rate * 20
                                  }%"></div>
                                </div>
                                <div class="clear"></div>
                              </div>
                              <div>
                                ${y.Comment}
                              </div>
                            </div>
                          </li>
                          `;
        })
        .join("");
      document.querySelector("ul.comment_list").innerHTML = data;
    });
}
GetBookCommentByBoodId();
function SaveCommentByBook() {
  const userNameReviewInput = document.getElementById("nickname_field");
  const userNameCommentInput = document.getElementById("review_field");
  const validUserNameText = document.getElementById(
    "advice-required-entry-nickname_field"
  );
  const validCommentText = document.getElementById(
    "advice-validate-length-minimum-10-review_field"
  );
  userNameReviewInput.classList.remove("validation-failed");
  userNameCommentInput.classList.remove("validation-failed");
  validUserNameText.style.display = "none";
  validCommentText.style.display = "none";

  const userName =
    document.getElementById("nickname_field")?.value.trim() || "";

  const userComment =
    document.getElementById("review_field")?.value.trim() || "";

  const userRate = document.querySelectorAll(".rating_item.active").length || 0;

  console.log(userName);
  console.log(userComment);
  console.log(userRate);

  if (userName.length < 6 || userComment.length < 20) {
    if (userName.length < 6) {
      userNameReviewInput.classList.add("validation-failed");
      validUserNameText.style.display = "block";
    }
    if (userComment.length < 20) {
      userNameCommentInput.classList.add("validation-failed");
      validCommentText.style.display = "block";
    }
    return;
  }

  fetch("http://1.52.115.73:8080/api/dynamic-procedure/SaveCommentByBook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BookId: bookId,
      Rate: userRate,
      UserName: userName,
      Comment: userComment,
    }),
  })
    .then(res => res.json())
    .then(data => {
      GetBookCommentByBoodId();
      domDataBookRate();
      closeReview();
    });
}

$(".product_view_tab_content_ad_more").html(
  $(".product_view_tab_content_ad").html()
);
$(document).ready(function () {
  let h = document.querySelector(".product_view_tab_content_ad_more").height;

  if (h + 25 > 600) {
    $("#desc_viewmore").fadeIn(0);
  }
  $(".rating_item").click(function () {
    $(".rating_item").removeClass("active");

    $(this).prevAll(".rating_item").addBack().addClass("active");

    $(".rating_item.active").attr("data", $(this).attr("data"));
  });
  $("#btn_showmore").click(function () {
    let $btn_showmore = $(this);
    if ($(".product_view_tab_content_ad_more").is(":visible")) {
      $btn_showmore.html(
        'Xem Thêm<span class="icon_seemore_blue mobile_only down" style="margin-left:4px;"></span>'
      );
    } else {
      $btn_showmore.html(
        'Rút Gọn<span class="icon_seemore_blue mobile_only up" style="margin-left:4px;"></span>'
      );
    }
    $(".product_view_tab_content_ad_more").slideToggle();
  });
});
function showReview() {
  $(".youama-ajaxlogin-cover").fadeIn(0);
  $("#popup_write_review").fadeIn(0);
}
function closeReview() {
  $("#popup_write_review").fadeOut(0);
  $(".youama-ajaxlogin-cover").fadeOut(0);
}

const bookRate = fetch(
  "http://1.52.115.73:8080/api/dynamic-procedure/BookRate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BookId: bookId,
    }),
  }
)
  .then(res => res.json())
  .then(x => {
    return x["#result-set-1"].concat(x["#result-set-2"]);
  });

function domDataBookRate() {
  bookRate.then(x => {
    if (x[0].TotalComments === 0) {
      return;
    }
    console.log(x[0]);
    document.querySelector(
      "#product_view_tab_content_review > div.product-view-tab-content-rating > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(1)"
    ).innerHTML = x[0].AverageRate + "<span>/5</span>";
    document.querySelectorAll(".rating-total").forEach(y => {
      y.style.width = x[0].AverageRate * 20 + "%";
    });

    document.querySelector(
      "td.review-position > p > a"
    ).innerText = `(${x[0].TotalComments} đánh giá)`;

    document.querySelector(
      "#product_view_tab_content_review > div.product-view-tab-content-rating > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(3)"
    ).innerText = `(${x[0].TotalComments} đánh giá)`;

    for (let i = 1; i < x.length; i++) {
      const percent = roundFloat(x[i].Percentage);
      if (x[i].Rate === 5) {
        document.querySelector("#rate-5 div > div").style.width = `${percent}%`;
        document.querySelector("#rate-5 > span:nth-child(3)").innerText =
          percent + "%";
      }
      if (x[i].Rate === 4) {
        document.querySelector("#rate-4 div > div").style.width = `${percent}%`;
        document.querySelector("#rate-4 > span:nth-child(3)").innerText =
          percent + "%";
      }
      if (x[i].Rate === 3) {
        document.querySelector("#rate-3 div > div").style.width = `${percent}%`;
        document.querySelector("#rate-3 > span:nth-child(3)").innerText =
          percent + "%";
      }
      if (x[i].Rate === 2) {
        document.querySelector("#rate-2 div > div").style.width = `${percent}%`;
        document.querySelector("#rate-2 > span:nth-child(3)").innerText =
          percent + "%";
      }
      if (x[i].Rate === 1) {
        document.querySelector("#rate-1 div > div").style.width = `${percent}%`;
        document.querySelector("#rate-1 > span:nth-child(3)").innerText =
          percent + "%";
      }
    }
  });
}
domDataBookRate();
function roundFloat(num) {
  if (num % 1 >= 0.5) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
}
