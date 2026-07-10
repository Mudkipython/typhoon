const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rad = (value) => value * Math.PI / 180;
const normalizeLon = (value) => ((value + 540) % 360) - 180;
const isMobile = () => innerWidth <= 760;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const i18n = {
  zh: {
    skip:'跳到地图', chooseLanguage:'选择语言', appearance:'外观', tagline:'全球热带气旋简报', connecting:'正在连接权威来源', connected:'权威来源已连接', partial:'部分来源暂不可用', simpleView:'公众视图', proView:'专业视图',
    region:'关注区域', global:'全球', globalOverview:'全球概览', allBasins:'所有海域', westPacific:'西北太平洋', atlantic:'大西洋', systems:'当前系统', demoScenario:'显示演示情景', demoExplain:'无活跃台风时用于体验界面', sourceHealth:'数据来源', details:'详情', sourceNote:'主预报以所属海域的官方气象机构为准，其他来源只作交叉验证。',
    worldMap:'世界地图', globe3d:'3D 地球', fitWorld:'查看全球', focusStorm:'聚焦台风', demoLabel:'演示情景 · 非官方预警', demoTitle:'台风“曙光”正在向西北移动', demoSummary:'未来两天可能靠近台湾北部与东海沿岸。路径仍会变化，应关注当地气象部门后续更新。', headingTo:'往哪里走', northwest:'西北方向', closestTime:'何时最接近', within48:'约 24–48 小时', whatToDo:'现在怎么做', followLocal:'留意当地预警', understandImpact:'看懂可能影响', trackUnavailable:'当前官方数据只提供中心位置，完整路径暂不可用',
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
    skip:'Skip to map', chooseLanguage:'Choose language', appearance:'Appearance', tagline:'Global Tropical Cyclone Brief', connecting:'Connecting official sources', connected:'Official sources connected', partial:'Some sources are unavailable', simpleView:'Public view', proView:'Professional view',
    region:'Watch region', global:'Global', globalOverview:'Global overview', allBasins:'All basins', westPacific:'Western Pacific', atlantic:'Atlantic', systems:'Current systems', demoScenario:'Show demo scenario', demoExplain:'Explore the interface when no storm is active', sourceHealth:'Data sources', details:'Details', sourceNote:'The responsible meteorological agency remains authoritative; other sources are used only for cross-checking.',
    worldMap:'World map', globe3d:'3D globe', fitWorld:'View world', focusStorm:'Focus storm', demoLabel:'Demo scenario · Not an official warning', demoTitle:'Typhoon Aurora is moving northwest', demoSummary:'It may approach northern Taiwan and the East China Sea coast within two days. The track can still change; follow local meteorological updates.', headingTo:'Where it is going', northwest:'Northwest', closestTime:'Closest approach', within48:'About 24–48 hours', whatToDo:'What to do now', followLocal:'Follow local alerts', understandImpact:'Understand impacts', trackUnavailable:'The official feed currently provides only the storm centre; a full track is not available.',
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
    worldMap:'Carte du monde', globe3d:'Globe 3D', fitWorld:'Voir le monde', focusStorm:'Centrer le cyclone', demoLabel:'Démonstration · Pas une alerte officielle', demoTitle:'Le typhon Aurora se déplace vers le nord-ouest', demoSummary:'Il pourrait s’approcher du nord de Taïwan et de la côte de la mer de Chine orientale sous deux jours. La trajectoire peut changer; consultez les alertes locales.', headingTo:'Direction', northwest:'Nord-ouest', closestTime:'Passage au plus près', within48:'Environ 24–48 h', whatToDo:'Que faire maintenant', followLocal:'Suivre les alertes locales', understandImpact:'Comprendre les impacts possibles', trackUnavailable:'La source officielle ne fournit actuellement que la position du centre.',
    plainLanguage:'En termes simples', shouldWorry:'Faut-il s’inquiéter maintenant ?', stayAware:'Restez attentif', publicLead:'Il est plus utile de suivre l’évolution de la trajectoire que de paniquer. Les zones côtières proches de la zone prévue doivent consulter les avis officiels.', windImpact:'Vents forts', rainImpact:'Fortes pluies', coastalImpact:'Risque côtier', nextSteps:'Prochaines étapes', threeThings:'Trois actions utiles',
    map:'Carte', brief:'Résumé', sources:'Sources', more:'Plus', verification:'Vérification croisée', whatSourcesSay:'Ce que disent les sources', disclaimerTitle:'Important', disclaimerText:'Ce site agrège et visualise des informations; il ne remplace pas les alertes officielles ni les consignes d’urgence.', themeSystem:'Système', themeLight:'Clair', themeDark:'Sombre', themeChanged:'Apparence modifiée', languageChanged:'Langue modifiée', mapTip:'Glisser · Molette ou pincement pour zoomer · Sélectionner un point'
  }
};
for (const [lang, overrides] of Object.entries(languageOverrides)) i18n[lang] = {...i18n.en, ...overrides};


Object.assign(i18n.zh, {
  yourLocationImpact:'与你的位置', locationPromptShort:'定位后查看何时可能受影响', locationPrivacyShort:'位置只保存在这台设备上', useMyLocation:'使用我的位置',
  personalMode:'个人影响模式', whenAffectMe:'什么时候可能波及我？', locationNeeded:'需要定位', personalIntro:'授权浏览器定位，或直接在地图上点选位置。系统会计算与预测路径的最近距离和可能影响时间窗。',
  browserLocation:'由浏览器请求定位权限', pickOnMap:'在地图上点选', pickOnMapHint:'适合拒绝定位或查看其他地点', clearLocation:'清除位置', clearLocationHint:'删除本机保存的位置', locationPrivacy:'位置仅在你的浏览器中计算和保存，不会上传到本站服务器。',
  distanceToTrack:'距预测路径最近', closestApproach:'预计最接近', possibleWindow:'可能影响时段', estimateConfidence:'估算可信度', chooseProfile:'选择你的活动画像', profileAdviceTitle:'建议会随场景变化', profileHint:'可随时切换',
  profileCommute:'通勤上班', profileOutdoor:'户外运动', profileOffice:'室内办公', profileDriving:'驾车出行', profileFamily:'老人儿童照护', profileCoastal:'沿海居住',
  estimateOnly:'这是路径距离估算，不是到达时间预报', estimateNote:'影响范围取决于台风大小、地形、降雨和当地预警。任何疏散、停课、停工或交通决定都以当地政府和气象部门为准。',
  locationDenied:'无法读取位置，请允许定位或改用地图点选', locating:'正在获取位置…', locationReady:'位置已设置', pickLocationNow:'请在世界地图上点击要评估的位置', locationCleared:'位置已清除',
  riskLow:'影响可能性较低', riskWatch:'保持关注', riskMedium:'可能受到外围影响', riskHigh:'可能明显受影响', riskSevere:'可能接近核心影响区',
  confidenceHigh:'较高', confidenceMedium:'中等', confidenceLow:'有限', noForecastTime:'暂无可靠时间', noImpactWindow:'暂未进入估算影响范围', fromTo:'{start} 至 {end}', closestAt:'{time}，约 {distance} km',
  personalNoStorm:'当前没有可计算的台风路径。保留位置后，出现活跃系统时会自动更新。', personalNoLocation:'设置位置后，可查看最近距离、可能影响时段和针对不同活动的建议。',
  adviceNow:'现在', adviceBefore:'可能受影响前', adviceDuring:'影响期间', selectedPlace:'已选位置', mapPickHint:'点击地图设置要评估的位置', locationAccuracy:'定位精度约 {accuracy} 米',
  actionLow:'保持日常关注即可', actionWatch:'留意路径和当地预警', actionMedium:'提前调整非必要安排', actionHigh:'准备减少外出并遵从官方措施', actionSevere:'优先执行当地疏散和停工停课指令'
});
Object.assign(i18n.en, {
  yourLocationImpact:'Your location', locationPromptShort:'Use location to estimate possible impact', locationPrivacyShort:'Location stays on this device', useMyLocation:'Use my location',
  personalMode:'Personal impact mode', whenAffectMe:'When could it affect me?', locationNeeded:'Location needed', personalIntro:'Allow browser location or select a point on the map. The site estimates the closest track distance and a possible impact window.',
  browserLocation:'Browser permission is required', pickOnMap:'Choose on map', pickOnMapHint:'Useful for another place or denied GPS', clearLocation:'Clear location', clearLocationHint:'Delete the locally saved position', locationPrivacy:'Your position is calculated and stored only in this browser and is not uploaded to the site server.',
  distanceToTrack:'Nearest forecast-track distance', closestApproach:'Estimated closest approach', possibleWindow:'Possible impact window', estimateConfidence:'Estimate confidence', chooseProfile:'Choose your activity profile', profileAdviceTitle:'Advice changes with your situation', profileHint:'Switch at any time',
  profileCommute:'Commuting', profileOutdoor:'Outdoor exercise', profileOffice:'Indoor office', profileDriving:'Driving', profileFamily:'Family care', profileCoastal:'Coastal resident',
  estimateOnly:'This is a track-distance estimate, not an arrival forecast', estimateNote:'Impacts depend on storm size, terrain, rainfall and local warnings. Evacuation, closures and travel decisions must follow local authorities.',
  locationDenied:'Location unavailable. Allow permission or choose a point on the map.', locating:'Finding your location…', locationReady:'Location set', pickLocationNow:'Click the world map to choose a place to assess', locationCleared:'Location cleared',
  riskLow:'Low likelihood of impact', riskWatch:'Stay aware', riskMedium:'Peripheral impacts possible', riskHigh:'Meaningful impacts possible', riskSevere:'Possible core-impact zone',
  confidenceHigh:'Higher', confidenceMedium:'Moderate', confidenceLow:'Limited', noForecastTime:'No reliable time yet', noImpactWindow:'Not currently inside the estimated influence range', fromTo:'{start} to {end}', closestAt:'{time}, about {distance} km',
  personalNoStorm:'There is no usable cyclone track right now. Keep the location saved and the estimate will update when a system appears.', personalNoLocation:'Set a location to see distance, possible timing and advice for different activities.',
  adviceNow:'Now', adviceBefore:'Before possible impacts', adviceDuring:'During impacts', selectedPlace:'Selected place', mapPickHint:'Click the map to set the place you want to assess', locationAccuracy:'Location accuracy about {accuracy} m',
  historyReference:'Historical reference', similarStorms:'Which past storms were similar?', referenceOnly:'Context only', historyLead:'Cases are matched by track direction, intensity and possible impact area to explain risk types—not to predict that history will repeat.', historyNotForecast:'Similarity does not mean the same outcome', historyCaveat:'Storm size, speed, tide, terrain and preparedness can produce very different impacts. Current official forecasts and local alerts always take priority.', historySummaryTitle:'Why these cases are shown', historySummaryText:'These cases illustrate possible wind, rain, surge and inland-flood risks. Similarity reflects only selected track and intensity characteristics.', similarPath:'Similar track direction', similarIntensity:'Similar intensity range', similarRegion:'Similar impact region', pastImpact:'Main historical impact', lesson:'Useful lesson', overlayTrack:'Overlay track', removeOverlay:'Remove overlay', noAnalog:'There is not enough track information to recommend historical cases.',
  actionLow:'Continue normal monitoring', actionWatch:'Watch the track and local alerts', actionMedium:'Adjust non-essential plans early', actionHigh:'Prepare to reduce travel and follow official measures', actionSevere:'Prioritize evacuation and closure instructions from local authorities'
});


Object.assign(i18n.zh, {
  historyReference:'历史参考', similarStorms:'哪些历史台风与当前情景相似？', referenceOnly:'仅作背景参考',
  historyLead:'案例会根据路径方向、强度和可能影响区域进行匹配，用来解释风险类型，而不是预测历史会重演。',
  historyNotForecast:'相似不代表结果相同', historyCaveat:'台风大小、移动速度、潮位、地形和防灾条件都会改变实际影响。请始终优先参考当前官方预报与所在地预警。',
  historySummaryTitle:'为什么显示这些案例', historySummaryText:'这些案例帮助理解大风、暴雨、风暴潮和内陆洪水等可能风险。相似度只反映部分路径与强度特征。',
  similarPath:'路径方向相似', similarIntensity:'强度区间相似', similarRegion:'影响区域相似', pastImpact:'历史主要影响', lesson:'可参考的经验', overlayTrack:'叠加历史路径', removeOverlay:'移除历史路径', noAnalog:'当前路径信息不足，暂时无法推荐历史案例。'
});
Object.assign(i18n.ja, {
  historyReference:'過去の参考例', similarStorms:'どの過去の台風が似ていますか？', referenceOnly:'参考情報のみ',
  historyLead:'進路方向・強度・影響地域が近い事例を示します。過去と同じ結果になるという予測ではありません。',
  historyNotForecast:'類似していても結果は同じとは限りません', historyCaveat:'台風の大きさ、速度、潮位、地形、防災状況により影響は大きく変わります。現在の公式予報を優先してください。',
  historySummaryTitle:'これらの事例を表示する理由', historySummaryText:'風、雨、高潮、内陸洪水などのリスクを理解するための参考例です。',
  similarPath:'進路方向が類似', similarIntensity:'強度が類似', similarRegion:'影響地域が類似', pastImpact:'過去の主な影響', lesson:'参考になる点', overlayTrack:'過去の進路を重ねる', removeOverlay:'重ね表示を解除', noAnalog:'比較に十分な進路情報がありません。'
});
Object.assign(i18n.ko, {
  historyReference:'과거 사례 참고', similarStorms:'어떤 과거 태풍과 비슷한가요?', referenceOnly:'참고용',
  historyLead:'이동 방향, 강도, 예상 영향 지역이 비슷한 사례를 보여 줍니다. 과거 결과가 반복된다는 예측은 아닙니다.',
  historyNotForecast:'비슷해도 결과는 같지 않습니다', historyCaveat:'태풍 크기, 속도, 조위, 지형, 대비 수준에 따라 영향이 크게 달라집니다. 현재 공식 예보를 우선하세요.',
  historySummaryTitle:'이 사례를 보여 주는 이유', historySummaryText:'강풍, 폭우, 폭풍해일, 내륙 홍수 위험을 이해하기 위한 참고 사례입니다.',
  similarPath:'이동 경로가 비슷함', similarIntensity:'강도 범위가 비슷함', similarRegion:'영향 지역이 비슷함', pastImpact:'과거 주요 영향', lesson:'참고할 점', overlayTrack:'과거 경로 겹쳐 보기', removeOverlay:'겹쳐 보기 해제', noAnalog:'비교할 경로 정보가 충분하지 않습니다.'
});
Object.assign(i18n.es, {
  historyReference:'Referencia histórica', similarStorms:'¿Qué ciclones anteriores fueron parecidos?', referenceOnly:'Solo contexto',
  historyLead:'Los casos se comparan por dirección, intensidad y zona de impacto. No predicen que la historia se repita.',
  historyNotForecast:'Una trayectoria similar no implica el mismo resultado', historyCaveat:'El tamaño, la velocidad, la marea, el terreno y la preparación pueden cambiar mucho los impactos. Priorice siempre los avisos oficiales actuales.',
  historySummaryTitle:'Por qué se muestran estos casos', historySummaryText:'Sirven para comprender posibles riesgos de viento, lluvia, marejada e inundaciones interiores.',
  similarPath:'Dirección parecida', similarIntensity:'Intensidad parecida', similarRegion:'Región de impacto parecida', pastImpact:'Impacto histórico principal', lesson:'Lección útil', overlayTrack:'Superponer trayectoria', removeOverlay:'Quitar trayectoria', noAnalog:'No hay suficiente información de trayectoria para comparar casos.'
});
Object.assign(i18n.fr, {
  historyReference:'Référence historique', similarStorms:'Quels cyclones passés étaient similaires ?', referenceOnly:'Contexte uniquement',
  historyLead:'Les cas sont rapprochés selon la trajectoire, l’intensité et la zone d’impact. Ils ne prédisent pas une répétition de l’histoire.',
  historyNotForecast:'Une similarité ne signifie pas le même résultat', historyCaveat:'La taille, la vitesse, la marée, le relief et la préparation peuvent fortement modifier les impacts. Les prévisions officielles actuelles restent prioritaires.',
  historySummaryTitle:'Pourquoi ces cas sont affichés', historySummaryText:'Ils aident à comprendre les risques possibles de vent, pluie, submersion et inondation intérieure.',
  similarPath:'Direction similaire', similarIntensity:'Intensité similaire', similarRegion:'Zone d’impact similaire', pastImpact:'Impact historique principal', lesson:'Enseignement utile', overlayTrack:'Superposer la trajectoire', removeOverlay:'Retirer la trajectoire', noAnalog:'Les informations de trajectoire sont insuffisantes pour proposer des cas.'
});


