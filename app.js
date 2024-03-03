// app.js

const worker = wx.createWorker('workers/index.js', {
  useExperimentalWorker: true
})

App({
  onLaunch(opts, data) {
    const that = this
    const canIUseSetBackgroundFetchToken = wx.canIUse('setBackgroundFetchToken')
    if (canIUseSetBackgroundFetchToken) {
      wx.setBackgroundFetchToken({
        token: 'getBackgroundFetchToken',
      })
    }
    if (wx.getBackgroundFetchData) {
      wx.getBackgroundFetchData({
        fetchType: 'pre',
        success(res) {
          console.log('读取预拉取数据成功', res)
        },
        fail() {
          console.log('读取预拉取数据失败')
          wx.showToast({
            title: '无缓存数据',
            icon: 'none'
          })
        },
        complete() {
          console.log('结束读取')
        }
      })
    }
    console.log('App Launch', opts)
    if (data && data.path) {
      wx.navigateTo({
        url: data.path,
      })
    }
    // skyline
    const systemInfo = wx.getSystemInfoSync()
    console.log('@@@ systemInfo ', systemInfo)

    // listener camera
    const cameraContext = wx.createCameraContext()
    const cameraFrameListener = cameraContext.onCameraFrame(function () { })
    cameraFrameListener.start({
      worker: worker,
      success: function () {
        console.log('lynbklk, start camera frame listener success')
      },
      fail: function () {
        console.log('lynbklk, start camera frame listener fail')
      },
      complete: function () {
        console.log('lynbklk, start camera frame listener complete')
      }
    })
  },
})
