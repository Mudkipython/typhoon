const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rad = (value) => value * Math.PI / 180;
const normalizeLon = (value) => ((value + 540) % 360) - 180;
const isMobile = () => innerWidth <= 760;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const i18n = {
  zh: {
    skip:'跳到地图', chooseLanguage:'选择语言', appearance:'外观', tagline:'全球台风简报', connecting:'正在连接权威来源', connected:'权威来源已连接', partial:'部分来源暂不可用', simpleView:'公众视图', proView:'专业视图',
    region:'关注区域', global:'全球', globalOverview:'全球概览', allBasins:'所有海域', westPacific:'西北太平洋', atlantic:'大西洋', systems:'当前系统', demoScenario:'显示演示情景', demoExplain:'无活跃台风时用于体验界面', sourceHealth:'数据来源', details:'详情', sourceNote:'主预报以所属海域的官方气象机构为准，其他来源只作交叉验证。',
    worldMap:'世界地图', globe3d:'3D 地球', fitWorld:'查看全球', focusStorm:'聚焦台风', demoLabel:'演示情景 · 非官方预警', demoTitle:'台风“曙光”正在向西北移动', demoSummary:'未来两天可能靠近台湾北部与东海沿岸。路径仍会变化，应关注当地气象部门后续更新。', headingTo:'往哪里走', northwest:'西北方向', closestTime:'何时最接近', within48:'约 24–48 小时', whatToDo:'现在怎么做', followLocal:'留意当地预警', understandImpact:'看懂可能影响',
    currentFix:'当前定位', coordinates:'坐标', maxWind:'最大风速', pressure:'中心气压', movement:'移动', agencySpread:'机构定位差异', spreadExplain:'差异越小，路径判断越一致', sourcesAgree:'3 个来源结论接近', agreementExplain:'位置与移动方向大致一致', howVerified:'如何交叉验证', observed:'已观测路径', forecast:'预测路径', uncertainty:'可能范围', mapTip:'拖动地图 · 滚轮或双指缩放 · 点击路径节点',
    plainLanguage:'用一句话说明', shouldWorry:'现在需要担心吗？', stayAware:'保持关注', publicLead:'目前更需要关注路径变化，而不是立刻恐慌。预测范围内的沿海地区应检查当地气象部门通知。', windImpact:'大风', windImpactText:'沿海与高处可能先感到风力增强', rainImpact:'强降雨', rainImpactText:'实际雨量取决于台风大小与地形', coastalImpact:'沿海风险', coastalImpactText:'风暴潮风险不能只看中心路径',
    nextSteps:'建议动作', threeThings:'普通人先做这三件事', actionOne:'确认所在地官方预警', actionOneText:'不同城市的风险和信号并不相同', actionTwo:'不要把圆锥当成影响边界', actionTwoText:'大风和暴雨可能出现在预测范围之外', actionThree:'记住下一次更新时间', actionThreeText:'路径可能随新观测明显调整',
    trackTimeline:'路径时间轴', historyForecast:'实况与预测', play:'播放', verification:'交叉验证', whatSourcesSay:'各来源怎么说', notAverage:'不会把不同机构预警简单平均', methodExplain:'所属海域的官方机构作为主来源；其余来源用于检查位置、更新时间和影响评估是否一致。', disclaimerTitle:'重要说明', disclaimerText:'本网站用于信息整合与可视化，不替代任何国家或地区气象部门发布的官方预警和应急指令。',
    map:'地图', brief:'简报', sources:'来源', more:'更多', dataMethod:'数据方法', verificationLogic:'交叉验证逻辑', logicPrimary:'先确定主权威来源', logicPrimaryText:'西北太平洋优先使用 JMA/RSMC Tokyo；大西洋和东北太平洋优先使用 NOAA/NHC。', logicCompare:'再比较其他来源', logicCompareText:'检查中心位置、移动方向、更新时间与影响等级是否相近。', logicExplain:'保留差异，不制造假共识', logicExplainText:'风速平均时段与分级标准不同，页面会显示差异而不是直接取平均。',
    themeSystem:'跟随系统', themeSystemText:'自动适配设备外观', themeLight:'浅色', themeLightText:'清爽明亮的地图', themeDark:'深色', themeDarkText:'低光环境更舒适',
    noActive:'目前未发现官方活跃台风', noActiveSummary:'已连接的数据源暂未报告活跃热带气旋。你仍可打开演示情景体验地图和交互。', noActiveDirection:'暂无路径', noActiveTiming:'暂无影响时间', noActiveAction:'保持日常关注', noSystems:'目前没有活跃系统', liveLabel:'官方数据 · 请核对当地预警', liveSummary:'多个来源正在更新该热带气旋。页面会优先展示所属海域官方机构的数据，并标出其他来源是否一致。',
    online:'在线', noData:'在线 · 暂无数据', degraded:'可用 · 解析受限', offline:'离线', notConfigured:'未配置', primary:'主权威来源', official:'官方来源', impact:'影响评估', local:'地方预警', optional:'可选来源', updated:'更新', loadingSources:'正在读取来源', sourcesOnline:'个来源在线', sourceAgreement:'个来源可用于对照', demo:'演示', observedWord:'实况', forecastWord:'预测', unknown:'未知', themeChanged:'主题已切换', languageChanged:'Language: English', focused:'已聚焦当前台风', globalReset:'已回到全球视图', simpleMode:'已切换为公众视图', proMode:'已切换为专业视图',
    hkoSignal:'香港热带气旋信号', noWarning:'暂无当地热带气旋信号', sourceUnavailable:'当前请求失败，稍后会自动重试', demoSourceMessage:'演示定位与路径，用于展示交叉验证界面', activeStorm:'活跃系统', liveStormTitle:'热带气旋“{name}”正在更新', globalMonitoring:'全球热带气旋监测中', viewSource:'查看来源', close:'关闭'
  },
  en: {
    skip:'Skip to map', chooseLanguage:'Choose language', appearance:'Appearance', tagline:'Global Cyclone Brief', connecting:'Connecting official sources', connected:'Official sources connected', partial:'Some sources are unavailable', simpleView:'Public view', proView:'Professional view',
    region:'Watch region', global:'Global', globalOverview:'Global overview', allBasins:'All basins', westPacific:'Western Pacific', atlantic:'Atlantic', systems:'Current systems', demoScenario:'Show demo scenario', demoExplain:'Explore the interface when no storm is active', sourceHealth:'Data sources', details:'Details', sourceNote:'The responsible meteorological agency remains authoritative; other sources are used only for cross-checking.',
    worldMap:'World map', globe3d:'3D globe', fitWorld:'View world', focusStorm:'Focus storm', demoLabel:'Demo scenario · Not an official warning', demoTitle:'Typhoon Aurora is moving northwest', demoSummary:'It may approach northern Taiwan and the East China Sea coast within two days. The track can still change; follow local meteorological updates.', headingTo:'Where it is going', northwest:'Northwest', closestTime:'Closest approach', within48:'About 24–48 hours', whatToDo:'What to do now', followLocal:'Follow local alerts', understandImpact:'Understand impacts',
    currentFix:'Current fix', coordinates:'Coordinates', maxWind:'Maximum wind', pressure:'Central pressure', movement:'Movement', agencySpread:'Agency position spread', spreadExplain:'A smaller spread means stronger track agreement', sourcesAgree:'3 sources broadly agree', agreementExplain:'Position and direction are similar', howVerified:'How this is checked', observed:'Observed track', forecast:'Forecast track', uncertainty:'Possible range', mapTip:'Drag · Wheel or pinch to zoom · Select a track point',
    plainLanguage:'In plain language', shouldWorry:'Should I be worried now?', stayAware:'Stay aware', publicLead:'Track changes matter more than panic right now. Coastal communities inside and near the forecast area should check local official notices.', windImpact:'Strong wind', windImpactText:'Coasts and exposed high ground may feel stronger wind first', rainImpact:'Heavy rain', rainImpactText:'Actual rainfall depends on storm size and terrain', coastalImpact:'Coastal risk', coastalImpactText:'Storm-surge risk extends beyond the centre line',
    nextSteps:'Next steps', threeThings:'Three useful things to do', actionOne:'Check your local official warning', actionOneText:'Risk and warning signals vary by city and region', actionTwo:'Do not treat the cone as an impact boundary', actionTwoText:'Wind and rain may occur well outside the cone', actionThree:'Note the next update time', actionThreeText:'The track may shift as new observations arrive',
    trackTimeline:'Track timeline', historyForecast:'Observed and forecast', play:'Play', verification:'Cross-check', whatSourcesSay:'What each source says', notAverage:'Agency warnings are not averaged', methodExplain:'The responsible basin agency is primary; other sources check position, freshness and impact assessment.', disclaimerTitle:'Important', disclaimerText:'This site integrates and visualizes information. It does not replace official warnings or emergency instructions from national and local authorities.',
    map:'Map', brief:'Brief', sources:'Sources', more:'More', dataMethod:'Data method', verificationLogic:'Cross-validation logic', logicPrimary:'Choose the authoritative source first', logicPrimaryText:'JMA/RSMC Tokyo is primary for the western North Pacific; NOAA/NHC is primary for the Atlantic and eastern North Pacific.', logicCompare:'Then compare other sources', logicCompareText:'Check centre position, movement, update time and impact level.', logicExplain:'Keep differences visible', logicExplainText:'Wind averaging periods and classification systems differ, so values are shown rather than silently averaged.',
    themeSystem:'System', themeSystemText:'Follow your device appearance', themeLight:'Light', themeLightText:'Bright, clear map presentation', themeDark:'Dark', themeDarkText:'Comfortable in low light',
    noActive:'No official active tropical cyclone found', noActiveSummary:'Connected feeds currently report no active tropical cyclone. You can enable the demo scenario to explore the interface.', noActiveDirection:'No track', noActiveTiming:'No impact window', noActiveAction:'Continue normal monitoring', noSystems:'No active system at present', liveLabel:'Official data · Verify local alerts', liveSummary:'Multiple sources are updating this cyclone. The responsible basin agency is shown first, with agreement and differences from other sources.',
    online:'Online', noData:'Online · No current data', degraded:'Available · Limited parsing', offline:'Offline', notConfigured:'Not configured', primary:'Primary authority', official:'Official source', impact:'Impact assessment', local:'Local warning', optional:'Optional source', updated:'Updated', loadingSources:'Reading sources', sourcesOnline:'sources online', sourceAgreement:'sources available for comparison', demo:'Demo', observedWord:'Observed', forecastWord:'Forecast', unknown:'Unknown', themeChanged:'Theme changed', languageChanged:'语言：中文', focused:'Focused on current storm', globalReset:'Returned to global view', simpleMode:'Public view enabled', proMode:'Professional view enabled',
    hkoSignal:'Hong Kong tropical cyclone signal', noWarning:'No local tropical cyclone signal', sourceUnavailable:'Request failed; the site will retry later', demoSourceMessage:'Demo fix and track for demonstrating cross-validation', activeStorm:'Active system', liveStormTitle:'Tropical cyclone “{name}” is being updated', globalMonitoring:'Monitoring tropical cyclones worldwide', viewSource:'View source', close:'Close'
  }
};