Object.assign(i18n.zh, {
  layers:'图层', stormLayers:'台风图层', layerHint:'选择地图上要显示的信息', trackLayer:'实况与预报路径', trackLayerHint:'中心位置、路径节点与时间', coneLayer:'预报可能范围', coneLayerHint:'仅在官方预报点充分时显示', windLayer:'风圈与波及范围', windLayerHint:'无官方风圈数据时显示估算范围', labelLayer:'地图标注', labelLayerHint:'台风名称、节点时间与风圈标签', estimatedRangeNote:'标有“估算”的风圈仅用于帮助理解，不是官方警戒范围。', windRange:'风圈/波及范围', estimated:'估算', galeRadius:'大风影响范围', stormRadius:'强风影响范围', typhoonRadius:'台风核心范围', trackReady:'路径图已显示', observedPoints:'个实况点', forecastPoints:'个预报点', forecastUnavailable:'官方预报路径暂不可用', singleFixOnly:'目前仅收到一个中心位置', mapDataLimited:'当前来源的路径数据有限', currentCentre:'当前中心', noTrack:'暂无可绘制路径', layerChanged:'地图图层已更新'
});
Object.assign(i18n.en, {
  layers:'Layers', stormLayers:'Storm layers', layerHint:'Choose what appears on the map', trackLayer:'Observed and forecast track', trackLayerHint:'Centre positions, nodes and times', coneLayer:'Forecast uncertainty area', coneLayerHint:'Shown only when enough official forecast points exist', windLayer:'Wind and possible impact range', windLayerHint:'Estimated ranges are used when official wind radii are unavailable', labelLayer:'Map labels', labelLayerHint:'Storm name, node times and wind-range labels', estimatedRangeNote:'Wind areas marked “estimated” help explain scale and are not official warning boundaries.', windRange:'Wind / impact range', estimated:'Estimated', galeRadius:'Gale-force range', stormRadius:'Storm-force range', typhoonRadius:'Typhoon core range', trackReady:'Track map available', observedPoints:'observed points', forecastPoints:'forecast points', forecastUnavailable:'Official forecast track is not available yet', singleFixOnly:'Only one centre position is currently available', mapDataLimited:'Track information from the current source is limited', currentCentre:'Current centre', noTrack:'No track available to draw', layerChanged:'Map layers updated'
});
Object.assign(i18n.ja, {layers:'レイヤー',stormLayers:'台風レイヤー',layerHint:'地図に表示する情報を選択',trackLayer:'実況・予報進路',trackLayerHint:'中心位置、時刻、進路点',coneLayer:'予報の可能範囲',coneLayerHint:'公式予報点が十分な場合のみ表示',windLayer:'風域・影響範囲',windLayerHint:'公式風域がない場合は推定表示',labelLayer:'地図ラベル',labelLayerHint:'台風名、時刻、風域ラベル',estimatedRangeNote:'「推定」の風域は理解の補助であり、公式警戒範囲ではありません。',windRange:'風域/影響範囲',estimated:'推定',galeRadius:'強風域',stormRadius:'暴風域',typhoonRadius:'中心域',trackReady:'進路図を表示中',observedPoints:'実況点',forecastPoints:'予報点',forecastUnavailable:'公式予報進路はまだ利用できません',singleFixOnly:'現在は中心位置が1点のみです',mapDataLimited:'現在の情報源では進路データが限定的です',currentCentre:'現在の中心',noTrack:'表示できる進路がありません',layerChanged:'地図レイヤーを更新しました'});
Object.assign(i18n.ko, {layers:'레이어',stormLayers:'태풍 레이어',layerHint:'지도에 표시할 정보를 선택하세요',trackLayer:'관측·예보 경로',trackLayerHint:'중심 위치, 시각 및 경로 지점',coneLayer:'예보 가능 범위',coneLayerHint:'공식 예보 지점이 충분할 때 표시',windLayer:'강풍권·영향 범위',windLayerHint:'공식 풍권이 없으면 추정 범위 표시',labelLayer:'지도 라벨',labelLayerHint:'태풍 이름, 시각 및 풍권 라벨',estimatedRangeNote:'“추정” 풍권은 이해를 돕기 위한 것이며 공식 경계가 아닙니다.',windRange:'풍권/영향 범위',estimated:'추정',galeRadius:'강풍 영향 범위',stormRadius:'폭풍 영향 범위',typhoonRadius:'태풍 핵심 범위',trackReady:'경로 지도 표시 중',observedPoints:'관측 지점',forecastPoints:'예보 지점',forecastUnavailable:'공식 예보 경로를 아직 사용할 수 없습니다',singleFixOnly:'현재 중심 위치가 한 곳만 제공됩니다',mapDataLimited:'현재 자료원의 경로 정보가 제한적입니다',currentCentre:'현재 중심',noTrack:'표시할 경로가 없습니다',layerChanged:'지도 레이어가 업데이트되었습니다'});
Object.assign(i18n.es, {layers:'Capas',stormLayers:'Capas del ciclón',layerHint:'Elija la información visible en el mapa',trackLayer:'Trayectoria observada y prevista',trackLayerHint:'Centro, horas y puntos de trayectoria',coneLayer:'Área posible de pronóstico',coneLayerHint:'Solo con suficientes puntos oficiales',windLayer:'Viento y posible zona de impacto',windLayerHint:'Se estima cuando no hay radios oficiales',labelLayer:'Etiquetas del mapa',labelLayerHint:'Nombre, horas y etiquetas de viento',estimatedRangeNote:'Las áreas marcadas como “estimadas” no son límites oficiales de alerta.',windRange:'Viento/zona de impacto',estimated:'Estimado',galeRadius:'Área de vientos fuertes',stormRadius:'Área de temporal',typhoonRadius:'Núcleo del tifón',trackReady:'Trayectoria disponible',observedPoints:'puntos observados',forecastPoints:'puntos previstos',forecastUnavailable:'La trayectoria oficial prevista aún no está disponible',singleFixOnly:'Solo hay una posición central disponible',mapDataLimited:'La fuente actual ofrece datos de trayectoria limitados',currentCentre:'Centro actual',noTrack:'No hay trayectoria para mostrar',layerChanged:'Capas del mapa actualizadas'});
Object.assign(i18n.fr, {layers:'Couches',stormLayers:'Couches du cyclone',layerHint:'Choisissez les informations affichées',trackLayer:'Trajectoire observée et prévue',trackLayerHint:'Centre, heures et points de trajectoire',coneLayer:'Zone possible de prévision',coneLayerHint:'Affichée avec suffisamment de points officiels',windLayer:'Vent et zone d’impact possible',windLayerHint:'Zone estimée en l’absence de rayons officiels',labelLayer:'Libellés de carte',labelLayerHint:'Nom, heures et libellés de vent',estimatedRangeNote:'Les zones marquées « estimées » ne sont pas des limites officielles d’alerte.',windRange:'Vent/zone d’impact',estimated:'Estimé',galeRadius:'Zone de vents forts',stormRadius:'Zone de tempête',typhoonRadius:'Cœur du typhon',trackReady:'Trajectoire affichée',observedPoints:'points observés',forecastPoints:'points prévus',forecastUnavailable:'La trajectoire officielle prévue n’est pas encore disponible',singleFixOnly:'Une seule position centrale est disponible',mapDataLimited:'La source actuelle fournit peu de données de trajectoire',currentCentre:'Centre actuel',noTrack:'Aucune trajectoire à afficher',layerChanged:'Couches de carte mises à jour'});


Object.assign(i18n.zh, {
  observed:'实况路径', forecast:'官方预报', uncertainty:'预报范围',
  trendReference:'趋势参考', trendNotOfficial:'非官方趋势参考', trendStatus:'官方预报暂不可用，已显示非官方趋势参考',
  pathPlayback:'路径播放', pause:'暂停', liveObservation:'实况', officialForecast:'官方预报', trendData:'趋势参考', officialData:'官方数据',
  swipeForDetails:'上滑查看影响、时间与建议', sheetCollapsed:'收起', sheetHalf:'半屏', sheetFull:'全屏',
  currentCentre:'当前中心', playbackEnded:'路径播放完成', forecastUnavailable:'官方预报路径暂不可用'
});
Object.assign(i18n.en, {
  observed:'Observed track', forecast:'Official forecast', uncertainty:'Forecast area',
  trendReference:'Trend reference', trendNotOfficial:'Non-official trend reference', trendStatus:'Official forecast unavailable; a non-official trend reference is shown',
  pathPlayback:'Track playback', pause:'Pause', liveObservation:'Observed', officialForecast:'Official forecast', trendData:'Trend reference', officialData:'Official data',
  swipeForDetails:'Swipe up for impacts, timing and advice', sheetCollapsed:'Collapsed', sheetHalf:'Half screen', sheetFull:'Full screen',
  currentCentre:'Current centre', playbackEnded:'Track playback complete', forecastUnavailable:'Official forecast track is unavailable'
});
Object.assign(i18n.ja, {observed:'実況進路',forecast:'公式予報',uncertainty:'予報範囲',trendReference:'進路傾向',trendNotOfficial:'非公式の進路傾向',trendStatus:'公式予報進路がないため、非公式の傾向線を表示しています',pathPlayback:'進路再生',pause:'一時停止',liveObservation:'実況',officialForecast:'公式予報',trendData:'傾向参考',officialData:'公式データ',swipeForDetails:'上にスワイプして影響・時刻・対策を表示',sheetCollapsed:'閉じる',sheetHalf:'半画面',sheetFull:'全画面'});
Object.assign(i18n.ko, {observed:'관측 경로',forecast:'공식 예보',uncertainty:'예보 범위',trendReference:'경향 참고',trendNotOfficial:'비공식 경향 참고',trendStatus:'공식 예보 경로가 없어 비공식 경향선을 표시합니다',pathPlayback:'경로 재생',pause:'일시정지',liveObservation:'관측',officialForecast:'공식 예보',trendData:'경향 참고',officialData:'공식 데이터',swipeForDetails:'위로 밀어 영향·시간·대응 보기',sheetCollapsed:'접힘',sheetHalf:'반 화면',sheetFull:'전체 화면'});
Object.assign(i18n.es, {observed:'Trayectoria observada',forecast:'Pronóstico oficial',uncertainty:'Área prevista',trendReference:'Referencia de tendencia',trendNotOfficial:'Tendencia no oficial',trendStatus:'No hay trayectoria oficial; se muestra una tendencia no oficial',pathPlayback:'Reproducir trayectoria',pause:'Pausa',liveObservation:'Observado',officialForecast:'Pronóstico oficial',trendData:'Tendencia',officialData:'Datos oficiales',swipeForDetails:'Deslice hacia arriba para ver impactos, horarios y consejos',sheetCollapsed:'Cerrado',sheetHalf:'Media pantalla',sheetFull:'Pantalla completa'});
Object.assign(i18n.fr, {observed:'Trajectoire observée',forecast:'Prévision officielle',uncertainty:'Zone prévue',trendReference:'Tendance indicative',trendNotOfficial:'Tendance non officielle',trendStatus:'La trajectoire officielle est indisponible ; une tendance non officielle est affichée',pathPlayback:'Lecture de trajectoire',pause:'Pause',liveObservation:'Observé',officialForecast:'Prévision officielle',trendData:'Tendance',officialData:'Données officielles',swipeForDetails:'Balayez vers le haut pour les impacts, horaires et conseils',sheetCollapsed:'Replié',sheetHalf:'Mi-écran',sheetFull:'Plein écran'});


Object.assign(i18n.zh, {
  riskBrief:'风险简报', hazardTrack:'路径', hazardWind:'风圈', hazardRain:'降雨', hazardCoast:'沿海', hazardSatellite:'云图', hazardRadar:'雷达',
  intensityLegend:'节点颜色＝强度', intensity:'强度', intensityTD:'热带低压', intensityTS:'热带风暴', intensitySTS:'强热带风暴', intensityTY:'台风', intensitySTY:'强台风', intensitySuper:'超强台风',
  decisionCentre:'决策中心', riskAndAdvice:'风险、时间与行动建议', officialTools:'官方工具', openProfessionalMaps:'打开专业气象图层', officialTrackMap:'官方路径图', satRadarTrack:'路径·卫星·雷达', rainWindWarning:'降雨·风力·警报', gisProducts:'GIS 与概率产品', impactProducts:'风雨·风暴潮·影响预报',
  coneMeaning:'概率范围描述台风中心可能经过的位置，不是全部风雨影响边界。', openOfficialImagery:'将在新标签页打开官方图层', forecastHorizon:'预报时效', selectedPoint:'选中路径节点', inspectorOpened:'风险简报已打开', inspectorClosed:'风险简报已收起'
});
Object.assign(i18n.en, {
  riskBrief:'Risk brief', hazardTrack:'Track', hazardWind:'Wind radii', hazardRain:'Rain', hazardCoast:'Coastal', hazardSatellite:'Satellite', hazardRadar:'Radar',
  intensityLegend:'Node colour = intensity', intensity:'Intensity', intensityTD:'Tropical depression', intensityTS:'Tropical storm', intensitySTS:'Severe tropical storm', intensityTY:'Typhoon', intensitySTY:'Severe typhoon', intensitySuper:'Super typhoon',
  decisionCentre:'Decision centre', riskAndAdvice:'Risk, timing and recommended actions', officialTools:'Official tools', openProfessionalMaps:'Open professional weather layers', officialTrackMap:'Official track map', satRadarTrack:'Track · satellite · radar', rainWindWarning:'Rain · wind · warnings', gisProducts:'GIS and probability products', impactProducts:'Wind · rain · surge impacts',
  coneMeaning:'The probability area describes where the cyclone centre may travel; it is not the full boundary of wind or rain impacts.', openOfficialImagery:'Opening an official layer in a new tab', forecastHorizon:'Forecast horizon', selectedPoint:'Selected track point', inspectorOpened:'Risk brief opened', inspectorClosed:'Risk brief collapsed'
});
Object.assign(i18n.ja, {riskBrief:'リスク概要',hazardTrack:'進路',hazardWind:'風域',hazardRain:'雨',hazardCoast:'沿岸',hazardSatellite:'衛星',hazardRadar:'レーダー',intensityLegend:'点の色＝強度',intensity:'強度',decisionCentre:'判断パネル',riskAndAdvice:'リスク・時刻・行動',officialTools:'公式ツール',openProfessionalMaps:'専門気象レイヤーを開く',impactProducts:'風・雨・高潮影響'});
Object.assign(i18n.ko, {riskBrief:'위험 요약',hazardTrack:'경로',hazardWind:'강풍권',hazardRain:'강수',hazardCoast:'해안',hazardSatellite:'위성',hazardRadar:'레이더',intensityLegend:'점 색상 = 강도',intensity:'강도',decisionCentre:'의사결정 패널',riskAndAdvice:'위험·시간·행동 조언',officialTools:'공식 도구',openProfessionalMaps:'전문 기상 레이어 열기',impactProducts:'바람·비·폭풍해일 영향'});
Object.assign(i18n.es, {riskBrief:'Resumen de riesgo',hazardTrack:'Trayectoria',hazardWind:'Radio de viento',hazardRain:'Lluvia',hazardCoast:'Costa',hazardSatellite:'Satélite',hazardRadar:'Radar',intensityLegend:'Color del punto = intensidad',intensity:'Intensidad',decisionCentre:'Centro de decisión',riskAndAdvice:'Riesgo, tiempo y acciones',officialTools:'Herramientas oficiales',openProfessionalMaps:'Abrir capas meteorológicas profesionales',impactProducts:'Viento · lluvia · marejada'});
Object.assign(i18n.fr, {riskBrief:'Résumé du risque',hazardTrack:'Trajectoire',hazardWind:'Rayons de vent',hazardRain:'Pluie',hazardCoast:'Littoral',hazardSatellite:'Satellite',hazardRadar:'Radar',intensityLegend:'Couleur du point = intensité',intensity:'Intensité',decisionCentre:'Centre de décision',riskAndAdvice:'Risque, calendrier et actions',officialTools:'Outils officiels',openProfessionalMaps:'Ouvrir les couches météo professionnelles',impactProducts:'Vent · pluie · submersion'});


Object.assign(i18n.zh, {eastPacific:'东北/中太平洋',northIndian:'北印度洋',southernBasins:'南半球海域',cityRiskLegend:'城市点＝距路径风险筛选',userLegend:'当前位置与最近路径关系',formalMapReady:'正式地图引擎已加载',formalMapFallback:'正式地图不可用，已启用降级地图'});
Object.assign(i18n.en, {eastPacific:'Eastern/Central Pacific',northIndian:'North Indian Ocean',southernBasins:'Southern Hemisphere',cityRiskLegend:'City dots = track-distance screening',userLegend:'Your location and nearest-track link',formalMapReady:'Formal map engine loaded',formalMapFallback:'Formal map unavailable; fallback map enabled'});
Object.assign(i18n.ja, {eastPacific:'東部・中部太平洋',northIndian:'北インド洋',southernBasins:'南半球海域',cityRiskLegend:'都市点＝進路距離の目安',userLegend:'現在地と最寄り進路'});
Object.assign(i18n.ko, {eastPacific:'동부·중부 태평양',northIndian:'북인도양',southernBasins:'남반구 해역',cityRiskLegend:'도시 점 = 경로 거리 기준',userLegend:'현재 위치와 가장 가까운 경로'});
Object.assign(i18n.es, {eastPacific:'Pacífico oriental/central',northIndian:'Océano Índico norte',southernBasins:'Hemisferio sur',cityRiskLegend:'Ciudades = distancia a la trayectoria',userLegend:'Tu ubicación y trayectoria más cercana'});
Object.assign(i18n.fr, {eastPacific:'Pacifique est/central',northIndian:'Océan Indien nord',southernBasins:'Hémisphère sud',cityRiskLegend:'Villes = distance à la trajectoire',userLegend:'Votre position et la trajectoire la plus proche'});

