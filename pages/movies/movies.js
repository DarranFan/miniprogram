Page({
  onLoad(){
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250',
      method:'GET',
      header:{"Content-Type":"application/xml"},
      success:function(data){
        console.log(data)
      }
    })
  }
})