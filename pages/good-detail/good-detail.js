// pages/good-detail/good-detail.js
import request from "../../services/services"
let goods = {
  goods_id:0
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
itemDetail:{},
noStar:true
  },

  /**
   * 事件函数
   */
  getDetailData(){   
     
    request({
      url:'/goods/detail',
      data:{goods_id:goods.goods_id}
    }).then(res=>{      
      this.setData({
        itemDetail:
        { 
          goods_id:res.data.message.goods_id,
          goods_name:res.data.message.goods_name,
          goods_price:res.data.message.goods_price,
          goods_small_logo:res.data.message.goods_small_logo,
          goods_introduce:res.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:res.data.message.pics,
          num:res.data.message.num,
          checked:true
        }
      })
      
    })
  },
  swiperClick(e){
    const current = e.currentTarget.dataset.url
    const urls = this.data.itemDetail.pics.map(v=>v.pics_mid_url)
    console.log(e);
    
    wx.previewImage({
      current,
      urls
    })
  },
  addCart(){ 
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v=>v.goods_id == this.data.itemDetail.goods_id)
      if(index === -1 ){
        this.data.itemDetail.num=1
        cart.push(this.data.itemDetail)
      }else{
        cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加购物车成功',
      mask:true
    }) 
  },
  starClick(){
 
    const collect = wx.getStorageSync('collect') || []
    const index = collect.findIndex(item=>item.goods_id == goods.goods_id)
    if(index === -1){
      collect.push(this.data.itemDetail)
       this.setData({
      noStar:false
    })
      wx.showToast({
        title: '收藏成功',
        duration:1000,
        mask:true
      })
    }else{
      collect.pop(this.data.itemDetail)
      this.setData({
        noStar:true
      })
      wx.showToast({
        title: '取消收藏成功',
        duration:1000,
        mask:true
      })
    }
    wx.setStorageSync("collect",collect)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goods.goods_id=options.goods_id
      this.getDetailData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const collect = wx.getStorageSync('collect') || []
   const flag= collect.some(item=>item.goods_id == goods.goods_id)   
   this.setData({
    noStar:!flag
   })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})