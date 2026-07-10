'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const DEG = Math.PI / 180;

const UI = {
  zh: {
    tagline:'全球热带气旋与个人影响', connecting:'正在连接权威来源', publicView:'公众视图', proView:'专业视图', appearance:'外观',
    activeSystems:'活跃系统', systemsWorldwide:'个全球系统', showDemo:'显示全球演示系统', demoExplain:'无活跃气旋时用于体验全部功能',
    authority:'所属权威机构', officialSite:'官网 ↗', mapView:'地图', globeView:'地球', cyclone3d:'3D 气旋', cinematicMode:'3D 气旋模式', visualDemo:'数据驱动视觉示意', focusStorm:'聚焦气旋', viewWorld:'查看全球', layers:'图层',
    mapLayers:'地图图层', weatherLayers:'气象与风险图层', trackLayer:'路径与节点', trackLayerNote:'实况、官方预报与趋势参考',
    coneLayer:'预测可能范围', coneLayerNote:'中心路径的不确定性，不是影响边界', windLayer:'风圈与波及范围', windLayerNote:'无官方半径时会明确标为估算',
    cityLayer:'受影响城市', cityLayerNote:'按路径距离筛选主要城市', satelliteLayer:'NASA 卫星云图', radarLayer:'全球雷达拼图',
    coverageLayer:'雷达覆盖范围', coverageNote:'用于区分无回波与无雷达覆盖', weatherOpacity:'天气图层透明度',
    layerDisclaimer:'云图和雷达仅用于态势参考；预警以当地官方气象机构为准。', visualEffects:'3D 视觉效果', visualEffectsNote:'仅在 3D 气旋模式启用', qualityAuto:'自动', qualityHigh:'高', qualityBalanced:'均衡', qualityEco:'省电', fxParticles:'风场粒子', fxEyewall:'眼墙与压力核心', fxTrail:'立体路径', fxFollow:'镜头跟随播放', fxDataNote:'粒子与眼墙为视觉化表达，路径和数值来自当前数据。', fxUnavailable:'此设备无法启用 3D 气旋效果', fxEnabled:'已进入 3D 气旋模式', sourcesCompare:'个来源可用于对照', howVerified:'如何交叉验证 →',
    observed:'实况', forecast:'官方预报', trend:'趋势参考', windArea:'风圈', affectedCity:'受影响城市', trackPlayback:'路径播放', radarPlayback:'雷达回放',
    plainBrief:'公众简报', whatMeans:'这对我意味着什么？', yourLocation:'你的位置', locationNotSet:'尚未设置', useLocation:'使用定位', pickOnMap:'地图点选', clear:'清除',
    nearestDistance:'距路径最近', closestTime:'预计最接近', impactWindow:'可能影响时段', confidence:'估算可信度', profileAdvice:'画像建议', chooseScenario:'选择你的活动场景',
    professionalData:'专业数据', coordinates:'中心坐标', maxWind:'最大风速', pressure:'中心气压', classification:'强度分类', trackPoints:'路径节点', primaryAgency:'主权威机构',
    cityImpact:'城市影响参考', nearbyCities:'路径附近主要城市', methodology:'数据方法', crossValidation:'全球机构交叉验证',
    methodText:'先按海域确定 WMO 区域专业中心，再用当地气象机构、GDACS 等来源对照位置、更新时间与影响信息，不对不同风速标准进行简单平均。',
    disclaimer:'本网站是信息整合与可视化原型，不替代任何国家或地区发布的官方预警、停工停课、撤离或应急指令。',
    themeSystem:'跟随系统', themeLight:'浅色', themeDark:'深色', direction:'移动方向', closest:'最接近', adviceNow:'现在怎么做', understandImpact:'看懂可能影响',
    noStorm:'当前没有可显示的活跃系统', demo:'演示', live:'官方数据', updated:'更新', online:'在线', unavailable:'暂不可用', noData:'暂无数据',
    locationDenied:'定位未授权，可在地图上点选位置', locationSaved:'位置只保存在本机浏览器', pickHint:'请在地图上点击你的所在地', low:'较低', medium:'中等', high:'较高',
    wind:'大风', rain:'强降雨', coast:'沿海风险', windLow:'当前距离较远，继续关注路径变化', windMedium:'外围阵风可能影响通勤与户外活动', windHigh:'可能进入强风影响范围，减少不必要外出',
    rainLow:'当前直接降雨风险较低', rainMedium:'关注短时强降雨、积水和交通延误', rainHigh:'准备应对暴雨、内涝和山洪地质灾害',
    coastLow:'当前沿海直接风险较低', coastMedium:'沿海、港口和海上活动需关注风浪', coastHigh:'避免海边观浪，并服从风暴潮或撤离指令',
    commute:'通勤', outdoor:'户外', office:'办公', drive:'驾车', family:'家庭照护', coastProfile:'沿海居住',
    now:'现在', before:'影响前', during:'影响期间', noOfficialForecast:'官方预报节点暂不可用，紫色趋势线仅用于方向参考',
    trackKindObserved:'历史实况', trackKindForecast:'官方预报', trackKindTrend:'非官方趋势参考', radarEmpty:'当前雷达帧不可用', sourceConnected:'权威与辅助来源已连接',
    global:'全球', westPacific:'西北太平洋', atlantic:'大西洋', eastPacific:'东北/中太平洋', northIndian:'北印度洋', southwestIndian:'西南印度洋', australia:'澳大利亚区域', southPacific:'南太平洋',
    estimated:'估算', noNearbyCity:'当前筛选范围内没有主要城市', km:'公里', hours:'小时', sourceMethod:'主来源优先，其他来源仅作对照',
  },
  en: {
    tagline:'Global tropical cyclone and personal impact', connecting:'Connecting authoritative sources', publicView:'Public view', proView:'Professional view', appearance:'Appearance',
    activeSystems:'Active systems', systemsWorldwide:'systems worldwide', showDemo:'Show global demo systems', demoExplain:'Explore all features when no live cyclone is active',
    authority:'Responsible authority', officialSite:'Official site ↗', mapView:'Map', globeView:'Globe', cyclone3d:'3D cyclone', cinematicMode:'3D cyclone mode', visualDemo:'Data-driven visualisation', focusStorm:'Focus cyclone', viewWorld:'View world', layers:'Layers',
    mapLayers:'Map layers', weatherLayers:'Weather and risk layers', trackLayer:'Track and points', trackLayerNote:'Observed, official forecast and trend reference',
    coneLayer:'Forecast uncertainty', coneLayerNote:'Possible centre-track area, not an impact boundary', windLayer:'Wind and impact area', windLayerNote:'Estimated values are clearly labelled',
    cityLayer:'Affected cities', cityLayerNote:'Major cities screened by track distance', satelliteLayer:'NASA satellite imagery', radarLayer:'Global radar mosaic',
    coverageLayer:'Radar coverage', coverageNote:'Distinguishes no echoes from no radar coverage', weatherOpacity:'Weather-layer opacity',
    layerDisclaimer:'Satellite and radar layers are situational references. Follow local official warnings.', visualEffects:'3D visual effects', visualEffectsNote:'Used only in 3D cyclone mode', qualityAuto:'Auto', qualityHigh:'High', qualityBalanced:'Balanced', qualityEco:'Battery saver', fxParticles:'Wind particles', fxEyewall:'Eyewall and pressure core', fxTrail:'Elevated track', fxFollow:'Camera follows playback', fxDataNote:'Particles and eyewall are visual encodings; track and values use current data.', fxUnavailable:'3D cyclone effects are unavailable on this device', fxEnabled:'3D cyclone mode enabled', sourcesCompare:'sources available for comparison', howVerified:'How it is checked →',
    observed:'Observed', forecast:'Official forecast', trend:'Trend reference', windArea:'Wind area', affectedCity:'Affected city', trackPlayback:'Track playback', radarPlayback:'Radar replay',
    plainBrief:'Public brief', whatMeans:'What does this mean for me?', yourLocation:'Your location', locationNotSet:'Not set', useLocation:'Use location', pickOnMap:'Pick on map', clear:'Clear',
    nearestDistance:'Nearest track distance', closestTime:'Closest approach', impactWindow:'Possible impact window', confidence:'Estimate confidence', profileAdvice:'Profile advice', chooseScenario:'Choose your activity',
    professionalData:'Professional data', coordinates:'Centre coordinates', maxWind:'Maximum wind', pressure:'Central pressure', classification:'Classification', trackPoints:'Track points', primaryAgency:'Primary authority',
    cityImpact:'City impact reference', nearbyCities:'Major cities near the track', methodology:'Data method', crossValidation:'Global agency cross-check',
    methodText:'The responsible WMO regional centre is selected by basin, then local agencies and GDACS are used to compare location, freshness and impact information. Different wind standards are not averaged.',
    disclaimer:'This is an information integration prototype. It does not replace official warnings, closures, evacuation orders or emergency instructions.',
    themeSystem:'System', themeLight:'Light', themeDark:'Dark', direction:'Direction', closest:'Closest', adviceNow:'What to do', understandImpact:'Understand impacts',
    noStorm:'No active system is available to display', demo:'Demo', live:'Official data', updated:'Updated', online:'Online', unavailable:'Unavailable', noData:'No data',
    locationDenied:'Location was not authorised. You can pick a point on the map.', locationSaved:'Location stays in this browser only', pickHint:'Click your location on the map', low:'Low', medium:'Medium', high:'High',
    wind:'Strong wind', rain:'Heavy rain', coast:'Coastal risk', windLow:'Direct wind risk is currently low; monitor track changes', windMedium:'Outer winds may affect commuting and outdoor activity', windHigh:'Strong-wind impacts are possible; reduce unnecessary travel',
    rainLow:'Direct rain risk is currently low', rainMedium:'Watch for downpours, ponding and travel delays', rainHigh:'Prepare for flooding, flash floods and landslides',
    coastLow:'Direct coastal risk is currently low', coastMedium:'Coasts, ports and marine activity should monitor waves', coastHigh:'Stay away from the shoreline and follow surge or evacuation orders',
    commute:'Commute', outdoor:'Outdoor', office:'Office', drive:'Driving', family:'Family care', coastProfile:'Coastal resident',
    now:'Now', before:'Before impact', during:'During impact', noOfficialForecast:'Official forecast points are unavailable; the purple trend is directional only',
    trackKindObserved:'Observed history', trackKindForecast:'Official forecast', trackKindTrend:'Non-official trend reference', radarEmpty:'Radar frames are currently unavailable', sourceConnected:'Authoritative and supporting sources connected',
    global:'Global', westPacific:'Western North Pacific', atlantic:'Atlantic', eastPacific:'Eastern/Central Pacific', northIndian:'North Indian Ocean', southwestIndian:'Southwest Indian Ocean', australia:'Australian region', southPacific:'South Pacific',
    estimated:'Estimated', noNearbyCity:'No major city is inside the current screening range', km:'km', hours:'hours', sourceMethod:'Primary authority first; other sources are cross-checks',
  },
};

