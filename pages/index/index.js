import request from '../../services/services'
const cids=[78,431,739]
const floorCids=[[862,882,880,930,939],[1018,1093,1057,1060,1063],[1317,1315,1323,1327,1384]]
Page({
  data: {
  banner:[],
  recommend:[],
  floor:[]
  },
  /*事件处理函数*/
  // 获取轮播图数据
getSwiperData(){
  request({url:'/home/swiperdata'})
           .then(res=>{
             
            this.setData({
        banner:res.data.message
      })
    })
},
    // 获取导航数据
getRecommendData(){
  request({url:'/home/catitems'})
  .then(res=>{
    this.setData({
      recommend:res.data.message
    })
  })
},
// 获取楼层数据
getFloorData(){
  request({url:'/home/floordata'})
  .then(res=>{
    // 点击图片跳转页面 由于路径不对把数据请求过来先过滤
    const floorData = res.data.message
    // let newFloorData = floorData.map((item,index)=>{
    //   item.product_list.map((item1,index1)=>{ 
    //     item1.navigator_url=item1.navigator_url.replace('goods_list','good-list/goodList')
    //     return item1
    //   })
    //   return item
    // })
    this.setData({
      floor:floorData
    })
  })
},

  // 生命周期函数
  onLoad: function () {
    // 获取轮播图数据
    this.getSwiperData()
    // 获取导航数据
   this.getRecommendData()
    // 获取楼层数据
   this.getFloorData()
 
  },
  onShow:function(){
  // 点击推荐导航跳转以及点击楼层导航跳转
    setTimeout(()=>{
      const data  = this.data.recommend
      const floorData = this.data.floor
      let newData =data.map((item,index)=>{
        if(item.navigator_url){  
            item.navigator_url=item.navigator_url.replace('main','category')
            // 如果商品有跳转链接则在索引值处添加一个空。确保下面的index正确
            cids.splice(index,0,'')
        }else{
          item.navigator_url=`/pages/good-list/goodList?cid=${cids[index]}`
        }
        return item
      })
      // 自己给的跳转路径比较符合 接口不符合

      let newFloorData = floorData.map((item,index)=>{
        item.product_list.map((item1,index1)=>{
         let currentcids=floorCids[index]      
          item1.navigator_url=`/pages/good-list/goodList?cid=${currentcids[index1]}`
          return item1
        })
        return item
      })
      this.setData({
        recommend:newData,
        floor:newFloorData
      })
    },500)    
  }
})
