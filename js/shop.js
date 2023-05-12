const urlParams = new URLSearchParams(window.location.search);
const cateId = urlParams.get("id") || 0;
const page = urlParams.get("page") || 1;
const limit = urlParams.get("limit") || 12;
const nameSearch = urlParams.get("search") || "";

initShop();
function initShop() {
  if (nameSearch.trim().length > 0) {
    document.querySelector(".toolbar-top").style.display = "none";
    leftCategory();

    searchBook();
    return;
  }
  leftCategory();
  domDataByCate(limit);
  CountPagingShopByCateId(limit);
}
function leftCategory() {
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/FillAllCategory", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      //   console.log(x);
      const data = x["#result-set-1"]
        .map(y => {
          return `
                                         <li style="margin-left: 15px;">
                                                                <a href="shop.html?id=${y.Id}"
                                                                    title="${y.Name}">${y.Name}</a>
                                                            </li> 
`;
        })
        .join("");
      document.querySelector("ol#parent-category").innerHTML = data;
    });
}

function domDataByCate(limit) {
  const formData = { CategoryId: cateId, Paginate: page, Limit: limit };
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/FillDataBookByCateId", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      // console.log(x["#result-set-1"]);
      const data = x["#result-set-1"]
        .map(y => {
          return `
             <li>
                                                <div class="item-inner">
                                                    <div class="ma-box-content">
                                                        <div class="products clearfix">
                                                            <div class="product images-container"><a
                                                                    href="product-details.html?id=${
                                                                      y.Id
                                                                    }"
                                                                    class="product-image"><span
                                                                        class="product-image"><img class=" lazyloaded"
                                                                            src="${
                                                                              y.Image
                                                                            }"
                                                                            data-src="${
                                                                              y.Image
                                                                            }"
                                                                            alt=""></span></a></div>
                                                        </div>
                                                        <h2 class="product-name-no-ellipsis p-name-list"><a
                                                                href="product-details.html?id=${
                                                                  y.Id
                                                                }" title="${
            y.Name
          }">${y.Name}</a></h2>
                                                        <div class="price-label">
                                                            <div class="price-box">
                                                                <div class="price-box"><span id="product-price-428505"
                                                                        class=""><span class="price">
                                                                            <div class="price-box">
                                                                                <p class="special-price"><span
                                                                                        class="price">${
                                                                                          y.Price
                                                                                        }&nbsp;đ</span>
                                                                                </p>
                                                                            </div>
                                                                        </span></span></div>
                                                            </div>
                                                        </div>
                                                        <div class="rating-container" style="">
                                                            <div class="ratings">
                                                                <div class="rating-box">
                                                                    <div class="rating" style="width:${
                                                                      y.rate *
                                                                      20
                                                                    }%"></div>
                                                                </div>
                                                                <div class="amount">(${
                                                                  y.countComment
                                                                })</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
        `;
        })
        .join("");
      //   console.log(data);
      document.querySelector("#products_grid").innerHTML = data;
    });
}
function CountPagingShopByCateId(limit) {
  const formData = { CategoryId: cateId, Limit: limit };
  fetch(
    "http://1.52.115.73:8080/api/dynamic-procedure/CountPagingShopByCateId",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  )
    .then(res => res.json())
    .then(x => {
      let data = "";
      for (let i = 1; i <= x["#result-set-1"][0].pages; i++) {
        data += `<li><a href="shop.html?id=${cateId}&page=${i}&limit=${limit}">${i}</a></li>`;
      }

      document.querySelector("#pagination > ol").innerHTML = data;

      document
        .querySelectorAll("#pagination > ol li")
        .forEach((elem, index) => {
          if (index + 1 === parseInt(page)) {
            elem.classList.add("current");
            return;
          }
        });
    });
}

function setLimit(elem) {
  const href = window.location.href;
  if (href.includes("&limit=")) {
    window.location.href = href
      .replace(limit, elem.value)
      .replace(`&page=${page}`, "&page=1");
  } else {
    window.location.href = `${href
      .replace("?", "")
      .replace(".html", ".html?")
      .replace(`&page=${page}`, "?&page=1")}&limit=${elem.value}`;
  }
}

document.querySelectorAll("#limit option").forEach((elem, index) => {
  if (parseInt(elem.value) === parseInt(limit)) {
    elem.setAttribute("selected", true);
  }
});

function searchBook() {
  const formData = { BookName: nameSearch, limit: limit, Paginate: page };
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/SearchBookByBookName", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]
        .map(y => {
          return `
             <li>
                                                <div class="item-inner">
                                                    <div class="ma-box-content">
                                                        <div class="products clearfix">
                                                            <div class="product images-container"><a
                                                                    href="product-details.html?id=${
                                                                      y.Id
                                                                    }"
                                                                    class="product-image"><span
                                                                        class="product-image"><img class=" lazyloaded"
                                                                            src="${
                                                                              y.Image
                                                                            }"
                                                                            data-src="${
                                                                              y.Image
                                                                            }"
                                                                            alt=""></span></a></div>
                                                        </div>
                                                        <h2 class="product-name-no-ellipsis p-name-list"><a
                                                                href="product-details.html?id=${
                                                                  y.Id
                                                                }" title="${
            y.Name
          }">${y.Name}</a></h2>
                                                        <div class="price-label">
                                                            <div class="price-box">
                                                                <div class="price-box"><span id="product-price-428505"
                                                                        class=""><span class="price">
                                                                            <div class="price-box">
                                                                                <p class="special-price"><span
                                                                                        class="price">${
                                                                                          y.Price
                                                                                        }&nbsp;đ</span>
                                                                                </p>
                                                                            </div>
                                                                        </span></span></div>
                                                            </div>
                                                        </div>
                                                        <div class="rating-container" style="">
                                                            <div class="ratings">
                                                                <div class="rating-box">
                                                                    <div class="rating" style="width:${
                                                                      y.rate *
                                                                      20
                                                                    }%"></div>
                                                                </div>
                                                                <div class="amount">(${
                                                                  y.countComment
                                                                })</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
        `;
        })
        .join("");
      //   console.log(data);
      document.querySelector("#products_grid").innerHTML = data;
    });
}