const languageNames = { zh:'中文', en:'English', ja:'日本語', ko:'한국어', es:'Español', fr:'Français' };
const languageStatic = {
  ja: { cyclone3d:'3Dサイクロン', publicView:'一般向け', proView:'専門表示', appearance:'外観', activeSystems:'活動中のシステム', systemsWorldwide:'個の全球システム', mapView:'地図', globeView:'地球', focusStorm:'台風に移動', viewWorld:'世界表示', layers:'レイヤー', plainBrief:'一般向け速報', whatMeans:'自分への影響は？', useLocation:'位置情報', pickOnMap:'地図で選択', clear:'削除', methodology:'データ手法', themeSystem:'システム', themeLight:'ライト', themeDark:'ダーク' },
  ko: { cyclone3d:'3D 사이클론', publicView:'일반 보기', proView:'전문 보기', appearance:'화면', activeSystems:'활성 시스템', systemsWorldwide:'개 전 세계 시스템', mapView:'지도', globeView:'지구', focusStorm:'사이클론 보기', viewWorld:'전 세계', layers:'레이어', plainBrief:'일반 브리핑', whatMeans:'나에게 어떤 의미인가요?', useLocation:'위치 사용', pickOnMap:'지도 선택', clear:'지우기', methodology:'데이터 방법', themeSystem:'시스템', themeLight:'라이트', themeDark:'다크' },
  es: { cyclone3d:'Ciclón 3D', publicView:'Vista pública', proView:'Vista profesional', appearance:'Apariencia', activeSystems:'Sistemas activos', systemsWorldwide:'sistemas globales', mapView:'Mapa', globeView:'Globo', focusStorm:'Enfocar ciclón', viewWorld:'Ver mundo', layers:'Capas', plainBrief:'Resumen público', whatMeans:'¿Qué significa para mí?', useLocation:'Usar ubicación', pickOnMap:'Elegir en mapa', clear:'Borrar', methodology:'Método de datos', themeSystem:'Sistema', themeLight:'Claro', themeDark:'Oscuro' },
  fr: { cyclone3d:'Cyclone 3D', publicView:'Vue publique', proView:'Vue professionnelle', appearance:'Apparence', activeSystems:'Systèmes actifs', systemsWorldwide:'systèmes mondiaux', mapView:'Carte', globeView:'Globe', focusStorm:'Centrer le cyclone', viewWorld:'Voir le monde', layers:'Couches', plainBrief:'Bulletin public', whatMeans:'Quel impact pour moi ?', useLocation:'Utiliser la position', pickOnMap:'Choisir sur la carte', clear:'Effacer', methodology:'Méthode des données', themeSystem:'Système', themeLight:'Clair', themeDark:'Sombre' },
};

const agencyDirectory = {
  'western-north-pacific': { name:'JMA / RSMC Tokyo', url:'https://www.jma.go.jp/bosai/map.html#contents=typhoon', description:'西北太平洋和南海的 WMO 区域专业气象中心。', descriptionEn:'WMO Regional Specialized Meteorological Centre for the western North Pacific and South China Sea.' },
  atlantic: { name:'NOAA / NHC Miami', url:'https://www.nhc.noaa.gov/', description:'大西洋热带气旋官方分析、预报、风圈和警报产品。', descriptionEn:'Official Atlantic tropical cyclone analysis, forecasts, wind fields and warnings.' },
  'eastern-pacific': { name:'NOAA / NHC & CPHC', url:'https://www.nhc.noaa.gov/', description:'东北和中太平洋由 NHC 与 CPHC 负责。', descriptionEn:'NHC and CPHC cover the eastern and central North Pacific.' },
  'north-indian': { name:'IMD / RSMC New Delhi', url:'https://rsmcnewdelhi.imd.gov.in/', description:'北印度洋区域专业气象中心。', descriptionEn:'Regional Specialized Meteorological Centre for the North Indian Ocean.' },
  'southwest-indian': { name:'Météo-France / RSMC La Réunion', url:'https://meteofrance.re/fr/cyclone', description:'西南印度洋热带气旋专业中心。', descriptionEn:'Tropical cyclone centre for the southwest Indian Ocean.' },
  australian: { name:'Australian BoM / regional TCWCs', url:'https://www.bom.gov.au/cyclone/', description:'澳大利亚周边由 BoM、雅加达和莫尔兹比港等中心协作。', descriptionEn:'The Australian region is covered by BoM and neighbouring tropical cyclone warning centres.' },
  'south-pacific': { name:'RSMC Nadi / TCWC Wellington', url:'https://www.met.gov.fj/', description:'南太平洋由斐济 Nadi 与新西兰 Wellington 等中心负责。', descriptionEn:'The South Pacific is covered by RSMC Nadi and TCWC Wellington.' },
  global: { name:'WMO tropical cyclone network', url:'https://public.wmo.int/topics/tropical-cyclone', description:'按海域使用对应的区域专业中心和国家气象机构。', descriptionEn:'The responsible regional centre and national service are selected by basin.' },
};

const cities = [
  ['Tokyo','Japan',35.68,139.69],['Osaka','Japan',34.69,135.50],['Naha','Japan',26.21,127.68],['Taipei','Taiwan area',25.03,121.56],['Kaohsiung','Taiwan area',22.63,120.30],['Hong Kong','China',22.32,114.17],['Shanghai','China',31.23,121.47],['Fuzhou','China',26.07,119.30],['Xiamen','China',24.48,118.09],['Guangzhou','China',23.13,113.26],['Manila','Philippines',14.60,120.98],['Cebu','Philippines',10.32,123.90],['Hanoi','Vietnam',21.03,105.85],['Da Nang','Vietnam',16.05,108.20],['Busan','South Korea',35.18,129.08],['Seoul','South Korea',37.57,126.98],
  ['Miami','United States',25.76,-80.19],['Tampa','United States',27.95,-82.46],['New Orleans','United States',29.95,-90.07],['Houston','United States',29.76,-95.37],['Charleston','United States',32.78,-79.93],['New York','United States',40.71,-74.01],['Halifax','Canada',44.65,-63.57],['Bermuda','Bermuda',32.30,-64.78],['Havana','Cuba',23.11,-82.37],['San Juan','Puerto Rico',18.47,-66.11],['Nassau','Bahamas',25.05,-77.35],['Cancún','Mexico',21.16,-86.85],['Acapulco','Mexico',16.85,-99.91],['Honolulu','United States',21.31,-157.86],
  ['Kolkata','India',22.57,88.36],['Chennai','India',13.08,80.27],['Mumbai','India',19.08,72.88],['Dhaka','Bangladesh',23.81,90.41],['Chattogram','Bangladesh',22.36,91.78],['Yangon','Myanmar',16.87,96.20],['Karachi','Pakistan',24.86,67.01],['Muscat','Oman',23.59,58.41],
  ['Antananarivo','Madagascar',-18.88,47.51],['Toamasina','Madagascar',-18.15,49.40],['Maputo','Mozambique',-25.97,32.58],['Port Louis','Mauritius',-20.16,57.50],['Saint-Denis','Réunion',-20.88,55.45],
  ['Darwin','Australia',-12.46,130.84],['Cairns','Australia',-16.92,145.77],['Brisbane','Australia',-27.47,153.03],['Perth','Australia',-31.95,115.86],['Jakarta','Indonesia',-6.21,106.85],['Dili','Timor-Leste',-8.56,125.57],['Port Moresby','Papua New Guinea',-9.44,147.18],
  ['Suva','Fiji',-18.14,178.44],['Nadi','Fiji',-17.78,177.42],['Nouméa','New Caledonia',-22.28,166.46],['Port Vila','Vanuatu',-17.73,168.32],['Apia','Samoa',-13.83,-171.75],['Auckland','New Zealand',-36.85,174.76]
].map(([name,country,lat,lon]) => ({name,country,lat,lon}));

const now = Date.now();
const hours = (n) => new Date(now + n * 3600_000).toISOString();
const demoStorms = [
  { id:'demo-bavi', name:'BAVI', localName:'巴威', number:'2609', demo:true, basin:'Western North Pacific', classification:'Typhoon', lat:23.9, lon:125.2, windMs:42, pressureHpa:955, updatedAt:hours(0), sources:['demo','jma'], track:[
    {lat:12.5,lon:152,time:hours(-72),windMs:16,pressureHpa:998,forecast:false,source:'demo'}, {lat:14,lon:148,time:hours(-60),windMs:22,pressureHpa:990,forecast:false,source:'demo'}, {lat:16.2,lon:143,time:hours(-48),windMs:28,pressureHpa:980,forecast:false,source:'demo'}, {lat:18.5,lon:137,time:hours(-36),windMs:34,pressureHpa:970,forecast:false,source:'demo'}, {lat:21,lon:130.5,time:hours(-18),windMs:39,pressureHpa:960,forecast:false,source:'demo'}, {lat:23.9,lon:125.2,time:hours(0),windMs:42,pressureHpa:955,forecast:false,source:'demo'},
    {lat:26.2,lon:122.8,time:hours(12),windMs:41,pressureHpa:960,forecast:true,source:'demo'}, {lat:29.2,lon:121,time:hours(24),windMs:35,pressureHpa:970,forecast:true,source:'demo'}, {lat:33,lon:120,time:hours(48),windMs:24,pressureHpa:985,forecast:true,source:'demo'} ] },
  { id:'demo-atlantic', name:'ALPHA', demo:true, basin:'Atlantic', classification:'Hurricane', lat:22.1, lon:-62.5, windMs:39, pressureHpa:965, updatedAt:hours(0), sources:['demo','nhc'], track:[
    {lat:12.8,lon:-38,time:hours(-72),windMs:18,pressureHpa:998,forecast:false,source:'demo'}, {lat:15.2,lon:-45,time:hours(-48),windMs:25,pressureHpa:988,forecast:false,source:'demo'}, {lat:18.3,lon:-54,time:hours(-24),windMs:33,pressureHpa:975,forecast:false,source:'demo'}, {lat:22.1,lon:-62.5,time:hours(0),windMs:39,pressureHpa:965,forecast:false,source:'demo'}, {lat:25.5,lon:-69,time:hours(24),windMs:42,pressureHpa:958,forecast:true,source:'demo'}, {lat:29,lon:-73,time:hours(48),windMs:37,pressureHpa:968,forecast:true,source:'demo'} ] },
  { id:'demo-indian', name:'NIRA', demo:true, basin:'North Indian Ocean', classification:'Severe Cyclonic Storm', lat:17.8, lon:87.0, windMs:34, pressureHpa:972, updatedAt:hours(0), sources:['demo','imd'], track:[
    {lat:9,lon:91,time:hours(-54),windMs:18,pressureHpa:996,forecast:false,source:'demo'}, {lat:12,lon:89.7,time:hours(-36),windMs:24,pressureHpa:988,forecast:false,source:'demo'}, {lat:15,lon:88.2,time:hours(-18),windMs:30,pressureHpa:980,forecast:false,source:'demo'}, {lat:17.8,lon:87,time:hours(0),windMs:34,pressureHpa:972,forecast:false,source:'demo'}, {lat:20.3,lon:86,time:hours(18),windMs:31,pressureHpa:980,forecast:true,source:'demo'}, {lat:22.5,lon:85,time:hours(36),windMs:22,pressureHpa:990,forecast:true,source:'demo'} ] },
  { id:'demo-south-pacific', name:'KIRI', demo:true, basin:'South Pacific', classification:'Tropical Cyclone', lat:-18.5, lon:171.8, windMs:31, pressureHpa:978, updatedAt:hours(0), sources:['demo','nadi'], track:[
    {lat:-13.2,lon:179,time:hours(-48),windMs:18,pressureHpa:995,forecast:false,source:'demo'}, {lat:-15.4,lon:176.5,time:hours(-24),windMs:25,pressureHpa:986,forecast:false,source:'demo'}, {lat:-18.5,lon:171.8,time:hours(0),windMs:31,pressureHpa:978,forecast:false,source:'demo'}, {lat:-21.5,lon:168,time:hours(24),windMs:29,pressureHpa:983,forecast:true,source:'demo'}, {lat:-25,lon:164,time:hours(48),windMs:22,pressureHpa:990,forecast:true,source:'demo'} ] },
];

