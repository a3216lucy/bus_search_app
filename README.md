# Bus Search App 簡易公車查詢系統

## 介紹
介接 [TDX 運輸資料流通服務 API](https://tdx.transportdata.tw/) 資料，實作呈現公車資訊。

<a href="https://a3216lucy.github.io/bus_search_app/" target="_blank">
<img width="854" alt="bus_search_app_demo_pic" src="https://user-images.githubusercontent.com/32087302/153348255-221004f2-2c78-4356-89dd-d40051389db4.png">
</a>

[Live Demo](https://a3216lucy.github.io/bus_search_app/)

## 功能
- 可進行全臺縣市，進行公車資訊查詢
- 即時顯示公車到站時間、站牌名稱、車牌

## 技術學習
- 使用 TailWindCSS + JavaScript 來撰寫
- 透過 DOM 控制網頁內容
- 使用 axios 串接外部 API
  - 取得預估到站資料 [批次更新]：`/v2/Bus/EstimatedTimeOfArrival/City/{City}/{RouteName}`
  - 取得路線的站序資料（座標）：`/v2/Bus/StopOfRoute/City/{City}/{RouteName}`
 
