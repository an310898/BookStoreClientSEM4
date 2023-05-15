function getBookTable() {
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/GetBookTable", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]

        .map(y => {
          const date = new Date(y.CreatedDate);
          const isHideElem = y.IsHidden
            ? `<i style="cursor: pointer;"  onclick="hideProduct(${y.Id})" class="fa-solid fa-eye"></i>`
            : `<i style="cursor: pointer;"  onclick=displayBook(${y.Id}) class="fa-solid fa-eye-slash"></i>`;
          return `<tr>
                                                    <td>${y.Id}</td>
                                                    <td>${y.Name}</td>
                                                    <td>
                                                        ${y.Author}
                                                    </td>
                                                    <td>${y.Price} đ</td>
                                                    <td>${date.toLocaleDateString(
                                                      "vi-VN",
                                                      {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                      }
                                                    )}</td>
                                                    <td>${isHideElem}</td>
                                                    <td onclick="editBook(${
                                                      y.Id
                                                    })" style="padding:0"><div style="display: flex;justify-content: space-evenly;align-items: center;">
                                                    <i style="cursor:pointer" class="fa-solid fa-pen-to-square"></i></td>
                                                </tr>`;
        })
        .join("");

      document.querySelector("#data-table-product").innerHTML = data;
    });
}
getBookTable();
function hideProduct(bookId) {
  const formData = {
    BookId: bookId,
  };
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/HideBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Ẩn thành công");

        getBookTable();
      } else {
        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}
function displayBook(bookId) {
  const formData = {
    BookId: bookId,
  };
  //   console.log(formData);
  //   return;
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/DisplayBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Hiển thị thành công");

        getBookTable();
      } else {
        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}
function hideAddForm() {
  hideLayerForm();
  document.querySelector("#formAddNew").style.display = "none";
}
function displayAddNewForm() {
  showLayerForm();
  document.querySelector("#formAddNew").style.display = "block";
}
function addNewProduct() {
  const name = document.querySelector("#BookName").value.trim();
  const Description = document.querySelector("#Description").value.trim();
  const Image = document.querySelector("#Image").value.trim();
  const Author = document.querySelector("#Author").value.trim();
  const Price = document.querySelector("#Price").value.trim();
  const Age = document.querySelector("#Age").value.trim();
  const Language = document.querySelector("#Language").value.trim();
  const Pages = document.querySelector("#Pages").value.trim();
  const PublishingCompany = document
    .querySelector("#PublishingCompany")
    .value.trim();
  const CoverType = document.querySelector("#CoverType").value.trim();
  const BookWeight = document.querySelector("#BookWeight").value.trim();
  const BookSize = document.querySelector("#BookSize").value.trim();
  const CategoryIdArrays = $("#CategoryIdArrays")
    .select2("data")
    .map(x => {
      return x.id;
    });
  if (
    name.length === 0 ||
    Image.length === 0 ||
    Author.length === 0 ||
    Price.length === 0 ||
    CategoryIdArrays.length === 0
  ) {
    alert("Vui lòng điền đủ các trường có dấu *");
    return;
  }

  const formData = {
    Name: name,
    Description: Description,
    Image: Image,
    Author: Author,
    Price: Price,
    Age: Age,
    Language: Language,
    Pages: Pages,
    PublishingCompany: PublishingCompany,
    CoverType: CoverType,
    BookWeight: BookWeight,
    BookSize: BookSize,
    CategoryIdArrays: CategoryIdArrays.toString(),
  };
  console.log(formData);
  //   return;
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/AddNewBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] === 1) {
        alert("Thêm thành công");
        hideAddForm();
        hideLayerForm();
        getBookTable();
      } else {
        hideLayerForm();

        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}

