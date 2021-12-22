Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        "pagePath": "/pages/mapPage/index",
        "iconPath": "/images/mapPage.png",
        "selectedIconPath": "/images/mapPageSelected.png",
        "text": "地图"
      },
      {
        "pagePath": "/pages/momentPage/index",
        "iconPath": "/images/momentPage.png",
        "selectedIconPath": "/images/momentPageSelected.png",
        "text": "动态"
      },
      {
        "pagePath": "/pages/actionPage/index",
        "iconPath": "/images/actionPage.png",
        "selectedIconPath": "/images/actionPageSelected.png",
        "text": "活动"
      },
      {
        "pagePath": "/pages/userPage/index",
        "iconPath": "/images/userPage.png",
        "selectedIconPath": "/images/userPageSelected.png",
        "text": "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})