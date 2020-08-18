### 即将放飞理想的工具箱(YikanBox)

![](https://img.shields.io/badge/YikanBox-v1.0.0-blue.svg)

#### 项目简介

Taro3.0.2 + redux + wxcloud 做个工具集合的微信小程序

#### 项目结构

```bash
tree -d -L 3 -I "node_modules|dist" > tree.md
```

```bash
.
├── client                    # 小程序前端项目
│   ├── config                # 项目级配置
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
    ├── fetchInfo             # 混表操作信息
    │   └── queryLoginInfo    # 查询登录所需的信息
    └── fetchMemberInfo       # 操作 memberInfo
        ├── addMemberInfo     # 新增注册成员信息
        └── queryMemberInfo   # 查询跟 MemberInfo 相关的信息

20 directories

```

#### 版本记录

- V1.0.0  
  该版本以搭建项目框架为主，开发中适当调整项目结构。  
  封装常用的公共方法。  
  封装常用的公共 UI 组件。  
  以此运用并实现“我的”页面的功能。

#### 需求池

1. 云函数调用 ✅
2. 注册/登录系统 ✅
3. 发现文章功能 ✅
4. 空内容组件 🚧
5. 头像秀-装饰玩法 🚧
6. 图片秀-迷雾图片玩法 🚧
7. 达人圈-复刻朋友圈玩法 🚧
8. 签到功能 🚧
9. 等级系统 🚧
10. 徽章成就荣誉墙系统 🚧
11. 推广裂变玩法 🚧

### 脚本

```MongoDB
// 清空文章库
db.collection('articleInfo')
.where({
  href: _.exists(true)
})
.remove()
```
