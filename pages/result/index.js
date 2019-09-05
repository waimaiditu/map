Page({
  onLoad: function () {
    // 监听sendMapData事件，获取上一页面通过eventChannel传送到当前页面的数据
  	const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendMapData', function (data) {
      console.log(data)
    })
  },
});