const historicalAnalogCatalog = [
  {id:'morakot-2009',name:'MORAKOT',year:2009,localZh:'莫拉克',basin:'Western North Pacific',peakWind:40,regionZh:'台湾地区及华南沿海',regionEn:'Taiwan area and the South China coast',impactZh:'移动较慢并带来长时间强降雨，山区洪水和滑坡风险突出。',impactEn:'Slow movement contributed to prolonged heavy rain and serious flood and landslide risk.',lessonZh:'不要只看中心风力；移动速度、地形和持续降雨可能成为更主要的危险。',lessonEn:'Do not focus only on centre wind; forward speed, terrain and prolonged rainfall may dominate.',track:[{lat:17.5,lon:139},{lat:19.2,lon:133},{lat:21.2,lon:128},{lat:22.8,lon:124.5},{lat:23.5,lon:121},{lat:24,lon:118}]},
  {id:'mangkhut-2018',name:'MANGKHUT',year:2018,localZh:'山竹',basin:'Western North Pacific',peakWind:55,regionZh:'菲律宾北部、香港及广东沿海',regionEn:'Northern Philippines, Hong Kong and Guangdong coast',impactZh:'强风、巨浪和风暴潮对沿海及高层建筑环境造成显著影响。',impactEn:'Strong winds, waves and storm surge caused major coastal and urban impacts.',lessonZh:'沿海风险不能只看中心路径；潮位、海岸形状和暴露度同样关键。',lessonEn:'Coastal risk cannot be inferred from the centre line alone; tide and exposure matter.',track:[{lat:13.5,lon:145},{lat:14.7,lon:139},{lat:16,lon:132},{lat:17.5,lon:125},{lat:19.2,lon:119},{lat:21.5,lon:113}]},
  {id:'doksuri-2023',name:'DOKSURI',year:2023,localZh:'杜苏芮',basin:'Western North Pacific',peakWind:50,regionZh:'菲律宾北部、台湾海峡及福建',regionEn:'Northern Philippines, Taiwan Strait and Fujian',impactZh:'强降雨、沿海大风和内陆洪涝影响范围较广。',impactEn:'Heavy rain, coastal wind and inland flooding affected a broad area.',lessonZh:'登陆后风险不会立刻结束，内陆洪水可能滞后发展。',lessonEn:'Risk does not end at landfall; inland flooding can develop later.',track:[{lat:10.5,lon:136},{lat:13,lon:131},{lat:16,lon:126},{lat:19.5,lon:122.5},{lat:23,lon:119.5},{lat:25,lon:117.5}]},
  {id:'hagibis-2019',name:'HAGIBIS',year:2019,localZh:'海贝思',basin:'Western North Pacific',peakWind:55,regionZh:'日本关东及中部地区',regionEn:'Kanto and central Japan',impactZh:'大范围暴雨与河流洪水成为主要影响。',impactEn:'Widespread heavy rain and river flooding were major impacts.',lessonZh:'强度相似不代表风险相同，降雨分布和地形会重塑影响。',lessonEn:'Similar intensity does not mean similar risk; rainfall and terrain reshape impacts.',track:[{lat:13,lon:157},{lat:17,lon:150},{lat:21,lon:143},{lat:26,lon:138},{lat:31,lon:136},{lat:36,lon:139}]},
  {id:'haiyan-2013',name:'HAIYAN',year:2013,localZh:'海燕',basin:'Western North Pacific',peakWind:65,regionZh:'菲律宾中部',regionEn:'Central Philippines',impactZh:'极端大风和风暴潮对沿海低洼地区造成严重影响。',impactEn:'Extreme winds and storm surge severely affected low-lying coasts.',lessonZh:'风暴潮撤离必须服从当地官方命令，不能等待中心接近。',lessonEn:'Storm-surge evacuation orders should be followed before the centre approaches.',track:[{lat:7,lon:148},{lat:8,lon:140},{lat:9.5,lon:132},{lat:10.8,lon:125},{lat:12,lon:118},{lat:14,lon:110}]},
  {id:'leki​ma-2019'.replace('​',''),name:'LEKIMA',year:2019,localZh:'利奇马',basin:'Western North Pacific',peakWind:52,regionZh:'浙江、上海及华东内陆',regionEn:'Zhejiang, Shanghai and inland eastern China',impactZh:'沿海强风、持续降雨和内陆洪涝共同造成影响。',impactEn:'Coastal wind, prolonged rain and inland flooding combined.',lessonZh:'路径附近以外地区也可能因外围雨带和地形受到严重影响。',lessonEn:'Outer rainbands and terrain can cause serious impacts away from the centre line.',track:[{lat:16,lon:134},{lat:19,lon:129},{lat:22,lon:124},{lat:25,lon:121},{lat:28,lon:120},{lat:32,lon:120}]}
];

const state = {
  lang: localStorage.getItem('tv14-lang') || 'zh',
  theme: localStorage.getItem('tv14-theme') || 'system',
  view: localStorage.getItem('tv14-view') || 'public',
  demo: localStorage.getItem('tv14-demo') === 'true',
  basin:'global', storms:[], sources:[], selected:null, weather:null,
  map:null, mapReady:false, projection:'mercator', styleReloading:false,
  layers:{track:true,cone:true,wind:true,cities:true,satellite:false,radar:false,coverage:false},
  opacity:Number(localStorage.getItem('tv14-opacity') || 62) / 100,
  playMode:'track', playIndex:0, playing:false, speed:1, timer:null,
  userLocation:(() => { try { return JSON.parse(localStorage.getItem('tv14-location') || 'null'); } catch { return null; } })(),
  pickLocation:false, profile:localStorage.getItem('tv14-profile') || 'commute', sheet:'collapsed',
  visualMode: localStorage.getItem('tv14-visual-mode') || 'map',
  fxQuality: localStorage.getItem('tv14-fx-quality') || 'auto',
  fxParticles: localStorage.getItem('tv14-fx-particles') !== 'false',
  fxEyewall: localStorage.getItem('tv14-fx-eyewall') !== 'false',
  fxTrail: localStorage.getItem('tv14-fx-trail') !== 'false',
  fxFollow: localStorage.getItem('tv14-fx-follow') !== 'false',
  fxLastFollowAt: 0, activeAnalogId:null, insightOpen:false, railCollapsed:false,
};

