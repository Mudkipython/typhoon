# Typhoon Vision

A public-friendly, multilingual typhoon track and warning visualization prototype built for Netlify.

面向普通用户的多语言台风路径与预警可视化原型，可部署在 Netlify。

## Live Site / 在线网站

https://typhoon-vision.netlify.app

## Features / 主要功能

- Full world map with an optional 3D globe
- Public view for non-specialist users
- Professional meteorological view
- Light, dark, and system themes
- Multilingual interface
- Typhoon track, forecast cone, timeline, and risk summary
- Netlify Functions for aggregating public meteorological data
- Responsive layout for desktop and mobile

中文功能概览：

- 完整世界地图与可选 3D 地球
- 面向普通用户的公众视图
- 可切换的专业气象视图
- 浅色、深色和跟随系统主题
- 多语言界面
- 台风路径、预测范围、时间轴与风险摘要
- 使用 Netlify Functions 聚合公开气象数据
- 同时适配电脑与手机

## Project Structure / 项目结构

The deployable project directory should contain these files directly:

```text
index.html
netlify.toml
assets/
data/
netlify/
└── functions/
    └── cyclone-data.mts
```

需要部署的项目目录根部应直接包含 `index.html` 和 `netlify.toml`，不要在外面再多套一层文件夹。

## Netlify Configuration / Netlify 配置

```toml
[build]
  publish = "."
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

If the project files are stored inside a subfolder such as `typhoon-vision-public-v4/`, either move all project files to the repository root or set that subfolder as Netlify's Base directory.

如果项目文件位于 `typhoon-vision-public-v4/` 子目录中，需要执行以下二选一操作：

1. 将子目录中的全部文件移动到 GitHub 仓库根目录；或
2. 在 Netlify 中把 Base directory 设置为 `typhoon-vision-public-v4`。

## Function Endpoint / Function 地址

When deployed correctly:

```text
https://typhoon-vision.netlify.app/api/cyclones
```

The latest Netlify deploy summary should show a deployed function instead of:

```text
No functions deployed
```

## Data Sources / 数据来源

The project is designed to compare public information from organizations such as:

- JMA / RSMC Tokyo
- NOAA / National Hurricane Center
- GDACS
- Hong Kong Observatory
- Taiwan Central Weather Administration, when an API key is configured

Different agencies may use different wind averaging periods, classification systems, and update schedules. The application should show these differences rather than averaging them blindly.

不同机构可能采用不同的风速平均时段、强度分级和更新时间，因此系统应透明展示差异，而不是直接计算简单平均值。

## Important Notice / 重要说明

This project is an information visualization prototype. It must not be treated as an official emergency warning service. Always follow alerts and evacuation instructions issued by the relevant local authorities.

本项目是气象信息可视化原型，不能替代官方灾害预警。请始终以所在地气象主管机构和应急管理部门发布的信息为准。

## Deployment Checks / 部署检查

A successful Netlify deployment should show:

- The production deploy state is `ready`
- The homepage is generated as `/index.html`
- At least one Netlify Function is deployed
- `/api/cyclones` returns JSON
- The site header shows the expected release version

If the log ends with:

```text
Site is live ✨
```

the deployment has completed. If the Netlify dashboard still says “In progress,” refresh the Deploy page.

## License

For educational and demonstration use. Add a formal open-source license before accepting external contributions.
