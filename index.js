//index.js  
//获取应用实例  
var app = getApp();
Page({
  data: {
    services:'',
    deviceId:'',
    writeDataUUID: null,
    readDataUUID:null,
    token:'',
    buffer:''
  },
  onLoad: function () {

  },
  start(){
    this.startConnect()
  },
  close(){
    this.startConnect()
  },
  //调蓝牙
  startConnect: function () {
    var that = this;
    // 初始化蓝牙适配器
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res, '蓝牙初始化');
        that.getBluetoothAdapterState();
      },
      fail: function (err) {
        console.log(err);
        wx.showToast({
          title: '蓝牙初始化失败',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    });
  },
  // 获取本机蓝牙适配器状态
  getBluetoothAdapterState: function () {
    var that = this;
    wx.getBluetoothAdapterState({
      success: function (res) {
        console.log(res, ' 获取本机蓝牙适配器状态')
        var available = res.available,//蓝牙适配器是否可用
          discovering = res.discovering;//是否正在搜索设备
        if (!available) {
          wx.showToast({
            title: '设备无法开启蓝牙连接',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } if (!discovering) {

          that.startBluetoothDevicesDiscovery();
        }
      }
    })
  },
  //开始搜寻附近的蓝牙外围设备
  startBluetoothDevicesDiscovery: function () {
    var that = this;
    wx.startBluetoothDevicesDiscovery({
      services: [],
      success: function (res) {
        console.log(res, '开始搜寻附近的蓝牙外围设备')

        if (!res.isDiscovering) {//当前蓝牙适配器是否处于搜索状态
          that.getBluetoothAdapterState(); // 获取本机蓝牙适配器状态,返回上一个接口
        } else {
          that.onBluetoothDeviceFound();//监听寻找到新设备的事件
        }
      },
      fail: function (err) {
        console.log(err);
      }
    });
  },
  //监听寻找到新设备的事件
  onBluetoothDeviceFound: function () {
    var that = this;
    //监听寻找到新设备的事件
    wx.onBluetoothDeviceFound(function (res) {
      console.log(res)
      var deviceId = res.devices[0].deviceId;
      var ua = wx.getSystemInfoSync().platform;//获取设备信息
      console.log(deviceId)
      if (ua == 'ios') {
        var buff = res.devices[0].advertisData.slice(2, 8);//当前蓝牙设备的广播内容
      
        var arrayBuff = Array.prototype.map.call(new Uint8Array(buff), x => ('00' + x.toString(16)).slice(-2)).join(':'); // 将 ArrayBuffer 数据转成 Base64 字符串 或 字符串  
        var arrayMac = arrayBuff.toUpperCase();
        if (arrayMac =='mac地址') {

          that.setData({
            deviceId: deviceId
          })
          wx.stopBluetoothDevicesDiscovery({//停止搜索附近蓝牙的外围设备
            success: function (res) {
              console.log(res, '停止')
            }
          })
          that.createBLEConnection()
          // 连接设备                             
        }
      } else {
        if (deviceId =='mac地址') {
          that.setData({
            deviceId: deviceId
          })
          wx.stopBluetoothDevicesDiscovery({//停止搜索附近蓝牙的外围设备
            success: function (res) {
              console.log(res, '停止')
            }
          })
          that.createBLEConnection()
        }
      }
    })
  },
  //连接设备      
  createBLEConnection: function () {
    var that = this;
    wx.createBLEConnection({
      deviceId: that.data.deviceId,
      success: function (res) {
        console.log(res, '连接设备成功');
        wx.showModal({
          title: '提示',
          content: '微信连接成功',
        })
        //获取蓝牙设备所有 service（服务）
        wx.getBLEDeviceServices({
          deviceId: that.data.deviceId,
          success: function (res) {
            console.log('device services:', res.services)
            that.setData({ services: res.services[0].uuid });
            console.log(that.data.services);
            that.getBLEDeviceCharacteristics()//获取蓝牙设备所有 characteristic（特征值）
          },
          fail: function (res) {
            console.log(res, '获取蓝牙设备所有 service（服务）失败');
          }
        })
      },
      fail: function (res) {
        console.log(res, '连接设备失败');
      }
    })
  },
  getBLEDeviceCharacteristics: function () {
    var that = this;
    wx.getBLEDeviceCharacteristics({//获取蓝牙设备所有 characteristic（特征值）
      deviceId: that.data.deviceId,
      serviceId: that.data.services,
      success: function (res) {
        console.log('device getBLEDeviceCharacteristics:', res);
        that.setData({
          writeDataUUID: res.characteristics[0].uuid,
          readDataUUID: res.characteristics[0].uuid
        });
        wx.notifyBLECharacteristicValueChange({// 启用 notify 功能
          state: true,
          deviceId: that.data.deviceId,
          serviceId: that.data.services,
          characteristicId: that.data.readDataUUID,
          success: function (res) {
            console.log('notify', res.errMsg)
          },
          fail: function (res) {
            console.log('notifyBLECharacteristicValueChange fail', res.errMsg)
          }
        })
        wx.onBLECharacteristicValueChange(function (res) {
          console.log('notify', res);
          var buffer = Array.prototype.map.call(new Uint8Array(res.value), x => ('00' + x.toString(16)).slice(-2)).join('');
          console.log(buffer)
        })
        //此数据加密后的得来第一次写入
        setTimeout(function () {
          var buffer = new ArrayBuffer(16)
          var dataView = new DataView(buffer);
          var str ='写入数据'
          var arr = str.split(',')
          var val;
          for (var i = 0; i < arr.length; i++) {
            val = parseInt(arr[i], 16);
            dataView.setInt8(i, val);
          }
          //写入低功耗蓝牙设备的特征值的二进制数据值
          wx.writeBLECharacteristicValue({
            deviceId: that.data.deviceId,
            serviceId: that.data.services,
            characteristicId: that.data.writeDataUUID,
            value: buffer,
            success: function (res) {
              console.log(res, 'writeBLECharacteristicValue success');
              // that.unlocking()

              wx.closeBLEConnection({
                deviceId: that.data.deviceId,
                success: function (res) {
                  console.log(res);
                  wx.showModal({
                    title: '提示',
                    content: '结束',
                  })
                  wx.closeBluetoothAdapter({
                    success: function (res) {
                      wx.showModal({
                        title: '提示',
                        content: '释放了所有资源',
                      })
                    }
                  })
                }
              })
            },
            fail: function (res) {
              console.log(res, 'buff fail')
            }
          })
        }, 1000)

      }
    })

  },

  
})