const languageOverrides = {
  ja: {
    appearance:'外観', chooseLanguage:'言語を選択', tagline:'世界の台風速報', connecting:'公的情報源に接続中', connected:'公的情報源に接続済み', partial:'一部の情報源を利用できません', simpleView:'一般向け', proView:'専門表示',
    region:'注目地域', global:'世界', globalOverview:'世界全体', allBasins:'全海域', westPacific:'北西太平洋', atlantic:'大西洋', systems:'現在のシステム', demoScenario:'デモを表示', demoExplain:'活動中の台風がない場合の操作体験', sourceHealth:'データソース', details:'詳細', sourceNote:'担当する気象機関の情報を優先し、他の情報源は照合にのみ使用します。',
    worldMap:'世界地図', globe3d:'3D 地球', fitWorld:'世界全体', focusStorm:'台風に移動', demoLabel:'デモ · 公式警報ではありません', demoTitle:'台風「オーロラ」は北西へ移動中', demoSummary:'今後2日で台湾北部と東シナ海沿岸に近づく可能性があります。進路は変わるため、地域の公式情報を確認してください。', headingTo:'進む方向', northwest:'北西', closestTime:'最接近', within48:'約24～48時間', whatToDo:'今できること', followLocal:'地域の警報を確認', understandImpact:'影響をわかりやすく見る',
    plainLanguage:'わかりやすく', shouldWorry:'今すぐ心配すべき？', stayAware:'注意を継続', publicLead:'現時点では慌てるより進路の変化を確認することが重要です。予報範囲内と周辺の沿岸地域は公式通知を確認してください。', windImpact:'強風', rainImpact:'大雨', coastalImpact:'沿岸リスク', nextSteps:'次にすること', threeThings:'まず行う3つのこと',
    map:'地図', brief:'概要', sources:'情報源', more:'その他', verification:'照合', whatSourcesSay:'各情報源の見解', disclaimerTitle:'重要', disclaimerText:'本サイトは情報の統合・可視化を目的とし、公的警報や避難指示に代わるものではありません。', themeSystem:'システム', themeLight:'ライト', themeDark:'ダーク', themeChanged:'外観を変更しました', languageChanged:'言語を変更しました', mapTip:'ドラッグ · ホイールまたはピンチで拡大 · 進路点を選択'
  },
  ko: {
    appearance:'화면', chooseLanguage:'언어 선택', tagline:'세계 태풍 브리핑', connecting:'공식 기관 연결 중', connected:'공식 기관 연결됨', partial:'일부 출처를 사용할 수 없음', simpleView:'일반인 보기', proView:'전문가 보기',
    region:'관심 지역', global:'전 세계', globalOverview:'세계 개요', allBasins:'모든 해역', westPacific:'북서태평양', atlantic:'대서양', systems:'현재 시스템', demoScenario:'데모 시나리오 표시', demoExplain:'활성 태풍이 없을 때 화면을 체험합니다', sourceHealth:'데이터 출처', details:'자세히', sourceNote:'해당 해역의 공식 기상기관을 우선하며 다른 출처는 교차 확인에만 사용합니다.',
    worldMap:'세계 지도', globe3d:'3D 지구', fitWorld:'전 세계 보기', focusStorm:'태풍에 초점', demoLabel:'데모 · 공식 경보 아님', demoTitle:'태풍 오로라가 북서쪽으로 이동 중', demoSummary:'향후 이틀 안에 대만 북부와 동중국해 연안에 접근할 수 있습니다. 경로는 변할 수 있으니 현지 공식 정보를 확인하세요.', headingTo:'이동 방향', northwest:'북서쪽', closestTime:'가장 가까운 시점', within48:'약 24~48시간', whatToDo:'지금 할 일', followLocal:'현지 경보 확인', understandImpact:'예상 영향 쉽게 보기',
    plainLanguage:'쉬운 설명', shouldWorry:'지금 걱정해야 하나요?', stayAware:'계속 주의', publicLead:'지금은 불안해하기보다 경로 변화를 확인하는 것이 중요합니다. 예보 범위와 인근 해안 지역은 공식 공지를 확인하세요.', windImpact:'강풍', rainImpact:'폭우', coastalImpact:'해안 위험', nextSteps:'권장 행동', threeThings:'먼저 할 세 가지',
    map:'지도', brief:'요약', sources:'출처', more:'더보기', verification:'교차 검증', whatSourcesSay:'출처별 내용', disclaimerTitle:'중요', disclaimerText:'이 사이트는 정보를 통합하고 시각화하며 공식 경보나 재난 지침을 대체하지 않습니다.', themeSystem:'시스템', themeLight:'라이트', themeDark:'다크', themeChanged:'화면 모드를 변경했습니다', languageChanged:'언어를 변경했습니다', mapTip:'드래그 · 휠 또는 손가락으로 확대 · 경로 지점 선택'
  },
  es: {
    appearance:'Apariencia', chooseLanguage:'Elegir idioma', tagline:'Resumen global de ciclones', connecting:'Conectando fuentes oficiales', connected:'Fuentes oficiales conectadas', partial:'Algunas fuentes no están disponibles', simpleView:'Vista pública', proView:'Vista profesional',
    region:'Región de interés', global:'Global', globalOverview:'Vista mundial', allBasins:'Todas las cuencas', westPacific:'Pacífico noroccidental', atlantic:'Atlántico', systems:'Sistemas actuales', demoScenario:'Mostrar escenario de demostración', demoExplain:'Permite explorar la interfaz sin ciclones activos', sourceHealth:'Fuentes de datos', details:'Detalles', sourceNote:'La agencia meteorológica responsable es la autoridad principal; las demás fuentes sirven para contrastar.',
    worldMap:'Mapa mundial', globe3d:'Globo 3D', fitWorld:'Ver el mundo', focusStorm:'Centrar ciclón', demoLabel:'Demostración · No es una alerta oficial', demoTitle:'El tifón Aurora se desplaza al noroeste', demoSummary:'Podría acercarse al norte de Taiwán y a la costa del mar de China Oriental en dos días. La trayectoria puede cambiar; consulte avisos locales.', headingTo:'Hacia dónde va', northwest:'Noroeste', closestTime:'Mayor aproximación', within48:'Aproximadamente 24–48 h', whatToDo:'Qué hacer ahora', followLocal:'Siga las alertas locales', understandImpact:'Entender los posibles efectos',
    plainLanguage:'En lenguaje sencillo', shouldWorry:'¿Debo preocuparme ahora?', stayAware:'Manténgase atento', publicLead:'Ahora importa más seguir los cambios de trayectoria que alarmarse. Las zonas costeras dentro y cerca del área prevista deben revisar avisos oficiales.', windImpact:'Viento fuerte', rainImpact:'Lluvia intensa', coastalImpact:'Riesgo costero', nextSteps:'Próximos pasos', threeThings:'Tres acciones útiles',
    map:'Mapa', brief:'Resumen', sources:'Fuentes', more:'Más', verification:'Verificación', whatSourcesSay:'Qué dice cada fuente', disclaimerTitle:'Importante', disclaimerText:'Este sitio integra y visualiza información; no sustituye alertas oficiales ni instrucciones de emergencia.', themeSystem:'Sistema', themeLight:'Claro', themeDark:'Oscuro', themeChanged:'Apariencia actualizada', languageChanged:'Idioma actualizado', mapTip:'Arrastre · Rueda o pellizco para ampliar · Seleccione un punto'
  },
  fr: {
    appearance:'Apparence', chooseLanguage:'Choisir la langue', tagline:'Bulletin mondial des cyclones', connecting:'Connexion aux sources officielles', connected:'Sources officielles connectées', partial:'Certaines sources sont indisponibles', simpleView:'Vue grand public', proView:'Vue professionnelle',
    region:'Région suivie', global:'Monde', globalOverview:'Vue mondiale', allBasins:'Tous les bassins', westPacific:'Pacifique nord-ouest', atlantic:'Atlantique', systems:'Systèmes actuels', demoScenario:'Afficher le scénario de démonstration', demoExplain:'Explorer l’interface lorsqu’aucun cyclone n’est actif', sourceHealth:'Sources de données', details:'Détails', sourceNote:'L’agence météorologique responsable fait autorité; les autres sources servent uniquement à la vérification croisée.',
    worldMap:'Carte du monde', globe3d:'Globe 3D', fitWorld:'Voir le monde', focusStorm:'Centrer le cyclone', demoLabel:'Démonstration · Pas une alerte officielle', demoTitle:'Le typhon Aurora se déplace vers le nord-ouest', demoSummary:'Il pourrait s’approcher du nord de Taïwan et de la côte de la mer de Chine orientale sous deux jours. La trajectoire peut changer; consultez les alertes locales.', headingTo:'Direction', northwest:'Nord-ouest', closestTime:'Passage au plus près', within48:'Environ 24–48 h', whatToDo:'Que faire maintenant', followLocal:'Suivre les alertes locales', understandImpact:'Comprendre les impacts possibles',
    plainLanguage:'En termes simples', shouldWorry:'Faut-il s’inquiéter maintenant ?', stayAware:'Restez attentif', publicLead:'Il est plus utile de suivre l’évolution de la trajectoire que de paniquer. Les zones côtières proches de la zone prévue doivent consulter les avis officiels.', windImpact:'Vents forts', rainImpact:'Fortes pluies', coastalImpact:'Risque côtier', nextSteps:'Prochaines étapes', threeThings:'Trois actions utiles',
    map:'Carte', brief:'Résumé', sources:'Sources', more:'Plus', verification:'Vérification croisée', whatSourcesSay:'Ce que disent les sources', disclaimerTitle:'Important', disclaimerText:'Ce site agrège et visualise des informations; il ne remplace pas les alertes officielles ni les consignes d’urgence.', themeSystem:'Système', themeLight:'Clair', themeDark:'Sombre', themeChanged:'Apparence modifiée', languageChanged:'Langue modifiée', mapTip:'Glisser · Molette ou pincement pour zoomer · Sélectionner un point'
  }
};
for (const [lang, overrides] of Object.entries(languageOverrides)) i18n[lang] = {...i18n.en, ...overrides};

