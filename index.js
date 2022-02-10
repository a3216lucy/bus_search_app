const cityData = [
  { name: '臺北市', value: 'Taipei' },
  { name: '新北市', value: 'NewTaipei' },
  { name: '桃園市', value: 'Taoyuan' },
  { name: '臺中市', value: 'Taichung' },
  { name: '臺南市', value: 'Tainan' },
  { name: '高雄市', value: 'Kaohsiung' },
  { name: '基隆市', value: 'Keelung' },
  { name: '新竹市', value: 'Hsinchu' },
  { name: '新竹縣', value: 'HsinchuCounty' },
  { name: '苗栗縣', value: 'MiaoliCounty' },
  { name: '彰化縣', value: 'ChanghuaCounty' },
  { name: '南投縣', value: 'NantouCounty' },
  { name: '雲林縣', value: 'YunlinCounty' },
  { name: '嘉義縣', value: 'ChiayiCounty' },
  { name: '嘉義市', value: 'Chiayi' },
  { name: '屏東縣', value: 'PingtungCounty' },
  { name: '宜蘭縣', value: 'YilanCounty' },
  { name: '花蓮線', value: 'HualienCounty' },
  { name: '臺東縣', value: 'TaitungCounty' },
  { name: '金門縣', value: 'KinmenCounty' },
  { name: '澎湖縣', value: 'PenghuCounty' },
  { name: '連江縣', value: 'LienchiangCounty' },
]

// select bus area 
const citySelect = document.querySelector('#citySelect');
function select() {
  let str = '';
  cityData.forEach((item) => {
    str += `<option value="${item.value}">${item.name}</option>`
  })
  citySelect.innerHTML = str;
}
select();


// bus route name
const routeSearch = document.querySelector('#routeSearch');

let city = '';
let routeName = '';

citySelect.addEventListener("change" , function (e) {
  city = e.target.value;
  console.log('city', city)
})

routeSearch.addEventListener('blur', function (e) {
  routeName = e.target.value;
  console.log('routeName', routeName)
})


// get bus estimate to stop time
let busData = [];
let goData = [];
let backData = [];
const searchBtn = document.querySelector('#searchBtn');

function getBus() {
  axios({
    method: 'get',
    url: "https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/"+city+"/"+routeName,
    headers: getAuthorizationHeader()
  })
    .then((response) => {
      console.log('預估', response)
      const data = response.data;

      // 篩出有在跑的公車(存公車物件)
      const bus = data.filter((item) => item.PlateNumb)
      // console.log('bus', bus)

      //從有在跑的公車資料裡分類出「去程0」與「返程1」
      const cachegoData = bus.filter((item) => !item.Direction);
      const cachebackData = bus.filter((item) => item.Direction);

      console.log('cachebackData', cachebackData)
      console.log('cachegoData',goData)


      // 組出我要的資料格式
      cachegoData.forEach((item) => { // [a,a,b,c]
        const index = goData.map(item => item.plateNumb).indexOf(item.PlateNumb)
        
        if (index === -1) { // 代表沒找到
          goData.push({
            plateNumb: item.PlateNumb, //車牌號碼
            stops: [{
              estimateTime: item.EstimateTime,//到站時間預估(秒) 
              stopUID: item.StopUID//站牌唯一識別代碼
            }]
          })
        } else { // 有找到
          goData[index].stops.push({
            estimateTime: item.EstimateTime,//到站時間預估(秒) 
            stopUID: item.StopUID//站牌唯一識別代碼
          });
        }
      })
      console.log('goData', goData)

      cachebackData.forEach((item) => { // [a,a,b,c]
        const index = backData.map(item => item.plateNumb).indexOf(item.PlateNumb)
        
        if (index === -1) { // 代表沒找到
          backData.push({
            plateNumb: item.PlateNumb, //車牌號碼
            stops: [{
              estimateTime: item.EstimateTime,//到站時間預估(秒) 
              stopUID: item.StopUID//站牌唯一識別代碼
            }]
          })
        } else { // 有找到
          backData[index].stops.push({
            estimateTime: item.EstimateTime,//到站時間預估(秒) 
            stopUID: item.StopUID//站牌唯一識別代碼
          });
        }

      })
      console.log('backData', backData)

      getRoute();
    })
    .catch((error) => console.log('error', error))
}
searchBtn.addEventListener('click', getBus);



// get bus route stop name
const goList = document.querySelector('#goList');
const backList = document.querySelector('#backList');
function getRoute() {
  axios({
    method: 'get',
    url: "https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/"+city+"/"+routeName,
    headers: getAuthorizationHeader()
  })
    .then((response) => {
      console.log('往返列表', response)
      const data = response.data;

      const routeData = data.filter((item) => item.RouteID === routeName)

      let goStr = '';
      let backStr = '';
      let goBusID = '';
      let busID = '';
      let time = 0;
      let timeText = '';
      let goTimeText = '';


      routeData[0].Stops.forEach((item) => {
        goData.forEach((go) => {
          go.stops.forEach((stop) => {
            if (stop.stopUID === item.StopUID) {
              goBusID = go.plateNumb
              time = Math.floor(stop.estimateTime / 60)
              // console.log(busID, time)

              // 文字顯示
              if (time === 0) {
                goTimeText = '進站中';
              } else if (time <= 1 && 0 < time) {
                goTimeText = '即將到站';
              } else if (!time) {
                goTimeText = '--';
              } else {
                goTimeText = `${time} 分鐘`;
              }
            }
          })
        })
        goStr += `<li class="list-group-item flex flex-row items-center justify-between py-2 border-b border-slate-300">
            <div class="flex">
              <p class="text-sm text-pink-600 rounded-3xl border px-2  ml-1 ">${goTimeText}</p>
              <h5 class="pl-2">${item.StopUID}/${item.StopName.Zh_tw}</h5>
            </div>
            <p class="text-blue-700 text-sm">${goBusID}</p>
          </li>
       `
      })
      goList.innerHTML = goStr;

      routeData[1].Stops.forEach((item) => {
        backData.forEach((back) => {
          back.stops.forEach((stop) => {
            if (stop.stopUID === item.StopUID) {
              busID = back.plateNumb
              time = Math.floor(stop.estimateTime / 60)
              // console.log(busID, time)

              // 文字顯示
              if (time === 0) {
                timeText = '進站中';
              } else if (time <= 1 && 0 < time) {
                timeText = '即將到站';
              } else if (!time) {
                timeText = '--';
              } else {
                timeText = `${time} 分鐘`;
              }
            }
          })
        })
        backStr += `<li class="list-group-item flex flex-row items-center justify-between py-2 border-b border-slate-300">
            <div class="flex">
              <p class="text-sm text-pink-600 rounded-3xl border px-2  ml-1 ">${timeText}</p>
              <h5 class="pl-2">${item.StopUID}/${item.StopName.Zh_tw}</h5>
            </div>
            <p class="text-blue-700 text-sm">${busID}</p>
          </li>
       `
      })
      backList.innerHTML = backStr;
    })
    .catch((error) => console.log('error', error))
}


// for API authentication
function getAuthorizationHeader() {
  var AppID = '251cbbac240a4341823cc83d8243c3ad';
  var AppKey = 'TPZlwBr73sr1rMBNHm6iEHnKY3M';

  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString }; 
}
