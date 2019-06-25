﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿﻿# 基于vue-admin-template项目的naraku演示项目### 先了解一下 [naraku](https://github.com/felixgrey/naraku)##```为了真实演示数据请求，本项目分成前端和服务端两部分。前端在vue-admin-template目录下，服务端在nodeServer目录下。需要分别执行install，并需要在nodeServer下执行node server启动服务器```## DataHub演示内容：0. 数据管理 0. 请求接口 （已完成） 0. 创建实例 （已完成） 0. 数据联动 （已完成） 0. 分页、过滤 （已完成） 0. 全局联动 （已完成） 0. 数据、事件、状态   0. when、load、all（TODO...）  0. on、once（TODO...）  0. set、status（TODO...）  0. emit（TODO...）0. 数据提交和请求 0. fetch（TODO...） 0. submit（TODO...）0. 组件通信 0. register和run（TODO...）0. 高级应用  0. 规避事件触发（TODO...）  0. 责任链（TODO...）#### Transformer演示内容：0. 数据的分组聚合 0. 维度过滤 0. 树形聚合0. Model -> ViewModel0. 数据转型 0. 树形结构 0. 二维数组 0. JS对象0. echarts格式 0. 折线/条形图 0. 饼图 0. 热力图 0. 散点图 0. 雷达图#### CRUD页面示例0. overview 0. searchForm0. edit 0. select0. charts##***# 以下是 vue-admin-template 的文档#English | [简体中文](./README-zh.md)> A minimal vue admin template with Element UI & axios & iconfont & permission control & lint**Live demo:** http://panjiachen.github.io/vue-admin-template**The current version is `v4.0+` build on `vue-cli`. If you want to use the old version , you can switch branch to [tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0), it does not rely on `vue-cli`**## Build Setup```bash# clone the projectgit clone https://github.com/PanJiaChen/vue-admin-template.git# enter the project directorycd vue-admin-template# install dependencynpm install# developnpm run dev```This will automatically open http://localhost:9528## Build```bash# build for test environmentnpm run build:stage# build for production environmentnpm run build:prod```## Advanced```bash# preview the release environment effectnpm run preview# preview the release environment effect + static resource analysisnpm run preview -- --report# code format checknpm run lint# code format check and auto fixnpm run lint -- --fix```Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information## Demo![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)## ExtraIf you want router permission && generate menu by user roles , you can use this branch [permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)For `typescript` version, you can use [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (Credits: [@Armour](https://github.com/Armour))## Related Project[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)[electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)[vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)## Browsers supportModern browsers and Internet Explorer 10+.| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari || --------- | --------- | --------- | --------- || IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions## License[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.Copyright (c) 2017-present PanJiaChen