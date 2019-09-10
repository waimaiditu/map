# 微信小程序地图编辑插件(mapEditPlugin)
版本号：v1.0.0

查看本文档前，建议先阅读[《小程序插件文档》](https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/)
==注意微信开发工具调试基础库版本==

## 插件介绍
- 本插件以小程序官方map地图组件为基础，接入腾讯地图sdk，实现地图标注(标注点地理信息自动获取，标注名修改，标注点移动)、线路描绘(多色彩多宽度，算法优化，数据加密)以及操作撤销清除保存等功能。目前仅支持插件页调用，后续将推出组件化插件。

## 插件应用
- 官方实例
![Alt](https://github.com/waimaiditu/map/blob/master/static/wmdt.jpeg?raw=true)

## 申请权限
- 请在[小程序后台](https://mp.weixin.qq.com/wxamp/basicprofile/thirdauth)搜索本插件（AppID=wxcea6554dac7915f4）
  设置-第三方服务-添加插件
![Alt](https://github.com/waimaiditu/map/blob/master/static/apply_1.jpg?raw=true)  
![Alt](https://github.com/waimaiditu/map/blob/master/static/apply_2.jpg?raw=true)

## 调用方式
- app.json中增加声明引入插件
```javascript
// app.json
{
  "plugins": {
    "mapEditPlugin": {
      "version": "1.0.0",
      "provider": "wxcea6554dac7915f4"
    }
  }
}
```

## 使用插件
进入页(index) -> 插件页(plugin) -> 跳转页(result)

插件涉及较多wx.navigateTo接口内容，请参照[开发文档](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

- 进入页
进入页调用wx.navigateTo进行带参跳转，在success回调函数中通过eventChannel向插件页传送数据。
定义saveMapData事件，通过参数url实现数据保存后的后续页面跳转，mapOption参数配置地图信息(后续将考虑开放同步回调函数，实现个性化数据校验、压缩加密上传)。
```javascript
// /pages/index/index.js
Page({
  goto:function(){
    wx.navigateTo({  //wx.navigateTo进行跳转
      url: 'plugin://mapEditPlugin/draw',  //插件路径
      success: function (res) {   // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('saveMapData', {  //注册saveMapData事件
          url:'/pages/result/index',  //数据保存后跳转至result页面
          mapOption:{  //地图参数配置，参考官方map组件文档
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
```

- 插件页
![Alt](https://github.com/waimaiditu/map/blob/master/static/plugin.jpg?raw=true)

- 跳转页
 跳转页在onload阶段监听sendMapData事件，获取插件页面通过eventChannel传送的数据
```javascript
// /pages/result/index.js
Page({
  onLoad: function () {
    // 监听sendMapData事件，获取上一页面通过eventChannel传送到当前页面的数据
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendMapData', function (data) {
      console.log(data)
    })
  },
});
```