# map
微信小程序地图编辑插件demo

进入页 -> 插件页 -> 跳转页

进入页通过wx.navigateTo接口eventChannel向页传送数据
定义saveMapData事件，传递url参数供保存后进行页面跳转


跳转页面在onload阶段监听sendMapData事件，获取地图插件页面通过eventChannel传送的数据
具体api调用参照开发文档 https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html