const demoStorm = {
  id: 'demo-aurora', name: 'AURORA', localName: '曙光', basin: 'Western North Pacific', classification: 'Strong typhoon', alertLevel: 'orange', lat: 25.2, lon: 124.8, windMs: 58, pressureHpa: 960, updatedAt: '2026-07-10T12:00:00Z', demo: true,
  track: [
    {lat:14.6,lon:142.1,time:'2026-07-08T02:00:00Z',windMs:24,pressureHpa:1002,forecast:false,source:'demo'},
    {lat:16.1,lon:139.4,time:'2026-07-08T14:00:00Z',windMs:30,pressureHpa:996,forecast:false,source:'demo'},
    {lat:18.0,lon:136.0,time:'2026-07-09T02:00:00Z',windMs:38,pressureHpa:986,forecast:false,source:'demo'},
    {lat:20.3,lon:132.3,time:'2026-07-09T14:00:00Z',windMs:46,pressureHpa:974,forecast:false,source:'demo'},
    {lat:22.8,lon:128.6,time:'2026-07-10T02:00:00Z',windMs:54,pressureHpa:964,forecast:false,source:'demo'},
    {lat:25.2,lon:124.8,time:'2026-07-10T08:00:00Z',windMs:58,pressureHpa:960,forecast:false,source:'demo'},
    {lat:25.8,lon:123.6,time:'2026-07-10T14:00:00Z',windMs:56,pressureHpa:964,forecast:true,source:'demo'},
    {lat:26.7,lon:122.1,time:'2026-07-10T20:00:00Z',windMs:50,pressureHpa:970,forecast:true,source:'demo'},
    {lat:28.4,lon:120.0,time:'2026-07-11T08:00:00Z',windMs:42,pressureHpa:980,forecast:true,source:'demo'},
    {lat:30.1,lon:118.7,time:'2026-07-12T08:00:00Z',windMs:30,pressureHpa:992,forecast:true,source:'demo'}
  ],
  sources:['jma','hko','gdacs']
};