function tr(key) {
  const base = UI[state.lang] || UI.en;
  return languageStatic[state.lang]?.[key] ?? base[key] ?? UI.en[key] ?? UI.zh[key] ?? key;
}
function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function fmtDate(value, opts={}) {
  if (!value) return '—';
  const d = new Date(value); if (Number.isNaN(d.getTime())) return String(value);
  return new Intl.DateTimeFormat({zh:'zh-CN',en:'en-CA',ja:'ja-JP',ko:'ko-KR',es:'es-ES',fr:'fr-FR'}[state.lang] || 'en-CA', {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',...opts}).format(d);
}
function distanceKm(a,b) {
  const dLat=(b.lat-a.lat)*DEG, dLon=(b.lon-a.lon)*DEG;
  const q=Math.sin(dLat/2)**2+Math.cos(a.lat*DEG)*Math.cos(b.lat*DEG)*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
}
function bearing(a,b) {
  const y=Math.sin((b.lon-a.lon)*DEG)*Math.cos(b.lat*DEG);
  const x=Math.cos(a.lat*DEG)*Math.sin(b.lat*DEG)-Math.sin(a.lat*DEG)*Math.cos(b.lat*DEG)*Math.cos((b.lon-a.lon)*DEG);
  return (Math.atan2(y,x)/DEG+360)%360;
}
function directionName(deg) {
  const zh=['北','东北','东','东南','南','西南','西','西北'];
  const en=['N','NE','E','SE','S','SW','W','NW'];
  return (state.lang==='zh'?zh:en)[Math.round(deg/45)%8];
}
function destination(p, bearingDeg, km) {
  const delta=km/6371, theta=bearingDeg*DEG, phi1=p.lat*DEG, lambda1=p.lon*DEG;
  const phi2=Math.asin(Math.sin(phi1)*Math.cos(delta)+Math.cos(phi1)*Math.sin(delta)*Math.cos(theta));
  const lambda2=lambda1+Math.atan2(Math.sin(theta)*Math.sin(delta)*Math.cos(phi1),Math.cos(delta)-Math.sin(phi1)*Math.sin(phi2));
  return {lat:phi2/DEG,lon:((lambda2/DEG+540)%360)-180};
}
function circlePolygon(center,radiusKm,steps=72) {
  const ring=[]; for(let i=0;i<=steps;i++) { const p=destination(center,i/steps*360,radiusKm); ring.push([p.lon,p.lat]); }
  return {type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[ring]}};
}
function lineFeature(points,properties={}) { return {type:'Feature',properties,geometry:{type:'LineString',coordinates:points.map(p=>[p.lon,p.lat])}}; }
function featureCollection(features=[]) { return {type:'FeatureCollection',features}; }
function inferBasin(storm) {
  const raw=String(storm?.basin||'').toLowerCase();
  if (/atlantic/.test(raw)) return 'atlantic';
  if (/east.*pacific|central.*pacific|epac|cpac/.test(raw)) return 'eastern-pacific';
  if (/west.*pacific|northwest.*pacific|japan|philipp/.test(raw)) return 'western-north-pacific';
  if (/north.*indian|bay of bengal|arabian/.test(raw)) return 'north-indian';
  if (/southwest.*indian|réunion|madagascar/.test(raw)) return 'southwest-indian';
  if (/austral|indonesia|timor/.test(raw)) return 'australian';
  if (/south.*pacific|fiji|nadi/.test(raw)) return 'south-pacific';
  const {lat=0,lon=0}=storm||{};
  if(lat>=0 && lon>=100 && lon<=180) return 'western-north-pacific';
  if(lat>=0 && lon<0 && lon>-100) return 'atlantic';
  if(lat>=0 && lon<=-100) return 'eastern-pacific';
  if(lat>=0 && lon>=40 && lon<100) return 'north-indian';
  if(lat<0 && lon>=20 && lon<100) return 'southwest-indian';
  if(lat<0 && lon>=100 && lon<160) return 'australian';
  if(lat<0) return 'south-pacific';
  return 'global';
}
function authorityFor(storm) { return agencyDirectory[inferBasin(storm)] || agencyDirectory.global; }
function basinLabel(id) { return tr({global:'global','western-north-pacific':'westPacific',atlantic:'atlantic','eastern-pacific':'eastPacific','north-indian':'northIndian','southwest-indian':'southwestIndian',australian:'australia','south-pacific':'southPacific'}[id]||'global'); }
function displayName(storm) {
  if (!storm) return '—';
  const name=String(storm.name||'Unnamed').replace(/台風解析・予報情報[^·|]*/g,'').trim();
  if(state.lang==='zh' && storm.localName && /[\u4e00-\u9fff]/.test(storm.localName)) return `${storm.localName}（${name}）`;
  return name;
}
function intensityColor(wind) {
  const n=Number(wind)||0;
  if(n<17) return '#3b82f6'; if(n<25) return '#eab308'; if(n<33) return '#f97316'; if(n<42) return '#ef4444'; if(n<51) return '#ec4899'; return '#8b5cf6';
}
function sortedTrack(storm) { return [...(storm?.track||[])].filter(p=>Number.isFinite(+p.lat)&&Number.isFinite(+p.lon)).sort((a,b)=>new Date(a.time||0)-new Date(b.time||0)); }
function trackParts(storm) {
  const all=sortedTrack(storm); const observed=all.filter(p=>!p.forecast); const forecast=all.filter(p=>p.forecast);
  let trend=[];
  if(!forecast.length && observed.length>=2) {
    const a=observed.at(-2), b=observed.at(-1), br=bearing(a,b), step=Math.max(70,distanceKm(a,b));
    trend=[b]; for(let i=1;i<=4;i++) { const p=destination(b,br,step*i); trend.push({...p,time:new Date(new Date(b.time||Date.now()).getTime()+i*12*3600_000).toISOString(),windMs:Math.max(12,(b.windMs||storm.windMs||25)-i*2),forecast:true,trend:true,source:'trend'}); }
  }
  return {observed,forecast,trend,all:[...observed,...(forecast.length?forecast:trend)]};
}
function corridorPolygon(points) {
  if(points.length<2) return null;
  const left=[],right=[];
  points.forEach((p,i)=>{ const prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)],br=bearing(prev,next),radius=70+i*65; left.push(destination(p,br-90,radius)); right.push(destination(p,br+90,radius)); });
  const ring=[...left.map(p=>[p.lon,p.lat]),...right.reverse().map(p=>[p.lon,p.lat]),[left[0].lon,left[0].lat]];
  return {type:'Feature',properties:{estimated:true},geometry:{type:'Polygon',coordinates:[ring]}};
}
function riskLevel(distance) { return distance<250?'high':distance<550?'medium':'low'; }
function nearestToTrack(location,points) {
  let best=null; points.forEach((p,index)=>{ const d=distanceKm(location,p); if(!best||d<best.distance) best={point:p,index,distance:d}; }); return best;
}
function effectiveStorms() {
  const live=state.storms.filter(s=>!s.demo);
  const all=state.demo?[...live,...demoStorms]:live;
  return state.basin==='global'?all:all.filter(s=>inferBasin(s)===state.basin);
}

let toastTimer;
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('is-visible'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('is-visible'),2200); }
function applyI18n() {
  document.documentElement.lang={zh:'zh-CN',en:'en',ja:'ja',ko:'ko',es:'es',fr:'fr'}[state.lang]||'en';
  $$('[data-i18n]').forEach(el=>{ const text=tr(el.dataset.i18n); if(text) el.textContent=text; });
  $('#languageLabel').textContent=languageNames[state.lang]||'English'; renderAll();applyNeutralGeographyLabels();
}
function resolvedTheme() { return state.theme==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):state.theme; }
function applyTheme(reloadMap=true) {
  document.documentElement.dataset.theme=resolvedTheme(); localStorage.setItem('tv14-theme',state.theme);
  if(reloadMap&&state.map) { state.styleReloading=true; state.map.setStyle(`https://tiles.openfreemap.org/styles/${resolvedTheme()==='dark'?'dark':'positron'}`); state.map.once('style.load',()=>{ state.styleReloading=false; installMapLayers(); ensureCycloneFX(); }); }
}
function setView(view) { state.view=view; localStorage.setItem('tv14-view',view); document.body.dataset.view=view; $$('[data-view-mode]').forEach(b=>b.classList.toggle('is-active',b.dataset.viewMode===view)); }

function neutralAreaLabel(){return state.lang==='zh'?'台湾地区':state.lang==='ja'?'台湾地域':state.lang==='ko'?'대만 지역':state.lang==='es'?'Área de Taiwán':state.lang==='fr'?'Zone de Taïwan':'Taiwan area';}
function applyNeutralGeographyLabels(){
  if(!state.map?.isStyleLoaded?.())return;
  const blocked=['Taiwan','台湾','臺灣','Taiwan, Province of China'];
  for(const layer of state.map.getStyle()?.layers||[]){
    if(layer.type!=='symbol')continue;
    const id=String(layer.id||'').toLowerCase(),sourceLayer=String(layer['source-layer']||'').toLowerCase();
    if(!id.includes('country')&&!id.includes('place')&&!sourceLayer.includes('place'))continue;
    try{const old=state.map.getFilter(layer.id);const exclusion=['!', ['in',['coalesce',['get','name:en'],['get','name'],''],['literal',blocked]]];state.map.setFilter(layer.id,old?['all',old,exclusion]:exclusion);}catch{}
  }
  setSourceData('tv-neutral-labels',featureCollection([{type:'Feature',properties:{label:neutralAreaLabel()},geometry:{type:'Point',coordinates:[121.0,23.65]}}]));
}
function toggleInsight(open=!state.insightOpen){state.insightOpen=!!open;document.body.classList.toggle('insight-open',state.insightOpen);$('#insightToggleFloat')?.classList.toggle('is-active',state.insightOpen);setTimeout(()=>state.map?.resize(),260);}
function toggleRail(collapsed=!state.railCollapsed){state.railCollapsed=!!collapsed;document.body.classList.toggle('rail-collapsed',state.railCollapsed);setTimeout(()=>state.map?.resize(),260);}
function trackDirection(points){if(!points||points.length<2)return 0;return bearing(points[0],points.at(-1));}
function analogScore(storm,analog){const parts=trackParts(storm),pts=parts.observed.length?parts.observed:parts.all;if(pts.length<2)return 0;const directionDiff=Math.abs(((trackDirection(pts)-trackDirection(analog.track)+540)%360)-180);let score=Math.max(0,45-directionDiff/4);const wind=Number(storm?.windMs||pts.at(-1)?.windMs||0);score+=Math.max(0,35-Math.abs(wind-analog.peakWind));if(inferBasin(storm)===inferBasin({basin:analog.basin,lat:analog.track[0].lat,lon:analog.track[0].lon}))score+=20;if(state.userLocation){const d=Math.min(...analog.track.map(p=>distanceKm(state.userLocation,p)));if(d<800)score+=15;}return clamp(Math.round(score),1,99);}
function analogReasons(storm,analog){const pts=trackParts(storm).observed;const reasons=[];if(pts.length>1&&Math.abs(((trackDirection(pts)-trackDirection(analog.track)+540)%360)-180)<55)reasons.push(tr('similarPath'));if(Math.abs(Number(storm?.windMs||0)-analog.peakWind)<=16)reasons.push(tr('similarIntensity'));if(state.userLocation&&Math.min(...analog.track.map(p=>distanceKm(state.userLocation,p)))<800)reasons.push(tr('similarRegion'));return reasons.length?reasons:[tr('similarPath')];}
function renderHistoricalAnalogs(){const container=$('#analogCards'),summary=$('#historySummary');if(!container||!summary)return;const storm=state.selected;if(!storm||trackParts(storm).all.length<2){summary.innerHTML='';container.innerHTML=`<div class="empty-card">${escapeHtml(tr('noAnalog'))}</div>`;return;}const ranked=historicalAnalogCatalog.map(a=>({...a,score:analogScore(storm,a)})).sort((a,b)=>b.score-a.score).slice(0,3);summary.innerHTML=`<span>↔</span><p><strong>${escapeHtml(tr('historySummaryTitle'))}</strong><small>${escapeHtml(tr('historySummaryText'))}</small></p>`;container.innerHTML=ranked.map(a=>{const reasons=analogReasons(storm,a).map(r=>`<span>${escapeHtml(r)}</span>`).join('');const region=state.lang==='zh'?a.regionZh:a.regionEn,impact=state.lang==='zh'?a.impactZh:a.impactEn,lesson=state.lang==='zh'?a.lessonZh:a.lessonEn;return `<article class="analog-card"><header><div><small>${a.year}</small><strong>${state.lang==='zh'?escapeHtml(a.localZh)+'（'+a.name+'）':a.name}</strong><span>${escapeHtml(region)}</span></div><b>${a.score}%</b></header><div class="analog-reasons">${reasons}</div><p><em>${tr('pastImpact')}</em>${escapeHtml(impact)}</p><p><em>${tr('lesson')}</em>${escapeHtml(lesson)}</p><button data-analog-id="${a.id}" class="analog-button${state.activeAnalogId===a.id?' is-active':''}">${state.activeAnalogId===a.id?tr('removeOverlay'):tr('overlayTrack')}</button></article>`;}).join('');$$('[data-analog-id]',container).forEach(btn=>btn.onclick=()=>{state.activeAnalogId=state.activeAnalogId===btn.dataset.analogId?null:btn.dataset.analogId;renderHistoricalAnalogs();updateMapData();});}
function showWeatherStatus(title,message,stateName='loading'){const el=$('#weatherLayerStatus');if(!el)return;el.hidden=false;el.dataset.state=stateName;$('#weatherLayerTitle').textContent=title;$('#weatherLayerMessage').textContent=message;}
function ensureCycloneFX() {
  if (!state.map || !window.CycloneFX?.isAvailable?.()) return false;
  window.CycloneFX.attach(state.map);
  window.CycloneFX.setQuality(state.fxQuality);
  window.CycloneFX.setOptions({particles:state.fxParticles,eyewall:state.fxEyewall,trail:state.fxTrail});
  window.CycloneFX.setEnabled(state.visualMode==='cinematic');
  syncCycloneFX(false);
  return true;
}

