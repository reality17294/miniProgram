const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
let times = 0
export default function request(option){
  times++;
  return new Promise((resolve,reject)=>{
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: baseURL+option.url,
      method:option.method || 'GET',
      data:option.data,
      success:res=>{
        resolve(res)
      },
      fail:err=>{
        reject(err)
      },
      complete:()=>{
        times--
        if(!times){
          wx.hideLoading()
        }
      }
    })
  })
  
}