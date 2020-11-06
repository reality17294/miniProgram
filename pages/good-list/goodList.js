// pages/good-list/goodList.js
import request from "../../services/services"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:['综合','价格','销量'],
    index:0,
    goodList:[],
  
  },
  params:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  totalPage:0,
 /**
   * 事件函数
   */
  getListData(){
    request({
    url:'/goods/search',
    data:this.params
    }).then(res=>{
      const total = res.data.message.total
      this.totalPage = Math.ceil(total/this.params.pagesize)
    this.setData({
    goodList:this.data.goodList.concat(res.data.message.goods)
    })
  

    })

  },
  itemClick(e){
    this.setData({
      index:e.detail
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
      this.params=options
      this.getListData()
      
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
    this.setData({
      goodList:[]
    })
    this.params.pagenum=1
    this.getListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.params.pagenum>this.totalPage){
      wx.showToast({
        title: '到底了，没有更多数据了',
        icon: 'none',
        duration: 1500
      })
    }else{
      this.params.pagenum+=1
      this.getListData()
    }
 

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})