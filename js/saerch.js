var cancel = document.querySelector(".cancel")

var input = document.querySelector(".search-input")

input.addEventListener('click',()=>{
	var input = document.querySelector(".search-input")
	var booklist = document.querySelector(".booklist")
	var data = input.value;
	if(data == ''){
		
		booklist.style.display = 'none';
	}
})

//点击搜索
cancel.addEventListener('click', () => {

	var input = document.querySelector(".search-input")
	var booklist = document.querySelector(".booklist")
	var data = input.value;
	var date = {
		title:data
	}
	books.innerHTML ="";
	hank(date)

	booklist.style.display = 'block';
})

//获取数据
function hank(date) {
	ajax('/api/book', date, 'GET').then((res) => {
       
		for (var i = 0; i < res.data.length; i++) {
			// console.log(res.data[i])
			// console.log(res.data[i]._id)
			// console.log(res.data[i].title)
			// console.log(res.data[i].pic)
			// console.log(res.data[i].desc)
			// console.log(res.data[i].tag)
			// console.log(res.data[i].totalSection)
			booklist(res,i);
		}
	})
}

//插入数据
var books = document.querySelector('.books')
var p = document.querySelector('.p')
function booklist(res,i) {
	p.innerHTML = `找到${res.data.length}本相关漫画哦(｡･ω･｡)`
	
	let a = document.createElement('a')
    a.href = `./book_details.html?id=${res.data[i]._id}`
	a.innerHTML +=
		`
	<div class="card">
		<div><img src=${res.data[i].pic} alt=""></div>
		<div>
			<p>${res.data[i].title}</p>
			<span>更新至 ${res.data[i].totalSection}话</span>
			<div class="clin">
				<span> 独家 </span><span> 冒险 </span><span> 神魔 </span><span> 漫改 </span><span> 穿越 </span><span> 精品 </span>
			</div>
			<p class="intr">
				${res.data[i].desc}
			</p>
		</div>
	</div>
	`;
	books.appendChild(a)
}





//点击事件
var refresh = document.querySelector('.refresh')

refresh.addEventListener('click',()=>{
	searchlist.innerText = '';
	hank1()
})

//插入数据
var searchlist = document.querySelector('.search-list')
function search(res,i){
	let a = document.createElement('a')
	a.href = `./book_details.html?id=${res.data[i]._id}`
	a.innerHTML +=
		`
<a href="./book_details.html?id=${res.data[i]._id}" class="hot-item">
					${res.data[i].title}
				</a>
	`;
	searchlist.appendChild(a)
}


//获取数据
function hank1() {
	ajax('/api/rand', {size:'9'}, 'GET').then((res) => {
       
		for (var i = 0; i < res.data.length; i++) {
			// console.log(res.data[i]._id)
			// console.log(res.data[i].title)
			search(res,i)
		}
	})
}
hank1();
