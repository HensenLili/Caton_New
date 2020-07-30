var data=[
	{tag:'自制',sort:'ture',pageSize:4},
	{tag:'恋爱',sort:'ture',pageSize:7},
	{tag:'独家',sort:'ture',pageSize:6},
	{tag:'古风',sort:'ture',pageSize:6},
	{tag:'热血',sort:'ture',pageSize:6},
	{tag:'精品',sort:'ture',pageSize:6},
	{tag:'穿越',sort:'ture',pageSize:6},
	{tag:'神魔',sort:'ture',pageSize:6}
]
	
var content = document.querySelector('.content')
var crosswise = document.querySelectorAll('.crosswise')
// console.log(crosswise[0])
var gufen = document.querySelectorAll(".gufen")
// console.log(gufen)
var man = document.querySelector('.man')
var nv = document.querySelector('.nv')


//接点
function hank(data,num,callback){
	ajax("/api/book",data,"GET").then((res)=>{
		// console.log(res,data)
		
		for(var i = 0;i<res.data.length;i++){
			// console.log(res.data[i].title)
			// console.log(res.data[i]._id)
			// console.log(res.data[i].pic)
			// console.log(res.data[i].desc)
			if(i<num){
				callback && callback(res,i)
			}
		}
	})
}



hank(data[0],4,(res, i) => {
	insert(res,i)
});

//插入新作
function  insert(res,i){
	let a = document.createElement('a')
	
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


hank(data[1],6,(res, i) => {
	insert1(res,i,crosswise[0])
});

function insert1(res,i,crosswise){
	let a = document.createElement('a')
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


hank(data[2],6,(res, i) => {
	insert1(res,i,crosswise[1])
});
hank(data[5],6,(res, i) => {
	insert1(res,i,crosswise[4])
});
hank(data[6],6,(res, i) => {
	insert1(res,i,crosswise[5])
});

//插三条的
hank(data[3],3,(res, i) => {
	insert2(res,i,crosswise[2])
});

function insert2(res,i,crosswise){
	let a = document.createElement('a')
	a.innerHTML += `
	<div class="crosswisebox">
		<img data-src="http://t7.baidu.com/it/u=1482211986,3652282590&amp;fm=83&amp;app=66&amp;f=JPEG?w=315&amp;h=420&amp;s=55A294F25402E5FD5C25847403000093" class="painting-img" id = "crosswise-img" src=${res.data[i].pic}>
		<div class="hot-value"><span></span>100万</div>
		<h5 class="h5">${res.data[i].title}</h5>
		<div class="biaoqan">
			<span class="label">${res.data[i].tag[0]}</span>
		</div>
	</div>
	`;
	crosswise.appendChild(a)
}

hank(data[4],3,(res, i) => {
	insert2(res,i,crosswise[3])
});
hank(data[7],3,(res, i) => {
	insert2(res,i,crosswise[6])
});




//插大图的
hank(data[1],1,(res, i) => {
	insert3(res,i,gufen[0])
});
hank(data[6],1,(res, i) => {
	insert3(res,3,gufen[1])
});
hank(data[3],1,(res, i) => {
	insert3(res,i,gufen[2])
});

function insert3(res,i,gufen){
	let a = document.createElement('a')
	a.innerHTML += `
	<div class="hot-value">
		<span></span>
		60万
	</div>
	<img class="cover-img aaaa" data-src="https://b.bdstatic.com/mcoweb-searchbox/tmp/1594377649_9058.jpg" src=${res.data[i].pic}>
	<h3 class="content-title">${res.data[i].title}</h3>
	<div class="content-tag-list">
		<span class="base-tag-item white">${res.data[i].tag[0]}</span>
		<span class="base-tag-item white">${res.data[i].tag[1]}</span>
	</div>
	`;
	gufen.appendChild(a)
}




