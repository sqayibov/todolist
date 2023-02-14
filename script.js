const btnadd = document.querySelector("#addBtn");
const listContainer = document.querySelector("#listContainer");
const btnDeleteDefault = document.querySelector(".delete");
const sortIcon = document.querySelector(".sort-icon");
btnDeleteDefault.addEventListener("click", (e) => {
  e.preventDefault();
});

setDragDrop(document.querySelector('.input-box'));

const addNewOrder = (e) => {
  e.preventDefault();

  // create new elements
  const newInputBox = document.createElement("div");
  const newInput = document.createElement("input");
  const newDeleteButton = document.createElement("button");

  // add classes, atributes and etc to new elements
  newInputBox.classList.add("input-box");
  newInput.classList.add("form-input");
  newInput.type = "text";
  newDeleteButton.classList.add("delete");

  // append elements
  listContainer.append(newInputBox);
  newInputBox.append(newInput, newDeleteButton);

  setDragDrop(newInputBox)

  newDeleteButton.innerHTML = `<svg class="delete-svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        >
        <rect
        x="0.5"
        y="0.5"
        width="19"
        height="19"
        rx="9.5"
        stroke="#C4C4C4"
        />
        <path d="M6 6L14 14" stroke="#C4C4C4" />
        <path d="M6 14L14 6" stroke="#C4C4C4" />
</svg>`;

  // delete order
  const btnsDelete = document.querySelectorAll(".delete");

  btnsDelete.forEach((btnDel) => {
    btnDel.addEventListener("click", (e) => {
      e.preventDefault();
      if (listContainer.children.length > 1) btnDel.parentElement.remove();
      else btnDel.parentElement.firstElementChild.value = "";
    });
  });

  /////////////////
  // const listContainerChilds = Array.from(listContainer.children);


};

btnadd.addEventListener("click", addNewOrder);

// Sort orders
sortIcon.addEventListener("click", (e) => {
  const listContainerChilds = Array.from(listContainer.children);

  if (listContainer.dataset.sort === "asc") {
    changeSortIcon("asc");
    listContainer.dataset.sort = "desc";
    listContainerChilds.sort((a, b) => {
      if (a.firstElementChild.value > b.firstElementChild.value) return 1;
      else return -1;
    });
  } else if (listContainer.dataset.sort === "desc") {
    changeSortIcon("desc");
    listContainer.dataset.sort = "asc";

    listContainerChilds.sort((a, b) => {
      if (a.firstElementChild.value > b.firstElementChild.value) return -1;
      else return 1;
    });
  }

  listContainerChilds.forEach((e) => {
    listContainer.appendChild(e);
  });
});

// function for change sort icon
function changeSortIcon(dir) {
  if (dir === "desc") {
    sortIcon.innerHTML = `<rect x="2.5" width="2.5" height="12.5" fill="#C4C4C4" />
    <rect
      x="10"
      y="3.75"
      width="2.5"
      height="7.5"
      transform="rotate(-90 10 3.75)"
      fill="#C4C4C4"
    />
    <rect
      x="10"
      y="8.75"
      width="2.5"
      height="10"
      transform="rotate(-90 10 8.75)"
      fill="#C4C4C4"
    />
    <rect
      x="10"
      y="13.75"
      width="2.5"
      height="15"
      transform="rotate(-90 10 13.75)"
      fill="#C4C4C4"
    />
    <path
      d="M3.75 15L0.502405 10.3125L6.9976 10.3125L3.75 15Z"
      fill="#C4C4C4"
    />
`;
  } else if (dir === "asc") {
    sortIcon.innerHTML = `
    <rect x="5" y="15" width="2.5" height="12.5" transform="rotate(-180 5 15)" fill="#C4C4C4"/>
    <rect x="10" y="3.75" width="2.5" height="7.5" transform="rotate(-90 10 3.75)" fill="#C4C4C4"/>
    <rect x="10" y="8.75" width="2.5" height="10" transform="rotate(-90 10 8.75)" fill="#C4C4C4"/>
    <rect x="10" y="13.75" width="2.5" height="15" transform="rotate(-90 10 13.75)" fill="#C4C4C4"/>
    <path d="M3.75 6.55671e-07L6.99759 4.6875L0.502404 4.6875L3.75 6.55671e-07Z" fill="#C4C4C4"/>
    `;
  }
}

// Drag & Drop
function setDragDrop(el)  {
  el.setAttribute("draggable", true);
  const randomId1 = Math.floor(Math.random() * 10000) + 1;
  const randomId2 = Math.floor(Math.random() * 10000) + 1;
  const randomId3 = Math.floor(Math.random() * 10000) + 1;

  const id = `${randomId1}${randomId2}${randomId3}`;
  el.setAttribute("id", id);

  el.addEventListener(
    "dragstart",
    (e) => {
      e.dataTransfer.setData("text", e.target.id);
      console.log(e.target.id)
    },
    false
  );

  el.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  el.addEventListener("drop", (e) => {
    e.preventDefault();
    let idOfDraggable = e.dataTransfer.getData("text");
    const indexOfDraggable = [...listContainer.childNodes].findIndex(
      (div) => div.id === idOfDraggable
    );
    listContainer.replaceChild(document.getElementById(idOfDraggable), e.currentTarget);
   listContainer.insertBefore(e.currentTarget, listContainer.childNodes[indexOfDraggable])
  });
}