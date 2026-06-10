# 优选商城 - 购物网站项目

## 一、项目简介

优选商城是一个基于Web前端技术实现的在线购物网站，采用HTML5、CSS3和JavaScript开发，实现了完整的电商购物流程，包括商品浏览、购物车管理、订单处理等核心功能。

## 二、技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| HTML | 5 | 语义化标签、表单验证 |
| CSS | 3 | Flexbox、Grid、响应式设计 |
| JavaScript | ES6+ | DOM操作、localStorage、模块化 |

## 三、项目结构
期末/
├── index.html              # 首页（轮播图、商品分类、热门推荐）
├── login.html              # 登录页面（表单验证）
├── register.html           # 注册页面（表单验证）
├── product.html            # 商品列表页（筛选、排序、视图切换）
├── product-detail.html     # 商品详情页（图片画廊、加入购物车）
├── cart.html               # 购物车页面（数量调整、结算）
├── checkout.html           # 结算页面（地址管理、支付模拟）
├── order.html              # 订单页面（订单管理、状态筛选）
├── profile.html            # 个人中心（订单统计、个人信息）
├── seller.html             # 卖家管理页（商品/订单管理、销售统计）
├── css/                    # 样式文件目录
│   ├── style.css           # 全局样式（导航、响应式基础）
│   ├── index.css           # 首页样式（轮播图动画）
│   ├── login.css           # 登录/注册样式
│   ├── product.css         # 商品列表/详情样式
│   ├── cart.css            # 购物车/结算样式
│   └── profile.css         # 个人中心/卖家样式
├── js/                     # 脚本文件目录
│   ├── main.js             # 全局脚本（购物车计数、工具函数）
│   ├── carousel.js         # 轮播图组件
│   ├── search.js           # 搜索功能
│   ├── cart.js             # 购物车/结算/订单逻辑
│   ├── ajax.js             # 商品数据管理
│   ├── form-validation.js  # 表单验证
│   └── profile.js          # 个人中心脚本
├── images/                 # 图片资源目录（商品图、Banner图、图标）
├── data/                   # 模拟数据目录
│   ├── products.json       # 商品数据
│   ├── users.json          # 用户数据
│   └── orders.json         # 订单数据
└── README.md               # 项目说明文档


## 四、功能特性

### 4.1 用户功能

#### 首页展示
- ✅ 轮播图Banner展示
- ✅ 商品分类导航
- ✅ 热门推荐商品
- ✅ 分类商品展示

#### 商品浏览
- ✅ 分类筛选（生鲜食品、服装服饰、厨房用品、家居生活）
- ✅ 价格筛选
- ✅ 排序功能（价格升序/降序、销量）
- ✅ 列表/网格视图切换
- ✅ 商品搜索

#### 商品详情
- ✅ 商品图片画廊
- ✅ 规格选择（颜色、尺码）
- ✅ 数量调整
- ✅ 加入购物车
- ✅ 立即购买

#### 购物车
- ✅ 商品列表展示
- ✅ 数量增减
- ✅ 商品删除
- ✅ 全选功能
- ✅ 价格计算

#### 结算流程
- ✅ 收货地址管理（添加、选择）
- ✅ 订单确认
- ✅ 支付方式选择
- ✅ 订单提交

#### 订单管理
- ✅ 订单列表展示
- ✅ 状态筛选（待付款、待发货、待收货、已完成）
- ✅ 订单详情
- ✅ 确认收货
- ✅ 再次购买

#### 个人中心
- ✅ 用户信息展示
- ✅ 订单统计
- ✅ 个人信息编辑

### 4.2 卖家功能

- ✅ 数据概览（销售额、订单数、商品数、客户数）
- ✅ 商品管理（添加、编辑、上下架）
- ✅ 订单管理（发货、详情查看）
- ✅ 销售统计（月度趋势、分类占比）
- ✅ 店铺设置

## 五、运行方式

### 5.1 开发环境要求
- 任意Web服务器（如XAMPP、WAMP）
- 或现代浏览器（支持ES6+）

### 5.2 启动方式

**方式一：使用Python**
```bash
cd 期末
python -m http.server 8000
```

**方式二：使用Node.js**
```bash
cd 期末
npx serve .
```

**方式三：直接打开**
- 直接用浏览器打开 `index.html`（部分功能可能受限）

### 5.3 访问地址
- 首页：``

## 六、模拟数据

### 6.1 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| zhangsan | 123456 | 普通用户 |
| lisi | 123456 | 普通用户 |
| seller001 | 123456 | 卖家 |
| admin | admin123 | 管理员 |

### 6.2 商品分类

| 分类标识 | 分类名称 |
|----------|----------|
| fresh | 生鲜食品 |
| clothes | 服装服饰 |
| kitchen | 厨房用品 |
| home | 家居生活 |
| hot | 热门推荐 |
| new | 新品上市 |

### 6.3 订单状态

| 状态标识 | 状态名称 |
|----------|----------|
| pending | 待付款 |
| paid | 待发货 |
| shipped | 待收货 |
| completed | 已完成 |

## 七、核心代码示例

### 7.1 添加购物车
```javascript
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = mockProducts.find(p => p.id === parseInt(productId));
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        existingItem ? existingItem.quantity++ : cart.push({...product, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('已添加到购物车');
    }
}
```

### 7.2 订单提交
```javascript
function submitOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedAddress = getSelectedAddress();
    
    if (cart.length === 0) {
        alert('购物车为空');
        return;
    }
    
    const order = {
        id: 'ORD' + Date.now(),
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        status: 'pending',
        address: selectedAddress,
        createdAt: new Date().toISOString()
    };
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    
    alert('订单提交成功');
    window.location.href = 'order.html';
}
```

## 八、项目亮点

1. **响应式设计**：适配桌面端和移动端设备
2. **数据持久化**：使用localStorage实现本地数据存储
3. **模块化代码**：按功能模块组织，便于维护和扩展
4. **用户体验优化**：平滑滚动、加载动画、实时交互反馈
5. **表单验证**：完善的登录/注册表单验证机制

## 九、开发规范

### 9.1 文件命名
- HTML文件：小写英文，连字符分隔（如 `product-detail.html`）
- CSS文件：对应HTML文件命名（如 `product.css`）
- JS文件：按功能命名（如 `carousel.js`, `cart.js`）

### 9.2 代码规范
- 使用ES6+语法
- 变量命名：小驼峰式（如 `productName`）
- 函数命名：小驼峰式（如 `addProduct`）
- 类命名：大驼峰式（如 `ProductService`）
- 添加必要的注释说明

## 十、注意事项

1. 项目使用localStorage存储数据，清除浏览器缓存会导致数据丢失
2. 商品图片需放置在`images/`目录下
3. 建议使用现代浏览器（Chrome、Firefox、Edge）访问
4. 首次访问时可能需要等待图片加载

## 十一、版权声明

© 2024 优选商城 版权所有

---

**学号**：24215220234  
**姓名**：黄贤臻  
**课程**：Web编程技术  
**日期**：2024年6月