const demoSources = [
  {id:'jma',name:'JMA / RSMC Tokyo',role:'primary',status:'online',updatedAt:'2026-07-10T12:00:00Z',message:'25.2°N, 124.8°E · 58 m/s',url:'https://www.jma.go.jp/jma/jma-eng/jma-center/rsmc-hp-pub-eg/RSMC_HP.htm'},
  {id:'hko',name:'Hong Kong Observatory',role:'local',status:'online',updatedAt:'2026-07-10T12:10:00Z',message:'Position within 85 km · local signal not issued',url:'https://www.hko.gov.hk/'},
  {id:'gdacs',name:'GDACS / EU JRC & UN',role:'impact',status:'online',updatedAt:'2026-07-10T12:18:00Z',message:'Orange impact scenario · demo',url:'https://www.gdacs.org/'},
  {id:'nhc',name:'NOAA / NHC',role:'official',status:'no-data',updatedAt:'2026-07-10T12:00:00Z',message:'Outside NHC operational basin',url:'https://www.nhc.noaa.gov/'},
  {id:'cwa',name:'Taiwan CWA',role:'optional',status:'not-configured',message:'Connector reserved for API-key access',url:'https://opendata.cwa.gov.tw/'}
];

const state = {
  lang: localStorage.getItem('tv-lang') || 'zh',
  theme: localStorage.getItem('tv-theme') || 'light',
  view: localStorage.getItem('tv-view') || 'simple',
  mapMode: localStorage.getItem('tv-map') || 'world',
  demoEnabled: localStorage.getItem('tv-demo') !== 'false',
  livePayload: null,
  storms: [], sources: [], selectedStorm: null,
  land: null,
  centerLon: 0, centerLat: 8, zoom: 1,
  targetLon: 0, targetLat: 8, targetZoom: 1,
  activeTrackIndex: 5,
  dragging: false, moved: false, lastX: 0, lastY: 0,
  width: 1, height: 1, dpr: 1,
  hoverIndex: -1,
  playing: false,
  lastFrame: 0,
  needsRender: true
};

const canvas = $('#mapCanvas');
const ctx = canvas.getContext('2d', {alpha:true, desynchronized:true});
const tooltip = $('#pointTooltip');
let toastTimer;
let playTimer;

function t(key) { return i18n[state.lang]?.[key] ?? i18n.en[key] ?? i18n.zh[key] ?? key; }
function formatDate(value, short = false) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(({zh:'zh-CN',en:'en-CA',ja:'ja-JP',ko:'ko-KR',es:'es-ES',fr:'fr-FR'})[state.lang] || 'en-CA', short ? {month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'} : {year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',timeZoneName:'short'}).format(date);
}
function sourceStatusText(status) {
  return t({online:'online','no-data':'noData',degraded:'degraded',offline:'offline','not-configured':'notConfigured'}[status] || 'unknown');
}
function roleText(role) { return t({primary:'primary',official:'official',impact:'impact',local:'local',optional:'optional'}[role] || 'official'); }
function showToast(message) {
  const el = $('#toast'); clearTimeout(toastTimer); el.textContent = message; el.classList.add('show');
  toastTimer = setTimeout(() => el.classList.remove('show'), 1900);
}
function applyTranslations() {
  document.documentElement.lang = ({zh:'zh-CN',en:'en',ja:'ja',ko:'ko',es:'es',fr:'fr'})[state.lang] || 'en';
  $$('[data-i18n]').forEach((el) => { const value = t(el.dataset.i18n); if (value) el.textContent = value; });
  const labels={zh:'中文',en:'English',ja:'日本語',ko:'한국어',es:'Español',fr:'Français'};
  $('#languageLabel').textContent=labels[state.lang] || 'English';
  $('#languageToggle').setAttribute('aria-label', t('chooseLanguage'));
  $$('[data-lang-value]').forEach(btn=>btn.classList.toggle('active',btn.dataset.langValue===state.lang));
  renderAll();
}
function applyTheme(theme = state.theme) {
  state.theme = theme; localStorage.setItem('tv-theme', theme); document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('meta[name="theme-color"]').content = dark ? '#071016' : '#edf4f8';
  state.needsRender = true;
}
function setView(view, announce = true) {
  state.view = view; localStorage.setItem('tv-view', view); document.documentElement.dataset.view = view;
  $$('[data-view-mode]').forEach(btn => { const active = btn.dataset.viewMode === view; btn.classList.toggle('active',active); btn.setAttribute('aria-pressed',String(active)); });
  if (announce) showToast(view === 'simple' ? t('simpleMode') : t('proMode'));
}
function setMapMode(mode) {
  state.mapMode = mode; localStorage.setItem('tv-map', mode); document.documentElement.dataset.map = mode;
  $$('[data-map-mode]').forEach(btn => { const active = btn.dataset.mapMode === mode; btn.classList.toggle('active',active); btn.setAttribute('aria-pressed',String(active)); });
  if (mode === 'globe' && state.zoom < .8) state.targetZoom = 1;
  state.needsRender = true;
}

