// pages/message/message.js

Page({
  data: {
    person : [
      {id : 1 , name:'张晓宇' , gender:1,post:1},
      {id : 2 , name:'林晓' , gender:0,post:2},
      {id : 3 , name:'王成玉' , gender:1,post:3},
      {id : 4 , name:'李磊' , gender:1,post:3},
      {id : 5 , name:'王晓雨' , gender:0,post:3},
    ],
    genderlist: ['男','女'],
    uname: '',
    postlist: ['主管','组长','员工'],
    post: '请选择职务',
    gender: '请选择性别'
  },
  delfun: function(e) {
    let es = e.target.dataset.id
    this.data.person.splice(es,1)
    this.setData({
      person:this.data.person
    })
  },
  namefun : function(e) {
    let _this = e.detail.value
    this.data.uname = _this
    console.log(this.data.uname);
  },
  postfun: function(e) {
    let nums = Number(e.detail.value)
    this.data.post  = this.data.postlist[nums]
    this.setData({
      post : this.data.post
    })
  },
  genderfun: function(e) {
    let nums = Number(e.detail.value)
    this.data.gender  = this.data.genderlist[nums]
    this.setData({
      gender : this.data.gender
    })
  },
  adduser: function() {
    if(this.data.uname != '' && this.data.post != '请选择职务' && this.data.gender != '请选择职务') {
      let obj = {
        id:this.data.person.length+1,
        name:this.data.uname,
        gender:this.data.gender === '男' ? 1 : 0,
        post:this.data.post === '主管' ? 1 : this.data.post === '组长' ? 2 : 3
      }
      this.data.person.push(obj)
      this.setData({
        person : this.data.person
      })
    } else {
      wx.showModal({
        title: '',
        content: '请完善添加'
      })
    }
  }
})