const demoStorm = {
  id: 'demo-aurora', name: 'AURORA', localName: '曙光', number: '2600', basin: 'Western North Pacific', classification: 'Strong typhoon', alertLevel: 'orange', lat: 25.2, lon: 124.8, windMs: 58, pressureHpa: 960, updatedAt: '2026-07-10T12:00:00Z', demo: true,
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

const demoStorms = [
  demoStorm,
  {
    id:'demo-atlas',name:'ATLAS',basin:'Atlantic',classification:'Hurricane',alertLevel:'orange',lat:25.5,lon:-69.2,windMs:42,pressureHpa:958,updatedAt:'2026-07-10T12:00:00Z',demo:true,
    track:[
      {lat:13.0,lon:-39.0,time:'2026-07-08T00:00:00Z',windMs:18,pressureHpa:998,forecast:false,source:'demo'},
      {lat:16.0,lon:-47.0,time:'2026-07-08T18:00:00Z',windMs:25,pressureHpa:988,forecast:false,source:'demo'},
      {lat:20.0,lon:-57.0,time:'2026-07-09T12:00:00Z',windMs:34,pressureHpa:974,forecast:false,source:'demo'},
      {lat:23.5,lon:-64.0,time:'2026-07-10T00:00:00Z',windMs:39,pressureHpa:964,forecast:false,source:'demo'},
      {lat:25.5,lon:-69.2,time:'2026-07-10T12:00:00Z',windMs:42,pressureHpa:958,forecast:false,source:'demo'},
      {lat:28.0,lon:-73.0,time:'2026-07-11T12:00:00Z',windMs:39,pressureHpa:966,forecast:true,source:'demo'},
      {lat:32.0,lon:-74.0,time:'2026-07-12T12:00:00Z',windMs:31,pressureHpa:978,forecast:true,source:'demo'}
    ],sources:['nhc','gdacs']
  },
  {
    id:'demo-nila',name:'NILA',basin:'North Indian Ocean',classification:'Severe Cyclonic Storm',alertLevel:'orange',lat:18.0,lon:87.1,windMs:35,pressureHpa:972,updatedAt:'2026-07-10T12:00:00Z',demo:true,
    track:[
      {lat:9.0,lon:91.5,time:'2026-07-08T06:00:00Z',windMs:18,pressureHpa:996,forecast:false,source:'demo'},
      {lat:12.0,lon:90.0,time:'2026-07-09T00:00:00Z',windMs:24,pressureHpa:988,forecast:false,source:'demo'},
      {lat:15.0,lon:88.5,time:'2026-07-09T18:00:00Z',windMs:30,pressureHpa:980,forecast:false,source:'demo'},
      {lat:18.0,lon:87.1,time:'2026-07-10T12:00:00Z',windMs:35,pressureHpa:972,forecast:false,source:'demo'},
      {lat:20.5,lon:86.0,time:'2026-07-11T06:00:00Z',windMs:31,pressureHpa:980,forecast:true,source:'demo'},
      {lat:22.8,lon:84.8,time:'2026-07-12T00:00:00Z',windMs:22,pressureHpa:990,forecast:true,source:'demo'}
    ],sources:['gdacs']
  },
  {
    id:'demo-kiri',name:'KIRI',basin:'South Pacific',classification:'Tropical Cyclone',alertLevel:'yellow',lat:-18.5,lon:171.8,windMs:31,pressureHpa:978,updatedAt:'2026-07-10T12:00:00Z',demo:true,
    track:[
      {lat:-13.2,lon:179.0,time:'2026-07-08T12:00:00Z',windMs:18,pressureHpa:995,forecast:false,source:'demo'},
      {lat:-15.4,lon:176.5,time:'2026-07-09T12:00:00Z',windMs:25,pressureHpa:986,forecast:false,source:'demo'},
      {lat:-18.5,lon:171.8,time:'2026-07-10T12:00:00Z',windMs:31,pressureHpa:978,forecast:false,source:'demo'},
      {lat:-21.5,lon:168.0,time:'2026-07-11T12:00:00Z',windMs:29,pressureHpa:983,forecast:true,source:'demo'},
      {lat:-25.0,lon:164.0,time:'2026-07-12T12:00:00Z',windMs:22,pressureHpa:990,forecast:true,source:'demo'}
    ],sources:['gdacs']
  }
];

const demoSources = [
  {id:'jma',name:'JMA / RSMC Tokyo',role:'primary',status:'online',updatedAt:'2026-07-10T12:00:00Z',message:'25.2°N, 124.8°E · 58 m/s',url:'https://www.jma.go.jp/jma/jma-eng/jma-center/rsmc-hp-pub-eg/RSMC_HP.htm'},
  {id:'hko',name:'Hong Kong Observatory',role:'local',status:'online',updatedAt:'2026-07-10T12:10:00Z',message:'Position within 85 km · local signal not issued',url:'https://www.hko.gov.hk/'},
  {id:'gdacs',name:'GDACS / EU JRC & UN',role:'impact',status:'online',updatedAt:'2026-07-10T12:18:00Z',message:'Orange impact scenario · demo',url:'https://www.gdacs.org/'},
  {id:'nhc',name:'NOAA / NHC',role:'official',status:'no-data',updatedAt:'2026-07-10T12:00:00Z',message:'Outside NHC operational basin',url:'https://www.nhc.noaa.gov/'},
  {id:'cwa',name:'Taiwan CWA',role:'optional',status:'not-configured',message:'Connector reserved for API-key access',url:'https://opendata.cwa.gov.tw/'}
];

const historicalAnalogCatalog = [
  {id:'morakot-2009',name:'MORAKOT',year:2009,localZh:'莫拉克',basin:'Western North Pacific',peakWind:40,region:'台湾及华南沿海',regionEn:'Taiwan and the South China coast',impactZh:'移动较慢并带来长时间强降雨，山区洪水和滑坡风险突出。',impactEn:'Slow movement contributed to prolonged heavy rain, with severe flood and landslide risk in mountainous terrain.',lessonZh:'不要只看中心风力；移动速度、地形和持续降雨可能成为更主要的危险。',lessonEn:'Do not focus only on centre wind: forward speed, terrain and prolonged rainfall can dominate impacts.',track:[{lat:17.5,lon:139},{lat:19.2,lon:133},{lat:21.2,lon:128},{lat:22.8,lon:124.5},{lat:23.5,lon:121},{lat:24,lon:118}]},
  {id:'mangkhut-2018',name:'MANGKHUT',year:2018,localZh:'山竹',basin:'Western North Pacific',peakWind:55,region:'菲律宾北部、香港及广东',regionEn:'Northern Philippines, Hong Kong and Guangdong',impactZh:'强风、巨浪和风暴潮对沿海及高层建筑环境造成显著影响。',impactEn:'Strong wind, waves and storm surge caused major coastal and high-rise urban impacts.',lessonZh:'沿海风险不能只用中心路径判断；潮位、海岸形状和建筑暴露度同样关键。',lessonEn:'Coastal risk cannot be inferred from the centre line alone; tide, coastline shape and exposure matter.',track:[{lat:13.5,lon:145},{lat:14.7,lon:139},{lat:16,lon:132},{lat:17.5,lon:125},{lat:19.2,lon:119},{lat:21.5,lon:113}]},
  {id:'doksuri-2023',name:'DOKSURI',year:2023,localZh:'杜苏芮',basin:'Western North Pacific',peakWind:50,region:'菲律宾、台湾附近、福建及华北',regionEn:'Philippines, near Taiwan, Fujian and northern China',impactZh:'登陆区承受强风暴雨，残余水汽随后在远离中心的内陆地区触发严重降雨。',impactEn:'Landfall areas saw wind and rain, while remnant moisture later contributed to severe rainfall far inland.',lessonZh:'台风减弱或登陆后风险并不会立刻结束，内陆暴雨可能延后出现。',lessonEn:'Risk does not end at landfall or weakening; inland rainfall can peak later and far from the centre.',track:[{lat:12.5,lon:132},{lat:14.5,lon:127},{lat:17,lon:123},{lat:20,lon:120.5},{lat:23.5,lon:118.5},{lat:26,lon:116}]},
  {id:'hagibis-2019',name:'HAGIBIS',year:2019,localZh:'海贝思',basin:'Western North Pacific',peakWind:55,region:'日本',regionEn:'Japan',impactZh:'大范围持续降雨导致河流洪水和城市内涝，交通网络受到广泛影响。',impactEn:'Widespread prolonged rainfall produced river flooding, urban inundation and major transport disruption.',lessonZh:'即使中心未直接经过所在地，也要重视流域上游降雨和公共交通停运。',lessonEn:'Even without a direct centre passage, upstream rainfall and transport shutdowns can drive local risk.',track:[{lat:14,lon:158},{lat:17,lon:151},{lat:21,lon:143},{lat:26,lon:137},{lat:32,lon:138},{lat:36,lon:140}]},
  {id:'haiyan-2013',name:'HAIYAN',year:2013,localZh:'海燕',basin:'Western North Pacific',peakWind:70,region:'菲律宾中部',regionEn:'Central Philippines',impactZh:'极强风和风暴潮对低洼沿海社区造成灾难性影响。',impactEn:'Extreme wind and storm surge caused catastrophic impacts in low-lying coastal communities.',lessonZh:'低洼沿海居民应提前了解疏散区，高强度风暴来临前的行动时间非常关键。',lessonEn:'Low-lying coastal residents need early evacuation-zone awareness; lead time is critical in intense storms.',track:[{lat:7,lon:150},{lat:8.5,lon:143},{lat:10,lon:136},{lat:11,lon:129},{lat:11.5,lon:123},{lat:12,lon:117}]},
  {id:'lekima-2019',name:'LEKIMA',year:2019,localZh:'利奇马',basin:'Western North Pacific',peakWind:52,region:'台湾以东、浙江及华东',regionEn:'East of Taiwan, Zhejiang and eastern China',impactZh:'沿海强风暴雨叠加山区地形，造成洪水、滑坡和长时间交通影响。',impactEn:'Coastal wind and rain interacting with terrain led to flooding, landslides and prolonged transport impacts.',lessonZh:'登陆后的减弱过程仍可能伴随持续降雨，山区和河谷需更早采取行动。',lessonEn:'Weakening after landfall can still bring prolonged rain; mountain and river-valley communities need earlier action.',track:[{lat:17,lon:132},{lat:20,lon:128},{lat:23,lon:125},{lat:26,lon:122},{lat:29,lon:120.5},{lat:33,lon:119}]}
];


const majorCities = [
  {id:'tokyo',zh:'东京',en:'Tokyo',ja:'東京',ko:'도쿄',lat:35.68,lon:139.69,rank:5},
  {id:'osaka',zh:'大阪',en:'Osaka',ja:'大阪',ko:'오사카',lat:34.69,lon:135.50,rank:3},
  {id:'naha',zh:'那霸',en:'Naha',ja:'那覇',ko:'나하',lat:26.21,lon:127.68,rank:4},
  {id:'taipei',zh:'台北',en:'Taipei',ja:'台北',ko:'타이베이',lat:25.03,lon:121.56,rank:5},
  {id:'kaohsiung',zh:'高雄',en:'Kaohsiung',ja:'高雄',ko:'가오슝',lat:22.63,lon:120.30,rank:3},
  {id:'hong-kong',zh:'香港',en:'Hong Kong',ja:'香港',ko:'홍콩',lat:22.32,lon:114.17,rank:5},
  {id:'shanghai',zh:'上海',en:'Shanghai',ja:'上海',ko:'상하이',lat:31.23,lon:121.47,rank:5},
  {id:'fuzhou',zh:'福州',en:'Fuzhou',ja:'福州',ko:'푸저우',lat:26.07,lon:119.30,rank:3},
  {id:'xiamen',zh:'厦门',en:'Xiamen',ja:'厦門',ko:'샤먼',lat:24.48,lon:118.09,rank:3},
  {id:'guangzhou',zh:'广州',en:'Guangzhou',ja:'広州',ko:'광저우',lat:23.13,lon:113.26,rank:4},
  {id:'manila',zh:'马尼拉',en:'Manila',ja:'マニラ',ko:'마닐라',lat:14.60,lon:120.98,rank:5},
  {id:'cebu',zh:'宿务',en:'Cebu',ja:'セブ',ko:'세부',lat:10.32,lon:123.90,rank:3},
  {id:'hanoi',zh:'河内',en:'Hanoi',ja:'ハノイ',ko:'하노이',lat:21.03,lon:105.85,rank:4},
  {id:'ho-chi-minh',zh:'胡志明市',en:'Ho Chi Minh City',ja:'ホーチミン',ko:'호찌민',lat:10.82,lon:106.63,rank:4},
  {id:'seoul',zh:'首尔',en:'Seoul',ja:'ソウル',ko:'서울',lat:37.57,lon:126.98,rank:5},
  {id:'busan',zh:'釜山',en:'Busan',ja:'釜山',ko:'부산',lat:35.18,lon:129.08,rank:4},
  {id:'miami',zh:'迈阿密',en:'Miami',ja:'マイアミ',ko:'마이애미',lat:25.76,lon:-80.19,rank:5},
  {id:'new-orleans',zh:'新奥尔良',en:'New Orleans',ja:'ニューオーリンズ',ko:'뉴올리언스',lat:29.95,lon:-90.07,rank:4},
  {id:'houston',zh:'休斯敦',en:'Houston',ja:'ヒューストン',ko:'휴스턴',lat:29.76,lon:-95.37,rank:4},
  {id:'havana',zh:'哈瓦那',en:'Havana',ja:'ハバナ',ko:'아바나',lat:23.11,lon:-82.37,rank:4},
  {id:'san-juan',zh:'圣胡安',en:'San Juan',ja:'サンフアン',ko:'산후안',lat:18.47,lon:-66.11,rank:4},
  {id:'honolulu',zh:'檀香山',en:'Honolulu',ja:'ホノルル',ko:'호놀룰루',lat:21.31,lon:-157.86,rank:4},
  {id:'kolkata',zh:'加尔各答',en:'Kolkata',ja:'コルカタ',ko:'콜카타',lat:22.57,lon:88.36,rank:4},
  {id:'chennai',zh:'金奈',en:'Chennai',ja:'チェンナイ',ko:'첸나이',lat:13.08,lon:80.27,rank:4},
  {id:'dhaka',zh:'达卡',en:'Dhaka',ja:'ダッカ',ko:'다카',lat:23.81,lon:90.41,rank:4},
  {id:'darwin',zh:'达尔文',en:'Darwin',ja:'ダーウィン',ko:'다윈',lat:-12.46,lon:130.84,rank:4},
  {id:'cairns',zh:'凯恩斯',en:'Cairns',ja:'ケアンズ',ko:'케언스',lat:-16.92,lon:145.77,rank:4},
  {id:'brisbane',zh:'布里斯班',en:'Brisbane',ja:'ブリスベン',ko:'브리즈번',lat:-27.47,lon:153.03,rank:4},
  {id:'suva',zh:'苏瓦',en:'Suva',ja:'スバ',ko:'수바',lat:-18.14,lon:178.44,rank:4},
  {id:'port-louis',zh:'路易港',en:'Port Louis',ja:'ポートルイス',ko:'포트루이스',lat:-20.16,lon:57.50,rank:3}
];
function cityName(city){
  if(state.lang==='zh')return city.zh;
  if(state.lang==='ja')return city.ja||city.en;
  if(state.lang==='ko')return city.ko||city.en;
  return city.en;
}

const state = {
  lang: localStorage.getItem('tv-lang') || 'zh',
  theme: localStorage.getItem('tv-theme') || 'light',
  view: localStorage.getItem('tv-view') || 'simple',
  mapMode: localStorage.getItem('tv-map') || 'world',
  region: localStorage.getItem('tv-region') || 'global',
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
  playSpeed: 1,
  forecastHorizon: Number(localStorage.getItem('tv-horizon') || 120),
  inspectorOpen: localStorage.getItem('tv-inspector') === 'true',
  sheetState: "collapsed",
  userLocation: (() => { try { const value=JSON.parse(localStorage.getItem('tv-user-location')||'null'); return value&&Number.isFinite(value.lat)&&Number.isFinite(value.lon)?value:null; } catch { return null; } })(),
  profile: localStorage.getItem('tv-profile') || 'commute',
  locationPickMode: false,
  personalImpact: null,
  activeAnalogId: null,
  layers: (() => { try { return {...{track:true,cone:true,wind:true,labels:true}, ...JSON.parse(localStorage.getItem('tv-layers')||'{}')}; } catch { return {track:true,cone:true,wind:true,labels:true}; } })(),
  lastFrame: 0,
  needsRender: true
};

const canvas = $('#mapCanvas');
const ctx = canvas.getContext('2d', { alpha: false });
const tooltip = $('#pointTooltip');
let toastTimer;
let playTimer;
let formalMapEngine = null;

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
  if ($('#insightPanel')?.dataset.sheet) setSheetState(state.sheetState);
}
function applyTheme(theme = state.theme) {
  state.theme = theme; localStorage.setItem('tv-theme', theme); document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  $('meta[name="theme-color"]').content = dark ? '#071016' : '#edf4f8';
  state.needsRender = true;
  formalMapEngine?.setTheme?.(dark?'dark':'light');
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
  formalMapEngine?.setProjection?.(mode);
  if(state.selectedStorm) setTimeout(()=>fitStormTrack(state.selectedStorm,false),0);
  state.needsRender = true;
}

