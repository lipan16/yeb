# Vue 3 + TypeScript + Vite

```bash
# 克隆项目
git clone https://github.com/lipan16/yeb.git

# 进入项目
cd yeb

# 安装依赖
npm install

# 运行项目
npm run dev

# 打包发布
npm run build
```

## done

* 基本登录功能
* 动画
* 动态背景色

## todo

* tagsView 支持缓存, 支持拖拽，切换动画
* 用户管理页实现
* rem 适配

### route配置

* path:配置的路径或者第三方跳转地址
* component：配置组件
* redirect：重定向地址
* meat：
    * icon：图标
    * title：标题,用于tagsView显示
    * link：iframe时的地址
    * hidden：是否在侧边栏显示
    * alwaysShow：是否显示子路由
    * roles：能看到此路由的角色列表
    * keepAlive：是否缓存
    * affix：是否固定到tagVIew栏

### 设置背景色

**定义全局变量，挂载在body下, 修改变量**

### 缓存使用说明 默认使用localStorage
1. 初始化时先读取缓存，
2. 过滤掉FilterStorageKey之外的数据，然后把结果修改过期时间并初始化进缓存
3. 然后把缓存数据初始化进memory。获取值时从memory读取
