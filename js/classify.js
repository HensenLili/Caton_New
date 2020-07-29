var tag = "";
var idxs=0;
var nav = document.querySelector(".nav");
var formm = document.querySelector(".form");
var content = document.querySelector(".content");
var cladata = {};

//获取分类标签
ajax("/api/tag", {}, "get").then((res) => {
  for (const i in res.data) {
    tag += `<span>${res.data[i].name}</span>`;
  }
  formm.innerHTML += tag;
});

//添加标签点击事件
nav.onclick = function (e) {
  if (e.target.tagName != "SPAN") return;
  var spArr = e.path[1].children;
  for (let i = 0; i < spArr.length; i++) {
    spArr[i].classList.remove("clo");
  }
  idxs=0;
  content.innerHTML='';
  e.target.classList.add("clo");
  pabd(e.target.innerText);
  ajj(cladata);
};

//获取漫画
function ajj(cladata) {
  ajax("/api/book", cladata, "get").then((res) => {
    console.log(res.data=='');
    if(res.data==''){content.innerHTML='<p>这个分类空空如也，看看其他的吧！</p>'}
    for (let i = 0; i < res.data.length; i++) {
      crThree(res.data);
      idxs++;
    }
  });
}

function pabd(text) {
  switch (text) {
    case "全部1":
      delete cladata.tag;
      break;
    case "全部2":
      delete cladata.finsh;
      break;
    case "全部3":
      delete cladata.sex;
      break;
    case "连载":
      cladata.finsh = false;
      break;
    case "完结":
      cladata.finsh = true;
      break;
    case "男生":
      cladata.sex = 0;
      break;
    case "女生":
      cladata.sex = 1;
      break;
    default:
      cladata.tag = text;
  }
}

function crThree(res) {
  let span = "";
  for (let i = 0; i < res[idxs].tag.length; i++) {
    span += `<span> ${res[idxs].tag[i]} </span>`;
  }
  let a = document.createElement("a");
  a.href = `${config}/api/book/one?id=${res[idxs]._id}`;
  a.innerHTML = `
    <div class="card">
    <img src="${res[idxs].pic}" alt="" />
    <div>
      <p>${res[idxs].title}</p>
      <span>更新至 ${res[idxs].totalSection}话</span>
      <div class="clin">
        ${span}
      </div>
      <p class="intr">
        ${res[idxs].desc}
      </p>
    </div>
  </div>
  `;
  content.appendChild(a);
}