async function fillCateDataAddForm() {
  const res = await fetch(
    "http://42.113.58.1:8080/api/dynamic-procedure/FillAllCategory",
    {
      method: "POST",
    }
  );
  const data = await res.json();

  return data;
}
async function editBook(bookId) {
  showLayerForm();

  const formData = { BookId: bookId };
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/FindBookById", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      //   console.log(x);
      const book = x["#result-set-1"][0];
      const arrCate =
        x["#result-set-2"][0].BookCategoryList.split(",").map(Number);
      $("#CategoryIdArrays-edit").val(arrCate).select2().trigger("change");

      document.querySelector("#formEdit").style.display = "block";
      document.querySelector("#BookName-edit").value = book.Name;
      document.querySelector("#Description-edit").value = book.Description;
      document.querySelector("#Image-edit").value = book.Image;
      document.querySelector("#Author-edit").value = book.Author;
      document.querySelector("#Price-edit").value = book.Price;
      document.querySelector("#Age-edit").value = book.Age;
      document.querySelector("#Language-edit").value = book.Language;
      document.querySelector("#Pages-edit").value = book.Pages;
      document.querySelector("#PublishingCompany-edit").value =
        book.PublishingCompany;
      document.querySelector("#CoverType-edit").value = book.CoverType;
      document.querySelector("#BookWeight-edit").value = book.Weight;
      document.querySelector("#BookSize-edit").value = book.Size;
      document
        .querySelector("#edit-submit-btn")
        .setAttribute("onclick", `editSubmit(${book.Id})`);
    });
}
function hideEditForm() {
  hideLayerForm();
  document.querySelector("#formEdit").style.display = "none";
}
function editSubmit(bookId) {
  const name = document.querySelector("#BookName-edit").value.trim();
  const Description = document.querySelector("#Description-edit").value.trim();
  const Image = document.querySelector("#Image-edit").value.trim();
  const Author = document.querySelector("#Author-edit").value.trim();
  const Price = document.querySelector("#Price-edit").value.trim();
  const Age = document.querySelector("#Age-edit").value.trim();
  const Language = document.querySelector("#Language-edit").value.trim();
  const Pages = document.querySelector("#Pages-edit").value.trim();
  const PublishingCompany = document
    .querySelector("#PublishingCompany-edit")
    .value.trim();
  const CoverType = document.querySelector("#CoverType-edit").value.trim();
  const BookWeight = document.querySelector("#BookWeight-edit").value.trim();
  const BookSize = document.querySelector("#BookSize-edit").value.trim();
  const CategoryIdArrays = $("#CategoryIdArrays-edit")
    .select2("data")
    .map(x => {
      return x.id;
    });
  if (
    name.length === 0 ||
    Image.length === 0 ||
    Author.length === 0 ||
    Price.length === 0 ||
    CategoryIdArrays.length === 0
  ) {
    alert("Vui lòng điền đủ các trường có dấu *");
    return;
  }

  const formData = {
    BookId: bookId,
    Name: name,
    Description: Description,
    Image: Image,
    Author: Author,
    Price: Price,
    Age: Age,
    Language: Language,
    Pages: Pages,
    PublishingCompany: PublishingCompany,
    CoverType: CoverType,
    BookWeight: BookWeight,
    BookSize: BookSize,
    CategoryIdArrays: CategoryIdArrays.toString(),
  };
  //   console.log(formData);
  //   return;
  fetch("http://42.113.58.1:8080/api/dynamic-procedure/UpdateBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] === 1) {
        alert("Cập nhật thành công");
        hideEditForm();
        hideLayerForm();
        getBookTable();
      } else {
        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}
domCateAddForm();
async function domCateAddForm() {
  const cateData = await fillCateDataAddForm();
  //   console.log(cateData);
  document.querySelector("#CategoryIdArrays").innerHTML = cateData[
    "#result-set-1"
  ]
    .map(x => {
      return `<option value="${x.Id}">${x.Name}</option>`;
    })
    .join("");
  document.querySelector("#CategoryIdArrays-edit").innerHTML = cateData[
    "#result-set-1"
  ]
    .map(x => {
      return `<option value="${x.Id}">${x.Name}</option>`;
    })
    .join("");
}
