# 数据库设计

## 用户列表
- `users`[Array]

## 单个用户[Object]
- `username`[String]用户名
- `password`[String]密码
- `isOnline`[Boolean]是否在线
- `avater`[String]头像
- `remarks`[Array]备注
  - 单个备注[Object]
    - `username`[String]备注用户注册的名字
    - `remarkName`[String]给用户备注的名字
- `oflms`[Array](offlineMessages简写，用户要接收的离线消息)
  - 单个离线消息[Object]
    - `sender`[String]发送者用户名
    - `messages`[Array]消息列表
      - 单个消息[Object]
        - `content`[String]发送的内容
        - `time`[String]发送的时间

## 群聊列表
- `rooms`[Array]

## 单个群聊
- `roomname`[String]群聊名称
- `avater`[String]群聊头像
- `users`[Array]群组成员
  - 单个群组成员[Object]
    - `username`[String]成员注册名
    - `isAdmin`[Boolean]是否是创建者管理员
    - `displayName`[String]成员修改的显示名
- `files`[Array]群组文件
  - 单个文件[Object]
    - `username`[String]分享者用户名
    - `file`[Object]分享的文件
      - `filename`[String]分享的文件名
      - `path`[String]分享的文件地址
      - `size`[String]文件大小
    - `time`[String]分享的时间