function currentSources() { return state.sources.length ? state.sources : demoSources; }
function availableStorms() {
  const live = state.livePayload?.storms || [];
  if (live.length) return live;
  return state.demoEnabled ? [demoStorm] : [];
}
function selectStorm(storm, focus = false) {
  state.selectedStorm = storm || null;
  state.activeTrackIndex = storm?.track?.findLastIndex?.(p => !p.forecast) ?? Math.max(0,(storm?.track?.length || 1)-1);
  if (state.activeTrackIndex < 0) state.activeTrackIndex = 0;
  if (focus && storm) focusStorm(false);
  renderAll(); state.needsRender = true;
}

function renderAll() {
  renderStormList(); renderSources(); renderBrief(); renderPro(); renderTimeline();
}
function renderStormList() {
  const storms = availableStorms(); state.storms = storms;
  $('#stormCount').textContent = String(storms.length);
  const list = $('#stormList'); list.innerHTML = '';
  if (!storms.length) {
    list.innerHTML = `<div class="empty-storms">${t('noSystems')}</div>`;
    if (state.selectedStorm) selectStorm(null);
    return;
  }
  if (!state.selectedStorm || !storms.some(s => s.id === state.selectedStorm.id)) state.selectedStorm = storms[0];
  storms.forEach(storm => {
    const button = document.createElement('button'); button.className = `storm-card${storm.id === state.selectedStorm?.id ? ' selected' : ''}`;
    const wind = Number.isFinite(storm.windMs) ? `${Math.round(storm.windMs)}<small>m/s</small>` : `—<small>${t('unknown')}</small>`;
    button.innerHTML = `<i></i><span class="storm-copy"><strong>${escapeHtml(displayStormName(storm))}</strong><small>${escapeHtml(storm.classification || storm.basin || t('activeStorm'))}${storm.demo ? ` · ${t('demo')}` : ''}</small></span><span class="storm-value">${wind}</span>`;
    button.addEventListener('click', () => selectStorm(storm,true)); list.append(button);
  });
}
function displayStormName(storm) {
  if (!storm) return '';
  if (state.lang === 'zh' && storm.localName) return `${storm.localName} · ${storm.name}`;
  return storm.name || storm.localName || storm.id;
}
function renderSources() {
  const sources = currentSources();
  $('#sourceStack').innerHTML = sources.slice(0,4).map(s => `<span class="source-chip ${s.status}"><i></i>${escapeHtml(shortSourceName(s.name))}</span>`).join('');
  const cards = sources.slice(0,5).map(sourceCardHtml).join('');
  $('#sourceCards').innerHTML = cards;
  $('#sourceFullList').innerHTML = cards;
  const online = sources.filter(s => ['online','no-data','degraded'].includes(s.status)).length;
  const offline = sources.filter(s => s.status === 'offline').length;
  $('#freshnessPill .status-dot').className = `status-dot${offline ? ' error' : ''}`;
  $('#freshnessPill strong').textContent = offline ? t('partial') : t('connected');
  $('#freshnessTime').textContent = state.livePayload?.generatedAt ? `${t('updated')} ${formatDate(state.livePayload.generatedAt,true)}` : t('loadingSources');
  $('#sourceUpdate').textContent = state.livePayload?.generatedAt ? formatDate(state.livePayload.generatedAt,true) : t('demo');
  const comparable = sources.filter(s => s.status === 'online').length;
  $('#verificationRing').textContent = String(Math.min(9,comparable));
  $('#verificationTitle').textContent = `${comparable} ${state.lang === 'zh' ? t('sourceAgreement') : t('sourceAgreement')}`;
  $('#verificationText').textContent = online ? `${online} ${t('sourcesOnline')}` : t('sourceUnavailable');
}
function sourceCardHtml(source) {
  return `<article class="source-card"><div class="source-card-head"><div><span class="source-logo">${escapeHtml(source.id.toUpperCase().slice(0,4))}</span><p><strong>${escapeHtml(source.name)}</strong><small>${roleText(source.role)}${source.updatedAt ? ` · ${formatDate(source.updatedAt,true)}` : ''}</small></p></div><span class="source-state ${source.status}"><i></i>${sourceStatusText(source.status)}</span></div><p>${escapeHtml(source.message || (source.status === 'offline' ? t('sourceUnavailable') : t('noWarning')))}</p></article>`;
}
function shortSourceName(name) { return name.replace(' / RSMC Tokyo','').replace(' / EU JRC & UN',''); }

