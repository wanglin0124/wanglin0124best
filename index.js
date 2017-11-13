//index.js  
//获取应用实例  
var fun_aes = require('../../utils/aes.js')
var app = getApp();
Page({
  data: {
    services:'',
    deviceId:'',
    writeDataUUID: null,
    readDataUUID:null,
    token:'',
    buffer:'',
    number: '0xA1,0x55,0x10,0x43,0x48,0x41,0x4F,0x30,0x50,0x41,0x52,0x4B,0x01,0xFE,0xD9,0x55'
  },
  onLoad: function () {
   

    console.log(Math.round(33123.43421* Math.pow(10, 2)) / Math.pow(10, 2))
    // var buffer = new ArrayBuffer(16)
    // var dataView = new DataView(buffer);
    // var str = '0xa1,0x55,0x10,0x43,0x48,0x41,0x4f,0x30,0x50,0x41,0x52,0x4b,0x02,0xfd,0xd9,0x55';
    // var arr = str.split(',')
    // var val;
    // for (var i = 0; i < arr.length; i++) {
    //   val = parseInt(arr[i], 16);
    //   dataView.setInt8(i, val);
    // }
    // //写入低功耗蓝牙设备的特征值的二进制数据值
    // wx.writeBLECharacteristicValue({
    //   deviceId: that.data.deviceId,
    //   serviceId: that.data.services,
    //   characteristicId: that.data.writeDataUUID,
    //   value: buffer,
    //   success: function (res) {
    //     console.log(res, 'writeBLECharacteristicValue success');
    //     that.unlocking()
    //   },
    //   fail: function (res) {
    //     console.log(res, 'buff fail')
    //   }
    // })
    // var buffer ='67b1d0acaf791264b1543211e18e19590000000'
    // console.log(buffer.slice(0, 32))
    // wx.request({
    //   url: 'https://www.chaopaidanche.com/App/V1/Blue/blueDecrypt',
    //   method: 'POST',
    //   data: {
    //     user_id: '',
    //     token: '',
    //     key: '',
    //     content:'67b1d0acaf791264b1543211e18e1959'
    //   },
    //   success: function (res) {
    //     console.log(res)

    //   }, fail: function (res) {
    //     console.log(res)
    //   }
    // })
   // wx.request({
    //   url: 'https://www.chaopaidanche.com/App/V1/Blue/blueEncryption',
    //   success: function (res) {
    //     console.log(res)
    //     console.log(res.data.data.cont.split(','));
    //     var str=[];
    //     var cont = res.data.data.cont.split(',');
    //     for(var i=0;i<cont.length;i++){
    //       console.log('0x'+cont[i]);
    //       str.push('0x' + cont[i])
    //     }
    //     console.log(str.toString())
    //   }
    // })
    // var buffer = new ArrayBuffer(16)
    // var dataView = new DataView(buffer)
    // var str = str.toString();
    // console.log(str)
    // var arr = str.split(',')
    // var val;
    // for (var i = 0; i < arr.length; i++) {
    //   val = parseInt(arr[i], 16);
    //   // dataView.setUint8(i,val)
    //   //console(getUint8)
    //   dataView.setInt8(i, val);
    //   // console.log(dataView.getInt8(i))
    // }
    // console.log(dataView)
      // var hex ='d380607976c9dd46e518f431f64eb644';
      //   var typedArray=new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h){
      //     return parseInt(h,16)
      //   }))
      //   console.log('typedArray',typedArray)
      //   var buffer=typedArray.buffer
      //   console.log('buffer',buffer)
  },
  onShow:function(){
 
  },
  start(){
    this.startConnect()
  },
  close(){
    this.setData({
      number: '0xA1,0x55,0x10,0x43,0x48,0x41,0x4F,0x30,0x50,0x41,0x52,0x4B,0x02,0xFD,0xD9,0x55'
    })
    this.startConnect()
  },
  //   startConnect: function () {
//     var that = this;
//     // 初始化蓝牙适配器
//     wx.openBluetoothAdapter({
//       success: function (res) {
//         console.log(res,'蓝牙初始化');
//         that.getBluetoothAdapterState();
//       },
//       fail: function (err) {
//         console.log(err);
//         wx.showToast({
//           title: '蓝牙初始化失败',                                                                                                                                                      
//           icon: 'success',
//           duration: 2000
//         })
//         setTimeout(function () {
//           wx.hideToast()
//         }, 2000)
//       }
//     });
//   },
//   // 获取本机蓝牙适配器状态
//   getBluetoothAdapterState: function () {
//     var that = this;
//     wx.getBluetoothAdapterState({
//       success: function (res) {
//         console.log(res,' 获取本机蓝牙适配器状态')
//         var available = res.available,//蓝牙适配器是否可用
//           discovering = res.discovering;//是否正在搜索设备
//         if (!available) {
//           wx.showToast({
//             title: '设备无法开启蓝牙连接',
//             icon: 'success',
//             duration: 2000
//           })
//           setTimeout(function () {
//             wx.hideToast()
//           }, 2000)
//         } if (!discovering) {

//           that.startBluetoothDevicesDiscovery();
//         }
//       }
//     })
//   },
//   //开始搜寻附近的蓝牙外围设备
//   startBluetoothDevicesDiscovery: function () {
//     var that = this;
//     wx.startBluetoothDevicesDiscovery({
//       services: [],
//       success: function (res) {
//         console.log(res, '开始搜寻附近的蓝牙外围设备')
//         if (!res.isDiscovering) {//当前蓝牙适配器是否处于搜索状态
//           that.getBluetoothAdapterState(); // 获取本机蓝牙适配器状态,返回上一个接口
//         } else {
//           that.onBluetoothDeviceFound();//监听寻找到新设备的事件
//         }
//       },
//       fail: function (err) {
//         console.log(err);
//       }
//     });
//   },
//   //监听寻找到新设备的事件
//   onBluetoothDeviceFound: function () {
//     var that=this;
//     //监听寻找到新设备的事件
//     wx.onBluetoothDeviceFound(function (res) {
//       // console.log(res, '新设备');
//       var deviceId = res.devices[0].deviceId;
//       var ua=wx.getSystemInfoSync().platform;//获取设备信息
//       if(ua=='ios'){
//         var buff = res.devices[0].advertisData.slice(2, 8);//当前蓝牙设备的广播内容
//         var arrayBuff = Array.prototype.map.call(new Uint8Array(buff), x => ('00' + x.toString(16)).slice(-2)).join(':'); // 将 ArrayBuffer 数据转成 Base64 字符串 或 字符串  
//         var arrayMac = arrayBuff.toUpperCase();
//         if (arrayMac == '3C:A3:08:00:25:0E') {
//           that.setData({
//             deviceId: deviceId
//           })
//           wx.stopBluetoothDevicesDiscovery({//停止搜索附近蓝牙的外围设备
//             success: function (res) {
//               console.log(res, '停止')
//             }
//           })                            
//           that.createBLEConnection()
//           //连接设备      
//         }
//       } else {
//         if (deviceId == '3C:A3:08:00:25:0E') {
//           that.setData({                         
//             deviceId: deviceId
//           })
//           wx.stopBluetoothDevicesDiscovery({//停止搜索附近蓝牙的外围设备
//             success: function (res) {
//               console.log(res, '停止')
//             }
//           })
//           that.createBLEConnection()
//         }                          
//       }
//     })
//   },
//   //连接设备      
//   createBLEConnection: function (){
//     var that=this; 
//     wx.createBLEConnection({
//       deviceId: that.data.deviceId,
//       success: function (res) {
//         console.log(res, '连接设备成功');
//         wx.showModal({
//           title: '提示',
//           content: '微信连接成功',
//         })
//         //获取蓝牙设备所有 service（服务）
//         wx.getBLEDeviceServices({
//           deviceId: that.data.deviceId,
//           success: function (res) {
//             console.log('device services:', res.services)
//             that.setData({ services: res.services[0].uuid });
//             console.log(that.data.services);
//             that.getBLEDeviceCharacteristics()//获取蓝牙设备所有 characteristic（特征值）
//           },
//           fail: function (res) {
//             console.log(res, '获取蓝牙设备所有 service（服务）失败');
//           }
//         })
//       }, 
//      fail: function (res) {
//          console.log(res, '连接设备失败');
//      }
//    })
//   },
//   getBLEDeviceCharacteristics:function(){
//     var that=this;
//     wx.getBLEDeviceCharacteristics({//获取蓝牙设备所有 characteristic（特征值）
//       deviceId: that.data.deviceId,
//       serviceId: that.data.services,
//       success: function (res) {
//         console.log('device getBLEDeviceCharacteristics:', res);
//         for (var i = 0; i < res.characteristics.length; i++) {
//           if (res.characteristics[i].uuid.indexOf("36F5") != -1) {//writeDataUUID
//             that.setData({
//               writeDataUUID: res.characteristics[i].uuid
//             });
//           }
//           if (res.characteristics[i].uuid.indexOf("36F6") != -1) {//readDataUUID
//             that.setData({
//               readDataUUID: res.characteristics[i].uuid
//             });
//           }
//         }
//         wx.notifyBLECharacteristicValueChange({// 启用 notify 功能
//           state: true, 
//           deviceId: that.data.deviceId,
//           serviceId: that.data.services,
//           characteristicId: that.data.readDataUUID,
//           success: function (res) {
//             console.log('notify', res.errMsg)
//           },
//           fail: function (res) {
//             console.log('notifyBLECharacteristicValueChange fail', res.errMsg)
//           }
//         })
//         wx.onBLECharacteristicValueChange(function (res) {
//           console.log('notify', res);
//           var buffer = Array.prototype.map.call(new Uint8Array(res.value), x => ('00' + x.toString(16)).slice(-2)).join('');
//           console.log(buffer)
//         })

//         //此数据加密后的得来第一次写入
//         setTimeout(function(){
//           var buffer = new ArrayBuffer(16)
//           var dataView = new DataView(buffer)
//           wx.request({
//             url: 'https://www.chaopaidanche.com/App/V1/Blue/blueEncryption',
//             success: function (res) {
//               var str = [];
//               var cont = res.data.data.cont.split(',');
//               for (var i = 0; i < cont.length; i++) {
//                 str.push('0x' + cont[i])
//               }
//               console.log(str.toString())
//               var str = str.toString();
//               var arr = str.split(',')
//               var val;
//               for (var i = 0; i < arr.length; i++) {
//                 val = parseInt(arr[i], 16);
//                 dataView.setInt8(i, val);
//               }
//               //写入低功耗蓝牙设备的特征值的二进制数据值
//               wx.writeBLECharacteristicValue({
//                 deviceId: that.data.deviceId,
//                 serviceId: that.data.services,
//                 characteristicId: that.data.writeDataUUID,
//                 value: buffer,
//                 success: function (res) {
//                   console.log(res, 'writeBLECharacteristicValue success');
//                   setTimeout(function () {
//                     // 必须在这里的回调才能获取
//                     wx.onBLECharacteristicValueChange(function (characteristic) {
//                       console.log('readOne', characteristic);
//                       var buffer = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
//                       console.log(buffer) //锁收到获取令牌指令后返回(需要解密)
//                       that.setData({
//                         buffer:buffer.slice(0,32)
//                       })
//                       that.writeTwo() 
//                     })
//                     //读取低功耗蓝牙设备的特征值的二进制数据值
//                     wx.readBLECharacteristicValue({
//                       deviceId: that.data.deviceId,
//                       serviceId: that.data.services,
//                       characteristicId: that.data.readDataUUID,
//                       success: function (res) {
//                         console.log('读取特征值信息', res)

//                       },
//                       fail: function (res) {
//                         console.log('readBLECharacteristicValue fail:', res)
//                       },
//                     })   
//                   }, 3000)
//                 },
//                 fail: function (res) {
//                   console.log(res, 'buff fail')
//                 }
//               })   
//             }
//           })
//         // var hex ='d380607976c9dd46e518f431f64eb644';
//           // var typedArray=new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function(h){
//           //   return parseInt(h,16)
//           // }))
//           // console.log('typedArray',typedArray)
//           // var buffer=typedArray.buffer
//        // console.log('buffer',buffer)

//         },1000)
     
//       }
//     })
//   },
//   writeTwo:function(){
//     var that=this;
//     var buffer = new ArrayBuffer(16)
//     var dataView = new DataView(buffer)
//     console.log(that.data.buffer)
//     wx.request({
//       url: 'https://www.chaopaidanche.com/App/V1/Blue/blueDecrypt',
//       data: {
//         user_id: '',
//         token: '',
//         key: '',
//         content:that.data.buffer
//       },
//       success: function (res) {
//         console.log(res);
//         var str = [];
//         var cont = res.data.data.cont.split(',');
//         for (var i = 0; i < cont.length; i++) {
//           str.push('0x' + cont[i])
//         }
//         console.log(str.toString())
//         var str = str.toString();
//         var arr = str.split(',')
//         var val;
//         for (var i = 0; i < arr.length; i++) {
//           val = parseInt(arr[i], 16);
//           dataView.setInt8(i, val);
//         }
//         wx.writeBLECharacteristicValue({
//           deviceId: that.data.deviceId,
//           serviceId: that.data.services,
//           characteristicId: that.data.writeDataUUID,
//           value: buffer,
//           success: function (res) {
//             console.log(res, '第二次写入+success');
//             setTimeout(function () {
//               // 必须在这里的回调才能获取
//               wx.onBLECharacteristicValueChange(function (characteristic) {
//                 console.log('readOne', characteristic);
//                 var buffer = Array.prototype.map.call(new Uint8Array(characteristic.value), x => ('00' + x.toString(16)).slice(-2)).join('');
//                 console.log(buffer + '第二次写入') //锁收到获取令牌指令后返回(需要解密)
//               })
//               //读取低功耗蓝牙设备的特征值的二进制数据值
//               wx.readBLECharacteristicValue({
//                 deviceId: that.data.deviceId,
//                 serviceId: that.data.services,
//                 characteristicId: that.data.readDataUUID,
//                 success: function (res) {
//                   console.log('读取特征值信息', res)

//                 },
//                 fail: function (res) {
//                   console.log('readBLECharacteristicValue fail:', res)
//                 },
//               })

//             }, 3000)
//           },
//           fail: function (res) {
//             console.log(res)
//           }
//         })


//       }, fail: function (res) {
//         console.log(res)
//       }
//     })
//   },
//    /**
//   * ArrayBuffer 转换为 Hex
//   */
//  buf2hex: function (buffer) { // buffer is an ArrayBuffer
//     return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
//   }
  
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
        console.log(arrayMac, arrayMac == '94:E3:6D:7F:9D:DF','--------------------')
        if (arrayMac =='94:E3:6D:7F:9D:DF') {

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
        if (deviceId =='9C:1D:58:89:92:98') {
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
          var str =that.data.number
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