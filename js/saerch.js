

function hank(){
	ajax('/api/book',{title:'斗罗'},'GET').then((res)=>{
		
		for(var i = 0;i<res.data.length;i++){
			// if(i<num){
			// 	callback && callback(res,i)
			// }
			console.log(res.data[i])
		}
	})
}
hank()