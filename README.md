# Typhoon Vision Public v7

面向普通用户与专业用户的全球台风路径、个人影响估算和多来源交叉验证网站。

## v7 主要改进

- 恢复并强化台风已观测路径、预测路径和预测范围显示
- 自动聚焦完整路径，不再默认缩在全球地图中的一小点
- 修复“看懂可能影响”按钮：手机端打开详情抽屉，电脑端滚动并高亮影响说明
- 清洗 JMA 产品标题，避免把“台風解析・予報情報”误当台风名称
- 正确显示示例：`第9号台风 巴威（BAVI）`；日语界面可显示 `バービー`
- 新增用户定位：浏览器定位或在地图上点选
- 显示距预测路径最近距离、预计最接近时间、可能影响时间窗和可信度
- 新增活动画像建议：通勤、户外运动、室内办公、驾车、老人儿童照护、沿海居住
- 保留公众视图与专业视图切换
- 保留浅色、深色、系统主题及六语言界面

## 隐私

用户位置只保存在浏览器的 `localStorage` 中，并在前端本地计算，不会发送到 Netlify Function 或第三方气象 API。

## 目录结构

```text
index.html
app.js
styles.css
netlify.toml
VERSION.txt
README.md
data/
  world-land.json
netlify/
  functions/
    cyclone-data.mts
```

## 推荐部署方式：GitHub → Netlify

1. 解压 ZIP。
2. 将上面这些文件和文件夹直接上传到 GitHub 仓库根目录，不能再套一层 `typhoon-vision-public-v7/`。
3. Netlify 的 Base directory 留空。
4. Build command 留空。
5. Publish directory 使用 `.`。
6. Functions directory 使用 `netlify/functions`。
7. 提交后 Netlify 会自动重新部署。

成功的 Deploy 摘要应显示至少一个 Function 已部署，并且以下地址返回 JSON：

```text
https://typhoon-vision.netlify.app/api/cyclones
```

## 直接拖 ZIP 到 Netlify

页面和演示数据可以显示，但 Netlify 不会通过普通 Drop 部署 `netlify/functions`。要使用实时 API 聚合，仍建议通过 GitHub 自动部署或 Netlify CLI。

## 个人影响估算说明

网站根据用户位置与台风路径点之间的球面距离，结合一个随强度变化的粗略影响半径，估算：

- 最近路径距离
- 预计最接近时刻
- 可能进入外围影响范围的时间窗
- 估算可信度

这不是官方到达时间、登陆预报或疏散判断。台风大小、地形、风暴潮、降雨和局地天气可能使实际影响与中心路径明显不同。所有疏散、停工、停课和交通决定应以当地政府及气象部门为准。


## Historical analogs / 历史相似台风

Public v7 adds a historical-reference section. Similarity is based on selected track direction, intensity range, endpoint region and optionally the user's locally stored position. It is an explanatory aid only and must not be interpreted as a forecast of damage or landfall.

Public v7 新增历史相似台风参考。系统仅依据部分路径方向、强度、影响区域及用户本地位置进行解释性匹配，不能据此推断本次台风一定产生相同影响。
