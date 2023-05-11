function headerCate() {
    fetch("http://localhost:8080/api/dynamic-procedure/FillAllCategory", {
        method: "POST",
    })
        .then(res => res.json())
        .then(x => {
            //   console.log(x);
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
            document.querySelector(
                "#header > div.fhs_header_desktop > div > div > div.fhs_center_right.fhs_mouse_point.fhs_dropdown_hover.fhs_dropdown_click > div > div > div > ul"
            ).innerHTML = data;
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

document.getElementById("search_mini_form_desktop").addEventListener("click", function (event) {
    event.preventDefault()
}); document.getElementById("search_mini_form_mobile").addEventListener("click", function (event) {
    event.preventDefault()
});
function search() {
    const search = document.querySelector("#search_desktop").value
    const searchMobile = document.querySelector("#search_mobile").value
    window.location.href = "shop.html?search=" + (search >= searchMobile ? search : searchMobile)
}