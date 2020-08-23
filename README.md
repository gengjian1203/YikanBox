### 即将放飞理想的工具箱(YikanBox)

![](https://img.shields.io/badge/YikanBox-v1.0.0-blue.svg)

#### 项目简介

Taro3.0.2 + redux + wxcloud 做个工具集合的微信小程序

#### 相关技术

1. Taro
2. wxCloud
3.

#### 项目结构

```bash
tree -d -L 3 -I "node_modules|dist" > tree.md
```

```bash
.
├── client                    # 小程序前端项目
│   ├── config                # 项目级配置
│   ├── images                # 打包进代码的静态资源
│   └── src                   # 项目代码
│       ├── api               # 接口调用
│       ├── components        # 公共组件
│       ├── config            # 应用级配置
│       ├── hooks             # 自定义 Hook
│       ├── pages             # 小程序页面
│       ├── redux             # Redux
│       ├── scss              # 公共样式
│       ├── services          # 封装服务
│       └── utils             # 公共方法
└── cloud                     # 微信云开发项目
    ├── backup                # 数据库备份
    │   └── database
    ├── fetchArticleInfo      # 文章操作信息
    │   ├── queryArticleInfo  # 查询单个文章
    │   └── queryArticleList  # 查询整个文章列表
    ├── fetchInfo             # 混表操作信息
    │   └── queryLoginInfo    # 查询登录所需的信息
    ├── fetchMemberInfo       # 操作 memberInfo
    │   ├── addCollectionArticle # 将对应的文章收藏移入
    │   ├── addMemberInfo     # 新增注册成员信息
    │   ├── queryMemberInfo   # 查询跟 MemberInfo 相关的信息
    │   └── removeCollectionArticle # 将对应的文章收藏移除
    └── spiderArticleInfo     # 爬取文章接口
        └── spiderZhiHuInfo   # 爬取知乎文章

28 directories

```

#### 版本记录

- V1.0.0  
  该版本以搭建项目框架为主，开发中适当调整项目结构。  
  封装常用的公共方法。  
  封装常用的公共 UI 组件。  
  以此运用并实现“我的”页面的功能。

- V1.0.1
  - 实现发现文章功能
  - 实现我的头像秀
    - canvas 装饰头像
  - 实现我的图片秀
    - 刷礼物、弹幕
    - 迷雾图片
  - 实现我的达人圈

#### 需求池

1. 云函数调用 ✅
2. 注册/登录系统 ✅
3. 发现文章功能 ✅
4. 提示(加载/空)组件 ✅
5. 我的收藏文章功能 🚧
6. 推广裂变玩法 🚧
7. 我的头像秀-装饰玩法 🚧
8. 我的图片秀-迷雾图片玩法 🚧
9. 我的达人圈-复刻朋友圈玩法 🚧
10. 我的 AI 好友- 🚧
11. 签到记录功能 🚧
12. 等级系统 🚧
13. 徽章成就荣誉墙系统 🚧

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

#### 配置问题

1、Error: 未找到入口 sitemap.json 文件，或者文件读取失败，请检查后重新编译。
../dist/sitemap.json

```json
{
	"rules": []
}
```
