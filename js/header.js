function headerCate() {
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/FillAllCategory", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]
        .map(y => {
          return `<li class="parent dropdown aligned-left">
                                            <a href="shop.html?id=${y.Id}" class=""
                                                title="${y.Name}" data-clickable="1">
                                                <i class="ico_sachtrongnuoc"></i>
                                                <span class="menu-title">${y.Name}</span>
                                                <b class="caret"></b>
                                            </a>
                                        </li>
`;
        })
        .join("");
      const mobileData = x["#result-set-1"]
        .map(y => {
          return `<div class="catalog_menu_nav_content_item fhs_column_left"><a href="shop.html?id=${y.Id}" class="fhs_center_space">
                          <div
                            class="catalog_menu_nav_content_item_title fhs_center_left">
                            ${y.Name}
                          </div>

                        </a></div>
`;
        })
        .join("");

      document.querySelector("#headerCate").innerHTML = data;
      document.querySelector(".catalog_menu_nav_content_items").innerHTML =
        `<div class="catalog_menu_nav_content_item fhs_column_left"><a href="shop.html" class="fhs_center_space">
                          <div
                            class="catalog_menu_nav_content_item_title fhs_center_left">
                            Tất cả sản phẩm
                          </div>
                        </a></div>` + mobileData;
    });
}
headerCate();

function displayCatalogCate() {
  //   console.log("hover cate");
  document.querySelector(".catalog_menu_dropdown.fhs_dropdown").style.display =
    "block";
}
function hideCatalogCate(elem) {
  elem.style.display = "none";
}

document
  .getElementById("search_mini_form_desktop")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
document
  .getElementById("search_mini_form_mobile")
  .addEventListener("click", function (event) {
    event.preventDefault();
  });
function search() {
  const search = document.querySelector("#search_desktop").value;
  const searchMobile = document.querySelector("#search_mobile").value;
  window.location.href =
    "shop.html?search=" + (search >= searchMobile ? search : searchMobile);
}

function openHeaderBar() {
  document
    .querySelector(
      "#header > div.fhs_header_mobile > div.fhs-header-top-bar > div.fhs_center_center.fhs_mouse_point.fhs_popup_full_click > div"
    )
    .classList.add("active");
}

function closeHeadBar() {
  document
    .querySelector(
      "#header > div.fhs_header_mobile > div.fhs-header-top-bar > div.fhs_center_center.fhs_mouse_point.fhs_popup_full_click > div"
    )
    .classList.remove("active");
}

function goToSearch() {
  window.location.href = "search.html";
}
