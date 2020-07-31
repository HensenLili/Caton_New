var data=[
	{sex:'1',sort:'ture',pageSize:4},
	{sex:'1',tag:'恋爱',pageSize:6},
	{sex:'1',tag:'独家',pageSize:6},
	{sex:'1',tag:'古风',sort:'ture',pageSize:6},
	{sex:'1',tag:'热血',sort:'ture',pageSize:6},
	{sex:'1',tag:'精品',sort:'ture',pageSize:6},
	{sex:'1',tag:'穿越',sort:'ture',pageSize:6},
]

	
var content = document.querySelectorAll('.content')
var crosswise = document.querySelectorAll('.crosswise')

//接点
function hank(data,num,callback){
	ajax("/api/book",data,"GET").then((res)=>{
		// console.log(res,data)
		
		for(var i = 0;i<res.data.length;i++){
			if(i<num){
				callback && callback(res,i)
			}
		}
	})
}

hank(data[0],4,(res, i) => {
	insert(res,i,content[0])
});
hank(data[4],4,(res, i) => {
	insert(res,i,content[1])
});

//插入新作
function  insert(res,i,content){
	let a = document.createElement('a')
	a.href = `./book_details.html?id=${res.data[i]._id}`
	a.innerHTML += `
	<div class="painting">
		<img class="painting-img" src=${res.data[i].pic} class="cover-img">
		<h5 class="h5">${res.data[i].title}</h5>
		<div class="biaoqan">
			<span class="label">${res.data[i].tag[0]}</span>
			<span class="explain">
				${res.data[i].desc}
			</span>
		</div>
	</div>
	`;
	content.appendChild(a)
}



//插入6个的
hank(data[1],6,(res, i) => {
	insert1(res,i,crosswise[0])
});
hank(data[4],6,(res, i) => {
	insert1(res,i,crosswise[1])
});

hank(data[6],6,(res, i) => {
	insert1(res,i,crosswise[2])
});


function insert1(res,i,crosswise){
	let a = document.createElement('a')
	a.href = `./book_details.html?id=${res.data[i]._id}`
	a.innerHTML += `
	<div class="crosswisebox">
		<img data-src="http://t7.baidu.com/it/u=1482211986,3652282590&amp;fm=83&amp;app=66&amp;f=JPEG?w=315&amp;h=420&amp;s=55A294F25402E5FD5C25847403000093"  id = "crosswise-img" src=${res.data[i].pic}>
		<h5 class="h5">${res.data[i].title}</h5>
		<div class="biaoqan">
			<span class="label">${res.data[i].tag[0]}</span>
		</div>
	</div>
	`;
	crosswise.appendChild(a)
}

var gufen = document.querySelector('.gufen')
hank(data[6],1,(res, i) => {
	insert3(res,i,gufen)
});


var num = parseInt(Math.random()*(100-10)+10)
function insert3(res,i,crosswise){
	let a = document.createElement('a')
	a.href = `./book_details.html?id=${res.data[i]._id}`
	a.innerHTML += `
	<div class="hot-value">
		<span></span>
		${num}万
	</div>
	<img data-src="https://b.bdstatic.com/mcoweb-searchbox/tmp/1584285559_3318.jpg" class="cover-img bbb" src=${res.data[i].pic}>
	<div class="content-container">
		<h3 class="content-title wanjie">${res.data[i].title}</h3>
		<p class="content-desc"><span class="">${res.data[i].desc}</span></p>
		<div class="content-tag-list">
			<span class="base-tag-item quwei">${res.data[i].tag[0]}</span>
	</div>
	</div>
	`;
	gufen.appendChild(a)
}

var searchfor = document.querySelector('.searchfor')

searchfor.addEventListener('click',()=>{
	window.location.href = "search.html";
})