function currentSources() { return state.sources.length ? state.sources : demoSources; }
function inferBasinKey(storm) {
  const basin=String(storm?.basin||'').toLowerCase();
  const lat=Number(storm?.lat??storm?.track?.at?.(-1)?.lat),lon=Number(storm?.lon??storm?.track?.at?.(-1)?.lon);
  if(/atlantic/.test(basin))return 'atl';
  if(/eastern|central pacific|epac|cpac/.test(basin))return 'epac';
  if(/western|northwest|japan|philipp/.test(basin))return 'wpac';
  if(/north indian|bay of bengal|arabian/.test(basin))return 'nio';
  if(/southwest indian|austral|south pacific|fiji|nadi|reunion/.test(basin))return 'south';
  if(Number.isFinite(lat)&&Number.isFinite(lon)){
    if(lat>=0&&lon>=100)return 'wpac';
    if(lat>=0&&lon<=-100)return 'epac';
    if(lat>=0&&lon<0)return 'atl';
    if(lat>=0&&lon>=40&&lon<100)return 'nio';
    if(lat<0)return 'south';
  }
  return 'global';
}
function availableStorms() {
  const live = state.livePayload?.storms || [];
  const base=live.length?live:(state.demoEnabled?demoStorms:[]);
  return state.region==='global'?base:base.filter(storm=>inferBasinKey(storm)===state.region);
}
function selectStorm(storm, focus = false) {
  stopTrackPlayback(false);
  state.selectedStorm = storm || null;
  const parts = trackParts(storm);
  state.activeTrackIndex = Math.max(0, parts.observed.length - 1);
  if (focus && storm) fitStormTrack(storm,false);
  renderAll(); state.needsRender = true;
}

function renderAll() {
  renderStormList(); renderSources(); renderPersonalImpact(); renderHistoricalAnalogs(); renderBrief(); renderPro(); renderTimeline(); renderTrackStatus(); renderTrackPlayer(); syncFormalMap();
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
const stormNameZh = {BAVI:'巴威',DANAS:'丹娜丝',WIPHA:'韦帕',FRANCISCO:'范斯高','CO-MAY':'竹节草',KROSA:'罗莎',PODUL:'杨柳',KAJIKI:'剑鱼',NONGFA:'农法',PEIPAH:'琵琶',TAPAH:'塔巴',MITAG:'米娜',RAGASA:'桦加沙',NEOGURI:'浣熊',BUALOI:'夏浪',MATMO:'麦德姆',HALONG:'夏浪'};
const stormNameJa = {BAVI:'バービー'};
function cleanStormName(value='') {
  const text=String(value).replace(/台風解析・予報情報[^·|]*/g,'').replace(/[（(][^）)]*[）)]/g,' ').replace(/\s+/g,' ').trim();
  const latin=text.match(/[A-Za-z][A-Za-z-]{2,}/)?.[0];
  return (latin || text || '').toUpperCase();
}
function stormSequence(storm) {
  const raw=String(storm?.number || storm?.internationalNumber || storm?.id || '');
  const match=raw.match(/(\d{2})$/);
  if(!match) return null;
  const n=Number(match[1]); return Number.isFinite(n)&&n>0?n:null;
}
function displayStormName(storm) {
  if (!storm) return '';
  const name=cleanStormName(storm.name || storm.id) || 'UNNAMED';
  const seq=stormSequence(storm);
  const zh=stormNameZh[name] || (storm.localName && /[\u4e00-\u9fff]/.test(storm.localName) && !/台風解析|予報情報/.test(storm.localName) ? storm.localName : null);
  if(state.lang==='zh') return `${seq?`第${seq}号台风 `:'台风 '}${zh?`${zh}（${name}）`:name}`;
  if(state.lang==='ja') return `${seq?`台風${seq}号 `:'台風 '}${name}${storm.japaneseName||stormNameJa[name]?`（${storm.japaneseName||stormNameJa[name]}）`:''}`;
  if(state.lang==='ko') return `${seq?`제${seq}호 태풍 `:'태풍 '}${name}`;
  if(state.lang==='es') return `${seq?`Tifón n.º ${seq} `:'Tifón '}${name}`;
  if(state.lang==='fr') return `${seq?`Typhon n° ${seq} `:'Typhon '}${name}`;
  return `${seq?`Typhoon ${name} (No. ${seq})`:`Typhoon ${name}`}`;
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


function haversineKm(a,b){
  const dLat=rad(b.lat-a.lat),dLon=rad(normalizeLon(b.lon-a.lon));
  const q=Math.sin(dLat/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(q),Math.sqrt(Math.max(0,1-q)));
}
function impactRadiusKm(point,storm){
  const wind=Number(point?.windMs ?? storm?.windMs);
  return clamp(250+(Number.isFinite(wind)?wind*4.6:90),260,560);
}
function calculatePersonalImpact(storm,location){
  if(!storm||!location)return null;
  const points=trackParts(storm).points.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon));
  if(!points.length&&Number.isFinite(storm.lat)&&Number.isFinite(storm.lon))points.push(storm);
  if(!points.length)return null;
  const rows=points.map((point,index)=>({point,index,distance:haversineKm(location,point),radius:impactRadiusKm(point,storm)})).sort((a,b)=>a.index-b.index);
  const closest=rows.reduce((best,row)=>row.distance<best.distance?row:best,rows[0]);
  const affected=rows.filter(row=>row.distance<=row.radius&&row.point.time);
  const minDistance=closest.distance;
  let level='low';
  if(minDistance<=110)level='severe'; else if(minDistance<=260)level='high'; else if(minDistance<=520)level='medium'; else if(minDistance<=950)level='watch';
  const timed=rows.filter(row=>row.point.time&&!Number.isNaN(new Date(row.point.time).getTime()));
  const future=timed.filter(row=>new Date(row.point.time).getTime()>=Date.now()-3*3600e3);
  const closestTimed=(future.length?future:timed).reduce((best,row)=>!best||row.distance<best.distance?row:best,null);
  const start=affected[0]?.point.time||null,end=affected.at(-1)?.point.time||null;
  const forecastCount=points.filter(p=>p.forecast&&p.time).length;
  const hasSynthetic=points.some(p=>p.synthetic);
  const confidence=hasSynthetic?'low':forecastCount>=4?'high':forecastCount>=2||points.length>=4?'medium':'low';
  return {rows,closest,closestTimed,minDistance,level,start,end,confidence,radius:closest.radius};
}
function riskText(level){return t({low:'riskLow',watch:'riskWatch',medium:'riskMedium',high:'riskHigh',severe:'riskSevere'}[level]||'riskWatch');}
function riskAction(level){return t({low:'actionLow',watch:'actionWatch',medium:'actionMedium',high:'actionHigh',severe:'actionSevere'}[level]||'actionWatch');}
function localizedAdvice(){
  const zh=state.lang==='zh';
  return zh?{
    commute:[
      ['🧭','现在','查看所在地气象预警、公交和地铁官方账号；保存一条避开河边、低洼路段和地下通道的备用路线，并给手机与充电宝充满电。'],
      ['🕒','可能受影响前','如果当地发布停工停课、强风或暴雨警报，优先远程办公、错峰或提前返程；不要等到交通全面停运才离开。'],
      ['🏠','影响期间','非必要不通勤。已经在外时进入坚固室内场所，远离玻璃幕墙、广告牌、树木和积水路段，持续查看官方交通恢复通知。']
    ],
    outdoor:[
      ['📅','现在','把跑步、骑行、球类等活动准备一个室内替代方案；户外赛事或团体活动应明确取消条件和联系人。'],
      ['⛰️','可能受影响前','强风、雷雨或暴雨预警生效前就停止登山、露营、海边、水上运动和高空项目；不要只根据台风中心是否经过判断安全。'],
      ['🚫','影响期间','不要外出追风、观浪或拍摄。远离海堤、河道、树木、电线杆、脚手架和临时建筑，待当地部门明确解除风险后再恢复活动。']
    ],
    office:[
      ['💻','现在','确认单位远程办公、考勤和紧急联系规则；备份重要文件，给电脑、手机和移动电源充电。'],
      ['🪟','可能受影响前','收好窗边和阳台物品，检查门窗渗水风险；如通勤路径可能积水，尽早与主管确认远程或提前离岗安排。'],
      ['🏢','影响期间','留在建筑内部并远离窗户。若地下层出现进水风险，按物业指引转移到更高楼层；停电时不要擅自使用受损电气设备。']
    ],
    driving:[
      ['⛽','现在','提前加油或充电，保存离线地图；将车辆停在较高、排水良好且远离树木、广告牌和地下车库低点的位置。'],
      ['🛣️','可能受影响前','推迟非必要长途出行，避开沿海公路、桥梁、山路、隧道和易涝下穿道；出发前检查道路封闭和轮渡停航信息。'],
      ['🛑','影响期间','绝不要驶入看不清深度的积水。遇强风或能见度骤降时，在安全地点停车，远离树木和电线，并等待官方道路恢复信息。']
    ],
    family:[
      ['💊','现在','准备常用药、饮水、易保存食物、手电和充电设备；写下紧急联系人，并考虑婴幼儿、老人、残障人士和宠物的特殊需求。'],
      ['👨‍👩‍👧','可能受影响前','向家人用平静、具体的方式说明安排；确认接送、照护、备用电源和撤离去向，不要把行动拖到最后一刻。'],
      ['📻','影响期间','让家人待在远离窗户的安全区域，使用官方广播或手机警报获取信息；若收到疏散指令，应按指定路线尽快行动。']
    ],
    coastal:[
      ['🗺️','现在','查看当地风暴潮、海浪和疏散分区，确认最近的高地或避难点；固定户外物品，并安排船只和车辆转移。'],
      ['⬆️','可能受影响前','在道路拥堵、潮位上升或桥梁关闭前提前离开低洼沿海区域；重要证件和药物放入防水袋随身携带。'],
      ['🌊','影响期间','远离海滩、码头、海堤、河口和观浪点。即使风暂时减弱，也不要擅自返回，等待当地政府解除疏散或危险通知。']
    ]
  }:{
    commute:[['🧭','Now','Check local alerts and official transit channels. Save a route that avoids low areas, riverfronts and underpasses, and fully charge your phone.'],['🕒','Before possible impacts','Use remote work, leave early or shift travel when local wind, rain or closure alerts are issued. Do not wait for the network to shut down.'],['🏠','During impacts','Avoid non-essential commuting. If already outside, enter a sturdy building and stay away from glass, signs, trees and floodwater.']],
    outdoor:[['📅','Now','Prepare an indoor alternative and set clear cancellation rules for group activities.'],['⛰️','Before possible impacts','Stop hiking, camping, coastal, water and high-exposure activities before strong-wind or heavy-rain warnings begin.'],['🚫','During impacts','Do not go out to watch waves or record the storm. Stay away from seawalls, rivers, trees, power lines and temporary structures.']],
    office:[['💻','Now','Confirm remote-work and emergency-contact procedures. Back up files and charge devices.'],['🪟','Before possible impacts','Secure items near windows and confirm an early-departure or remote option if the commute may flood.'],['🏢','During impacts','Stay inside and away from windows. Follow building management instructions, especially if basements or power systems are affected.']],
    driving:[['⛽','Now','Fuel or charge early, save offline maps and park on higher ground away from trees and low underground areas.'],['🛣️','Before possible impacts','Postpone non-essential trips and avoid coastal roads, bridges, mountain routes, tunnels and flood-prone underpasses.'],['🛑','During impacts','Never drive into water of unknown depth. Stop in a safe place if wind or visibility becomes dangerous.']],
    family:[['💊','Now','Prepare medication, water, food, lights and charging. Include the needs of children, older adults, disabled people and pets.'],['👨‍👩‍👧','Before possible impacts','Explain the plan calmly and confirm pickup, care, backup power and evacuation arrangements.'],['📻','During impacts','Keep everyone in an interior safe area and follow official alerts. Leave promptly if authorities order evacuation.']],
    coastal:[['🗺️','Now','Check local storm-surge and evacuation zones, identify higher ground and secure outdoor items, boats and vehicles.'],['⬆️','Before possible impacts','Leave low coastal areas before roads congest, tides rise or bridges close. Keep documents and medication waterproof.'],['🌊','During impacts','Stay away from beaches, ports, seawalls and estuaries. Do not return until local authorities lift restrictions.']]
  };
}
function renderProfileAdvice(level='watch'){
  const catalog=localizedAdvice(),items=catalog[state.profile]||catalog.commute;
  const riskBanner=state.lang==='zh'
    ? {low:'目前无需立即改变日常安排，但建议保留提醒。',watch:'先准备替代方案，关注下一次官方更新。',medium:'非必要活动应准备调整，避免把决定拖到警报生效后。',high:'建议显著减少外出，并提前落实工作、交通或照护安排。',severe:'请把当地疏散、停工停课和应急指令置于所有个人计划之上。'}[level]
    : {low:'No immediate schedule change is suggested, but keep alerts enabled.',watch:'Prepare alternatives and check the next official update.',medium:'Be ready to change non-essential plans before alerts intensify.',high:'Reduce travel and put work, transport and care arrangements in place early.',severe:'Local evacuation and closure instructions take priority over all personal plans.'}[level];
  $('#profileAdvice').innerHTML=`<article class="advice-card"><span>⚑</span><p><strong>${escapeHtml(riskText(level))}</strong><small>${escapeHtml(riskBanner)}</small></p></article>`+items.map(([icon,title,text])=>`<article class="advice-card"><span>${icon}</span><p><strong>${escapeHtml(title)}</strong><small>${escapeHtml(text)}</small></p></article>`).join('');
}
function renderPersonalImpact(){
  const loc=state.userLocation,storm=state.selectedStorm,preview=$('#personalImpactPreview');
  $('#clearLocationButton').hidden=!loc;
  if(!loc){
    state.personalImpact=null;preview?.classList.remove('has-location');
    $('#personalImpactHeadline').textContent=t('locationPromptShort');$('#personalImpactDetail').textContent=t('locationPrivacyShort');$('#quickLocateButton').hidden=false;
    $('#personalRiskBadge').className='level-badge neutral';$('#personalRiskBadge').textContent=t('locationNeeded');$('#personalSummary').textContent=t('personalNoLocation');$('#personalMetrics').hidden=true;
    renderProfileAdvice('watch');return;
  }
  preview?.classList.add('has-location');$('#quickLocateButton').hidden=true;
  if(!storm){
    state.personalImpact=null;$('#personalImpactHeadline').textContent=t('selectedPlace');$('#personalImpactDetail').textContent=formatCoord(loc.lat,loc.lon);
    $('#personalRiskBadge').className='level-badge low';$('#personalRiskBadge').textContent=t('riskLow');$('#personalSummary').textContent=t('personalNoStorm');$('#personalMetrics').hidden=true;renderProfileAdvice('low');return;
  }
  const impact=calculatePersonalImpact(storm,loc);state.personalImpact=impact;
  if(!impact){$('#personalSummary').textContent=t('personalNoStorm');$('#personalMetrics').hidden=true;renderProfileAdvice('watch');return;}
  const nearest=Math.round(impact.minDistance);
  const closestTime=impact.closestTimed?.point?.time?formatDate(impact.closestTimed.point.time,true):t('noForecastTime');
  const windowText=impact.start?(impact.end&&impact.end!==impact.start?t('fromTo').replace('{start}',formatDate(impact.start,true)).replace('{end}',formatDate(impact.end,true)):formatDate(impact.start,true)):t('noImpactWindow');
  const confidence=t({high:'confidenceHigh',medium:'confidenceMedium',low:'confidenceLow'}[impact.confidence]);
  $('#personalImpactHeadline').textContent=riskText(impact.level);$('#personalImpactDetail').textContent=t('closestAt').replace('{time}',closestTime).replace('{distance}',String(nearest));
  $('#personalRiskBadge').className=`level-badge ${impact.level}`;$('#personalRiskBadge').textContent=riskText(impact.level);
  $('#personalSummary').textContent=`${formatCoord(loc.lat,loc.lon)} · ${riskAction(impact.level)}。${t('closestAt').replace('{time}',closestTime).replace('{distance}',String(nearest))}`;
  $('#personalMetrics').hidden=false;$('#nearestDistance').textContent=`${nearest} km`;$('#closestApproach').textContent=closestTime;$('#impactWindow').textContent=windowText;$('#impactConfidence').textContent=confidence;
  renderProfileAdvice(impact.level);
}
function setUserLocation(lat,lon,meta={}){
  if(!Number.isFinite(lat)||!Number.isFinite(lon))return;
  state.userLocation={lat:clamp(lat,-90,90),lon:normalizeLon(lon),accuracy:Number(meta.accuracy)||null,source:meta.source||'manual',savedAt:new Date().toISOString()};
  localStorage.setItem('tv-user-location',JSON.stringify(state.userLocation));state.locationPickMode=false;$('#mainMap').classList.remove('location-pick-mode');
  renderPersonalImpact();state.needsRender=true;syncFormalMap();showToast(t('locationReady'));
}
function clearUserLocation(){state.userLocation=null;state.personalImpact=null;localStorage.removeItem('tv-user-location');renderPersonalImpact();state.needsRender=true;syncFormalMap();showToast(t('locationCleared'));}
function requestUserLocation(){
  if(!navigator.geolocation){showToast(t('locationDenied'));return;}
  showToast(t('locating'));
  navigator.geolocation.getCurrentPosition(pos=>setUserLocation(pos.coords.latitude,pos.coords.longitude,{accuracy:pos.coords.accuracy,source:'gps'}),()=>showToast(t('locationDenied')),{enableHighAccuracy:false,timeout:10000,maximumAge:10*60*1000});
}
function beginMapLocationPick(){
  state.locationPickMode=true;if(state.mapMode!=='world')setMapMode('world');$('#mainMap').classList.add('location-pick-mode');$('#mainMap').dataset.pickHint=t('mapPickHint');showToast(t('pickLocationNow'));
}
function worldPointFromClient(clientX,clientY){
  const rect=canvas.getBoundingClientRect(),x=clientX-rect.left,y=clientY-rect.top,scale=worldScale();
  return {lon:normalizeLon(state.centerLon+(x-state.width/2)/scale),lat:clamp(state.centerLat-(y-state.height/2)/scale,-85,85)};
}
function drawUserLocation(colors){
  const loc=state.userLocation;if(!loc)return;const p=project(loc.lat,loc.lon);if(!p.visible)return;
  const impact=state.personalImpact,closest=impact?.closest?.point,cp=closest?project(closest.lat,closest.lon):null;
  ctx.save();
  if(cp?.visible){ctx.strokeStyle=colorAlpha(colors.brand,.48);ctx.lineWidth=1.2;ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(cp.x,cp.y);ctx.stroke();ctx.setLineDash([]);}
  ctx.fillStyle=colors.surface;ctx.strokeStyle=colors.brand;ctx.lineWidth=3;ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle=colors.brand;ctx.beginPath();ctx.arc(p.x,p.y,2.4,0,Math.PI*2);ctx.fill();
  ctx.font='700 9px system-ui';ctx.textAlign='center';ctx.fillStyle=colors.text2;ctx.fillText(state.lang==='zh'?'你的位置':'Your location',p.x,p.y-12);ctx.restore();
}