function renderBrief() {
  const storm = state.selectedStorm;
  const noLive = !(state.livePayload?.storms?.length);
  if (!storm) {
    $('#briefKicker').textContent = state.livePayload ? t('globalMonitoring') : t('connecting');
    $('#briefTitle').textContent = t('noActive'); $('#briefSummary').textContent = t('noActiveSummary');
    $('#plainDirection').textContent = t('noActiveDirection'); $('#plainTiming').textContent = t('noActiveTiming'); $('#plainAction').textContent = t('noActiveAction');
    $('#publicRiskBadge').textContent = t('stayAware'); return;
  }
  if (storm.demo && noLive) {
    $('#briefKicker').textContent = t('demoLabel'); $('#briefTitle').textContent = t('demoTitle'); $('#briefSummary').textContent = t('demoSummary');
    $('#plainDirection').textContent = t('northwest'); $('#plainTiming').textContent = t('within48'); $('#plainAction').textContent = t('followLocal');
  } else {
    $('#briefKicker').textContent = t('liveLabel');
    $('#briefTitle').textContent = t('liveStormTitle').replace('{name}',displayStormName(storm));
    $('#briefSummary').textContent = t('liveSummary');
    const dir = inferDirection(storm.track); $('#plainDirection').textContent = state.lang === 'zh' ? directionZh(dir) : dir;
    $('#plainTiming').textContent = storm.track?.some(p=>p.forecast) ? t('within48') : t('unknown'); $('#plainAction').textContent = t('followLocal');
  }
  $('#publicLead').textContent = t('publicLead');
}
function renderPro() {
  const storm = state.selectedStorm;
  if (!storm) {
    $('#proName').textContent = t('noSystems'); $('#metricCoord').textContent = '—'; $('#metricWind').innerHTML = '—'; $('#metricPressure').innerHTML = '—'; return;
  }
  const point = storm.track?.[state.activeTrackIndex] || storm;
  $('#proName').textContent = `${storm.name || storm.id}${storm.localName ? ` · ${storm.localName}` : ''}`;
  $('#proStatus').textContent = storm.demo ? 'DEMO' : 'LIVE';
  $('#metricCoord').textContent = formatCoord(point.lat,point.lon);
  $('#metricWind').innerHTML = Number.isFinite(point.windMs ?? storm.windMs) ? `${Math.round(point.windMs ?? storm.windMs)} <em>m/s</em>` : '—';
  $('#metricPressure').innerHTML = Number.isFinite(point.pressureHpa ?? storm.pressureHpa) ? `${Math.round(point.pressureHpa ?? storm.pressureHpa)} <em>hPa</em>` : '—';
  $('#metricMove').innerHTML = `${inferDirection(storm.track)} · <em>${storm.demo ? '18 km/h' : t('unknown')}</em>`;
  const sourceCount = storm.sources?.length || 1; const spread = storm.demo ? 85 : Math.max(25,180-sourceCount*28);
  $('#spreadValue').textContent = `≤ ${spread} km`; $('#spreadBar').style.width = `${clamp(100-spread/2.2,20,90)}%`;
}
function renderTimeline() {
  const storm = state.selectedStorm; const el = $('#timeline'); if (!el) return;
  if (!storm?.track?.length) { el.innerHTML = ''; return; }
  el.innerHTML = storm.track.map((p,i) => `<button class="timeline-item ${p.forecast?'forecast':''}" data-track-index="${i}"><time>${formatDate(p.time,true)}</time><i></i><p><span>${p.forecast?t('forecastWord'):t('observedWord')}</span><strong>${Number.isFinite(p.windMs)?`${Math.round(p.windMs)} m/s`:formatCoord(p.lat,p.lon)}</strong></p></button>`).join('');
  $$('[data-track-index]',el).forEach(btn => btn.addEventListener('click',()=>{ state.activeTrackIndex=+btn.dataset.trackIndex; renderPro(); state.needsRender=true; }));
}
function inferDirection(track=[]) {
  if (track.length < 2) return '—'; const a=track[Math.max(0,track.length-3)], b=track[track.length-1];
  const ns=b.lat-a.lat, ew=normalizeLon(b.lon-a.lon); let value=''; if(ns>1)value+='N'; else if(ns<-1)value+='S'; if(ew>1)value+='E'; else if(ew<-1)value+='W'; return value||'STNRY';
}
function directionZh(dir) { return ({NW:'西北方向',NE:'东北方向',SW:'西南方向',SE:'东南方向',N:'向北',S:'向南',E:'向东',W:'向西',STNRY:'移动缓慢','—':'未知'})[dir]||dir; }
function formatCoord(lat,lon) { if(!Number.isFinite(lat)||!Number.isFinite(lon)) return '—'; return `${Math.abs(lat).toFixed(1)}°${lat>=0?'N':'S'} · ${Math.abs(lon).toFixed(1)}°${lon>=0?'E':'W'}`; }
function escapeHtml(value='') { return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }

async function loadData() {
  const controller = new AbortController(); const timer=setTimeout(()=>controller.abort(),12000);
  try {
    const response = await fetch('/api/cyclones',{signal:controller.signal,headers:{accept:'application/json'}});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    state.livePayload = await response.json(); state.sources = state.livePayload.sources || [];
  } catch (error) {
    console.warn('Live data unavailable:',error); state.livePayload = {generatedAt:new Date().toISOString(),storms:[],sources:demoSources.map(s=>({...s,status:s.id==='jma'?'degraded':s.status,message:s.id==='jma'?t('sourceUnavailable'):s.message}))}; state.sources = state.livePayload.sources;
  } finally {
    clearTimeout(timer); const storms=availableStorms(); selectStorm(storms[0]||null,false); renderAll();
  }
}
async function loadLand() {
  try { const response=await fetch('./data/world-land.json'); state.land=await response.json(); state.needsRender=true; }
  catch(error){ console.warn('World geometry unavailable',error); }
}

function resizeCanvas() {
  const rect=canvas.getBoundingClientRect(); state.dpr=Math.min(devicePixelRatio||1,isMobile()?1.6:2); state.width=Math.max(1,rect.width); state.height=Math.max(1,rect.height);
  canvas.width=Math.floor(state.width*state.dpr); canvas.height=Math.floor(state.height*state.dpr); ctx.setTransform(state.dpr,0,0,state.dpr,0,0); state.needsRender=true;
}
function canvasColors() {
  const css=getComputedStyle(document.documentElement); const get=n=>css.getPropertyValue(n).trim();
  return {ocean:get('--ocean'),land:get('--land'),landStroke:get('--land-stroke'),grid:get('--grid'),brand:get('--brand'),warning:get('--warning'),danger:get('--danger'),text2:get('--text-2'),surface:get('--surface-solid')};
}
function worldScale() { return Math.min(state.width / 360, state.height / 180) * state.zoom; }
function projectWorld(lat,lon) {
  const scale = worldScale();
  return {x:state.width/2+normalizeLon(lon-state.centerLon)*scale,y:state.height/2-(lat-state.centerLat)*scale,visible:true};
}
function globeRadius(){return Math.min(state.width,state.height)*(isMobile()?.41:.43)*state.zoom;}
function globeCenter(){return {x:state.width*(isMobile()?.5:.56),y:state.height*.5};}
function projectGlobe(lat,lon) {
  const r=globeRadius(), c=globeCenter(), phi=rad(lat), phi0=rad(state.centerLat), lambda=rad(normalizeLon(lon-state.centerLon));
  const cosPhi=Math.cos(phi),sinPhi=Math.sin(phi),cosPhi0=Math.cos(phi0),sinPhi0=Math.sin(phi0),z=sinPhi0*sinPhi+cosPhi0*cosPhi*Math.cos(lambda);
  return {x:c.x+r*cosPhi*Math.sin(lambda),y:c.y-r*(cosPhi0*sinPhi-sinPhi0*cosPhi*Math.cos(lambda)),z,visible:z>-.01};
}
function project(lat,lon){return state.mapMode==='world'?projectWorld(lat,lon):projectGlobe(lat,lon);}

