import request from "../../services/services"
var timer = null 
Page({
  data: {
      inputShowed: false,
      inputVal: "",
      searchData:[]
  },
//   请求搜索数据
getSearchData(info){
    request({
        url:'/goods/qsearch',
        data:{
            query:info
        }
    }).then(res=>{
        console.log(res);
        this.setData({
            searchData:res.data.message
        })
        
        
    })
},
// 防抖实现 某个时间后没重新触发时再执行  
debounce(fn,delay,event){
    // timer最终放在全局定义 放在里面会被反复重置 导致最后的timer都会被保留下来 从而发送多次请求
// let timer = null 
 return function () { 
    let args = event.detail.value
    if(timer) {clearTimeout(timer)}
    timer = setTimeout(function(){
         fn(args)
     }, delay);
 }
},

  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
        inputVal:e.detail.value
      })
     this.debounce(this.getSearchData,1000,e)()
  },
  onShow(){
      
  }
})