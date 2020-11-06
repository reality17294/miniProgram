

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
itemInfo:[],
total:0,
price:0,
allChecked:false,
isShowHoder:false,
showAddress:true


  },
 /**
   * 事件函数
   */
//  获取地址
getAddress(){
  wx.chooseAddress({
    success: res => {
      const data = {
        userName:res.userName,
        telNumber:res.telNumber,
        postalCode:res.postalCode,
        addressDetail:res.provinceName+res.cityName+res.countyName+res.detailInfo,

      }
      wx.setStorageSync('address', data)
       this.setData({
        showAddress:false
       })
    },
  })
 
},
// 商品选中
  checkClick(e){
    const id = e.currentTarget.dataset.id
    const index =this.data.itemInfo.findIndex(item=>item.goods_id == id)
    const cart =this.data.itemInfo
    cart[index].checked = !cart[index].checked 
    wx.setStorageSync('cart', cart)
    this.refreshCart()
  
  },
  // 全选选中
  allCheckClick(){
    const cart =this.data.itemInfo 
    if(this.data.allChecked){
      cart.map(item=>item.checked = false)
    }else{
      cart.map(item=>item.checked = true)
    }
    wx.setStorageSync('cart', cart)
    this.refreshCart()
  },
  // 增加数量
  increment(e){
    const id = e.currentTarget.dataset.id
    this.countChange(id,1)
  },
  // 减少数量
  decrement(e){
    const id = e.currentTarget.dataset.id
    this.countChange(id,0)
  },
  // 点击数量增加减少方法
  countChange(id,flag){
    const index =this.data.itemInfo.findIndex(item=>item.goods_id == id)
    const cart =this.data.itemInfo
    // 增加是1 减是0
    if(flag){
      cart[index].num+=1 
    }else{
      if(cart[index].num === 0){
        wx.showModal({
          title: '提示',
          content: '确认要删除该商品吗？',
          success: res=> {
            if (res.confirm) {              
             cart.splice(index,1)
            wx.setStorageSync('cart', cart)
            this.refreshCart()
            }
          }
        })
      }else{
        cart[index].num-=1   
      }
    }
    wx.setStorageSync('cart', cart)
    this.refreshCart()
  },
  // 购物车页面变化时重新计算
  refreshCart(){
  const data = wx.getStorageSync('cart')
  // 当没有数据时显示占位元素
  if(data.length <1){
    this.setData({
      itemInfo:data,
      isShowHoder:true
    })
  }  
  if(data.length >0){

  this.setData({
      itemInfo:data,
      isShowHoder:false
  })
  // 有顺序问题
  this.setData({
    allChecked:this.data.itemInfo.every(item=>item.checked)
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
})}
  },
  // 结算功能
  purchaseClick(){
    const {address,total} = this.data
    if(!address){
      wx.showToast({
        title: '您还没有添加收货地址',
        icon:'none'
      })
      return
    }
    if(!total){
      wx.showToast({
        title: '您还没有选购商品',
        icon:'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/payment/payment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 只要缓存中有地址信息就显示出来，不会再出现有地址但界面还需要授权
    const address = wx.getStorageSync('address')
    const flag = address.userName
    this.setData({
      address,
      showAddress:Boolean(!flag)
    })
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