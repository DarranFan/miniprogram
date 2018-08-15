var postData = require('../../data/index_data.js');

Page({
  data: {
  },
  onLoad: function () {
    // this.data.a = postData.postLists;
    this.setData({ a: postData.postLists })
    // console.log(this.data.a)
  },
  onDetail:function(event){
    
    var indexId = event.currentTarget.dataset.indexid;
    console.log(event, indexId)
    // wx.navigateTo({
    //   url: './index_detail/index_detail?id=' + indexId
    // })
    wx.navigateTo({
      //  这个是父子页面的跳转  这个跳转之后可以返回之前的页面
      // 用这个的时候父子页面最多有5级
      url: './index_detail/index_detail?id=' + indexId
    })
  }
})

