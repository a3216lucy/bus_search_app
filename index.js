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
function select(){
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

citySelect.addEventListener('change', function (e) {
  city = e.target.value;
  console.log('city', city);
})
routeSearch.addEventListener('blur', function (e) {
  routeName = e.target.value;
  console.log('routeName', routeName);
})

// get bus estimate to stop time
let busData = [];
let goData = [];
let backData = [];
const searchBtn = document.querySelector('#searchBtn');
function getBus(){

}
searchBtn.addEventListener('click', getBus);


// get bus route stop name
const goList = document.querySelector('#goList');
const backList = document.querySelector('#backList');

function goRoute(){

}

// for API authentication
function getAuthenticationHeader(){
  
}