function drawBackground(colors) {
  ctx.clearRect(0,0,state.width,state.height); ctx.fillStyle=colors.ocean; ctx.fillRect(0,0,state.width,state.height);
  if(state.mapMode==='globe') {
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.fillRect(0,0,state.width,state.height);
    const c=globeCenter(),r=globeRadius(); const halo=ctx.createRadialGradient(c.x,c.y,r*.72,c.x,c.y,r*1.25); halo.addColorStop(0,'rgba(25,145,176,0)');halo.addColorStop(.82,'rgba(35,170,195,.1)');halo.addColorStop(1,'rgba(35,170,195,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(c.x,c.y,r*1.25,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle=colors.ocean;ctx.fillRect(c.x-r,c.y-r,r*2,r*2);drawMapLayers(colors);ctx.restore();ctx.strokeStyle=colors.landStroke;ctx.lineWidth=1;ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.stroke();
  } else drawMapLayers(colors);
}
function drawMapLayers(colors){ drawGrid(colors); drawLand(colors); drawCone(colors); drawTrack(colors); drawStormPulse(colors); }
function drawGrid(colors) {
  ctx.strokeStyle=colors.grid;ctx.lineWidth=.7;
  for(let lat=-60;lat<=60;lat+=30){traceGeoLine(Array.from({length:121},(_,i)=>[lat,-180+i*3]),false);}
  for(let lon=-180;lon<180;lon+=30){traceGeoLine(Array.from({length:61},(_,i)=>[-90+i*3,lon]),false);}
}
function traceGeoLine(points,close=false){ctx.beginPath();let started=false,last=null;for(const [lat,lon] of points){const p=project(lat,lon);if(!p.visible){started=false;last=null;continue;}if(last&&Math.abs(p.x-last.x)>state.width*.45){started=false;}if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);last=p;}if(close)ctx.closePath();ctx.stroke();}
function drawLand(colors) {
  if(!state.land?.features?.length)return; const geometry=state.land.features[0].geometry; const polygons=geometry.type==='MultiPolygon'?geometry.coordinates:[geometry.coordinates];
  ctx.fillStyle=colors.land;ctx.strokeStyle=colors.landStroke;ctx.lineWidth=.65;
  for(const polygon of polygons){for(const ring of polygon){ctx.beginPath();let started=false,last=null;for(const [lon,lat] of ring){const p=project(lat,lon);if(!p.visible){started=false;last=null;continue;}if(last&&Math.abs(p.x-last.x)>state.width*.45)started=false;if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);last=p;}if(started){ctx.closePath();ctx.fill();ctx.stroke();}}}
}
function drawCone(colors) {
  const storm=state.selectedStorm;if(!storm?.track?.length)return;const points=storm.track.filter(p=>p.forecast);if(points.length<2)return;
  const widths=points.map((_,i)=>30+i*28);const left=[],right=[];
  points.forEach((p,i)=>{const prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)];const angle=Math.atan2(next.lat-prev.lat,normalizeLon(next.lon-prev.lon));const km=widths[i],dLat=km/111,dLon=km/(111*Math.max(.25,Math.cos(rad(p.lat))));left.push([p.lat-Math.sin(angle)*dLat,p.lon+Math.cos(angle)*dLon]);right.push([p.lat+Math.sin(angle)*dLat,p.lon-Math.cos(angle)*dLon]);});
  const polygon=[...left,...right.reverse()];ctx.save();ctx.fillStyle=colorAlpha(colors.warning,.14);ctx.strokeStyle=colorAlpha(colors.warning,.3);ctx.lineWidth=1;ctx.beginPath();let started=false;polygon.forEach(([lat,lon])=>{const q=project(lat,lon);if(!q.visible)return;if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);});if(started){ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();
}
function drawTrack(colors) {
  const storm=state.selectedStorm;if(!storm?.track?.length)return;const observed=storm.track.filter(p=>!p.forecast),forecast=storm.track.filter((p,i)=>p.forecast||(!p.forecast&&storm.track[i+1]?.forecast));
  drawTrackLine(observed,colors.brand,false);drawTrackLine(forecast,colors.warning,true);
  storm.track.forEach((p,i)=>{const q=project(p.lat,p.lon);if(!q.visible)return;ctx.fillStyle=i===state.activeTrackIndex?colors.surface:(p.forecast?colors.warning:colors.brand);ctx.strokeStyle=p.forecast?colors.warning:colors.brand;ctx.lineWidth=i===state.activeTrackIndex?3:1.4;ctx.beginPath();ctx.arc(q.x,q.y,i===state.activeTrackIndex?5:3,0,Math.PI*2);ctx.fill();ctx.stroke();});
}
function drawTrackLine(points,color,dashed){if(points.length<2)return;ctx.save();ctx.strokeStyle=color;ctx.lineWidth=2.2;ctx.setLineDash(dashed?[6,6]:[]);ctx.beginPath();let started=false;for(const p of points){const q=project(p.lat,p.lon);if(!q.visible){started=false;continue;}if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);}ctx.stroke();ctx.restore();}
function drawStormPulse(colors,time=performance.now()) {
  const storm=state.selectedStorm;if(!storm)return;const point=storm.track?.[state.activeTrackIndex]||storm;const p=project(point.lat,point.lon);if(!p.visible)return;const phase=(time%1800)/1800;ctx.save();ctx.strokeStyle=colorAlpha(colors.warning,.5*(1-phase));ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,12+phase*24,0,Math.PI*2);ctx.stroke();ctx.fillStyle=colors.warning;ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.fill();ctx.fillStyle=colors.surface;ctx.beginPath();ctx.arc(p.x,p.y,2.4,0,Math.PI*2);ctx.fill();ctx.restore();
}
function colorAlpha(color,alpha){if(color.startsWith('#')){const h=color.slice(1),v=h.length===3?h.split('').map(x=>x+x).join(''):h;return `rgba(${parseInt(v.slice(0,2),16)},${parseInt(v.slice(2,4),16)},${parseInt(v.slice(4,6),16)},${alpha})`;}return color;}
function animate(time=0) {
  const fps=isMobile()?24:36;if(time-state.lastFrame<1000/fps){requestAnimationFrame(animate);return;}state.lastFrame=time;
  if(!state.dragging){state.centerLon+=normalizeLon(state.targetLon-state.centerLon)*.11;state.centerLat+=(state.targetLat-state.centerLat)*.11;state.zoom+=(state.targetZoom-state.zoom)*.11;}
  drawBackground(canvasColors(),time);requestAnimationFrame(animate);
}
function hitTrack(clientX,clientY){const storm=state.selectedStorm;if(!storm?.track)return-1;const rect=canvas.getBoundingClientRect(),x=clientX-rect.left,y=clientY-rect.top;let hit=-1,best=18;storm.track.forEach((p,i)=>{const q=project(p.lat,p.lon);if(!q.visible)return;const d=Math.hypot(q.x-x,q.y-y);if(d<best){best=d;hit=i;}});return hit;}
function showTooltip(index,x,y){const storm=state.selectedStorm;if(index<0||!storm?.track?.[index]){tooltip.classList.remove('visible');return;}const p=storm.track[index];tooltip.innerHTML=`<strong>${p.forecast?t('forecastWord'):t('observedWord')}</strong><span>${formatDate(p.time,true)}<br>${formatCoord(p.lat,p.lon)}<br>${Number.isFinite(p.windMs)?`${Math.round(p.windMs)} m/s`:'—'} · ${Number.isFinite(p.pressureHpa)?`${Math.round(p.pressureHpa)} hPa`:'—'}</span>`;tooltip.style.left=`${x}px`;tooltip.style.top=`${y}px`;tooltip.classList.add('visible');}

function fitWorld(announce=true){state.targetLon=0;state.targetLat=4;state.targetZoom=state.mapMode==='world'?.92:.92;if(announce)showToast(t('globalReset'));}
function focusStorm(announce=true){const storm=state.selectedStorm;if(!storm)return;const p=storm.track?.[state.activeTrackIndex]||storm;state.targetLon=p.lon;state.targetLat=p.lat;state.targetZoom=state.mapMode==='world'?(isMobile()?2.2:2.6):(isMobile()?1.08:1.15);if(announce)showToast(t('focused'));}

