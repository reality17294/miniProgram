

Page({

  /**
   * 页面的初始数据
   */
  data: {
address:{},
itemInfo:[],
total:0,
price:0,
showAddress:true
  },
 /**
   * 事件函数
   */
  purchase(){
    wx.setStorageSync('payment', this.data.itemInfo)
       wx.showToast({
         title: '支付成功',
         icon:'none',
         duration:1500,
         success(){
           setTimeout(()=>{
            wx.navigateTo({
              url: '/pages/order/order',
             })
           },2000)
        
         }
       })
      
      
  },

  // 购物车页面变化时重新计算
  refreshCart(){
  const data = wx.getStorageSync('cart')
  // 当没有数据时显示占位元素
  const cart = data.filter(item=>item.checked)
  this.setData({
      itemInfo:cart,
  })
// 重新计算数量
let totalNumber = 0
let totalPrice = 0
this.data.itemInfo.forEach(item=>{
  if(item.checked){
   totalNumber+=item.num
   totalPrice+=item.num*item.goods_price
  }
  this.setData({
   total:totalNumber,
   price:totalPrice
 })
})
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {  
    const address = wx.getStorageSync('address')
    this.setData({
      address
    })
  this.refreshCart()
  },


})