### 即将放飞理想的工具箱(YikanBox)

![](https://img.shields.io/badge/YikanBox-v1.0.1-blue.svg)

#### 项目简介

Taro + redux + wxcloud 做个工具集合的微信小程序

![即将放飞理想的工具箱线上码](./resource/qrcode.jpg)

#### 相关技术

1. Taro + taro ui

2. wxCloud 微信云开发

   > 由于一个云环境最多只能创建`20个云函数`。  
   > 那么我是根据云数据库的表来分配云函数。根据传参 type 值，来解析映射对应的操作函数。（如需混表操作的另起云函数）  
   > 小程序端则封装 CloudFetch.callFunction 方法，统一去调用云函数接口。

3. 通过云函数触发器，定时去爬网络文章。

   > 通过`cheerio`、`superagent`、`entities`等第三方库，爬取网络文章，解析成 html 后，存储到云数据库中。

4. 通过 Hook 的方法对函数进行装饰。

   > 封装`节流`、`防抖`、`鉴权`、`登录`等 Hook，作为高阶函数以装饰逻辑业务。  
   > 剥离通用逻辑，不污染具体业务。

5. 优化发现分页的 Feed 流 DOM 节点渲染。

   > 只去渲染`当前条`、`上一条`、`下一条`的三项内容 DOM 节点信息。

6. 使用 Canvas 操作图片。

   > 对`头像秀`、`图片秀`中的图片处理之后重新绘制保存。

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
│       ├── images            # 打包进代码的静态资源
│       ├── pages             # 小程序页面
│       ├── redux             # Redux
│       ├── scss              # 公共样式
│       ├── services          # 封装服务
│       └── utils             # 公共方法
└── cloud                     # 微信云开发项目
    ├── backup                # 数据库备份
    │   └── database
    ├── fetchArticleInfo      # 文章表-操作信息
    │   ├── queryArticleInfo  # 查询单个文章
    │   └── queryArticleList  # 查询整个文章列表
    ├── fetchInfo             # 混表-操作信息
    │   └── queryLoginInfo    # 查询登录所需的信息
    ├── fetchMemberInfo       # 成员表-操作信息
    │   ├── addCollectionArticle    # 将对应的文章收藏移入
    │   ├── addMemberInfo     # 新增注册成员信息
    │   ├── addMineBadge            # 激活新的徽章
    │   ├── queryMemberInfo   # 查询跟 MemberInfo 相关的信息
    │   ├── removeCollectionArticle # 将对应的文章收藏移除
    │   └── updateMineBorderCode    # 更新使用中的头像框
    └── spiderArticleInfo     # 爬取文章接口
        └── spiderZhiHuInfo   # 爬取知乎文章

30 directories

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

- V1.0.1

  - 实现发现文章功能
  - 推广裂变玩法
  - 徽章头像框荣誉墙系统

- V1.0.2

  - 实现我的头像秀
    - canvas 装饰头像

- V1.0.3

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
8. 我的头像秀-装饰玩法 🚧
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
