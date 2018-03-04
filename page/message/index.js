//获取应用实例
//http://blog.csdn.net/yanglei0917/article/details/70171921
var FormateUtil = require('../../util/FormateUtil.js')
const getListUrl = require('../../config.js').getBroadcastUrl
const duration = 2000
var app = getApp()
var PAGE_NUMBER = 0;
var PAGE_SIZE = 5;
var MAX_PAGE_COUNT = 10
var CONSTELLATION_TYPE = 1; 
var DELAY_TIME = 500;


Page({
  data: {
    listBroadcast: [],
    isHideBottom: true,
    isHideLoadMore: true,
    isHideEmptyData: true,
    isHideCenterLoading: true,
    constellationType:1,
    arrayConstellation: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座 ', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座 ', '水瓶座 ', '双鱼座'],
    arrayConstellationImage: ['con1.png', 'con2.png', 'con3.png', 'con4.png', 'con5.png ', 'con6.png', 'con7.png', 'con8.png', 'con9.png', 'con10.png ', 'con11.png ', 'con12.png'],
    arrayConstellationDate: ['白羊座 ( 03/21 - 04/20 )', '金牛座 ( 04/21 - 05/20)', '双子座 ( 05/21 - 06/21)', '巨蟹座 ( 06/22- 07/22)', '狮子座 ( 07/23 - 08/22)', '处女座 ( 08/23 - 09/22)', '天秤座 ( 09/23 - 10/23)', '天蝎座 ( 10/24 - 11/22)', '射手座 ( 11/23 - 12/21)', '魔羯座 ( 12/22 - 01/19)', '水瓶座 ( 01/ 20- 02/18)', '双鱼座 ( 02/19- 03/20）'],
    index: 0,
    iconDownStatus: true,
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    setCenterLoadingViewHideStatus(that, false);
    setTimeout(function () {
      getBroadcastList(that, that.data.constellationType, PAGE_NUMBER, PAGE_SIZE, false);
    }, DELAY_TIME);

   
  },
  onShow: function () {
    console.log('onShow')
  },
  startShare: function (e) {
    console.log('strat startShare')
    var self = this

  }, 
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      iconDownStatus: true,
      constellationType: parseInt(this.data.index)+1,
    })
    let currentIndex = parseInt(this.data.index);
    currentIndex = currentIndex+1;
    this.setData({
      constellationType: currentIndex,
    })
    PAGE_NUMBER = 0;
    setCenterLoadingViewHideStatus(this, false);
    setEmtptyViewHideStatus(this, true);
    setBottomTipHideStatus(this, true);
    this.setData({
      listBroadcast: []
    });
    var that = this
    setTimeout(function () {
      getBroadcastList(that, that.data.constellationType, PAGE_NUMBER, PAGE_SIZE, false);
    }, DELAY_TIME);

   // getBroadcastList(this, this.data.constellationType, PAGE_NUMBER, PAGE_SIZE, false);
  },

  selectConstellation: function (e) {
    console.log('strat selectConstellation')
    this.setData({
     // iconDownStatus: false,
    })
  },


  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '超准，快来看哦！',
      desc: '最具人气的星座运势小报',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },



  //下拉刷新
  onPullDownRefresh: function () {
    console.log('strat onPullDownRefresh')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    var that = this;
    setBottomTipHideStatus(that, true);
    setTimeout(function () {
      // complete
      console.log('complete onPullDownRefresh')
      getBroadcastList(that, that.data.constellationType, 0, PAGE_SIZE,true);
      stopRefresh();
    }, DELAY_TIME);
  },
  //加载更多
  onReachBottom: function () {
    if (this.data.isHideBottom == false) {
      return
    }
    // if (this.data.listBroadcast.length > MAX_PAGE_COUNT) {
    //   return
    // }

    console.log('reach the bottom and load more')
    var that = this;
    setLoadMoreHideStatus(that, false);
    setTimeout(function () {
      // complete
      getBroadcastList(that, that.data.constellationType, PAGE_NUMBER, PAGE_SIZE,false);
      setLoadMoreHideStatus(that, true);

    }, DELAY_TIME);
  }
})



var refresh = function () {
}
// stop refresh
var stopRefresh = function () {
  wx.hideNavigationBarLoading() //完成停止加载
  wx.stopPullDownRefresh() //停止下拉刷新
}

