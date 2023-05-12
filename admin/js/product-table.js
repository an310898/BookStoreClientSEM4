function getBookTable() {
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/GetBookTable", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]

        .map(y => {
          const date = new Date(y.CreatedDate);

          return `<tr>
                                                    <td>${y.id}</td>
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
                                                    <td style="padding:0"><div style="display: flex;justify-content: space-evenly;align-items: center;">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                    <i style="cursor: pointer;" onclick="hideProduct(${
                                                      y.id
                                                    })" class="fa-solid fa-minus"></i></div></td>
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
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/HideBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        alert("Ẩn thành công");

        getBookTable();
      }
    });
}
function hideAddForm() {
  document.querySelector("#formAddNew").style.display = "none";
}
function displayAddNewForm() {
  document.querySelector("#formAddNew").style.display = "block";
}
function addNewProduct() {
  const name = document.querySelector("#BookName").value;
  const Description = document.querySelector("#Description").value;
  const Image = document.querySelector("#Image").value;
  const Author = document.querySelector("#Author").value;
  const Price = document.querySelector("#Price").value;
  const Age = document.querySelector("#Age").value;
  const Language = document.querySelector("#Language").value;
  const Pages = document.querySelector("#Pages").value;
  const PublishingCompany = document.querySelector("#PublishingCompany").value;
  const CoverType = document.querySelector("#CoverType").value;
  const BookWeight = document.querySelector("#BookWeight").value;
  const BookSize = document.querySelector("#BookSize").value;
  const CategoryIdArrays = document.querySelector("#CategoryIdArrays").value;
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
    CategoryIdArrays: CategoryIdArrays,
  };
  console.log(formData);
  return;
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/AddNewBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}