function activePlaybackPoint() {
  const parts=trackParts(state.selected);
  if(!parts.all.length) return state.selected || null;
  return parts.all[clamp(state.playIndex,0,parts.all.length-1)] || parts.observed.at(-1) || state.selected;
}

function updateCinematicHud(point, radiusKm) {
  const s=state.selected;
  $('#fxStormName').textContent=displayName(s);
  $('#fxAgency').textContent=authorityFor(s).name;
  $('#fxWind').textContent=Number.isFinite(+point?.windMs)?`${Math.round(point.windMs)} m/s`:'—';
  $('#fxPressure').textContent=Number.isFinite(+point?.pressureHpa)?`${Math.round(point.pressureHpa)} hPa`:'—';
  $('#fxRadius').textContent=Number.isFinite(radiusKm)?`${Math.round(radiusKm)} km`:'—';
  $('#fxTime').textContent=point?.time?fmtDate(point.time):'—';
}

function syncCycloneFX(followCamera=true) {
  if (!window.CycloneFX || !state.selected) return;
  const parts=trackParts(state.selected);
  const point=activePlaybackPoint();
  if(!point || !Number.isFinite(+point.lat) || !Number.isFinite(+point.lon)) return;
  const radiusKm=Number(state.selected.windRadii?.radiusKm || clamp(140+(Number(point.windMs||state.selected.windMs||25))*6,180,520));
  window.CycloneFX.setStorm({
    name:displayName(state.selected),
    lat:Number(point.lat), lon:Number(point.lon),
    windMs:Number(point.windMs??state.selected.windMs??25),
    pressureHpa:Number(point.pressureHpa??state.selected.pressureHpa??990),
    radiusKm,
    time:point.time,
    observed:parts.observed,
    forecast:parts.forecast.length?parts.forecast:parts.trend,
  });
  window.CycloneFX.setQuality(state.fxQuality);
  window.CycloneFX.setOptions({particles:state.fxParticles,eyewall:state.fxEyewall,trail:state.fxTrail});
  window.CycloneFX.setEnabled(state.visualMode==='cinematic');
  updateCinematicHud(point,radiusKm);
  if(state.visualMode==='cinematic' && state.fxFollow && followCamera && state.map) {
    const now=Date.now();
    if(now-state.fxLastFollowAt>500) {
      state.fxLastFollowAt=now;
      state.map.easeTo({center:[Number(point.lon),Number(point.lat)],zoom:Math.max(4.2,state.map.getZoom()),pitch:62,bearing:-24,duration:520,easing:t=>1-Math.pow(1-t,3)});
    }
  }
}

function applyVisualMode(mode,animate=true) {
  state.visualMode=mode==='cinematic'?'cinematic':'map';
  localStorage.setItem('tv14-visual-mode',state.visualMode);
  document.body.dataset.visual=state.visualMode;
  $('#cyclone3dButton')?.classList.toggle('is-active',state.visualMode==='cinematic');
  $('#flatButton')?.classList.toggle('is-active',state.visualMode==='map'&&state.projection==='mercator');
  $('#globeButton')?.classList.toggle('is-active',state.visualMode==='map'&&state.projection==='globe');
  $('#cinematicHud').hidden=state.visualMode!=='cinematic';
  $('#fxLegend').hidden=state.visualMode!=='cinematic';
  window.CycloneFX?.setEnabled(state.visualMode==='cinematic');
  if(!state.map) return;
  if(state.visualMode==='cinematic') {
    if(innerWidth>920){toggleRail(true);toggleInsight(false);}
    if(!ensureCycloneFX()) { toast(tr('fxUnavailable')); state.visualMode='map'; document.body.dataset.visual='map'; return; }
    state.projection='mercator';
    try{state.map.setProjection({type:'mercator'});}catch{}
    const point=activePlaybackPoint();
    if(point) state.map.easeTo({center:[Number(point.lon),Number(point.lat)],zoom:5.1,pitch:62,bearing:-24,duration:animate?1100:0,easing:t=>1-Math.pow(1-t,3)});
    syncCycloneFX(false);
    if(animate) toast(tr('fxEnabled'));
  } else {
    state.map.easeTo({pitch:0,bearing:0,duration:animate?650:0});
    window.CycloneFX?.setEnabled(false);
  }
}

window.addEventListener('cyclonefxready',()=>{if(state.mapReady)ensureCycloneFX();});