function analogScore(storm, analog) {
  if(!storm) return 0;
  const points=(storm.track||[]).filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon));
  const first=points[0]||storm,last=points.at(-1)||storm;
  const currentDir=inferDirection(points);
  const analogDir=inferDirection(analog.track);
  let score=25;
  if((storm.basin||'').toLowerCase().includes('pacific')) score+=18;
  if(currentDir===analogDir) score+=24; else if(currentDir?.[0]===analogDir?.[0]||currentDir?.at(-1)===analogDir?.at(-1)) score+=10;
  const wind=Number(storm.windMs ?? last.windMs);
  if(Number.isFinite(wind)) score+=Math.max(0,22-Math.abs(wind-analog.peakWind)*.7);
  const endpointDistance=haversineKm({lat:last.lat,lon:last.lon},{lat:analog.track.at(-1).lat,lon:analog.track.at(-1).lon});
  score+=Math.max(0,18-endpointDistance/180);
  if(state.userLocation){
    const userDist=Math.min(...analog.track.map(p=>haversineKm(state.userLocation,p)));
    score+=Math.max(0,15-userDist/120);
  }
  return clamp(Math.round(score),20,96);
}
function analogReasons(storm, analog) {
  const reasons=[];
  const points=storm?.track||[];
  if(points.length>1&&inferDirection(points)===inferDirection(analog.track)) reasons.push(t('similarPath'));
  const wind=Number(storm?.windMs ?? points.at(-1)?.windMs);
  if(Number.isFinite(wind)&&Math.abs(wind-analog.peakWind)<=15) reasons.push(t('similarIntensity'));
  if(state.userLocation&&Math.min(...analog.track.map(p=>haversineKm(state.userLocation,p)))<800) reasons.push(t('similarRegion'));
  if(!reasons.length) reasons.push(t('similarPath'));
  return reasons.slice(0,3);
}
function renderHistoricalAnalogs(){
  const container=$('#analogCards'),summary=$('#historySummary');if(!container||!summary)return;
  const storm=state.selectedStorm;
  if(!storm){container.innerHTML=`<div class="empty-storms">${escapeHtml(t('noAnalog'))}</div>`;summary.innerHTML='';return;}
  const ranked=historicalAnalogCatalog.map(a=>({...a,score:analogScore(storm,a)})).sort((a,b)=>b.score-a.score).slice(0,3);
  summary.innerHTML=`<span>↔</span><p><strong>${escapeHtml(t('historySummaryTitle'))}</strong><small>${escapeHtml(t('historySummaryText'))}</small></p>`;
  container.innerHTML=ranked.map(a=>{
    const local=state.lang==='zh'?a.localZh:a.name;
    const region=state.lang==='zh'?a.region:a.regionEn;
    const impact=state.lang==='zh'?a.impactZh:a.impactEn;
    const lesson=state.lang==='zh'?a.lessonZh:a.lessonEn;
    const active=state.activeAnalogId===a.id;
    return `<article class="analog-card"><div class="analog-head"><p><strong>${escapeHtml(`${a.year} ${local} (${a.name})`)}</strong><small>${escapeHtml(region)}</small></p><span class="analog-score">${a.score}% ${state.lang==='zh'?'相似':'match'}</span></div><div class="analog-reasons">${analogReasons(storm,a).map(r=>`<span>${escapeHtml(r)}</span>`).join('')}</div><p class="analog-impact"><b>${escapeHtml(t('pastImpact'))}：</b>${escapeHtml(impact)}</p><p class="analog-lesson"><b>${escapeHtml(t('lesson'))}：</b>${escapeHtml(lesson)}</p><div class="analog-actions"><button class="${active?'active':''}" data-analog-id="${a.id}">${escapeHtml(active?t('removeOverlay'):t('overlayTrack'))}</button></div></article>`;
  }).join('');
  $$('[data-analog-id]',container).forEach(btn=>btn.addEventListener('click',()=>{state.activeAnalogId=state.activeAnalogId===btn.dataset.analogId?null:btn.dataset.analogId;renderHistoricalAnalogs();state.needsRender=true;syncFormalMap();}));
}
function drawHistoricalAnalog(colors){
  if(!state.activeAnalogId)return;const analog=historicalAnalogCatalog.find(a=>a.id===state.activeAnalogId);if(!analog)return;
  ctx.save();ctx.strokeStyle=colorAlpha(colors.text2,.58);ctx.lineWidth=1.6;ctx.setLineDash([3,5]);ctx.beginPath();let started=false;
  for(const p of analog.track){const q=project(p.lat,p.lon);if(!q.visible){started=false;continue;}if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);}ctx.stroke();ctx.setLineDash([]);
  analog.track.forEach(p=>{const q=project(p.lat,p.lon);if(!q.visible)return;ctx.fillStyle=colorAlpha(colors.text2,.68);ctx.beginPath();ctx.arc(q.x,q.y,2.2,0,Math.PI*2);ctx.fill();});ctx.restore();
}

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
    $('#plainTiming').textContent = trackParts(storm).forecast.length ? t('within48') : t('unknown'); $('#plainAction').textContent = t('followLocal');
  }
  $('#publicLead').textContent = t('publicLead');
  if(state.userLocation){
    const personal=calculatePersonalImpact(storm,state.userLocation);
    if(personal){
      const nearest=Math.round(personal.minDistance);
      const when=personal.closestTimed?.point?.time?formatDate(personal.closestTimed.point.time,true):t('noForecastTime');
      $('#plainTiming').textContent=personal.closestTimed?.point?.time?when:t('noForecastTime');
      $('#plainAction').textContent=riskAction(personal.level);
      $('#publicLead').textContent=`${riskText(personal.level)}。${t('closestAt').replace('{time}',when).replace('{distance}',String(nearest))}`;
    }
  }
  $('#mapTip').textContent = trackParts(storm).points.length>1 ? t('mapTip') : t('trackUnavailable');
}
function renderPro() {
  const storm = state.selectedStorm;
  if (!storm) {
    $('#proName').textContent = t('noSystems'); $('#metricCoord').textContent = '—'; $('#metricWind').innerHTML = '—'; $('#metricPressure').innerHTML = '—'; return;
  }
  const point = trackParts(storm).points[state.activeTrackIndex] || storm;
  $('#proName').textContent = displayStormName(storm);
  $('#proStatus').textContent = storm.demo ? 'DEMO' : 'LIVE';
  $('#metricCoord').textContent = formatCoord(point.lat,point.lon);
  $('#metricWind').innerHTML = Number.isFinite(point.windMs ?? storm.windMs) ? `${Math.round(point.windMs ?? storm.windMs)} <em>m/s</em>` : '—';
  $('#metricPressure').innerHTML = Number.isFinite(point.pressureHpa ?? storm.pressureHpa) ? `${Math.round(point.pressureHpa ?? storm.pressureHpa)} <em>hPa</em>` : '—';
  $('#metricMove').innerHTML = `${inferDirection(storm.track)} · <em>${storm.demo ? '18 km/h' : t('unknown')}</em>`;
  const sourceCount = storm.sources?.length || 1; const spread = storm.demo ? 85 : Math.max(25,180-sourceCount*28);
  $('#spreadValue').textContent = `≤ ${spread} km`; $('#spreadBar').style.width = `${clamp(100-spread/2.2,20,90)}%`;
}
function renderTimeline() {
  const el = $('#timeline'); if (!el) return;
  const {points}=trackParts();
  if (!points.length) { el.innerHTML = ''; return; }
  el.innerHTML = points.map((p,i) => `<button class="timeline-item ${p.forecast?'forecast':''} ${p.synthetic?'trend':''}" data-track-index="${i}"><time>${formatDate(p.time,true)}</time><i></i><p><span>${p.synthetic?t('trendReference'):(p.forecast?t('forecastWord'):t('observedWord'))}</span><strong>${Number.isFinite(p.windMs)?`${Math.round(p.windMs)} m/s`:formatCoord(p.lat,p.lon)}</strong></p></button>`).join('');
  $$('[data-track-index]',el).forEach(btn => btn.addEventListener('click',()=>setPlaybackIndex(+btn.dataset.trackIndex)));
}

function uniqueTrackPoints(track=[]) {
  const output=[];
  for(const point of track.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)).sort((a,b)=>new Date(a.time||0)-new Date(b.time||0))){
    const previous=output.at(-1);
    if(previous&&Math.abs(previous.lat-point.lat)<.02&&Math.abs(normalizeLon(previous.lon-point.lon))<.02&&Boolean(previous.forecast)===Boolean(point.forecast)) continue;
    output.push(point);
  }
  return output;
}
function buildTrendForecast(observed=[]){
  if(observed.length<2)return[];
  const last=observed.at(-1);
  let anchorIndex=Math.max(0,observed.length-5);
  let anchor=observed[anchorIndex];
  while(anchorIndex<observed.length-1&&Math.hypot(last.lat-anchor.lat,normalizeLon(last.lon-anchor.lon))<.18){anchor=observed[++anchorIndex];}
  if(anchor===last)anchor=observed[Math.max(0,observed.length-2)];
  const t0=new Date(anchor.time||0).getTime(),t1=new Date(last.time||0).getTime();
  const hours=Number.isFinite(t0)&&Number.isFinite(t1)&&t1>t0?(t1-t0)/3600000:Math.max(6,(observed.length-1-anchorIndex)*6);
  let vLat=(last.lat-anchor.lat)/hours,vLon=normalizeLon(last.lon-anchor.lon)/hours;
  const magnitude=Math.hypot(vLat,vLon);
  if(magnitude<.015){const dir=inferDirection(observed);const vectors={NW:[.07,-.09],NE:[.07,.09],SW:[-.07,-.09],SE:[-.07,.09],N:[.09,0],S:[-.09,0],E:[0,.1],W:[0,-.1]};[vLat,vLon]=vectors[dir]||[.04,-.06];}
  const baseTime=Number.isFinite(t1)&&t1>0?t1:Date.now();
  const horizons=[6,12,24,36,48];
  return horizons.map((h,i)=>{
    const decay=1-i*.07;
    return {lat:clamp(last.lat+vLat*h*decay,-75,75),lon:normalizeLon(last.lon+vLon*h*decay),time:new Date(baseTime+h*3600000).toISOString(),windMs:Number.isFinite(last.windMs)?Math.max(15,last.windMs-i*2):null,pressureHpa:Number.isFinite(last.pressureHpa)?last.pressureHpa+i*3:null,forecast:true,synthetic:true,source:'trend'};
  });
}
function intensityClass(windMs){
  const wind=Number(windMs);
  if(!Number.isFinite(wind))return 'unknown';
  if(wind<17.2)return 'td';
  if(wind<24.5)return 'ts';
  if(wind<32.7)return 'sts';
  if(wind<41.5)return 'ty';
  if(wind<51)return 'sty';
  return 'super';
}
function intensityLabel(windMs){
  return t({td:'intensityTD',ts:'intensityTS',sts:'intensitySTS',ty:'intensityTY',sty:'intensitySTY',super:'intensitySuper'}[intensityClass(windMs)]||'unknown');
}
function intensityColor(windMs,colors){
  return ({td:'#2d8cff',ts:'#e9c83d',sts:'#ff9a3d',ty:'#ef4444',sty:'#df4aa3',super:'#8b5cf6'})[intensityClass(windMs)]||colors.text3;
}
function trackParts(storm=state.selectedStorm){
  const raw=uniqueTrackPoints(storm?.track||[]);
  const observed=raw.filter(p=>!p.forecast);
  const officialAll=raw.filter(p=>p.forecast&&!p.synthetic);
  const lastObservedTime=new Date(observed.at(-1)?.time||0).getTime();
  const horizonMs=(Number(state.forecastHorizon)||120)*3600e3;
  const withinHorizon=(point)=>{
    const time=new Date(point.time||0).getTime();
    return !Number.isFinite(lastObservedTime)||lastObservedTime<=0||!Number.isFinite(time)||time<=lastObservedTime+horizonMs;
  };
  const officialForecast=officialAll.filter(withinHorizon);
  const trendAll=officialAll.length>=2?[]:buildTrendForecast(observed);
  const trendForecast=trendAll.filter(withinHorizon);
  const forecast=officialForecast.length?officialForecast:trendForecast;
  const points=[...observed,...forecast];
  return {points,observed,forecast,officialForecast,trendForecast,usingTrend:!officialForecast.length&&trendForecast.length>0};
}
function renderTrackStatus(){
  const el=$('#trackStatus'); if(!el)return;
  const {points,observed,forecast,usingTrend}=trackParts();
  if(!state.selectedStorm||!points.length){el.innerHTML=`<span class="status-warn">!</span><b>${t('noTrack')}</b>`;return;}
  let message;
  if(points.length===1)message=t('singleFixOnly');
  else if(usingTrend)message=`${observed.length} ${t('observedPoints')} · ${t('trendStatus')}`;
  else if(forecast.length)message=`${t('trackReady')} · ${observed.length} ${t('observedPoints')} · ${forecast.length} ${t('forecastPoints')}`;
  else message=`${observed.length} ${t('observedPoints')} · ${t('forecastUnavailable')}`;
  el.innerHTML=`<span class="${forecast.length?'status-ok':'status-warn'}">${forecast.length?'✓':'i'}</span><b>${escapeHtml(message)}</b>`;
  const legend=$('#forecastLegend');if(legend){legend.classList.toggle('trend',usingTrend);legend.querySelector('b').textContent=usingTrend?t('trendNotOfficial'):t('forecast');}
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
    clearTimeout(timer); const storms=availableStorms(); selectStorm(storms[0]||null,true); renderAll();
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
  return {ocean:get('--ocean'),land:get('--land'),landStroke:get('--land-stroke'),grid:get('--grid'),brand:get('--brand'),warning:get('--warning'),trend:'#8b5cf6',danger:get('--danger'),text2:get('--text-2'),surface:get('--surface-solid')};
}
function worldScale() { return Math.min(state.width / 360, state.height / 180) * state.zoom; }
function mapVisualCenterX(){return !isMobile()&&state.view==='simple'?state.width*.67:state.width*.5;}
function projectWorld(lat,lon) {
  const scale = worldScale();
  return {x:mapVisualCenterX()+normalizeLon(lon-state.centerLon)*scale,y:state.height/2-(lat-state.centerLat)*scale,visible:true};
}
function globeRadius(){return Math.min(state.width,state.height)*(isMobile()?.37:.36)*state.zoom;}
function globeCenter(){return {x:mapVisualCenterX(),y:state.height*.5};}
function projectGlobe(lat,lon) {
  const r=globeRadius(), c=globeCenter(), phi=rad(lat), phi0=rad(state.centerLat), lambda=rad(normalizeLon(lon-state.centerLon));
  const cosPhi=Math.cos(phi),sinPhi=Math.sin(phi),cosPhi0=Math.cos(phi0),sinPhi0=Math.sin(phi0),z=sinPhi0*sinPhi+cosPhi0*cosPhi*Math.cos(lambda);
  return {x:c.x+r*cosPhi*Math.sin(lambda),y:c.y-r*(cosPhi0*sinPhi-sinPhi0*cosPhi*Math.cos(lambda)),z,visible:z>-.01};
}
function project(lat,lon){return state.mapMode==='world'?projectWorld(lat,lon):projectGlobe(lat,lon);}

