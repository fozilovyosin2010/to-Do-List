let root = document.querySelector("#root");

let data = [
  { id: 1, title: "Yosin", description: "I'm yosin" },
  { id: 2, title: "Olim", description: "I'm Olim" },
  { id: 3, title: "Abubakr", description: "I'm Abubakr" },
];

let delModal = document.querySelector(".delModal");
let btnYes = document.querySelector(".btnYes");
let btnNo = document.querySelector(".btnNo");

let addModal = document.querySelector(".addModal");
let formAdd = document.querySelector(".formAdd");

let btnOpenAddModal = document.querySelector(".btnOpenAddModal");
let btnCloseAdd = document.querySelector(".btnCloseAdd");
let btnExitAdd = document.querySelector(".btnExitAdd");

let editModal = document.querySelector(".editModal");
let formEdit = document.querySelector(".formEdit");
let btnCloseEdit = document.querySelector(".btnCloseEdit");

//OPEN EDIT MODAL

let idxEdit = null;
let openEditModal = function (id) {
  idxEdit = id;
  editModal.showModal();
  let sel = data.find((e) => {
    return e.id == id;
  });
  formEdit["inpEditTitle"].value = sel.title;
  formEdit["inpEditDes"].value = sel.description;
};

//CHANGE DATA

formEdit.onsubmit = (event) => {
  event.preventDefault();
  data.map((e) => {
    if (e.id == idxEdit) {
      e.title = event.target["inpEditTitle"].value;
      e.description = event.target["inpEditDes"].value;
    }
    return e;
  });
  getData(data);
  editModal.close();
};

//btnCloseEdit

btnCloseEdit.onclick = (event) => {
  event.preventDefault();

  editModal.close();
};

btnExitAdd.onclick = () => {
  addModal.close();
};

btnCloseAdd.onclick = (event) => {
  addModal.close();
  event.preventDefault();
};

//OPEN ADD MODAL

btnOpenAddModal.onclick = () => {
  addModal.showModal();
};

formAdd.onsubmit = (event) => {
  event.preventDefault();

  let obj = {
    id: data.length + 1,
    title: event.target["inpAddTitle"].value,
    description: event.target["inpAddDes"].value,
  };
  data.push(obj);
  getData(data);
  addModal.close();
  event.target["inpAddTitle"].value = "";
  event.target["inpAddDes"].value = "";
};

btnYes.onclick = () => {
  data = data.filter((e) => {
    return e.id !== idxDel;
  });
  getData(data);
  delModal.close();
};

btnNo.onclick = () => {
  delModal.close();
};

let idxDel = null;
let openDelModal = (id) => {
  idxDel = id;
  delModal.showModal();
};

function getData(data) {
  root.innerHTML = "";
  data.forEach((e) => {
    let sec = document.createElement("div");
    sec.classList.add("sec");

    let block1 = document.createElement("div");
    block1.classList.add("block1");

    let block2 = document.createElement("div");
    block2.classList.add("block2");

    let title = document.createElement("h1");
    title.innerHTML = e.title;

    let des = document.createElement("span");
    des.innerHTML = e.description;

    let btnDel = document.createElement("button");
    btnDel.classList.add("btnDel");
    btnDel.innerHTML = "DEL";
    btnDel.onclick = () => {
      openDelModal(e.id);
    };

    let btnEdit = document.createElement("button");
    btnEdit.innerHTML = "Edit";
    btnEdit.classList.add("btnEdit");
    btnEdit.onclick = () => {
      openEditModal(e.id);
    };

    block2.append(btnDel, btnEdit);
    block1.append(title, des);
    sec.append(block1, block2);
    root.appendChild(sec);
  });
}
getData(data);
