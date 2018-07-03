## 后端路由及API列表
- 登录
  - 地址： `/login`
  - 参数： `username`用户名，`password`密码
  - 要做的事（成功）
    - 告诉其他在线用户，该用户上线了
    - 将该用户的在线状态改为在线
    - 删除离线消息
    - 设置返回cookie的token为true
  - 返回值
    - 成功
        ```js
          {
          	message:"登录成功"
          }
        ```
    - 失败
        ```js
					{
						message: "登录失败，用户名或密码不正确"
					}
        ```
- 注册
  - 地址： `/register`
  - 参数： `username`用户名，`password`密码
  - 要做的事（成功）
    - 告诉其他用户，该用户注册了
    - 更新数据库
    - 设置cookie的token为true
  - 返回值
    - 成功（同登录成功）
    - 失败
        ```js
           {
           	message:"注册失败，用户名已存在"
           }
        ````
- 头像设置
  - 地址： `/avater`
  - 参数： `username`用户名，`avater`新的头像
  - 要做的事（成功）
    - 上传头像并保存
    - 更新数据库
  - 返回值
    - 成功
    - 失败
- 主页
  - 地址： `/home`
  - 参数： `username`用户名，`token`是否登录成功
  - 要做的事
  - 返回值
      ```js 
				{
					  usersList:[{username,avater,isOnline}...], //用户列表
          	remarks:[{username, remarkName}...], //备注
          	oflms:[{sender,avater,messages:[{content,time}...]}...], //离线消息  
          	roomsList:[{roomname,avater}] //群聊列表
				}
      ```
- 下载
- 注销
- 上传（普通上传和群文件上传）
- 发送离线消息
- 更改备注
- 更改群组里用户显示名
- 修改密码
- 创建群组
- 加入群组
- 解散群组
- 退出群组