function initMap() {
  if(!window.maplibregl) { $('#map').innerHTML='<div class="map-fallback">MapLibre failed to load. Check network access to unpkg.com.</div>'; return; }
  state.map=new maplibregl.Map({container:'map',style:`https://tiles.openfreemap.org/styles/${resolvedTheme()==='dark'?'dark':'positron'}`,center:[130,20],zoom:2.2,attributionControl:true,maxPitch:72,canvasContextAttributes:{antialias:true}});
  state.map.addControl(new maplibregl.NavigationControl({showCompass:true,showZoom:true}),'right');
  state.map.on('load',()=>{ state.mapReady=true; installMapLayers(); bindMapEvents(); ensureCycloneFX(); applyVisualMode(state.visualMode,false); fitSelected(false); });
  state.map.on('error',(event)=>{if(event?.error?.message)console.warn('Map error',event.error.message);const sourceId=event?.sourceId||event?.error?.sourceId||'';if(String(sourceId).includes('satellite')||String(sourceId).includes('radar'))showWeatherStatus(state.lang==='zh'?'天气图层暂不可用':'Weather layer unavailable',tr('weatherFailed'),'error');});
}
function firstSymbolLayer() { return state.map?.getStyle()?.layers?.find(l=>l.type==='symbol')?.id; }
function ensureGeoSource(id) { if(!state.map.getSource(id)) state.map.addSource(id,{type:'geojson',data:featureCollection()}); }
function addLayerSafe(layer,before) { if(!state.map.getLayer(layer.id)) state.map.addLayer(layer,before); }
function installMapLayers() {
  if(!state.map||!state.map.isStyleLoaded()) return;
  ['tv-cone','tv-wind','tv-observed','tv-forecast','tv-trend','tv-points','tv-cities','tv-user','tv-user-link','tv-history','tv-neutral-labels'].forEach(ensureGeoSource);
  addLayerSafe({id:'tv-cone-fill',type:'fill',source:'tv-cone',paint:{'fill-color':'#f97316','fill-opacity':0.13}},firstSymbolLayer());
  addLayerSafe({id:'tv-cone-outline',type:'line',source:'tv-cone',paint:{'line-color':'#f97316','line-width':1.5,'line-dasharray':[3,2]}},firstSymbolLayer());
  addLayerSafe({id:'tv-wind-fill',type:'fill',source:'tv-wind',paint:{'fill-color':'#f59e0b','fill-opacity':0.09}},firstSymbolLayer());
  addLayerSafe({id:'tv-wind-outline',type:'line',source:'tv-wind',paint:{'line-color':'#f59e0b','line-width':1.4}},firstSymbolLayer());
  addLayerSafe({id:'tv-observed-line',type:'line',source:'tv-observed',paint:{'line-color':'#0ea5e9','line-width':4,'line-opacity':0.95}},firstSymbolLayer());
  addLayerSafe({id:'tv-forecast-line',type:'line',source:'tv-forecast',paint:{'line-color':'#f97316','line-width':4,'line-dasharray':[2,2]}},firstSymbolLayer());
  addLayerSafe({id:'tv-trend-line',type:'line',source:'tv-trend',paint:{'line-color':'#8b5cf6','line-width':3.5,'line-dasharray':[1,2]}},firstSymbolLayer());
  addLayerSafe({id:'tv-track-points',type:'circle',source:'tv-points',paint:{'circle-radius':['case',['==',['get','current'],true],9,6],'circle-color':['get','color'],'circle-stroke-color':'#fff','circle-stroke-width':2,'circle-opacity':0.98}},firstSymbolLayer());
  addLayerSafe({id:'tv-city-circles',type:'circle',source:'tv-cities',paint:{'circle-radius':6,'circle-color':['get','color'],'circle-stroke-color':'#fff','circle-stroke-width':1.5}},firstSymbolLayer());
  addLayerSafe({id:'tv-city-labels',type:'symbol',source:'tv-cities',layout:{'text-field':['get','label'],'text-size':12,'text-offset':[0,1.15],'text-anchor':'top','text-allow-overlap':false},paint:{'text-color':resolvedTheme()==='dark'?'#f4fbff':'#183440','text-halo-color':resolvedTheme()==='dark'?'#071720':'#fff','text-halo-width':1.5}},undefined);
  addLayerSafe({id:'tv-history-line',type:'line',source:'tv-history',paint:{'line-color':'#64748b','line-width':3,'line-dasharray':[2,3],'line-opacity':0.78}},firstSymbolLayer());
  addLayerSafe({id:'tv-neutral-label',type:'symbol',source:'tv-neutral-labels',layout:{'text-field':['get','label'],'text-size':15,'text-allow-overlap':false},paint:{'text-color':resolvedTheme()==='dark'?'#d9edf5':'#52666e','text-halo-color':resolvedTheme()==='dark'?'#071720':'#ffffff','text-halo-width':2}},undefined);
  addLayerSafe({id:'tv-user-link-line',type:'line',source:'tv-user-link',paint:{'line-color':'#087f98','line-width':2,'line-dasharray':[2,2]}},firstSymbolLayer());
  addLayerSafe({id:'tv-user-point',type:'circle',source:'tv-user',paint:{'circle-radius':8,'circle-color':'#087f98','circle-stroke-color':'#fff','circle-stroke-width':3}},undefined);
  syncRasterLayers(); updateMapData(); applyNeutralGeographyLabels(); ensureCycloneFX();
}
function setSourceData(id,data) { const s=state.map?.getSource(id); if(s?.setData) s.setData(data); }
function setVisibility(layerIds,visible) { layerIds.forEach(id=>{ if(state.map?.getLayer(id)) state.map.setLayoutProperty(id,'visibility',visible?'visible':'none'); }); }
function currentPlaybackPoints() { const p=trackParts(state.selected); const all=p.all; if(state.playMode==='radar') return all; return all.slice(0,Math.min(all.length,state.playIndex+1)); }
function updateMapData() {
  if(!state.mapReady||state.styleReloading) return;
  if(!state.selected){['tv-cone','tv-wind','tv-observed','tv-forecast','tv-trend','tv-points','tv-cities','tv-user-link','tv-history'].forEach(id=>setSourceData(id,featureCollection()));updateUserMap();window.CycloneFX?.setEnabled(false);return;}
  const parts=trackParts(state.selected); const shown=currentPlaybackPoints();
  const observed=shown.filter(p=>!p.forecast), official=shown.filter(p=>p.forecast&&!p.trend), trend=shown.filter(p=>p.trend);
  setSourceData('tv-observed',observed.length>1?featureCollection([lineFeature(observed)]):featureCollection());
  setSourceData('tv-forecast',official.length>0?featureCollection([lineFeature([parts.observed.at(-1),...official].filter(Boolean))]):featureCollection());
  setSourceData('tv-trend',trend.length>0?featureCollection([lineFeature([parts.observed.at(-1),...trend].filter(Boolean))]):featureCollection());
  const pointFeatures=shown.map((p,i)=>({type:'Feature',properties:{index:i,time:p.time||'',kind:p.trend?'trend':p.forecast?'forecast':'observed',color:intensityColor(p.windMs),wind:p.windMs??'',pressure:p.pressureHpa??'',current:i===Math.min(parts.observed.length-1,shown.length-1),label:fmtDate(p.time)},geometry:{type:'Point',coordinates:[p.lon,p.lat]}}));
  setSourceData('tv-points',featureCollection(pointFeatures));
  const prediction=parts.forecast.length?parts.forecast:parts.trend; const cone=corridorPolygon([parts.observed.at(-1),...prediction].filter(Boolean));
  setSourceData('tv-cone',cone?featureCollection([cone]):featureCollection());
  const current=parts.observed.at(-1)||state.selected; const windRadius=state.selected.windRadii?.radiusKm||clamp(140+(state.selected.windMs||25)*6,180,520); const wind=circlePolygon(current,windRadius);
  wind.properties={estimated:!state.selected.windRadii,radiusKm:windRadius}; setSourceData('tv-wind',featureCollection([wind]));
  const near=nearbyCities(state.selected); setSourceData('tv-cities',featureCollection(near.slice(0,12).map(item=>({type:'Feature',properties:{label:`${item.name} · ${Math.round(item.distance)} km`,color:item.level==='high'?'#ef4444':item.level==='medium'?'#f59e0b':'#16a36a'},geometry:{type:'Point',coordinates:[item.lon,item.lat]}}))));
  const analog=historicalAnalogCatalog.find(a=>a.id===state.activeAnalogId);setSourceData('tv-history',analog?featureCollection([lineFeature(analog.track,{name:analog.name})]):featureCollection());
  updateUserMap();
  setVisibility(['tv-observed-line','tv-forecast-line','tv-trend-line','tv-track-points'],state.layers.track);
  setVisibility(['tv-cone-fill','tv-cone-outline'],state.layers.cone);
  setVisibility(['tv-wind-fill','tv-wind-outline'],state.layers.wind);
  setVisibility(['tv-city-circles','tv-city-labels'],state.layers.cities);setVisibility(['tv-history-line'],Boolean(state.activeAnalogId));
  syncCycloneFX();
}
function updateUserMap() {
  const loc=state.userLocation; if(!loc){setSourceData('tv-user',featureCollection());setSourceData('tv-user-link',featureCollection());return;}
  setSourceData('tv-user',featureCollection([{type:'Feature',properties:{},geometry:{type:'Point',coordinates:[loc.lon,loc.lat]}}]));
  const nearest=nearestToTrack(loc,trackParts(state.selected).all); setSourceData('tv-user-link',nearest?featureCollection([lineFeature([loc,nearest.point])]):featureCollection());
}
function removeRaster(id) { if(state.map?.getLayer(id)) state.map.removeLayer(id); if(state.map?.getSource(id)) state.map.removeSource(id); }
function addRaster(id,tiles,maxzoom=9,opacity=state.opacity) {
  if(!state.mapReady||!tiles?.length) return; removeRaster(id); const before=state.map.getLayer('tv-cone-fill')?'tv-cone-fill':firstSymbolLayer();
  state.map.addSource(id,{type:'raster',tiles,tileSize:256,minzoom:0,maxzoom,scheme:'xyz'}); state.map.addLayer({id,type:'raster',source:id,paint:{'raster-opacity':opacity,'raster-fade-duration':350,'raster-resampling':'linear','raster-saturation':id==='tv-satellite'?.12:.25,'raster-contrast':id==='tv-radar'?.18:.08}},before);
}
function radarTile(frame) { if(!frame)return null;return frame.tileTemplate||((state.weather?.radar?.host&&frame.path)?`${state.weather.radar.host}${frame.path}/256/{z}/{x}/{y}/6/1_1.png`:null); }
function syncRasterLayers() {
  if(!state.mapReady) return;
  if(state.layers.satellite&&state.weather?.satellite?.tileTemplate){const s=state.weather.satellite;addRaster('tv-satellite',[s.tileTemplate.replace('{date}',s.date)],9,state.opacity);}else removeRaster('tv-satellite');
  const frame=state.weather?.radar?.frames?.[state.playMode==='radar'?state.playIndex:state.weather.radar.frames.length-1];
  if(state.layers.radar&&frame){const tile=radarTile(frame); if(tile)addRaster('tv-radar',[tile],7,state.opacity);}else removeRaster('tv-radar');
  if(state.layers.coverage&&state.weather?.radar?.coverageTemplate)addRaster('tv-coverage',[state.weather.radar.coverageTemplate],7,.18);else removeRaster('tv-coverage');
}
function bindMapEvents() {
  state.map.on('click','tv-track-points',e=>{const f=e.features?.[0];if(!f)return;const c=f.geometry.coordinates.slice();new maplibregl.Popup({offset:12}).setLngLat(c).setHTML(`<div class="node-popup"><header><h3>${escapeHtml(displayName(state.selected))}</h3><span class="kind">${escapeHtml(tr(f.properties.kind==='observed'?'trackKindObserved':f.properties.kind==='forecast'?'trackKindForecast':'trackKindTrend'))}</span></header><dl><div><dt>${tr('updated')}</dt><dd>${escapeHtml(fmtDate(f.properties.time))}</dd></div><div><dt>${tr('maxWind')}</dt><dd>${f.properties.wind?`${Math.round(f.properties.wind)} m/s`:'—'}</dd></div><div><dt>${tr('pressure')}</dt><dd>${f.properties.pressure?`${Math.round(f.properties.pressure)} hPa`:'—'}</dd></div><div><dt>${tr('coordinates')}</dt><dd>${c[1].toFixed(1)}°, ${c[0].toFixed(1)}°</dd></div></dl></div>`).addTo(state.map);});
  state.map.on('mouseenter','tv-track-points',()=>state.map.getCanvas().style.cursor='pointer'); state.map.on('mouseleave','tv-track-points',()=>state.map.getCanvas().style.cursor='');
  state.map.on('click',e=>{if(!state.pickLocation)return;state.userLocation={lat:e.lngLat.lat,lon:e.lngLat.lng};localStorage.setItem('tv14-location',JSON.stringify(state.userLocation));state.pickLocation=false;renderPersonalImpact();updateMapData();toast(tr('locationSaved'));});
}
function fitSelected(animate=true) {
  if(!state.map||!state.selected)return; const pts=trackParts(state.selected).all; if(!pts.length)return;
  if(state.visualMode==='cinematic') {
    const point=activePlaybackPoint()||pts.at(-1);
    state.map.easeTo({center:[point.lon,point.lat],zoom:5.1,pitch:62,bearing:-24,duration:animate?900:0});
    syncCycloneFX(false);
    return;
  }
  const bounds=new maplibregl.LngLatBounds();pts.forEach(p=>bounds.extend([p.lon,p.lat])); if(state.userLocation)bounds.extend([state.userLocation.lon,state.userLocation.lat]);
  state.map.fitBounds(bounds,{padding:{top:105,bottom:115,left:75,right:75},maxZoom:6,duration:animate?700:0});
}

