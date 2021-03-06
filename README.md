### 即将放飞理想的工具箱(YikanBox)

![](https://img.shields.io/badge/YikanBox-v1.0.1-blue.svg)

#### 项目简介

Taro + redux + wxcloud + ts 做个工具集合的微信小程序

![即将放飞理想的工具箱线上码](./resource/qrcode.jpg)

<!-- ![即将放飞理想的工具箱线上码](https://6f6e-online-z8369-1259256375.tcb.qcloud.la/resource/qrcode.jpg?sign=6a1b80a44dfdea9fb6dc21402bb9cc76&t=1601384295) -->

#### 相关技术

1. Taro + TypeScript + taro ui

2. wxCloud 微信云开发

   > 由于一个云环境最多只能创建`20个云函数`。  
   > 根据云数据库的表来分配云函数。根据传参 type 值，来解析映射对应的操作函数。（如需混表操作的另起云函数）  
   > 小程序端则封装`CloudFetch`云函数请求器，统一去调用云函数接口。

3. 通过云函数触发器，定时去爬网络文章。

   > 通过`cheerio`、`superagent`、`entities`等第三方库，爬取网络文章，解析成 html 后，存储到云数据库中。

4. 通过 Hook 的方法对函数进行装饰。

   > 封装`节流`、`防抖`、`鉴权`、`登录`等 Hook，作为高阶函数以装饰逻辑业务。  
   > 将一些通用的逻辑剥离出来，不会被具体业务所污染。

5. 抽象资源加载管理器`ResourceManager`，通过适配器模式，可加载不同来源的资源。

   > 通过资源下载适配器`ResourceDownLoadAdaptor`，去下载不同来源的资源。  
   > 通过 Map 集合，以 cloudFileId-tempPath 作为键值对来存储，可以不必重复加载相同的资源。  
   > 遵循`开闭原则`，对扩展开放，对修改关闭。即使新增业务，只要新增适配模式即可，无需修改旧的逻辑。

6. 优化“发现”分页的 Feed 流 DOM 节点渲染。

   > 只去渲染`当前条`、`上一条`、`下一条`的三项内容 DOM 节点信息。
   > 减少页面中的 DOM 节点。提高小程序的渲染效率。

7. 使用 Canvas 操作图片。

   > 对`头像秀`、`图片秀`中的图片处理之后重新绘制保存。
   > 对通过`二维码`分享的海报处理。

8. 敏感校验。

   > 通过微信推荐的珊瑚安全接口`msgSecCheck`、`imgSecCheck`，对上传的文字、图片等内容进行敏感校验。  
   > 直接通过云接口上传图片的 ArrayBuffer 会因为上传参数大于`512Kb`导致上传失败。  
   > 所以流程为将图片上传至云存储，获取云存储 ID，云函数通过云存储 ID，下载图片，进而校验图片。  
   > 图片上传云存储 -> 云函数下载云存储的图片 -> 校验结果返回。  
   > 不过安全图片接口不能校验超过`1M`的图片，所以上传之前也需要校验图片大小。

9. 权限身份校验。

   > 管理员权限，可配置小程序，进而动态展示。
   > 黑名单系统，限制黑名单中成员登录。用以防止 api 接口被恶意调用或者攻击。

#### 项目结构

```bash
.
├── client                    # 小程序前端项目
│   ├── config                # 项目级配置
│   └── src                   # 项目代码
│       ├── api               # 接口调用
│       ├── components        # 公共组件
│       ├── config            # 应用级配置
│       ├── hooks             # 自定义 Hook
│       ├── images            # 打包进代码的静态资源（改用云存储）
│       ├── pages             # 小程序页面
│       ├── redux             # Redux
│       ├── scss              # 公共样式
│       ├── services          # 封装服务
│       └── utils             # 公共方法
├── cloud                     # 微信云开发项目
│   ├── backup                # 数据库备份
│   │   └── database
│   ├── checkContent          # 内容校验
│   │   ├── checkImage        # 校验图片
│   │   └── checkText         # 校验文字
│   ├── fetchArticleInfo      # 文章表 - 操作信息
│   │   ├── queryArticleInfo  # 查询单个文章
│   │   └── queryArticleList  # 查询整个文章列表
│   ├── fetchInfo             # 混表 - 操作信息
│   │   ├── queryLoginInfo    # 查询登录所需的信息
│   │   ├── updateAdminList     # 更新管理员列表
│   │   └── updateBottomBarList # 更新底部导航列表
│   ├── fetchMemberInfo       # 成员表 - 操作信息
│   │   ├── addCollectionArticle    # 将对应的文章收藏移入
│   │   ├── addMemberInfo     # 新增注册成员信息
│   │   ├── addMineBadge            # 激活新的徽章
│   │   ├── queryMemberInfo   # 查询跟 MemberInfo 相关的信息
│   │   ├── removeCollectionArticle # 将对应的文章收藏移除
│   │   └── updateMineBorderCode    # 更新使用中的头像框
│   └── spiderArticleInfo     # 爬取文章接口
│       └── spiderZhiHuInfo   # 爬取知乎文章
└── resource                  # 小程序所用资源。云存储的静态资源备份
    ├── avatar                # 头像秀相关
    ├── banner                # banner图相关
    ├── common                # 通用
    ├── mine                  # 我的页面
    └── psd                   # ps底稿
```

```bash
tree -d -L 3 -I "node_modules|dist" > tree.md
```

#### 版本记录

- V1.0.0  
  该版本以搭建项目框架为主，开发中适当调整项目结构。  
  封装常用的公共方法。  
  封装常用的公共 UI 组件。  
  以此运用并实现“我的”页面的功能。

- V1.1.0

  - 发现文章、收藏文章功能
  - 推广裂变玩法（分享链接、二维码）
  - 徽章头像框荣誉墙系统
  - 实现我的头像秀
  - 管理员系统
  - 黑名单系统

- V1.2.0

  - 我的接龙玩法

- V1.3.0

  - 实现我的图片秀
    - 刷礼物、弹幕
    - 迷雾图片
  - 实现我的达人圈

#### 需求池

1. 云函数调用 ✅
2. 注册/登录系统 ✅
3. 发现文章功能 ✅
4. 提示(加载/空)组件 ✅
5. 我的收藏文章功能 ✅
6. 推广裂变玩法 ✅
7. 徽章头像框荣誉墙系统 ✅
8. 我的头像秀-装饰玩法 ✅
9. 我的图片秀-迷雾图片玩法 🚧
10. 我的达人圈-复刻朋友圈玩法 🚧
11. 我的 AI 好友- 🚧
12. 签到记录功能 🚧
13. 等级系统 🚧

#### 脚本

```MongoDB
// 清空文章库
db.collection('articleInfo')
.where({
  href: _.exists(true)
})
.remove()
```

```MongoDB
// 清空用户库
db.collection('memberInfo')
.where({
  _id: _.exists(true)
})
.remove()
```

#### 相关问题

1. Error: 未找到入口 sitemap.json 文件，或者文件读取失败，请检查后重新编译。
   ../dist/sitemap.json

```json
{
	"rules": []
}
```

2. 云函数每次请求数据不能超过 1MB。