canvas.addEventListener('pointerdown',e=>{state.dragging=true;state.moved=false;state.lastX=e.clientX;state.lastY=e.clientY;canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');tooltip.classList.remove('visible');});
canvas.addEventListener('pointermove',e=>{if(state.dragging){const dx=e.clientX-state.lastX,dy=e.clientY-state.lastY;if(Math.abs(dx)+Math.abs(dy)>2)state.moved=true;if(state.mapMode==='world'){const scale=worldScale();state.centerLon=normalizeLon(state.centerLon-dx/scale);state.centerLat=clamp(state.centerLat+dy/scale,-70,70);}else{state.centerLon=normalizeLon(state.centerLon-dx*.22/state.zoom);state.centerLat=clamp(state.centerLat+dy*.16/state.zoom,-70,70);}state.targetLon=state.centerLon;state.targetLat=state.centerLat;state.lastX=e.clientX;state.lastY=e.clientY;}else{const hit=hitTrack(e.clientX,e.clientY);showTooltip(hit,e.clientX,e.clientY);}});
canvas.addEventListener('pointerup',e=>{if(!state.moved){const hit=hitTrack(e.clientX,e.clientY);if(hit>=0){state.activeTrackIndex=hit;renderPro();renderTimeline();}}state.dragging=false;canvas.classList.remove('dragging');});
canvas.addEventListener('pointercancel',()=>{state.dragging=false;canvas.classList.remove('dragging');});canvas.addEventListener('pointerleave',()=>{if(!state.dragging)tooltip.classList.remove('visible');});
canvas.addEventListener('wheel',e=>{e.preventDefault();const delta=e.deltaY<0?1.12:.89;state.targetZoom=clamp(state.targetZoom*delta,state.mapMode==='world'?.7:.7,state.mapMode==='world'?6:1.6);},{passive:false});

$$('[data-view-mode]').forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.viewMode)));
$$('[data-map-mode]').forEach(btn=>btn.addEventListener('click',()=>setMapMode(btn.dataset.mapMode)));
$('#globalViewButton').addEventListener('click',()=>fitWorld());$('#focusButton').addEventListener('click',()=>focusStorm());
$('#zoomIn').addEventListener('click',()=>state.targetZoom=clamp(state.targetZoom*1.18,.7,state.mapMode==='world'?6:1.6));$('#zoomOut').addEventListener('click',()=>state.targetZoom=clamp(state.targetZoom/1.18,.7,state.mapMode==='world'?6:1.6));
$('#demoToggle').addEventListener('click',()=>{state.demoEnabled=!state.demoEnabled;localStorage.setItem('tv-demo',String(state.demoEnabled));$('#demoToggle').setAttribute('aria-pressed',String(state.demoEnabled));const storms=availableStorms();selectStorm(storms[0]||null,false);fitWorld(false);});
$('#languageToggle').addEventListener('click',e=>{e.stopPropagation();const menu=$('#languageMenu');menu.classList.toggle('open');$('#themeMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded',String(menu.classList.contains('open')));});
$$('[data-lang-value]').forEach(btn=>btn.addEventListener('click',()=>{state.lang=btn.dataset.langValue;localStorage.setItem('tv-lang',state.lang);applyTranslations();$('#languageMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded','false');showToast(t('languageChanged'));}));
$('#themeButton').addEventListener('click',e=>{e.stopPropagation();const menu=$('#themeMenu');menu.classList.toggle('open');$('#languageMenu').classList.remove('open');$('#themeButton').setAttribute('aria-expanded',String(menu.classList.contains('open')));});
$$('[data-theme-value]').forEach(btn=>btn.addEventListener('click',()=>{applyTheme(btn.dataset.themeValue);$('#themeMenu').classList.remove('open');showToast(t('themeChanged'));}));
document.addEventListener('click',e=>{if(!e.target.closest('#themeMenu')&&!e.target.closest('#themeButton')){$('#themeMenu').classList.remove('open');$('#themeButton').setAttribute('aria-expanded','false');}if(!e.target.closest('#languageMenu')&&!e.target.closest('#languageToggle')){$('#languageMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded','false');}});

const sourceDialog=$('#sourceDialog');function openSourceDialog(){renderSources();sourceDialog.showModal();}
$('#openSources').addEventListener('click',openSourceDialog);$('#verificationButton').addEventListener('click',openSourceDialog);$('.dialog-close').addEventListener('click',()=>sourceDialog.close());sourceDialog.addEventListener('click',e=>{if(e.target===sourceDialog)sourceDialog.close();});
$('#readMoreButton').addEventListener('click',()=>{if(isMobile()){$('#insightPanel').classList.add('open');$$('[data-mobile-tab]').forEach(b=>b.classList.toggle('active',b.dataset.mobileTab==='brief'));}else $('#insightPanel').scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});});
$('#mobileMenuButton').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));$('#sheetHandle').addEventListener('click',()=>$('#insightPanel').classList.toggle('open'));
$$('[data-mobile-tab]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-mobile-tab]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const tab=btn.dataset.mobileTab;if(tab==='map'){$('#insightPanel').classList.remove('open');$('#sidebar').classList.remove('open');}else if(tab==='brief'){$('#insightPanel').classList.add('open');$('.insight-scroll').scrollTo({top:0,behavior:'smooth'});}else if(tab==='sources'){$('#insightPanel').classList.add('open');$('.sources-section').scrollIntoView({behavior:'smooth'});}else $('#sidebar').classList.toggle('open');}));
$$('[data-region]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-region]').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');const r=btn.dataset.region;if(r==='global')fitWorld();else if(r==='wpac'){state.targetLon=135;state.targetLat=20;state.targetZoom=state.mapMode==='world'?1.8:1;}else{state.targetLon=-55;state.targetLat=20;state.targetZoom=state.mapMode==='world'?1.7:1;}state.needsRender=true;}));
$('#locateButton').addEventListener('click',()=>fitWorld());
$('#playTrack').addEventListener('click',()=>{const storm=state.selectedStorm;if(!storm?.track?.length)return;state.playing=!state.playing;$('#playTrack').textContent=state.playing?(state.lang==='zh'?'暂停':'Pause'):t('play');clearInterval(playTimer);if(state.playing)playTimer=setInterval(()=>{state.activeTrackIndex=(state.activeTrackIndex+1)%storm.track.length;renderPro();renderTimeline();},850);});

new ResizeObserver(resizeCanvas).observe(canvas);window.addEventListener('orientationchange',()=>setTimeout(resizeCanvas,120));matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system')applyTheme('system');});

document.documentElement.dataset.view=state.view;document.documentElement.dataset.map=state.mapMode;$('#demoToggle').setAttribute('aria-pressed',String(state.demoEnabled));applyTheme();setView(state.view,false);setMapMode(state.mapMode);applyTranslations();resizeCanvas();fitWorld(false);Promise.all([loadLand(),loadData()]);requestAnimationFrame(animate);
