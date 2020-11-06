// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
userInfo:{},
showLoginBtn:true,
stars:0
  },
  getUserInfo(e){
    const data =e.detail.userInfo
    const info = {
      nickName:data.nickName,
      gender:data.gender,
      address:data.country+data.province+data.city,
      avatarUrl:data.avatarUrl
    }
    this.setData({
      userInfo:info,
  showLoginBtn:false
    })
    wx.setStorageSync('userInfo', info)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   const data = wx.getStorageSync('userInfo')
   const stars = wx.getStorageSync('collect').length
   if(data.nickName){
   this.setData({
  showLoginBtn:false,
  userInfo:data,
  stars
})
  }   
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