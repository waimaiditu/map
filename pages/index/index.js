Page({
  goto:function(){
    wx.navigateTo({
      url: 'plugin://mapEditPlugin/draw',
      success: function (res) {// 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('saveMapData', { 
          url:'/pages/result/index',
          mapOption:{
            longitude: 116.397470,
            latitude: 39.908823,
            scale: 17,
            markers: [],
            polyline: [],
            showCompass: true,
            showScale: true,
            enableSatellite: false
          }
        })
      }
    })
  }
});