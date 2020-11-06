// components/tab-control/tab-control.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
title:{
  type:Array
}
  },

  /**
   * 组件的初始数据
   */
  data: {
currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      const index=e.currentTarget.dataset.index
      this.triggerEvent('itemClick',index)
      this.setData({
        currentIndex:index
      })
    }
  }
})
