### 版本管理工具
用于管理软件源代码(版本)的工具
目前市面有两个比较主流的两款软件  git  svn
现代编辑器中 都集成了版本管理工具
git 是一个分布式的版本管理工具  
svn 是一个集中式的版本管理工具  

### git
官网 https://git-scm.com/
跨平台(操作系统 windows linux unix osx)
Git（读音为/gɪt/）是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。
Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

### github
https://github.com/
git 和 github  没有关系  
github 是全球最大的开源社区  
github 提供的是一个it社交平台(编程社交) 
它提供了免费的 git 仓库服务
免费仓库条件 开源
私有仓库     收费

开源大法好  

jQuery
VUE
BootStrap
React
Angular
...

2018年10月 微软收购github
闭源仓库免费


### git 操作
```bash
# 用户设置 每台电脑只需要设置一次
$ git config --global user.name "Zhang Jun"
$ git config --global user.email "root@rootbk.cn"
```


### 本地仓库基本操作
```bash
# 初始化仓库
$ git init


# 在项目根目录 创建文件
# .gitignore
# 忽略列表
# 让git不管理某些内容
# 第三方的代码 

# 查看状态
$ git status

# 添加管理
$ git add filename    # 添加指定文件
$ git add path/       # 添加指定文件夹
$ git add .           # 添加所有文件

# 将文件提交到本地仓库
$ git commit -m "v 1.0.1"

# 查看提交记录
$ git log

# 恢复提交版本
$ git reset --hard hash(前6位)
```

### 远程仓库操作
```bash
# 设置远程仓库源
$ git remote add origin https://github.com/jxsrzj0325/mi.com.git

# 将本地仓库 推送到远程仓库
$ git push -u origin master

# 从远程仓库 拉取代码
$ git pull origin master

# 克隆远程仓库
$ git clone https://github.com/jxsrzj0325/mi.com.git
```