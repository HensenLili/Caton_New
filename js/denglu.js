const config='http://47.106.96.222:2333'

function ajax(Url,data,type){
    let ran = new Promise(function(resolve,reject){
        $.ajax({
            url: config + Url,
            type: type,
            dataType: "JSON",
            data: data,
            xhrFields: {
                withCredentials: true // 携带跨域cookie
            },
            success: function (res) {
                resolve(res)
            },
            error:function(){
                reject('请求失败！')
            }
        })
    })
    return ran
}

ajax('/api/user', {}, 'get')


.then(res=>{
    if(!res.success){
		console.log("1111")
	}
	// console.log(res)
});