//set load more view hide status
var setLoadMoreHideStatus = function (that, status) {
  that.setData({
    isHideLoadMore: status,
  })
}

// set bottom tip view hide status
var setBottomTipHideStatus = function (that, status) {
  that.setData({
    isHideBottom: status,
  })
}

// set empty data view hide status
var setEmtptyViewHideStatus = function (that, status) {
  that.setData({
    isHideEmptyData: status,
  })
}

var setCenterLoadingViewHideStatus = function (that, status) {
  that.setData({
    isHideCenterLoading: status,
  })
}


var getBroadcastList = function (that, constellationType, pageNumber, pageSize,isRefresh) {
  console.log('strat request')
  var self = that
  console.log('getListUrl=' + getListUrl)
  console.log('pageNumber=' + pageNumber)
  console.log('pageSize=' + pageSize)
  console.log('constellationType=' + constellationType)
  //let getListUrl = 'https://baobab.kaiyanapp.com/api/v4/discovery'
  wx.request({
    url: getListUrl,
    header: { 'Content-Type': 'application/json' },
    method: 'GET', 
    data: {
      // noncestr: Date.now(),
      pageNumber: pageNumber,
      pageSize: pageSize,
      constellationType: constellationType
    },

    success: function (result) {
      var self1 = self
      //console.log(' success listBroadcast.length=' + self1.listBroadcast.length)
      if (isRefresh) {
        console.log('clear listBroadcast')
        PAGE_NUMBER = 0;
        self.data.listBroadcast = [];//清空数组 
      }
      PAGE_NUMBER++;
      let realResult = result.data;
      console.log('realResult.code =' + realResult.code)
      if (result.code == 200) {
        console.log('request success')
      }
      let listData = realResult.data.content;
      let listLength = listData.length;
      console.log(' listData.length=' + listData.length)
      if (listLength == 0) {
        console.log('no data，pageNumber=' + pageNumber)
        if (pageNumber == 0){
          setCenterLoadingViewHideStatus(self1, true);
          setEmtptyViewHideStatus(self1, false);
          setBottomTipHideStatus(self1, true);
        }
        that.setData({
          listBroadcast: listData
        });
      } else {
        console.log('has data')
        formatTimestamp(listData);
        listData = mergeListdata(self.data.listBroadcast, listData);

        if (listData.length == realResult.data.totalElements) {
          setBottomTipHideStatus(self, false);
        }
        if (listData.length >= MAX_PAGE_COUNT) {
          setBottomTipHideStatus(self, false);
        }else{
          setBottomTipHideStatus(self, true);
        }
        setEmtptyViewHideStatus(self, true);
        that.setData({
          listBroadcast: listData
        });

      }
      // wx.showToast({
      //   title: '请求成功',
      //   icon: 'success',
      //   mask: true,
      //   duration: duration
      // })
      self.setData({
        loading: false
      })
      console.log('request success', result)
    },
    fail: function ({ errMsg }) {
      console.log('request fail', errMsg)
      self.setData({
        loading: false
      })
    },
    complete: function () {
      if (isRefresh) {
        stopRefresh();
      } else {
        setLoadMoreHideStatus(self, true);
      }
      setCenterLoadingViewHideStatus(self, true);
    }
  })
}


var formatTimestamp = function (listBroadcast) {
  let listLength = listBroadcast.length;
  for (var i = 0; i < listLength; i++) {
    listBroadcast[i].displayPublishTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].publishTimestamp / 1000, 'M/D');
    listBroadcast[i].displayStartValidTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].startValidTimestamp / 1000, 'Y.M.D');
    listBroadcast[i].displayEndValidTimestamp = FormateUtil.formatTimeWithFormat(listBroadcast[i].endValidTimestamp / 1000, 'M.D');

    let date = FormateUtil.formatTimeWithFormat(listBroadcast[i].publishTimestamp / 1000, 'Y-M-D');
    listBroadcast[i].displayWeekDay = FormateUtil.getWeek(new Date(date));

  }
}
var mergeListdata = function (listBroadcast, listdata) {
  let listLength = listdata.length;
  for (var i = 0; i < listLength; i++) {
    if (listBroadcast.length >= MAX_PAGE_COUNT) {
      break
    }
    listBroadcast.push(listdata[i])
  }
  return listBroadcast;
}




