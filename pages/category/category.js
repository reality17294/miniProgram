// pages/category/category.js
import request from "../../services/services"
let category=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
  asideData:[],
  contentData:[],
  currentIndex:0,
  scrollTop:0
  },
 /**
   * 事件函数
   */
getCategoryData(){
  request({
    url:'/categories'
  }).then(res=>{
    this.category= res.data.message
    wx.setStorageSync('cates', {time:Date.now(),data:this.category})
    const asideData = this.category.map(v=>v.cat_name)
    const contentData = this.category[0].children
    this.setData({
      asideData,
      contentData
    })
  })
},
itemClick(e){
  const index =e.currentTarget.dataset.index
  const contentData = this.category[index].children
  this.setData({
    currentIndex:index,
    contentData,
    scrollTop:0
  })
  
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCategoryData()
    }else{
      if(Date.now()-Cates.time<10000){
    this.category=Cates.data
    const asideData = this.category.map(v=>v.cat_name)
    const contentData = this.category[0].children
    this.setData({
      asideData,
      contentData
    })}else{
      this.getCategoryData()
    }
    }
  
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

 
})