function renderBasins() {
  const ids=['global','western-north-pacific','atlantic','eastern-pacific','north-indian','southwest-indian','australian','south-pacific'];
  $('#basinTabs').innerHTML=ids.map(id=>`<button class="basin-tab${state.basin===id?' is-active':''}" data-basin="${id}">${escapeHtml(basinLabel(id))}</button>`).join('');
  $$('[data-basin]').forEach(b=>b.onclick=()=>{state.basin=b.dataset.basin;const list=effectiveStorms();if(!list.some(s=>s.id===state.selected?.id))state.selected=list[0]||null;renderAll();if(state.selected)fitSelected();});
}
function renderStormList() {
  const storms=effectiveStorms();$('#stormCount').textContent=storms.length;const list=$('#stormList');
  if(!storms.length){list.innerHTML=`<div class="empty-card">${escapeHtml(tr('noStorm'))}</div>`;state.selected=null;return;}
  if(!state.selected||!storms.some(s=>s.id===state.selected.id))state.selected=storms[0];
  list.innerHTML=storms.map(s=>`<button class="storm-card${s.id===state.selected.id?' is-active':''}" data-storm-id="${escapeHtml(s.id)}"><i class="storm-card-dot" style="background:${intensityColor(s.windMs)}"></i><span class="storm-card-copy"><strong>${escapeHtml(displayName(s))}</strong><small>${escapeHtml(basinLabel(inferBasin(s)))} · ${escapeHtml(s.classification||'Tropical cyclone')}</small></span><span class="storm-card-value">${Number.isFinite(+s.windMs)?Math.round(s.windMs):'—'}<small>m/s</small></span></button>`).join('');
  $$('[data-storm-id]').forEach(b=>b.onclick=()=>{state.selected=storms.find(s=>s.id===b.dataset.stormId);state.playIndex=Math.max(0,trackParts(state.selected).observed.length-1);renderAll();fitSelected();if(innerWidth<=920)$('#stormRail').classList.remove('is-open');});
}
function renderAuthority() { const a=authorityFor(state.selected);$('#agencyName').textContent=a.name;$('#agencyDescription').textContent=state.lang==='zh'?a.description:a.descriptionEn;$('#agencyLink').href=a.url; }
function movementText(storm) { const pts=trackParts(storm).observed;if(pts.length<2)return '—';const a=pts.at(-2),b=pts.at(-1);return `${directionName(bearing(a,b))} · ${Math.round(distanceKm(a,b)/Math.max(1,(new Date(b.time)-new Date(a.time))/3600_000))} km/h`; }
function summaryAdvice(storm) { const wind=storm?.windMs||0;return wind>=42?(state.lang==='zh'?'减少外出并核对当地警报':'Reduce travel and check local alerts'):wind>=25?(state.lang==='zh'?'关注路径与当地预警':'Monitor the track and local alerts'):(state.lang==='zh'?'保持日常关注':'Continue routine monitoring'); }
function renderSummary() {
  const s=state.selected;if(!s){$('#summarySource').textContent='—';$('#summaryTitle').textContent=tr('noStorm');$('#summaryText').textContent='';$('#summaryDirection').textContent='—';$('#summaryClosest').textContent='—';$('#summaryAdvice').textContent='—';return;}
  const authority=authorityFor(s);$('#summarySource').textContent=`${s.demo?tr('demo'):tr('live')} · ${authority.name}`;$('#summaryTitle').textContent=displayName(s);$('#summaryText').textContent=s.demo?(state.lang==='zh'?'演示系统用于展示全球路径、城市、云图与雷达功能，不是官方预警。':'Demo system for global track, city, satellite and radar features; not an official warning.'):(state.lang==='zh'?'页面优先展示所属海域权威机构的数据，并用其他来源交叉核对。':'The responsible basin authority is shown first and cross-checked against supporting sources.');
  $('#summaryDirection').textContent=movementText(s);$('#summaryClosest').textContent=state.userLocation?(personalImpact(s)?.closestText||'—'):tr('locationNotSet');$('#summaryAdvice').textContent=summaryAdvice(s);
}
function nearbyCities(storm) { const pts=trackParts(storm).all;if(!pts.length)return[];return cities.map(c=>{const best=nearestToTrack(c,pts);return {...c,distance:best.distance,level:riskLevel(best.distance),closest:best.point};}).filter(c=>c.distance<950).sort((a,b)=>a.distance-b.distance); }
function renderCities() { const rows=nearbyCities(state.selected).slice(0,8);$('#cityList').innerHTML=rows.length?rows.map(c=>`<article class="city-item"><div><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.country==='Taiwan area'?neutralAreaLabel():c.country)} · ${escapeHtml(fmtDate(c.closest.time))}</small></div><span class="city-distance">${Math.round(c.distance)} km</span></article>`).join(''):`<div class="empty-card">${tr('noNearbyCity')}</div>`; }
function personalImpact(storm) {
  const loc=state.userLocation,pts=trackParts(storm).all;if(!loc||!pts.length)return null;const n=nearestToTrack(loc,pts),level=riskLevel(n.distance);const time=n.point.time?new Date(n.point.time):null;const span=level==='high'?12:level==='medium'?18:24;
  return {nearest:n,level,closestText:time?fmtDate(time.toISOString()):'—',windowText:time?`${fmtDate(new Date(time.getTime()-span*3600_000))} – ${fmtDate(new Date(time.getTime()+span*3600_000))}`:'—',confidence:pts.filter(p=>p.forecast).length>=2?tr('high'):pts.length>=3?tr('medium'):tr('low')};
}
function renderPersonalImpact() {
  const impact=personalImpact(state.selected);$('#locationStatus').textContent=state.userLocation?`${state.userLocation.lat.toFixed(2)}°, ${state.userLocation.lon.toFixed(2)}°`:tr('locationNotSet');
  $('#nearestDistance').textContent=impact?`${Math.round(impact.nearest.distance)} km`:'—';$('#closestTime').textContent=impact?.closestText||'—';$('#impactWindow').textContent=impact?.windowText||'—';$('#confidence').textContent=impact?.confidence||'—';
  const level=impact?.level||'low';const hazards=[['🌬️','wind',tr('wind'+level[0].toUpperCase()+level.slice(1))],['🌧️','rain',tr('rain'+level[0].toUpperCase()+level.slice(1))],['🌊','coast',tr('coast'+level[0].toUpperCase()+level.slice(1))]];
  $('#hazardList').innerHTML=hazards.map(([icon,key,text])=>`<article class="hazard-card"><span class="hazard-icon">${icon}</span><div><strong>${tr(key)}</strong><small>${escapeHtml(text)}</small></div><span class="risk-pill risk-${level}">${tr(level)}</span></article>`).join('');
  renderAdvice(level);
}
const adviceCopy={
  commute:{zh:['查看下班时段降雨与风力，准备替代路线。','在影响窗口前调整通勤时间，优先公共交通。','避免积水下穿道、树木密集路段和临时设施。'],en:['Check wind and rain for your commute and prepare another route.','Adjust travel before the impact window; prefer resilient public transport.','Avoid flooded underpasses, tree-lined roads and temporary structures.']},
  outdoor:{zh:['关注阵风、雷电、海浪和山地风险。','提前取消登山、水上运动和海边活动。','停止户外活动，不要前往海边观浪。'],en:['Watch gusts, lightning, waves and mountain hazards.','Cancel hiking, water sports and shoreline activity early.','Stop outdoor activity and stay away from the coast.']},
  office:{zh:['备份文件并确认远程办公安排。','为设备充电，检查窗户与建筑通知。','远离大面积玻璃，服从物业和停工指令。'],en:['Back up files and confirm remote-work arrangements.','Charge devices and check windows and building notices.','Stay away from large glazing and follow closure instructions.']},
  drive:{zh:['检查路线上的低洼路段、桥梁和沿海道路。','提前加油或充电，把车停在地势较高处。','不要驶入积水，不在强风中通过高架桥。'],en:['Check low roads, bridges and coastal routes.','Fuel or charge early and park on higher ground.','Never drive into floodwater or cross exposed bridges in strong wind.']},
  family:{zh:['确认老人、儿童、宠物和常用药需求。','提前完成接送与采购，准备照明和饮水。','保持家人联系，及时执行疏散或停课要求。'],en:['Check needs for older adults, children, pets and medicine.','Finish pick-ups and shopping early; prepare lighting and water.','Keep family contact and follow evacuation or school-closure orders.']},
  coastProfile:{zh:['确认风暴潮区、地下空间和疏散路线。','转移车辆与室外物品，停止海上活动。','远离岸线，官方要求撤离时立即行动。'],en:['Check surge zones, underground spaces and evacuation routes.','Move vehicles and outdoor items; stop marine activity.','Stay away from the shoreline and evacuate immediately when ordered.']}
};
function renderProfiles() { const ids=['commute','outdoor','office','drive','family','coastProfile'];$('#profileTabs').innerHTML=ids.map(id=>`<button class="profile-tab${state.profile===id?' is-active':''}" data-profile="${id}">${tr(id)}</button>`).join('');$$('[data-profile]').forEach(b=>b.onclick=()=>{state.profile=b.dataset.profile;localStorage.setItem('tv14-profile',state.profile);renderAdvice(personalImpact(state.selected)?.level||'low');renderProfiles();}); }
function renderAdvice(level) { const lang=state.lang==='zh'?'zh':'en',copy=adviceCopy[state.profile]?.[lang]||adviceCopy.commute[lang];$('#adviceTimeline').innerHTML=[[tr('now'),copy[0]],[tr('before'),copy[1]],[tr('during'),copy[2]]].map(([label,text],i)=>`<article class="advice-step"><span>${label}</span><div><strong>${level==='high'&&i>0?(state.lang==='zh'?'优先执行':'Priority'):tr(state.profile)}</strong><p>${escapeHtml(text)}</p></div></article>`).join(''); }
function renderPro() { const s=state.selected,a=authorityFor(s),parts=trackParts(s);$('#proStormName').textContent=displayName(s);$('#proCoordinates').textContent=s?`${(+s.lat).toFixed(1)}°N · ${(+s.lon).toFixed(1)}°E`:'—';$('#proWind').textContent=Number.isFinite(+s?.windMs)?`${Math.round(s.windMs)} m/s`:'—';$('#proPressure').textContent=Number.isFinite(+s?.pressureHpa)?`${Math.round(s.pressureHpa)} hPa`:'—';$('#proClass').textContent=s?.classification||'—';$('#proTrackCount').textContent=`${parts.observed.length} + ${parts.forecast.length||parts.trend.length}`;$('#proAgency').textContent=a.name;
  $('#sourceList').innerHTML=state.sources.map(src=>`<article class="source-row"><div><strong>${escapeHtml(src.name)}</strong><small>${escapeHtml(src.message||src.role||'')}</small></div><span class="source-state">${escapeHtml(src.status||'—')}</span></article>`).join(''); }
function renderAgencies() { const ids=['western-north-pacific','atlantic','eastern-pacific','north-indian','southwest-indian','australian','south-pacific'];$('#agencyGrid').innerHTML=ids.map(id=>{const a=agencyDirectory[id];return `<article class="agency-item"><strong>${escapeHtml(basinLabel(id))} · ${escapeHtml(a.name)}</strong><small>${escapeHtml(state.lang==='zh'?a.description:a.descriptionEn)}</small></article>`;}).join(''); }
function renderSourceHealth() { const usable=state.sources.filter(s=>['online','no-data','degraded'].includes(s.status)).length;$('#sourceHealth strong').textContent=usable?tr('sourceConnected'):tr('connecting');$('#sourceUpdated').textContent=state.sources.length?`${tr('updated')} ${fmtDate(new Date().toISOString())}`:'—';$('#agreementCount').textContent=usable;$('#agreementText').textContent=tr('sourceMethod'); }
function renderTimeline() {
  const parts=trackParts(state.selected);const max=state.playMode==='radar'?(state.weather?.radar?.frames?.length||0)-1:parts.all.length-1;state.playIndex=clamp(state.playIndex,0,Math.max(0,max));$('#timelineRange').max=Math.max(0,max);$('#timelineRange').value=state.playIndex;
  if(state.playMode==='radar'){const frame=state.weather?.radar?.frames?.[state.playIndex];$('#playbackTime').textContent=frame?fmtDate(frame.time*1000):tr('radarEmpty');$('#playbackKind').textContent=tr('radarPlayback');}else{const p=parts.all[state.playIndex];$('#playbackTime').textContent=p?fmtDate(p.time):'—';$('#playbackKind').textContent=p?.trend?tr('trackKindTrend'):p?.forecast?tr('trackKindForecast'):tr('trackKindObserved');}
  $('#playButton').textContent=state.playing?'❚❚':'▶';$('#speedButton').textContent=`${state.speed}×`;syncRasterLayers();updateMapData(); }
