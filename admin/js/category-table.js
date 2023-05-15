function getCategoryTable() {
  fetch("http://localhost:8080/api/dynamic-procedure/GetCategoryTable", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]

        .map(y => {
          const date = new Date(y.CreatedDate);

          return `<tr>
                                                    <td>${y.Id}</td>
                                                    <td>${y.Name}</td>
                                                    <td>${date.toLocaleDateString(
                                                      "vi-VN",
                                                      {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                      }
                                                    )}</td>
                                                    <td onclick="editCate(${
                                                      y.Id
                                                    })" style="padding:0"><div style="display: flex;justify-content: space-evenly;align-items: center;">
                                                    <i style="cursor:pointer" class="fa-solid fa-pen-to-square"></i></td>
                                                </tr>`;
        })
        .join("");

      document.querySelector("#data-table-product").innerHTML = data;
    });
}
getCategoryTable();

function hideCate(cateId) {
  const formData = {
    CateId: cateId,
  };
  fetch("http://localhost:8080/api/dynamic-procedure/HideCate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Ẩn thành công");

        getCategoryTable();
      } else {
        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}
function displayCate(cateId) {
  const formData = {
    CateId: cateId,
  };
  fetch("http://localhost:8080/api/dynamic-procedure/DisplayCate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Hiển thị thành công");

        getCategoryTable();
      } else {
        alert("Có lỗi xảy ra khi thêm, vui lòng thử lại");
      }
    });
}

function displayAddNewForm() {
  showLayerForm();
  document.querySelector("#formAddNew").style.display = "block";
}
function hideAddForm() {
  hideLayerForm();
  document.querySelector("#formAddNew").style.display = "none";
}

function addNewCategory() {
  const categoryName = document.querySelector("#CategoryName").value.trim();
  if (categoryName.length === 0) {
    alert("Vui lòng điền các trường có dấu sao");
    return;
  }
  const formData = {
    CategoryName: categoryName,
  };
  console.log(formData);
  //   return;
  fetch("http://localhost:8080/api/dynamic-procedure/AddNewCategory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] === 1) {
        alert("Thêm thành công");
        hideAddForm();
        getCategoryTable();
      } else {
        hideAddForm();
        alert("Thêm thất bại, vui lòng thử lại");
      }
    });
}

function editCate(cateId) {
  showLayerForm();
  document.querySelector("#formEdit").style.display = "block";
  fetch("http://localhost:8080/api/dynamic-procedure/GetCategoryById", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ CateId: cateId }),
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"][0];
      document.querySelector("#BookName-edit").value = data.Name;
      document
        .querySelector("#edit-submit-btn")
        .setAttribute("onclick", `editSubmit(${data.Id})`);
    });
}
function hideEditForm() {
  hideLayerForm();
  document.querySelector("#formEdit").style.display = "none";
}

function editSubmit(cateId) {
  const categoryName = document.querySelector("#BookName-edit").value.trim();
  if (categoryName.length === 0) {
    alert("Vui lòng điền các trường có dấu sao");
    return;
  }
  const formData = { CateId: cateId, CategoryName: categoryName };

  fetch("http://localhost:8080/api/dynamic-procedure/UpdateCategory", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] === 1) {
        alert("Cập nhật thành công");
        hideEditForm();
        getCategoryTable();
      } else {
        hideEditForm();
        alert("Cập nhật thất bại, vui lòng thử lại");
      }
    });
}
