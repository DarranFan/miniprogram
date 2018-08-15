var postData = require('../../../data/index_data.js');
var app = getApp();
Page({
  data: {
      isPlaying:false
  },
  onLoad: function (options) {
    // console.log(this.data.isPlaying,app.globalData);
    var postId = options.id;
    this.data.currentId = postId;
    var postDate = postData.postLists[postId];
    //获取文章详细数据并进行设置
    this.setData({
      postDate: postDate
    });
    //这里是获取所有是否被收藏的缓存的状态
    var postsCollected = wx.getStorageSync('posts_collected');
    // wx.setStorage({
    //   key: "posts_collected",
    //   success: function (res) {
    //     var postsCollected = res.data;
    //   }
    // })
    if (postsCollected) {
      //这里是点击到某一个文章detail的收藏缓存状态
      var postCollected = postsCollected[postId];
      if (postCollected == undefined) {
        postCollected = false;
      }
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    // wx.clearStorageSync()
  },
  collect: function (e) {
    // this.collectSync();
    this.collectAsync();
  },
  // 异步获取storage 
  collectAsync() {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentId];
        // //收藏变未收藏
        postCollected = !postCollected;
        // //改变缓存状态
        postsCollected[that.data.currentId] = postCollected;
        // wx.setStorageSync('posts_collected', postsCollected)
        // // //更新data中的变量
        // this.setData({ collected: postCollected })

        // 下面是两种体验
        that.showtoast(postsCollected, postCollected);
        // this.showmodal(postsCollected, postCollected);
      }
    })
  },
  // 同步获取storage
  collectSync() {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.currentId];
    // //收藏变未收藏
    postCollected = !postCollected;
    // //改变缓存状态
    postsCollected[this.data.currentId] = postCollected;
    // wx.setStorageSync('posts_collected', postsCollected)
    // // //更新data中的变量
    // this.setData({ collected: postCollected })

    // 下面是两种体验
    this.showtoast(postsCollected, postCollected);
    // this.showmodal(postsCollected, postCollected);
  },
  showmodal(postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '确认收藏' : '取消收藏',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: 'red',
      confirmText: '确定',
      confirmColor: 'green',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('posts_collected', postsCollected)
          // //更新data中的变量
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  showtoast(postsCollected, postCollected) {
    wx.setStorageSync('posts_collected', postsCollected)
    // //更新data中的变量
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      duration: 1000
    })
  },
  shares() {
    wx.showActionSheet({
      itemList: ['分享到QQ', '分享给微信好友', '分享到微博', '分享到微信朋友圈'],
      itemColor: '#405f80',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 播放音乐
  playMusic() {
    if (this.data.isPlaying){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlaying:true
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: 'https://pan.baidu.com/s/1A0uJBYffNbpjcBQI4IX-WQ',
        title: '行星',
        coverImgUrl: 'http://qukufile2.qianqian.com/data2/pic/540d21363e5317e431070ac4016a5b98/141246/141246.jpg@s_1,w_300,h_300'
      })
      this.setData({
        isPlaying: false
      })
    }
    console.log(this.data.isPlaying)
  }
})