function drawBackground(colors,time=0) {
  ctx.clearRect(0,0,state.width,state.height); ctx.fillStyle=colors.ocean; ctx.fillRect(0,0,state.width,state.height);
  if(state.mapMode==='globe') {
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--bg').trim(); ctx.fillRect(0,0,state.width,state.height);
    const c=globeCenter(),r=globeRadius(); const halo=ctx.createRadialGradient(c.x,c.y,r*.72,c.x,c.y,r*1.25); halo.addColorStop(0,'rgba(25,145,176,0)');halo.addColorStop(.82,'rgba(35,170,195,.1)');halo.addColorStop(1,'rgba(35,170,195,0)');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(c.x,c.y,r*1.25,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.clip();ctx.fillStyle=colors.ocean;ctx.fillRect(c.x-r,c.y-r,r*2,r*2);drawMapLayers(colors,time);ctx.restore();ctx.strokeStyle=colors.landStroke;ctx.lineWidth=1;ctx.beginPath();ctx.arc(c.x,c.y,r,0,Math.PI*2);ctx.stroke();
  } else drawMapLayers(colors,time);
}
function drawMapLayers(colors,time=0){ drawGrid(colors); drawLand(colors); drawMajorCities(colors); drawHistoricalAnalog(colors); if(state.layers.wind)drawWindFootprints(colors); if(state.layers.cone)drawCone(colors); if(state.layers.track)drawTrack(colors); drawUserLocation(colors); drawStormPulse(colors,time); }
function drawGrid(colors) {
  ctx.strokeStyle=colors.grid;ctx.lineWidth=.7;
  for(let lat=-60;lat<=60;lat+=30){traceGeoLine(Array.from({length:121},(_,i)=>[lat,-180+i*3]),false);}
  for(let lon=-180;lon<180;lon+=30){traceGeoLine(Array.from({length:61},(_,i)=>[-90+i*3,lon]),false);}
}
function traceGeoLine(points,close=false){ctx.beginPath();let started=false,last=null;for(const [lat,lon] of points){const p=project(lat,lon);if(!p.visible){started=false;last=null;continue;}if(last&&Math.abs(p.x-last.x)>state.width*.45){started=false;}if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);last=p;}if(close)ctx.closePath();ctx.stroke();}
function drawLand(colors) {
  if(!state.land?.features?.length)return;
  const geometry=state.land.features[0].geometry;
  const polygons=geometry.type==='MultiPolygon'?geometry.coordinates:[geometry.coordinates];
  if(state.mapMode!=='globe'){
    ctx.fillStyle=colors.land;ctx.strokeStyle=colors.landStroke;ctx.lineWidth=.65;
    for(const polygon of polygons){for(const ring of polygon){
      ctx.beginPath();let started=false,last=null;
      for(const [lon,lat] of ring){const p=project(lat,lon);if(!p.visible){started=false;last=null;continue;}if(last&&Math.abs(p.x-last.x)>state.width*.45)started=false;if(!started){ctx.moveTo(p.x,p.y);started=true;}else ctx.lineTo(p.x,p.y);last=p;}
      if(started){ctx.closePath();ctx.fill('evenodd');ctx.stroke();}
    }}
    return;
  }
  // Safe globe rendering: only fill rings that are entirely on the visible hemisphere.
  // Rings crossing the horizon are drawn as separated coastline runs, so Canvas never
  // closes a partial polygon with a giant diagonal triangle across the globe.
  ctx.save();ctx.lineJoin='round';ctx.lineCap='round';
  for(const polygon of polygons){for(const ring of polygon){
    const projected=ring.map(([lon,lat])=>projectGlobe(lat,lon));
    const fullyVisible=projected.length>2&&projected.every(p=>p.visible);
    if(fullyVisible){
      ctx.beginPath();projected.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
      ctx.fillStyle=colors.land;ctx.fill('evenodd');ctx.strokeStyle=colors.landStroke;ctx.lineWidth=.75;ctx.stroke();
      continue;
    }
    const runs=[];let run=[];
    projected.forEach((p,i)=>{
      const prev=i?projected[i-1]:null;
      const broken=!p.visible||(prev&&Math.hypot(p.x-prev.x,p.y-prev.y)>globeRadius()*.35);
      if(broken){if(run.length>1)runs.push(run);run=[];if(p.visible)run=[p];}
      else run.push(p);
    });
    if(run.length>1)runs.push(run);
    for(const segment of runs){
      ctx.beginPath();segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
      ctx.strokeStyle=colorAlpha(colors.land,.72);ctx.lineWidth=3.2;ctx.stroke();
      ctx.strokeStyle=colors.landStroke;ctx.lineWidth=.8;ctx.stroke();
    }
  }}
  ctx.restore();
}


function drawMajorCities(colors){
  if(!state.layers.labels||!majorCities.length)return;
  const stormPoints=trackParts(state.selectedStorm).points;
  const candidates=[];
  for(const city of majorCities){
    const point=project(city.lat,city.lon);
    if(!point.visible||point.x<8||point.x>state.width-8||point.y<10||point.y>state.height-8)continue;
    let nearest=Infinity;
    if(stormPoints.length)for(const stormPoint of stormPoints)nearest=Math.min(nearest,haversineKm(city,stormPoint));
    const relevant=nearest<1500;
    if(state.zoom<1.08&&!relevant&&city.rank<5)continue;
    if(state.zoom<1.35&&!relevant&&city.rank<4)continue;
    candidates.push({city,point,nearest,relevant,priority:(relevant?10:0)+city.rank});
  }
  candidates.sort((a,b)=>b.priority-a.priority||a.nearest-b.nearest);
  const boxes=[],limit=isMobile()?7:(state.zoom<1.15?13:state.zoom<1.8?22:32);
  ctx.save();
  ctx.textBaseline='middle';ctx.font=`650 ${isMobile()?10:11}px ${getComputedStyle(document.body).fontFamily}`;
  let drawn=0;
  for(const item of candidates){
    if(drawn>=limit)break;
    const label=cityName(item.city),metrics=ctx.measureText(label),w=metrics.width+12,h=18;
    const x=item.point.x+7,y=item.point.y-h/2;
    const box={left:x-2,right:x+w,top:y-1,bottom:y+h+1};
    if(boxes.some(other=>!(box.right<other.left||box.left>other.right||box.bottom<other.top||box.top>other.bottom)))continue;
    boxes.push(box);drawn++;
    ctx.fillStyle=item.relevant?colorAlpha(colors.warning,.88):colorAlpha(colors.text2,.65);
    ctx.beginPath();ctx.arc(item.point.x,item.point.y,item.relevant?2.8:2.1,0,Math.PI*2);ctx.fill();
    ctx.fillStyle=colorAlpha(colors.surface,.86);ctx.beginPath();ctx.roundRect(x,y,w,h,5);ctx.fill();
    ctx.strokeStyle=colorAlpha(colors.landStroke,.55);ctx.lineWidth=.7;ctx.stroke();
    ctx.fillStyle=item.relevant?colors.text2:colorAlpha(colors.text2,.82);ctx.textAlign='left';ctx.fillText(label,x+6,y+h/2+.3);
  }
  ctx.restore();
}

function geoCirclePoints(lat,lon,radiusKm,steps=96){
  const angular=radiusKm/6371,lat1=rad(lat),lon1=rad(lon),points=[];
  for(let i=0;i<=steps;i++){
    const bearing=Math.PI*2*i/steps;
    const lat2=Math.asin(Math.sin(lat1)*Math.cos(angular)+Math.cos(lat1)*Math.sin(angular)*Math.cos(bearing));
    const lon2=lon1+Math.atan2(Math.sin(bearing)*Math.sin(angular)*Math.cos(lat1),Math.cos(angular)-Math.sin(lat1)*Math.sin(lat2));
    points.push([lat2*180/Math.PI,normalizeLon(lon2*180/Math.PI)]);
  }
  return points;
}
function drawGeoArea(lat,lon,radiusKm,fill,stroke,label){
  const pts=geoCirclePoints(lat,lon,radiusKm,state.mapMode==='globe'?112:84).map(([a,b])=>project(a,b));
  const allVisible=pts.every(p=>p.visible),runs=[];let run=[];
  for(const p of pts){if(!p.visible){if(run.length>1)runs.push(run);run=[];continue;}if(run.length&&Math.hypot(p.x-run.at(-1).x,p.y-run.at(-1).y)>(state.mapMode==='globe'?globeRadius()*.45:state.width*.45)){if(run.length>1)runs.push(run);run=[];}run.push(p);}if(run.length>1)runs.push(run);
  ctx.save();ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=1.25;
  if(allVisible){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fill();ctx.stroke();}
  else for(const segment of runs){ctx.beginPath();segment.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();}
  if(state.layers.labels&&!isMobile()&&state.view==='pro'&&label){const q=project(lat,lon);if(q.visible){const edge=project(lat,normalizeLon(lon+radiusKm/(111*Math.max(.2,Math.cos(rad(lat))))));if(edge.visible){ctx.font='700 11px '+getComputedStyle(document.body).fontFamily;ctx.fillStyle=stroke;ctx.textAlign='left';ctx.fillText(label,edge.x+6,edge.y-4);}}}
  ctx.restore();
}
function estimatedWindRadii(point,storm){
  const wind=Number(point?.windMs??storm?.windMs);
  if(!Number.isFinite(wind)||wind<17)return[];
  const gale=clamp(150+wind*4.6,210,520);
  const rows=[{km:gale,key:'galeRadius',fill:'rgba(230,151,47,.10)',stroke:'rgba(218,126,24,.55)'}];
  if(wind>=25)rows.push({km:clamp(gale*.56,110,300),key:'stormRadius',fill:'rgba(235,106,48,.11)',stroke:'rgba(220,91,34,.62)'});
  if(wind>=33)rows.push({km:clamp(gale*.28,55,160),key:'typhoonRadius',fill:'rgba(213,66,66,.13)',stroke:'rgba(201,55,55,.72)'});
  return rows;
}
function drawWindFootprints(colors){
  const storm=state.selectedStorm;if(!storm)return;
  const {points,observed}=trackParts(storm);const current=observed.at(-1)||points[0]||storm;
  if(!current||!Number.isFinite(current.lat)||!Number.isFinite(current.lon))return;
  const radii=Array.isArray(storm.windRadii)&&storm.windRadii.length?storm.windRadii:estimatedWindRadii(current,storm);
  [...radii].sort((a,b)=>b.km-a.km).forEach((item,index)=>drawGeoArea(current.lat,current.lon,item.km,item.fill||colorAlpha(colors.warning,.08+index*.025),item.stroke||colorAlpha(colors.warning,.45+index*.1),`${t(item.key||'windRange')} · ${Math.round(item.km)} km${storm.windRadii?'':` · ${t('estimated')}`}`));
}

