// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  turn(e) {
    // console.log(e)
    // wx.navigateTo({
    //   //  这个是父子页面的跳转  这个跳转之后可以返回之前的页面
    //   // 用这个的时候父子页面最多有5级
    //   url: '../index/index?id=1'
    // })
    // wx.redirectTo({
    //   // 这个是两个平级页面的跳转
    //   url: '../index/index?id=1'
    // })
    wx.switchTab({
      url: '../index/index',
    })
  }

})