function renderAll() { if ($('#demoToggle')) $('#demoToggle').checked=state.demo; renderBasins();renderStormList();renderAuthority();renderSummary();renderPersonalImpact();renderProfiles();renderHistoricalAnalogs();renderPro();renderCities();renderAgencies();renderSourceHealth();renderTimeline();updateMapData(); }

function setSheet(sheet) { state.sheet=sheet;$('#insightPanel').dataset.sheet=sheet; }
function bindUI() {
  $('#brandButton').onclick=()=>$('#stormRail').classList.add('is-open');$('#railClose').onclick=()=>$('#stormRail').classList.remove('is-open');$('#railToggleFloat').onclick=()=>{if(innerWidth<=920)$('#stormRail').classList.toggle('is-open');else toggleRail();};$('#insightToggleFloat').onclick=()=>{if(innerWidth<=920)setSheet(state.sheet==='collapsed'?'half':'collapsed');else toggleInsight();};$('#weatherLayerClose').onclick=()=>$('#weatherLayerStatus').hidden=true;
  $$('[data-view-mode]').forEach(b=>b.onclick=()=>{setView(b.dataset.viewMode);if(innerWidth<=920)setSheet('half');});
  $('#languageButton').onclick=e=>{e.stopPropagation();$('#languageMenu').hidden=!$('#languageMenu').hidden;$('#themeMenu').hidden=true;};
  $('#themeButton').onclick=e=>{e.stopPropagation();$('#themeMenu').hidden=!$('#themeMenu').hidden;$('#languageMenu').hidden=true;};
  $$('[data-language]').forEach(b=>b.onclick=()=>{state.lang=b.dataset.language;localStorage.setItem('tv14-lang',state.lang);$('#languageMenu').hidden=true;applyI18n();});
  $$('[data-theme-choice]').forEach(b=>b.onclick=()=>{state.theme=b.dataset.themeChoice;$('#themeMenu').hidden=true;applyTheme();});
  document.addEventListener('click',()=>{$('#languageMenu').hidden=true;$('#themeMenu').hidden=true;});
  $('#demoToggle').checked=state.demo;$('#demoToggle').onchange=e=>{state.demo=e.target.checked;localStorage.setItem('tv14-demo',state.demo);state.selected=null;renderAll();if(state.selected)fitSelected();};
  $('#flatButton').onclick=()=>{state.projection='mercator';applyVisualMode('map',false);state.map?.setProjection({type:'mercator'});$('#flatButton').classList.add('is-active');$('#globeButton').classList.remove('is-active');};
  $('#globeButton').onclick=()=>{try{state.projection='globe';applyVisualMode('map',false);state.map?.setProjection({type:'globe'});$('#globeButton').classList.add('is-active');$('#flatButton').classList.remove('is-active');}catch{toast('Globe projection is not supported by this browser.');}};
  $('#cyclone3dButton').onclick=()=>applyVisualMode(state.visualMode==='cinematic'?'map':'cinematic');
  $('#fitStormButton').onclick=()=>fitSelected();$('#fitWorldButton').onclick=()=>state.map?.flyTo({center:[0,10],zoom:1.4,duration:700});
  $('#layersButton').onclick=e=>{e.stopPropagation();$('#layerPanel').hidden=!$('#layerPanel').hidden;};$$('[data-close-panel]').forEach(b=>b.onclick=()=>$('#'+b.dataset.closePanel).hidden=true);
  $$('[data-layer-toggle]').forEach(input=>{input.checked=state.layers[input.dataset.layerToggle];input.onchange=()=>{const key=input.dataset.layerToggle;state.layers[key]=input.checked;if(key==='satellite'&&input.checked){if(!state.weather?.satellite?.tileTemplate){input.checked=false;state.layers[key]=false;showWeatherStatus(tr('satelliteLayer'),tr('weatherFailed'),'error');}else showWeatherStatus(tr('satelliteLayer'),tr('satelliteLoading'),'loading');}if(key==='radar'&&input.checked){if(!state.weather?.radar?.frames?.length){input.checked=false;state.layers[key]=false;showWeatherStatus(tr('radarLayer'),tr('radarEmpty'),'error');}else{state.playMode='radar';state.playIndex=state.weather.radar.frames.length-1;$$('[data-play-mode]').forEach(x=>x.classList.toggle('is-active',x.dataset.playMode==='radar'));showWeatherStatus(tr('radarLayer'),tr('radarNoEcho'),'ready');}}syncRasterLayers();renderTimeline();updateMapData();};});
  $('#weatherOpacity').value=Math.round(state.opacity*100);$('#weatherOpacity').oninput=e=>{state.opacity=e.target.value/100;localStorage.setItem('tv14-opacity',e.target.value);['tv-satellite','tv-radar'].forEach(id=>{if(state.map?.getLayer(id))state.map.setPaintProperty(id,'raster-opacity',state.opacity);});};
  $('#fxQuality').value=state.fxQuality;$('#fxQuality').onchange=e=>{state.fxQuality=e.target.value;localStorage.setItem('tv14-fx-quality',state.fxQuality);window.CycloneFX?.setQuality(state.fxQuality);syncCycloneFX(false);};
  $('#fxParticles').checked=state.fxParticles;$('#fxParticles').onchange=e=>{state.fxParticles=e.target.checked;localStorage.setItem('tv14-fx-particles',String(state.fxParticles));syncCycloneFX(false);};
  $('#fxEyewall').checked=state.fxEyewall;$('#fxEyewall').onchange=e=>{state.fxEyewall=e.target.checked;localStorage.setItem('tv14-fx-eyewall',String(state.fxEyewall));syncCycloneFX(false);};
  $('#fxTrail').checked=state.fxTrail;$('#fxTrail').onchange=e=>{state.fxTrail=e.target.checked;localStorage.setItem('tv14-fx-trail',String(state.fxTrail));syncCycloneFX(false);};
  $('#fxFollow').checked=state.fxFollow;$('#fxFollow').onchange=e=>{state.fxFollow=e.target.checked;localStorage.setItem('tv14-fx-follow',String(state.fxFollow));};
  $$('[data-play-mode]').forEach(b=>b.onclick=()=>{state.playMode=b.dataset.playMode;state.playIndex=0;$$('[data-play-mode]').forEach(x=>x.classList.toggle('is-active',x===b));renderTimeline();});
  $('#timelineRange').oninput=e=>{state.playIndex=Number(e.target.value);renderTimeline();};$('#playButton').onclick=togglePlay;$('#speedButton').onclick=()=>{state.speed=state.speed===1?1.5:state.speed===1.5?2:1;renderTimeline();if(state.playing){stopPlay();startPlay();}};
  $('#impactButton').onclick=()=>{if(innerWidth>920)toggleInsight(true);setSheet(innerWidth<=920?'full':'half');$('#impactSection').scrollIntoView({behavior:'smooth',block:'start'});};$('#sourcesButton').onclick=()=>{if(innerWidth>920)toggleInsight(true);$('#methodSection').scrollIntoView({behavior:'smooth'});setSheet(innerWidth<=920?'full':'half');};
  $('#locateButton').onclick=()=>navigator.geolocation?.getCurrentPosition(pos=>{state.userLocation={lat:pos.coords.latitude,lon:pos.coords.longitude};localStorage.setItem('tv14-location',JSON.stringify(state.userLocation));renderPersonalImpact();updateMapData();fitSelected();toast(tr('locationSaved'));},()=>toast(tr('locationDenied')),{enableHighAccuracy:false,timeout:8000,maximumAge:600000});
  $('#pickLocationButton').onclick=()=>{state.pickLocation=true;toast(tr('pickHint'));};$('#clearLocationButton').onclick=()=>{state.userLocation=null;localStorage.removeItem('tv14-location');renderPersonalImpact();updateMapData();};
  const handle=$('#sheetHandle');let startY=0,startSheet='collapsed';handle.onclick=()=>setSheet(state.sheet==='collapsed'?'half':state.sheet==='half'?'full':'collapsed');handle.onpointerdown=e=>{startY=e.clientY;startSheet=state.sheet;handle.setPointerCapture(e.pointerId);};handle.onpointerup=e=>{const dy=e.clientY-startY;if(dy<-55)setSheet(startSheet==='collapsed'?'half':'full');else if(dy>55)setSheet(startSheet==='full'?'half':'collapsed');};
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system')applyTheme();});
}
function startPlay(){if(state.playing)return;state.playing=true;state.timer=setInterval(()=>{const max=Number($('#timelineRange').max)||0;state.playIndex=state.playIndex>=max?0:state.playIndex+1;renderTimeline();},900/state.speed);renderTimeline();}
function stopPlay(){state.playing=false;clearInterval(state.timer);state.timer=null;renderTimeline();}
function togglePlay(){state.playing?stopPlay():startPlay();}

async function loadData() {
  const [cycloneResult,weatherResult]=await Promise.allSettled([fetch('/api/cyclones',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(new Error(r.status))),fetch('/api/weather-layers',{cache:'no-store'}).then(r=>r.ok?r.json():Promise.reject(new Error(r.status)))]);
  if(cycloneResult.status==='fulfilled'){state.storms=(cycloneResult.value.storms||[]).map(s=>({...s,basin:s.basin||inferBasin(s)}));state.sources=cycloneResult.value.sources||[];}else{state.storms=[];state.sources=[{name:'Cyclone API',status:'offline',message:String(cycloneResult.reason)}];}
  if(weatherResult.status==='fulfilled'){state.weather=weatherResult.value;$('#satelliteTime').textContent=`NASA GIBS · ${weatherResult.value.satellite?.date||'—'}`;$('#radarTime').textContent=weatherResult.value.radar?.generatedAt?fmtDate(weatherResult.value.radar.generatedAt):tr('radarEmpty');}else{$('#satelliteTime').textContent=tr('unavailable');$('#radarTime').textContent=tr('unavailable');}
  if(!state.storms.length)state.demo=true;state.selected=effectiveStorms()[0]||null;state.playIndex=Math.max(0,trackParts(state.selected).observed.length-1);renderAll();if(state.selected)fitSelected(false);
}

function boot() {
  setView(state.view);document.body.dataset.visual=state.visualMode;document.body.classList.toggle('insight-open',false);applyTheme(false);bindUI();applyI18n();initMap();loadData();
}
document.addEventListener('DOMContentLoaded',boot);