function drawCone(colors) {
  const storm=state.selectedStorm;const parts=trackParts(storm),points=parts.forecast;if(points.length<2)return;
  const widths=points.map((_,i)=>(parts.usingTrend?90:30)+i*(parts.usingTrend?42:28));const left=[],right=[];
  points.forEach((p,i)=>{const prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)];const angle=Math.atan2(next.lat-prev.lat,normalizeLon(next.lon-prev.lon));const km=widths[i],dLat=km/111,dLon=km/(111*Math.max(.25,Math.cos(rad(p.lat))));left.push([p.lat-Math.sin(angle)*dLat,p.lon+Math.cos(angle)*dLon]);right.push([p.lat+Math.sin(angle)*dLat,p.lon-Math.cos(angle)*dLon]);});
  const polygon=[...left,...right.reverse()],coneColor=parts.usingTrend?colors.trend:colors.warning;ctx.save();ctx.fillStyle=colorAlpha(coneColor,parts.usingTrend?.08:.14);ctx.strokeStyle=colorAlpha(coneColor,parts.usingTrend?.48:.52);ctx.lineWidth=1.2;ctx.setLineDash(parts.usingTrend?[5,6]:[]);
  const projected=polygon.map(([lat,lon])=>project(lat,lon));
  if(state.mapMode!=='globe'||projected.every(p=>p.visible)){ctx.beginPath();projected.forEach((q,i)=>i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y));ctx.closePath();ctx.fill();ctx.stroke();}
  else{let started=false,last=null;ctx.beginPath();projected.forEach(q=>{if(!q.visible||(last&&Math.hypot(q.x-last.x,q.y-last.y)>globeRadius()*.4)){started=false;last=null;return;}if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);last=q;});ctx.stroke();}
  ctx.restore();
}
function drawTrack(colors) {
  const storm=state.selectedStorm;const {points,observed,forecast,usingTrend}=trackParts(storm);if(!points.length)return;
  const joinedForecast=forecast.length&&observed.length?[observed.at(-1),...forecast]:forecast;
  drawTrackLine(observed,colors.brand,false,.20,false);
  drawTrackLine(joinedForecast,usingTrend?colors.trend:colors.warning,true,usingTrend?.14:.18,false);
  const activeMax=state.playing?state.activeTrackIndex:points.length-1;
  const played=points.slice(0,Math.max(1,activeMax+1));
  const playedObserved=played.filter(p=>!p.forecast),playedForecast=played.filter(p=>p.forecast);
  drawTrackLine(playedObserved,colors.brand,false,.38,true);
  if(playedForecast.length){const joined=playedObserved.length?[playedObserved.at(-1),...playedForecast]:playedForecast;drawTrackLine(joined,usingTrend?colors.trend:colors.warning,true,.34,true);}
  points.forEach((p,i)=>{
    const q=project(p.lat,p.lon);if(!q.visible)return;
    const active=i===state.activeTrackIndex,muted=state.playing&&i>activeMax;
    const typeColor=p.synthetic?colors.trend:(p.forecast?colors.warning:colors.brand);
    const nodeColor=intensityColor(p.windMs??storm.windMs,colors);
    ctx.save();ctx.globalAlpha=muted?.28:1;ctx.shadowColor=colorAlpha(nodeColor,.32);ctx.shadowBlur=active?14:0;ctx.strokeStyle=colors.surface;ctx.lineWidth=active?3.5:2.5;ctx.fillStyle=nodeColor;
    if(p.synthetic){ctx.beginPath();ctx.rect(q.x-(active?7:5),q.y-(active?7:5),(active?14:10),(active?14:10));ctx.fill();ctx.stroke();ctx.strokeStyle=typeColor;ctx.lineWidth=1.5;ctx.stroke();}
    else if(p.forecast){ctx.beginPath();ctx.moveTo(q.x,q.y-(active?8:6));ctx.lineTo(q.x+(active?8:6),q.y);ctx.lineTo(q.x,q.y+(active?8:6));ctx.lineTo(q.x-(active?8:6),q.y);ctx.closePath();ctx.fill();ctx.stroke();}
    else{ctx.beginPath();ctx.arc(q.x,q.y,active?7:5.5,0,Math.PI*2);ctx.fill();ctx.stroke();}
    ctx.restore();
    if(state.layers.labels&&!isMobile()&&(active||i===0||i===points.length-1)){ctx.save();ctx.font='750 12px '+getComputedStyle(document.body).fontFamily;ctx.fillStyle=colors.text2;ctx.textAlign='center';ctx.fillText(formatDate(p.time,true).replace(/,.*$/,''),q.x,q.y-12);ctx.restore();}
  });
  if(state.layers.labels&&!isMobile()){const current=observed.at(-1)||points[0],q=project(current.lat,current.lon);if(q.visible){ctx.save();ctx.font='850 13px '+getComputedStyle(document.body).fontFamily;ctx.fillStyle=colors.text2;ctx.textAlign='left';ctx.fillText(displayStormName(storm),q.x+14,q.y+5);ctx.restore();}}
}
function drawTrackLine(points,color,dashed,haloAlpha=.2,strong=false){
  if(points.length<2)return;
  const trace=()=>{ctx.beginPath();let started=false,last=null;for(const p of points){const q=project(p.lat,p.lon);if(!q.visible||(last&&Math.hypot(q.x-last.x,q.y-last.y)>(state.mapMode==='globe'?globeRadius()*.45:state.width*.45))){started=false;last=null;continue;}if(!started){ctx.moveTo(q.x,q.y);started=true;}else ctx.lineTo(q.x,q.y);last=q;}};
  ctx.save();ctx.lineJoin='round';ctx.lineCap='round';ctx.setLineDash([]);ctx.strokeStyle=colorAlpha(color,haloAlpha);ctx.lineWidth=strong?9:7;trace();ctx.stroke();ctx.strokeStyle=color;ctx.lineWidth=strong?4.5:3.2;ctx.setLineDash(dashed?[10,8]:[]);trace();ctx.stroke();ctx.restore();
}
function drawStormPulse(colors,time=0) {
  const storm=state.selectedStorm,points=trackParts(storm).points,point=points[state.activeTrackIndex]||storm;
  if(!point||!Number.isFinite(point.lat)||!Number.isFinite(point.lon))return;
  const p=project(point.lat,point.lon);if(!p.visible)return;
  const wind=Number(point.windMs??storm?.windMs??0),pressure=Number(point.pressureHpa??storm?.pressureHpa);
  const color=intensityColor(wind,colors),direction=point.lat>=0?-1:1;
  const estimated=estimatedWindRadii(point,storm),outerKm=estimated[0]?.km||clamp(170+wind*4,190,500);
  const edge=project(point.lat,normalizeLon(point.lon+outerKm/(111*Math.max(.25,Math.cos(rad(point.lat))))));
  const pxRadius=clamp(edge.visible?Math.abs(edge.x-p.x):36,isMobile()?24:30,isMobile()?55:74);
  const phase=reduceMotion?0:(time/4200)%(Math.PI*2);
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  // Three restrained spiral bands show rotation direction without pretending to be observed cloud structure.
  for(let band=0;band<3;band++){
    ctx.beginPath();
    for(let i=0;i<=42;i++){
      const t=i/42,angle=phase*direction+band*Math.PI*2/3+direction*(.45+t*1.8*Math.PI),r=5+t*pxRadius*(.58+band*.10);
      const x=p.x+Math.cos(angle)*r,y=p.y+Math.sin(angle)*r*.72;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.strokeStyle=colorAlpha(color,.13+band*.035);ctx.lineWidth=band===0?2.2:1.4;ctx.stroke();
  }
  // Tangential vectors provide a meteorological circulation cue.
  const arrowRadius=pxRadius*.58;
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4+phase*direction*.35,x=p.x+Math.cos(a)*arrowRadius,y=p.y+Math.sin(a)*arrowRadius*.72;
    const tangent=a+direction*Math.PI/2,len=6+clamp(wind,0,65)/14;
    const x2=x+Math.cos(tangent)*len,y2=y+Math.sin(tangent)*len;
    ctx.strokeStyle=colorAlpha(color,.55);ctx.fillStyle=colorAlpha(color,.62);ctx.lineWidth=1.25;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();
    const ah=3.1;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(tangent-.55)*ah,y2-Math.sin(tangent-.55)*ah);ctx.lineTo(x2-Math.cos(tangent+.55)*ah,y2-Math.sin(tangent+.55)*ah);ctx.closePath();ctx.fill();
  }
  // Eye and centre fix.
  ctx.fillStyle=colors.surface;ctx.strokeStyle=color;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(p.x,p.y,8,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();
  if(!isMobile()&&state.view==='pro'){
    const label=[Number.isFinite(wind)?`${Math.round(wind)} m/s`:null,Number.isFinite(pressure)?`${Math.round(pressure)} hPa`:null].filter(Boolean).join(' · ');
    if(label){ctx.font=`750 11px ${getComputedStyle(document.body).fontFamily}`;const w=ctx.measureText(label).width+12,x=p.x+12,y=p.y+12;ctx.fillStyle=colorAlpha(colors.surface,.9);ctx.beginPath();ctx.roundRect(x,y,w,20,6);ctx.fill();ctx.strokeStyle=colorAlpha(color,.35);ctx.lineWidth=.8;ctx.stroke();ctx.fillStyle=colors.text2;ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(label,x+6,y+10);}
  }
  ctx.restore();
}
function colorAlpha(color,alpha){if(color.startsWith('#')){const h=color.slice(1),v=h.length===3?h.split('').map(x=>x+x).join(''):h;return `rgba(${parseInt(v.slice(0,2),16)},${parseInt(v.slice(2,4),16)},${parseInt(v.slice(4,6),16)},${alpha})`;}return color;}
function animate(time=0) {
  const fps=isMobile()?24:36;if(time-state.lastFrame<1000/fps){requestAnimationFrame(animate);return;}state.lastFrame=time;
  if(!state.dragging){state.centerLon+=normalizeLon(state.targetLon-state.centerLon)*.11;state.centerLat+=(state.targetLat-state.centerLat)*.11;state.zoom+=(state.targetZoom-state.zoom)*.11;}
  drawBackground(canvasColors(),time);requestAnimationFrame(animate);
}
function hitTrack(clientX,clientY){const points=trackParts().points;if(!points.length)return-1;const rect=canvas.getBoundingClientRect(),x=clientX-rect.left,y=clientY-rect.top;let hit=-1,best=20;points.forEach((p,i)=>{const q=project(p.lat,p.lon);if(!q.visible)return;const d=Math.hypot(q.x-x,q.y-y);if(d<best){best=d;hit=i;}});return hit;}
function showTooltip(index,x,y){const p=trackParts().points[index];if(index<0||!p){tooltip.classList.remove('visible');return;}const kind=p.synthetic?t('trendNotOfficial'):(p.forecast?t('officialForecast'):t('liveObservation'));tooltip.innerHTML=`<strong>${kind}</strong><span>${formatDate(p.time,true)}<br>${formatCoord(p.lat,p.lon)}<br>${Number.isFinite(p.windMs)?`${Math.round(p.windMs)} m/s`:'—'} · ${Number.isFinite(p.pressureHpa)?`${Math.round(p.pressureHpa)} hPa`:'—'}</span>`;tooltip.style.left=`${x}px`;tooltip.style.top=`${y}px`;tooltip.classList.add('visible');}
function showNodeCard(index){
  const point=trackParts().points[index],card=$('#nodeCard');if(!card||!point)return;
  const type=point.synthetic?t('trendNotOfficial'):(point.forecast?t('officialForecast'):t('liveObservation'));
  $('#nodeCardType').textContent=type;$('#nodeCardTitle').textContent=formatDate(point.time,true);$('#nodeCardCoord').textContent=formatCoord(point.lat,point.lon);
  $('#nodeCardWind').textContent=Number.isFinite(point.windMs)?`${Math.round(point.windMs)} m/s`:'—';$('#nodeCardPressure').textContent=Number.isFinite(point.pressureHpa)?`${Math.round(point.pressureHpa)} hPa`:'—';
  $('#nodeCardIntensity').textContent=intensityLabel(point.windMs??state.selectedStorm?.windMs);
  $('#nodeCardNote').textContent=point.synthetic?t('trendStatus'):(point.forecast?t('coneMeaning'):t('selectedPoint'));
  card.hidden=false;card.classList.add('visible');
}
function hideNodeCard(){const card=$('#nodeCard');if(card){card.classList.remove('visible');setTimeout(()=>{if(!card.classList.contains('visible'))card.hidden=true;},160);}}

function setPlaybackIndex(index){
  const points=trackParts().points;if(!points.length)return;
  state.activeTrackIndex=clamp(Number(index)||0,0,points.length-1);renderPro();renderTimeline();renderTrackPlayer();state.needsRender=true;syncFormalMap();
}
function renderTrackPlayer(){
  const points=trackParts().points,parts=trackParts();const range=$('#trackRange');if(!range)return;
  if(!points.length){range.max='0';range.value='0';$('#playerTime').textContent='—';$('#playerPhase').textContent=t('noTrack');return;}
  state.activeTrackIndex=clamp(state.activeTrackIndex,0,points.length-1);range.max=String(points.length-1);range.value=String(state.activeTrackIndex);
  const point=points[state.activeTrackIndex];$('#playerTime').textContent=formatDate(point.time,true);const phase=point.synthetic?t('trendReference'):(point.forecast?t('officialForecast'):t('liveObservation'));$('#playerPhase').textContent=phase;$('#playerPhase').className=point.synthetic?'trend':(point.forecast?'forecast':'');
  $('#playerStart').textContent=formatDate(points[0].time,true);$('#playerEnd').textContent=formatDate(points.at(-1).time,true);$('#playerSourceLabel').textContent=parts.usingTrend?t('trendNotOfficial'):t('officialData');
  $$('[data-horizon]').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.horizon)===Number(state.forecastHorizon)));
  $('#mapPlayIcon').textContent=state.playing?'Ⅱ':'▶';$('#mapPlayButton').classList.toggle('playing',state.playing);$('#mapPlayButton').setAttribute('aria-label',state.playing?t('pause'):t('play'));$('#playerSpeed').textContent=`${state.playSpeed}×`;if($('#playTrack'))$('#playTrack').textContent=state.playing?t('pause'):t('play');
}
function stopTrackPlayback(resetButton=true){state.playing=false;clearInterval(playTimer);if(resetButton)renderTrackPlayer();}
function startTrackPlayback(){
  const points=trackParts().points;if(points.length<2)return;
  if(state.activeTrackIndex>=points.length-1)state.activeTrackIndex=0;
  state.playing=true;clearInterval(playTimer);renderTrackPlayer();
  playTimer=setInterval(()=>{const current=trackParts().points;if(!current.length){stopTrackPlayback();return;}if(state.activeTrackIndex>=current.length-1){stopTrackPlayback();showToast(t('playbackEnded'));return;}setPlaybackIndex(state.activeTrackIndex+1);},Math.round(900/state.playSpeed));
}
function toggleTrackPlayback(){state.playing?stopTrackPlayback():startTrackPlayback();}

function fitWorld(announce=true){state.targetLon=0;state.targetLat=4;state.targetZoom=state.mapMode==='world'?.92:.92;formalMapEngine?.fitWorld?.(announce);if(announce)showToast(t('globalReset'));}
function fitStormTrack(storm=state.selectedStorm,announce=false){
  if(!storm)return;
  const points=trackParts(storm).points.filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon));
  if(points.length<2){const p=points[0]||storm;state.targetLon=p.lon;state.targetLat=p.lat;state.targetZoom=state.mapMode==='world'?(isMobile()?2.4:2.9):(isMobile()?1.08:1.16);formalMapEngine?.fitStorm?.([p],state.userLocation,announce);if(announce)showToast(t('focused'));return;}
  const lats=points.map(p=>p.lat), baseLon=points[0].lon, unwrapped=points.map(p=>baseLon+normalizeLon(p.lon-baseLon));
  const minLat=Math.min(...lats),maxLat=Math.max(...lats),minLon=Math.min(...unwrapped),maxLon=Math.max(...unwrapped);
  state.targetLat=clamp((minLat+maxLat)/2,-65,65);state.targetLon=normalizeLon((minLon+maxLon)/2);
  if(state.mapMode==='world'){
    const spanLon=Math.max(8,maxLon-minLon),spanLat=Math.max(6,maxLat-minLat);
    const usableW=Math.max(280,state.width*(isMobile()?.86:.66)),usableH=Math.max(220,state.height*(isMobile()?.62:.74));
    state.targetZoom=clamp(Math.min(usableW/(spanLon*(state.width/360)),usableH/(spanLat*(state.height/180)))*.72,1.25,4.8);
  } else state.targetZoom=isMobile()?1.06:1.14;
  formalMapEngine?.fitStorm?.(points,state.userLocation,announce);
  if(announce)showToast(t('focused'));
}
function focusStorm(announce=true){fitStormTrack(state.selectedStorm,announce);}

canvas.addEventListener('pointerdown',e=>{if(state.locationPickMode){state.moved=false;return;}state.dragging=true;state.moved=false;state.lastX=e.clientX;state.lastY=e.clientY;canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');tooltip.classList.remove('visible');});
canvas.addEventListener('pointermove',e=>{if(state.locationPickMode)return;if(state.dragging){const dx=e.clientX-state.lastX,dy=e.clientY-state.lastY;if(Math.abs(dx)+Math.abs(dy)>2)state.moved=true;if(state.mapMode==='world'){const scale=worldScale();state.centerLon=normalizeLon(state.centerLon-dx/scale);state.centerLat=clamp(state.centerLat+dy/scale,-70,70);}else{state.centerLon=normalizeLon(state.centerLon-dx*.22/state.zoom);state.centerLat=clamp(state.centerLat+dy*.16/state.zoom,-70,70);}state.targetLon=state.centerLon;state.targetLat=state.centerLat;state.lastX=e.clientX;state.lastY=e.clientY;}else{const hit=hitTrack(e.clientX,e.clientY);showTooltip(hit,e.clientX,e.clientY);}});
canvas.addEventListener('pointerup',e=>{if(state.locationPickMode){const point=worldPointFromClient(e.clientX,e.clientY);setUserLocation(point.lat,point.lon,{source:'map'});return;}if(!state.moved){const hit=hitTrack(e.clientX,e.clientY);if(hit>=0){stopTrackPlayback(false);setPlaybackIndex(hit);showNodeCard(hit);}}state.dragging=false;canvas.classList.remove('dragging');});
canvas.addEventListener('pointercancel',()=>{state.dragging=false;canvas.classList.remove('dragging');});canvas.addEventListener('pointerleave',()=>{if(!state.dragging)tooltip.classList.remove('visible');});
canvas.addEventListener('wheel',e=>{e.preventDefault();const delta=e.deltaY<0?1.12:.89;state.targetZoom=clamp(state.targetZoom*delta,state.mapMode==='world'?.7:.7,state.mapMode==='world'?6:1.6);},{passive:false});

$$('[data-view-mode]').forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.viewMode)));
$$('[data-map-mode]').forEach(btn=>btn.addEventListener('click',()=>setMapMode(btn.dataset.mapMode)));
$('#globalViewButton').addEventListener('click',()=>fitWorld());$('#focusButton').addEventListener('click',()=>focusStorm());
$('#zoomIn').addEventListener('click',()=>{state.targetZoom=clamp(state.targetZoom*1.18,.7,state.mapMode==='world'?6:1.6);formalMapEngine?.map?.zoomIn?.({duration:260});});$('#zoomOut').addEventListener('click',()=>{state.targetZoom=clamp(state.targetZoom/1.18,.7,state.mapMode==='world'?6:1.6);formalMapEngine?.map?.zoomOut?.({duration:260});});
$('#quickLocateButton').addEventListener('click',requestUserLocation);
$('#useLocationButton').addEventListener('click',requestUserLocation);
$('#pickLocationButton').addEventListener('click',beginMapLocationPick);
$('#clearLocationButton').addEventListener('click',clearUserLocation);
$('#nodeCardClose')?.addEventListener('click',hideNodeCard);
$$('[data-profile]').forEach(btn=>btn.addEventListener('click',()=>{state.profile=btn.dataset.profile;localStorage.setItem('tv-profile',state.profile);$$('[data-profile]').forEach(b=>b.classList.toggle('active',b.dataset.profile===state.profile));renderPersonalImpact();}));
$$('[data-profile]').forEach(b=>b.classList.toggle('active',b.dataset.profile===state.profile));
$('#demoToggle').addEventListener('click',()=>{state.demoEnabled=!state.demoEnabled;localStorage.setItem('tv-demo',String(state.demoEnabled));$('#demoToggle').setAttribute('aria-pressed',String(state.demoEnabled));const storms=availableStorms();selectStorm(storms[0]||null,false);fitWorld(false);});

$('#layerButton').addEventListener('click',e=>{e.stopPropagation();const panel=$('#layerPanel'),opening=!panel.classList.contains('open');if(opening){setInspectorOpen(false,false);$('#sidebar').classList.remove('open');$('#languageMenu').classList.remove('open');$('#themeMenu').classList.remove('open');}panel.classList.toggle('open',opening);$('#layerButton').setAttribute('aria-expanded',String(opening));});
$$('[data-layer-toggle]').forEach(input=>{input.checked=state.layers[input.dataset.layerToggle]!==false;input.addEventListener('change',()=>{state.layers[input.dataset.layerToggle]=input.checked;localStorage.setItem('tv-layers',JSON.stringify(state.layers));renderTrackStatus();syncFormalMap();showToast(t('layerChanged'));});});

