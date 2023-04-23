// index.js
// 获取应用实例
const app = getApp()
const utils = require('../../utils/calc')
Page({
  data: {
    buttonsArray: [
      ['back', 'c', '+/-', '÷'],
      ['7', '8', '9', '×'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['0', '='],
    ],
    // 屏幕上方输入的值
    screenPrev: [],
    // 计算结果
    calculationResult: 0,
    currentVal: 0,
    operatorBool: false,
  },
  onShow() {},
  // 获取用户点击的按键值
  clickButton: function (e) {
    const item = e.target.dataset.item
    this.pretreatmentStr(item)
  },
  // 对传入进来的字符串进行对应操作
  pretreatmentStr: function (str = '') {
    const _this = this.data
    switch (str) {
      // 回退键
      case 'back':
        if (_this.currentVal == 0) break
        _this.currentVal = _this.currentVal.toString().slice(0, -1)
        if (_this.currentVal == '') _this.currentVal = 0
        break
      // 清空键
      case 'c':
        _this.screenPrev = []
        _this.calculationResult = _this.currentVal = 0
      // 计算键
      case '=':
        const val = utils.calc(
          _this.calculationResult,
          _this.screenPrev[1],
          _this.currentVal,
        )
        _this.calculationResult = val
        _this.screenPrev = []
        _this.currentVal = val
        break
      default:
        if (Number(str) || str == 0) {
          _this.operatorBool = false
          if (_this.currentVal.toString().length >= 16) break
          if (_this.currentVal == 0) _this.currentVal = ''
          _this.currentVal += str
        } else if (str == '+/-') {
          // 正负
          // 当值为0时不做任何操作
          if (_this.currentVal == 0) break
          if (_this.currentVal.split('')[0] == '-') {
            _this.currentVal = _this.currentVal.toString().replace(/^./, '')
          } else {
            _this.currentVal = '-' + _this.currentVal
          }
        } else {
          // 剩余运算符
          if (_this.operatorBool) {
            _this.screenPrev[1] = str
            break
          }
          _this.operatorBool = true
          if (_this.screenPrev[0] == undefined) {
            _this.calculationResult = _this.currentVal
            _this.screenPrev[0] = _this.calculationResult
          } else {
            const val = utils.calc(
              _this.calculationResult,
              _this.screenPrev[1],
              _this.currentVal,
            )
            _this.calculationResult = val
            _this.screenPrev[0] = val
          }
          _this.screenPrev[1] = str
          _this.currentVal = 0
        }
    }
    this.setData({
      screenPrev: _this.screenPrev,
      currentVal: _this.currentVal,
      calculationResult: _this.calculationResult,
    })
  },
})
