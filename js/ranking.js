var idx = 0;
var lastx = 0;
var idxs;
var loading=`<div class="loading">
            <div class="kuai kuai_one"></div>
            <div class="kuai kuai_two"></div>
            <div class="kuai kuai_three"></div>
            <div class="kuai kuai_four"></div>
            </div>`
var dataArr = [
  { page: 1, pageSize: 10, sort: "ture" },
  { page: 1, pageSize: 10, sort: "ture", sex: "0" },
  { page: 1, pageSize: 10, sort: "ture", sex: "1" },
  { page: 1, pageSize: 10, sort: "ture", tag: "精品" },
];

var topp = document.querySelector(".top");
var contt = document.querySelector(".cont");
var adian = document.querySelectorAll(".nav > a ");

var datag=window.location.search
if(!datag){
  rank(dataArr[0]);
}else if(datag==('?boy')){
  adian[lastx].classList.remove("anf");
    adian[1].classList.add("anf");
    lastx = 1;
  rank(dataArr[1])
}else if(datag==('?girl')){
  adian[lastx].classList.remove("anf");
    adian[2].classList.add("anf");
    lastx = 2;
  rank(dataArr[2])
}


//获取排行数据
function rank(data) {
  ajax("/api/book", data, "get").then((res) => {
    console.log(res.success);
    if(!res.success){return}
    setTimeout(function(){
      if(dataArr[lastx].page==1){
        contt.innerHTML = ""
      }
      idxs = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (idx < 3) {
          crOne(res.data);
        } else {
          crTwo(res.data);
        }
        idx++;
        idxs++;
      }
    },500)
  });
}
//载入页面
function crOne(res) {
  let a = document.createElement("a");
  a.href = `./book_details.html?id=${res[idxs]._id}`;
  a.innerHTML = `
    <div class="top${idx + 1}">
    <img src="./img/top${idx + 1}.png" alt="" />
    <img src="${res[idxs].pic}" alt="" />
    <img src="${res[idxs].pic}" alt="" />
    <p>${res[idxs].title}</p>
    <span>更新至${res[idxs].totalSection}话</span>
    </div>
`;
  topp.appendChild(a);
}

function crTwo(res) {
  let span = "";
  for (let i = 0; i < res[idxs].tag.length; i++) {
    span += `<span> ${res[idxs].tag[i]} </span>`;
  }
  let a = document.createElement("a");
  a.href = `./book_details.html?id=${res[idxs]._id}`;
  a.innerHTML = `
  <div class="card">
  <div><img src="${res[idxs].pic}" alt="" /></div>
  <div>
    <p>${res[idxs].title}</p>
    <span>更新至 ${res[idxs].totalSection}话</span>
    <div class="clin">
      ${span}
    </div>
    <p class="intr">
      ${res[idxs].desc}
    </p>
    <p>${idx + 1}</p>
  </div>
</div>
`;
  contt.appendChild(a);
}

for (const i in adian) {
  adian[i].onclick = function () {
    for (const i in dataArr) {
        dataArr[i].page=1;
    }
    adian[lastx].classList.remove("anf");
    adian[i].classList.add("anf");
    lastx = i;
    topp.innerHTML = "";
    contt.innerHTML = loading;
    idx = 0;
    data = dataArr[i];
    rank(data);
  };
}



window.onscroll = function (e) {
  if(scrollTop()+clientHeight()==scrollHeight()){
    dataArr[lastx].page++;
    rank(dataArr[lastx])
  }
};

document.querySelector('.searchfor').onclick=function(){
  window.location.href="./search.html";
}
document.querySelector('.user').onclick=function(){
  window.location.href="./Personal.html";
}