$$('[data-horizon]').forEach(btn=>btn.addEventListener('click',()=>{state.forecastHorizon=Number(btn.dataset.horizon)||120;localStorage.setItem('tv-horizon',String(state.forecastHorizon));stopTrackPlayback(false);const parts=trackParts();state.activeTrackIndex=Math.max(0,parts.observed.length-1);renderAll();fitStormTrack(state.selectedStorm,false);}));
function officialLayerUrl(kind){
  const storm=state.selectedStorm,basin=String(storm?.basin||'').toLowerCase();
  if(kind==='satellite'||kind==='radar'){
    if(basin.includes('western')||Number(storm?.lon)>100)return kind==='satellite'?'https://www.hko.gov.hk/en/wxinfo/intersat/satellite/sate.htm':'https://www.hko.gov.hk/en/wxinfo/radars/radar_range1.htm';
    return kind==='satellite'?'https://www.nhc.noaa.gov/satellite.php':'https://radar.weather.gov/';
  }
  return 'https://www.cwa.gov.tw/V8/E/P/Typhoon/TY_WARN.html';
}
$$('[data-hazard]').forEach(btn=>btn.addEventListener('click',()=>{
  const kind=btn.dataset.hazard;$$('[data-hazard]').forEach(b=>b.classList.toggle('active',b===btn));
  if(kind==='track'){state.layers.track=true;state.layers.cone=true;state.needsRender=true;return;}
  if(kind==='wind'){state.layers.wind=!state.layers.wind;btn.classList.toggle('active',state.layers.wind);state.needsRender=true;return;}
  if(kind==='rain'){openInspectorAt('impactSection');return;}
  if(kind==='coast'){openInspectorAt('impactSection');return;}
  if(kind==='satellite'||kind==='radar'){window.open(officialLayerUrl(kind),'_blank','noopener');showToast(t('openOfficialImagery'));}
}));

$('#languageToggle').addEventListener('click',e=>{e.stopPropagation();const menu=$('#languageMenu');menu.classList.toggle('open');$('#themeMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded',String(menu.classList.contains('open')));});
$$('[data-lang-value]').forEach(btn=>btn.addEventListener('click',()=>{state.lang=btn.dataset.langValue;localStorage.setItem('tv-lang',state.lang);applyTranslations();$('#languageMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded','false');showToast(t('languageChanged'));}));
$('#themeButton').addEventListener('click',e=>{e.stopPropagation();const menu=$('#themeMenu');menu.classList.toggle('open');$('#languageMenu').classList.remove('open');$('#themeButton').setAttribute('aria-expanded',String(menu.classList.contains('open')));});
$$('[data-theme-value]').forEach(btn=>btn.addEventListener('click',()=>{applyTheme(btn.dataset.themeValue);$('#themeMenu').classList.remove('open');showToast(t('themeChanged'));}));
document.addEventListener('click',e=>{if(!e.target.closest('#themeMenu')&&!e.target.closest('#themeButton')){$('#themeMenu').classList.remove('open');$('#themeButton').setAttribute('aria-expanded','false');}if(!e.target.closest('#languageMenu')&&!e.target.closest('#languageToggle')){$('#languageMenu').classList.remove('open');$('#languageToggle').setAttribute('aria-expanded','false');}if(!e.target.closest('#layerPanel')&&!e.target.closest('#layerButton')){$('#layerPanel').classList.remove('open');$('#layerButton').setAttribute('aria-expanded','false');}});

function setInspectorOpen(open,announce=false){
  state.inspectorOpen=Boolean(open);if(state.inspectorOpen){$('#layerPanel').classList.remove('open');$('#layerButton').setAttribute('aria-expanded','false');$('#sidebar').classList.remove('open');}localStorage.setItem('tv-inspector',String(state.inspectorOpen));
  const panel=$('#insightPanel');if(panel){panel.dataset.open=String(state.inspectorOpen);}
  const toggle=$('#insightToggle');if(toggle)toggle.setAttribute('aria-expanded',String(state.inspectorOpen));
  if(announce)showToast(t(state.inspectorOpen?'inspectorOpened':'inspectorClosed'));
  setTimeout(resizeCanvas,220);
}
function openInspectorAt(targetId){
  if(isMobile()){setSheetState('full');}else setInspectorOpen(true);
  const target=$(`#${targetId}`),scroller=$('.insight-scroll');requestAnimationFrame(()=>{if(target&&scroller)scroller.scrollTo({top:Math.max(0,target.offsetTop-8),behavior:reduceMotion?'auto':'smooth'});});
  $$('[data-drawer-target]').forEach(btn=>btn.classList.toggle('active',btn.dataset.drawerTarget===targetId));
}
$('#insightToggle')?.addEventListener('click',()=>setInspectorOpen(!state.inspectorOpen,true));
$('#insightClose')?.addEventListener('click',()=>setInspectorOpen(false,true));
$$('[data-drawer-target]').forEach(btn=>btn.addEventListener('click',()=>openInspectorAt(btn.dataset.drawerTarget)));
setInspectorOpen(state.inspectorOpen,false);

const sourceDialog=$('#sourceDialog');function openSourceDialog(){renderSources();sourceDialog.showModal();}
$('#openSources').addEventListener('click',openSourceDialog);$('#verificationButton').addEventListener('click',openSourceDialog);$('.dialog-close').addEventListener('click',()=>sourceDialog.close());sourceDialog.addEventListener('click',e=>{if(e.target===sourceDialog)sourceDialog.close();});
function scrollInsightTo(target){
  const panel=$('#insightPanel'),scroller=$('.insight-scroll');if(isMobile())setSheetState('full');else setInspectorOpen(true);
  requestAnimationFrame(()=>{if(!target||!scroller)return;const top=Math.max(0,target.offsetTop-8);scroller.scrollTo({top,behavior:reduceMotion?'auto':'smooth'});target.focus?.({preventScroll:true});});
}
$('#readMoreButton').addEventListener('click',()=>{
  const target=$('#impactSection');$$('[data-mobile-tab]').forEach(b=>b.classList.toggle('active',b.dataset.mobileTab==='brief'));scrollInsightTo(target);target.classList.remove('attention');void target.offsetWidth;target.classList.add('attention');setTimeout(()=>target.classList.remove('attention'),1100);
});
$('#personalImpactPreview').addEventListener('click',e=>{if(e.target.closest('button'))return;scrollInsightTo($('#personalSection'));});
$('#mobileMenuButton').addEventListener('click',()=>{const opening=!$('#sidebar').classList.contains('open');if(opening){setSheetState('collapsed');setInspectorOpen(false,false);$('#layerPanel').classList.remove('open');$('#layerButton').setAttribute('aria-expanded','false');}$('#sidebar').classList.toggle('open',opening);});
const insightPanel=$('#insightPanel'),sheetHandle=$('#sheetHandle');
function setSheetState(value){
  const next=['collapsed','half','full'].includes(value)?value:'collapsed';state.sheetState=next;insightPanel.dataset.sheet=next;insightPanel.classList.toggle('open',next==='full');sheetHandle.setAttribute('aria-expanded',String(next!=='collapsed'));$('#sheetHandleLabel').textContent=t('swipeForDetails');$('#sheetHandleState').textContent=t(next==='collapsed'?'sheetCollapsed':next==='half'?'sheetHalf':'sheetFull');
}
let suppressSheetClick=false;
function cycleSheet(){if(suppressSheetClick){suppressSheetClick=false;return;}setSheetState(state.sheetState==='collapsed'?'half':state.sheetState==='half'?'full':'collapsed');}
sheetHandle.addEventListener('click',cycleSheet);
let sheetDrag=null;
sheetHandle.addEventListener('pointerdown',e=>{if(!isMobile())return;sheetDrag={id:e.pointerId,startY:e.clientY,lastY:e.clientY,startState:state.sheetState};sheetHandle.setPointerCapture(e.pointerId);insightPanel.classList.add('dragging-sheet');});
sheetHandle.addEventListener('pointermove',e=>{if(!sheetDrag||e.pointerId!==sheetDrag.id)return;sheetDrag.lastY=e.clientY;const dy=e.clientY-sheetDrag.startY;const height=insightPanel.getBoundingClientRect().height;const base={collapsed:height-92,half:height*.46,full:0}[sheetDrag.startState]||0;insightPanel.style.transform=`translateY(${clamp(base+dy,0,height-92)}px)`;});
function finishSheetDrag(e){if(!sheetDrag||e.pointerId!==sheetDrag.id)return;const dy=sheetDrag.lastY-sheetDrag.startY;if(Math.abs(dy)>10)suppressSheetClick=true;insightPanel.classList.remove('dragging-sheet');insightPanel.style.transform='';const order=['collapsed','half','full'];let idx=order.indexOf(sheetDrag.startState);if(dy<-45)idx=Math.min(2,idx+1);else if(dy>45)idx=Math.max(0,idx-1);setSheetState(order[idx]);sheetDrag=null;}
sheetHandle.addEventListener('pointerup',finishSheetDrag);sheetHandle.addEventListener('pointercancel',finishSheetDrag);setSheetState('collapsed');
$$('[data-mobile-tab]').forEach(btn=>btn.addEventListener('click',()=>{$$('[data-mobile-tab]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const tab=btn.dataset.mobileTab;if(tab==='map'){setSheetState('collapsed');$('#sidebar').classList.remove('open');}else if(tab==='brief'){setSheetState('full');$('.insight-scroll').scrollTo({top:0,behavior:'smooth'});}else if(tab==='sources'){setSheetState('full');setTimeout(()=>$('.sources-section').scrollIntoView({behavior:'smooth'}),80);}else $('#sidebar').classList.toggle('open');}));
function stormMatchesRegion(storm,region){return region==='global'||inferBasinKey(storm)===region;}
const basinViews={wpac:{center:[135,20],zoom:2.4},atl:{center:[-55,22],zoom:2.2},epac:{center:[-125,18],zoom:2.2},nio:{center:[82,15],zoom:2.4},south:{center:[130,-20],zoom:1.55}};
function applyRegion(region,focus=true){
  state.region=region||'global';localStorage.setItem('tv-region',state.region);
  $$('[data-region]').forEach(b=>b.classList.toggle('selected',b.dataset.region===state.region));
  const storms=availableStorms();
  if(!storms.some(storm=>storm.id===state.selectedStorm?.id))state.selectedStorm=storms[0]||null;
  renderAll();
  if(state.region==='global')fitWorld(false);
  else if(state.selectedStorm&&focus)fitStormTrack(state.selectedStorm,false);
  else if(formalMapEngine?.ready){const view=basinViews[state.region];if(view)formalMapEngine.map.easeTo({center:view.center,zoom:view.zoom,duration:550});}
}
$$('[data-region]').forEach(btn=>btn.addEventListener('click',()=>applyRegion(btn.dataset.region,true)));
$$('[data-region]').forEach(btn=>btn.classList.toggle('selected',btn.dataset.region===state.region));
$('#locateButton').addEventListener('click',()=>fitWorld());
$('#playTrack').addEventListener('click',toggleTrackPlayback);$('#mapPlayButton').addEventListener('click',toggleTrackPlayback);$('#trackRange').addEventListener('input',e=>{stopTrackPlayback(false);setPlaybackIndex(+e.target.value);});$('#playerSpeed').addEventListener('click',()=>{state.playSpeed=state.playSpeed===1?1.5:state.playSpeed===1.5?2:1;if(state.playing)startTrackPlayback();else renderTrackPlayer();});


function formalConeCoordinates(parts){
  const points=parts.forecast||[];if(points.length<2)return[];
  const widths=points.map((_,i)=>(parts.usingTrend?90:30)+i*(parts.usingTrend?42:28));
  const left=[],right=[];
  points.forEach((p,i)=>{const prev=points[Math.max(0,i-1)],next=points[Math.min(points.length-1,i+1)];const angle=Math.atan2(next.lat-prev.lat,normalizeLon(next.lon-prev.lon));const km=widths[i],dLat=km/111,dLon=km/(111*Math.max(.25,Math.cos(rad(p.lat))));left.push([normalizeLon(p.lon+Math.cos(angle)*dLon),p.lat-Math.sin(angle)*dLat]);right.push([normalizeLon(p.lon-Math.cos(angle)*dLon),p.lat+Math.sin(angle)*dLat]);});
  const ring=[...left,...right.reverse()];if(ring.length)ring.push(ring[0]);return ring;
}
function formalCityData(parts){
  if(!parts.points.length)return[];
  return majorCities.map(city=>{let distance=Infinity;for(const point of parts.points)distance=Math.min(distance,haversineKm(city,point));const risk=distance<250?'high':distance<550?'medium':'low';return {...city,name:cityName(city),distance,risk};})
    .filter(city=>city.distance<1000||(city.rank>=5&&city.distance<1500))
    .sort((a,b)=>a.distance-b.distance||b.rank-a.rank).slice(0,isMobile()?9:18);
}
function formalWindAreas(parts){
  const storm=state.selectedStorm,current=parts.points[state.activeTrackIndex]||parts.observed.at(-1)||parts.points[0]||storm;if(!current)return[];
  const official=Array.isArray(storm?.windRadii)&&storm.windRadii.length?storm.windRadii:null;
  const rows=official||estimatedWindRadii(current,storm);
  return [...rows].sort((a,b)=>(b.km||0)-(a.km||0)).map((item,index)=>({
    radiusKm:Number(item.km)||0,estimated:!official,coordinates:geoCirclePoints(current.lat,current.lon,Number(item.km)||0,84).map(([lat,lon])=>[lon,lat]),
    fill:index===0?'#facc15':index===1?'#fb923c':'#ef4444',stroke:index===0?'#d4a514':index===1?'#e86f24':'#cc3b3b',opacity:index===0?.13:index===1?.10:.09
  })).filter(area=>area.radiusKm>0);
}
function syncFormalMap(){
  if(!formalMapEngine?.ready)return;
  const parts=trackParts(state.selectedStorm),points=parts.points||[],active=clamp(state.activeTrackIndex,0,Math.max(0,points.length-1)),shown=points.slice(0,active+1);
  const observedActive=shown.filter(point=>!point.forecast),officialActive=shown.filter(point=>point.forecast&&!point.synthetic),trendActive=shown.filter(point=>point.synthetic);
  const colors=canvasColors();
  const mappedPoints=points.map(point=>({...point,color:intensityColor(point.windMs,colors)}));
  const cities=formalCityData(parts);
  const userNearest=state.userLocation&&parts.points.length?parts.points.reduce((best,point)=>{const d=haversineKm(state.userLocation,point);return !best||d<best.d?{d,point}:best;},null)?.point:null;
  const analog=historicalAnalogCatalog.find(item=>item.id===state.activeAnalogId);
  formalMapEngine.setData({
    observed:parts.observed,officialForecast:parts.officialForecast,trendForecast:parts.trendForecast,
    observedActive,officialActive,trendActive,points:mappedPoints,activeIndex:active,usingTrend:parts.usingTrend,
    cone:formalConeCoordinates(parts),windAreas:formalWindAreas(parts),cities,
    userLocation:state.userLocation,userNearest,history:analog?.track||[],layers:state.layers
  });
}
function initFormalMap(){
  const host=$('#formalMap');
  if(!host||!window.FormalCycloneMap){document.documentElement.classList.add('formal-map-failed');return;}
  const dark=state.theme==='dark'||(state.theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);
  formalMapEngine=new window.FormalCycloneMap({
    container:host,landUrl:'./data/world-land.json',theme:dark?'dark':'light',mode:state.mapMode,
    onReady:()=>{document.documentElement.classList.add('formal-map-ready');document.documentElement.classList.remove('formal-map-failed');syncFormalMap();if(state.selectedStorm)fitStormTrack(state.selectedStorm,false);else fitWorld(false);},
    onFailure:()=>{document.documentElement.classList.add('formal-map-failed');document.documentElement.classList.remove('formal-map-ready');showToast(t('formalMapFallback'));},
    onPointClick:(index)=>{stopTrackPlayback(false);setPlaybackIndex(index);showNodeCard(index);},
    onMapClick:(point)=>{if(state.locationPickMode)setUserLocation(point.lat,point.lon,{source:'map'});}
  });
}
const originalResizeCanvas=resizeCanvas;
resizeCanvas=function(){originalResizeCanvas();formalMapEngine?.resize?.();};

new ResizeObserver(resizeCanvas).observe(canvas);window.addEventListener('orientationchange',()=>setTimeout(resizeCanvas,120));matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',()=>{if(state.theme==='system')applyTheme('system');});

window.__TV_BOOTED__=true;window.addEventListener('unhandledrejection',event=>{console.error('Typhoon Vision async error',event.reason);const pill=$('#freshnessPill');if(pill){pill.querySelector('strong').textContent=t('partial');pill.querySelector('.status-dot')?.classList.add('warning');}});

document.documentElement.dataset.view=state.view;document.documentElement.dataset.map=state.mapMode;$('#demoToggle').setAttribute('aria-pressed',String(state.demoEnabled));applyTheme();setView(state.view,false);setMapMode(state.mapMode);applyTranslations();resizeCanvas();initFormalMap();fitWorld(false);Promise.all([loadLand(),loadData()]).then(()=>{applyRegion(state.region,false);if(state.selectedStorm)fitStormTrack(state.selectedStorm,false);syncFormalMap();});requestAnimationFrame(animate);
