Page({

  /**
   * 页面的初始数据
   */
  data: {
    BoxData: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    EmptyCubeList: [],
    Operation: [
      {
        Case: 'up',
        name: '上'
      },
      {
        Case: 'down',
        name: '下'
      },
      {
        Case: 'left',
        name: '左'
      },
      {
        Case: 'right',
        name: '右'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  CreateRandomData() {
    //随机生成1-2个数字方块

    let BoxNumber = Math.ceil(Math.random() * 2)
    console.log(BoxNumber)
    for (let i = 0; i < BoxNumber; i++) {
      let value = Math.random() < 0.5 ? 2 : 4;
      let index = this.SelectEmptyCube()
      let BoxData = this.data.BoxData;
      for (let i = 0; i < BoxData.length; i++) {
        for (let j = 0; j < BoxData[i].length; j++) {
          if (index.X === i && index.Y === j) {
            BoxData[i][j] = value
          }
        }
      }
      this.setData({
        BoxData: BoxData
      })
      
    }


  },
  GetEmptyCubeList() {
    //获取可用的空方格数组
    let data = this.data.BoxData
    let EmptyCubeList = []
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === 0) {
          EmptyCubeList.push({
            X: i,
            Y: j
          })
        }
      }
    }
    this.setData({
      EmptyCubeList: EmptyCubeList
    })
  },
  SelectEmptyCube() {
    //从空方格中随机挑选1-2个方格
    this.GetEmptyCubeList()
    let EmptyCubeList = this.data.EmptyCubeList
    let random = Math.floor(Math.random() * EmptyCubeList.length)
    return EmptyCubeList[random]
  },
  OperationMove(e) {
    let value = e.currentTarget.dataset.case
    switch (value) {
      case 'left':
        this.MoveLeft();
        break;
      case 'right':
        this.MoveRight();
        break;
      case 'up':
        this.MoveUp();
        break;
      case 'down':
        this.MoveDown();
        break;
    }
    this.WinTips()
    this.LostTips()
  },
  MoveLeft() {
    console.log('left')
    let data = JSON.parse(JSON.stringify(this.data.BoxData));  
    for (let i = 0; i < data.length; i++) {
      let newList = []//新行
      for (let j = 0; j < data[i].length; j++) {
        let value = data[i][j]
        if (value != 0) {
          newList.push(value)
        }
      }
      if (newList.length > 1) {
        //合并相同的数字
        for (let j = 0; j < newList.length; j++) {
          if (newList[j] === newList[j + 1]) {
            newList[j] *= 2;
            newList[j + 1] = 0;
            j++
          }
        }
        newList = newList.filter(item => item !== 0) //过滤产生在前面的0
      }
      for (let j = newList.length; j < 4; j++) {
        newList.push(0)
      }
      data[i] = newList
    }
    let CreateFlag = this.JudgeMove(this.data.BoxData,data)
    
    this.setData({
      BoxData: data
    })
    if (CreateFlag){
      this.CreateRandomData()
    }
    
  },
  MoveRight() {
    console.log('right')
    let data = JSON.parse(JSON.stringify(this.data.BoxData));  
    for (let i = 0; i < data.length; i++) {
      let newList = []
      for (let j = 0; j < data[i].length; j++) {
        let value = data[i][j]
        if (value != 0) {
          newList.push(value)
        }
      }
      if (newList.length > 1) {
        for (let j = newList.length - 1; j > 0; j--) {
          if (newList[j] === newList[j - 1]) {
            newList[j] *= 2;
            newList[j - 1] = 0;
            j--
          }
        }
        newList = newList.filter(item => item !== 0)
      }
      for (let j = (4 - newList.length); j > 0; j--) {
        newList.unshift(0)
      }
      data[i] = newList
    }
    let CreateFlag = this.JudgeMove(this.data.BoxData, data)
    
    this.setData({
      BoxData: data
    })
    if (CreateFlag) {
      this.CreateRandomData()
    }
  },
  MoveUp() {
    console.log('up')
    let data = JSON.parse(JSON.stringify(this.data.BoxData));  
    for (let i = 0; i < data.length; i++) {
      let newList = [] //新列
      for (let j = 0; j < data[i].length; j++) {
        let value = data[j][i]
        if (value != 0) {
          newList.push(value)
        }
      }
      if (newList.length > 1) {
        for (let j = 0; j < newList.length - 1; j++) {
          if (newList[j] === newList[j + 1]) {
            newList[j] *= 2
            newList[j + 1] = 0
            j++
          }
        }
        newList = newList.filter(item => item !== 0)
      }
      for (let j = newList.length;j<4;j++){
        newList.push(0)
      }
      for(let j=0;j<4;j++){
        data[j][i] = newList[j]
      }
    }
    let CreateFlag = this.JudgeMove(this.data.BoxData, data)
    
    this.setData({
      BoxData: data
    })
    if (CreateFlag) {
      this.CreateRandomData()
    }
  },
  MoveDown() {
    console.log('down')
    let data = JSON.parse(JSON.stringify(this.data.BoxData));  
   
    for (let i = 0; i < data.length; i++) {
      let newList = [] //新列
      for (let j = 0; j < data[i].length; j++) {
        let value = data[j][i]
        if (value != 0) {
          newList.push(value)
        }
      }
      if (newList.length > 1) {
        for (let j = newList.length - 1; j >0; j--) {
          if (newList[j] === newList[j - 1]) {
            newList[j] *= 2
            newList[j - 1] = 0
            j--
          }
        }
        newList = newList.filter(item => item !== 0)
      }
      for (let j =(4- newList.length); j >0; j--) {
        newList.unshift(0)
      }
      for (let j = 0; j < 4; j++) {
        data[j][i] = newList[j]
      }
    }
    let CreateFlag = this.JudgeMove(this.data.BoxData, data)
    
    this.setData({
      BoxData: data
    })
    if (CreateFlag) {
      this.CreateRandomData()
    }
  },
  JudgeMove(oldArr,newArr){
    //判断是否可以移动
    // console.log(oldArr)
    // console.log(newArr)
    for (let i=0;i<oldArr.length;i++){
      for(let j=0;j<oldArr[i].length;j++){  
        if(oldArr[i][j]!=newArr[i][j]){      
          return true;
        }
      }
    }
    return false;
  },
  WinTips(){
    //胜利提示
    let _this = this
    if(this.IsWin()){
      wx.showModal({
        title: '提示',
        content: '恭喜你完成挑战',
        success: function (res) {
          if (res.confirm) {
            _this.ReloadGame()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  LostTips(){
    let _this = this
    if (this.IsLost()) {
      wx.showModal({
        title: '提示',
        content: '游戏失败',
        success: function (res) {
          if (res.confirm) {
            _this.ReloadGame()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  IsWin(){
    //判断是否胜利
    let data = this.data.BoxData
    for(let i = 0;i<data.length;i++){
      for(let j = 0;j<data[i].length;j++){
        if(data[i][j]==2048){
          return true;
        }
      }
    }
    return false;
  },
  IsLost(){
    //判断是否失败
    this.GetEmptyCubeList()
    let EmptyCubeList = this.data.EmptyCubeList;
    let data = this.data.BoxData
    if (EmptyCubeList.length>0){
      return false;
    }
    let result = false
    for (let i = 0; i < 4; i++) {
      for (let j = (i + 1) % 2; j < 4; j += 2) {
        let center = data[i][j]
        if (i > 0) { // 会有上元素
          result = result || (center === data[i - 1][j])
        }
        if (i < 3) { // 会有下元素
          result = result || (center === data[i + 1][j])
        }
        if (j > 0) { // 会有左元素
          result = result || (center === data[i][j - 1])
        }
        if (j < 3) { // 会有左元素
          result = result || (center === data[i][j + 1])
        }
        if (result) {
          return false
        }
      }
    }
    return true
  },
  ReloadGame(){
    let BoxData = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    this.setData({
      BoxData: BoxData
    })
    this.CreateRandomData()
    //重新加载游戏
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.CreateRandomData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})