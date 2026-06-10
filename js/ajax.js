// Ajax封装脚本

// 模拟商品数据
const mockProducts = [
    { id: 1, name: '精选红富士苹果', desc: '新鲜采摘，脆甜多汁', price: 29.9, originalPrice: 39.9, sales: 1234, category: 'fresh', image: 'images/apple.jpg' },
    { id: 2, name: '进口香蕉', desc: '香甜软糯，营养丰富', price: 15.9, originalPrice: 19.9, sales: 3456, category: 'fresh', image: 'images/banana.jpg' },
    { id: 3, name: '有机蔬菜礼盒', desc: '绿色有机，健康安心', price: 49.9, originalPrice: 69.9, sales: 892, category: 'fresh', image: 'images/wegitable.png' },
    { id: 4, name: '新鲜猪肉', desc: '农家散养，肉质鲜嫩', price: 69.9, originalPrice: 89.9, sales: 789, category: 'fresh', image: 'images/pigru.jpg' },
    { id: 5, name: '新鲜草莓', desc: '香甜可口，果肉饱满', price: 39.9, originalPrice: 49.9, sales: 1890, category: 'fresh', image: 'images/caomei.jpg' },
    { id: 6, name: '优质大米', desc: '粒粒饱满，口感细腻', price: 59.9, originalPrice: 79.9, sales: 2341, category: 'fresh', image: 'images/mi.jpg' },
    { id: 7, name: '休闲衬衫', desc: '纯棉面料，舒适透气', price: 129.9, originalPrice: 169.9, sales: 456, category: 'clothes', image: 'images/freeclothe.jpg' },
    { id: 8, name: '运动外套', desc: '防风保暖，时尚百搭', price: 199.9, originalPrice: 259.9, sales: 234, category: 'clothes', image: 'images/gogogo.jpg' },
    { id: 9, name: '经典牛仔裤', desc: '修身版型，经典百搭', price: 99.9, originalPrice: 129.9, sales: 678, category: 'clothes', image: 'images/clothes8.png' },
    { id: 10, name: '优雅连衣裙', desc: '优雅气质，显瘦显高', price: 159.9, originalPrice: 199.9, sales: 345, category: 'clothes', image: 'images/clothes5.png' },
    { id: 11, name: '时尚T恤', desc: '潮流设计，舒适透气', price: 89.9, originalPrice: 119.9, sales: 567, category: 'clothes', image: 'images/Tshit.jpg' },
    { id: 12, name: '休闲裤', desc: '宽松舒适，百搭时尚', price: 119.9, originalPrice: 149.9, sales: 432, category: 'clothes', image: 'images/freekuzi.jpg' },
    { id: 13, name: '厨房刀具套装', desc: '锋利耐用，品质保证', price: 199.9, originalPrice: 269.9, sales: 189, category: 'kitchen', image: 'images/daodao.jpg' },
    { id: 14, name: '不粘锅', desc: '不粘易清洗，导热均匀', price: 159.9, originalPrice: 199.9, sales: 345, category: 'kitchen', image: 'images/buzhanguo.jpg' },
    { id: 15, name: '保温杯', desc: '316不锈钢，保温持久', price: 89.9, originalPrice: 119.9, sales: 567, category: 'kitchen', image: 'images/baowenbei.jpg' },
    { id: 16, name: '餐具套装', desc: '精美陶瓷，品质生活', price: 129.9, originalPrice: 169.9, sales: 234, category: 'kitchen', image: 'images/canju.jpg' },
    { id: 17, name: '电饭煲', desc: '智能预约，煮饭更香', price: 299.9, originalPrice: 399.9, sales: 156, category: 'kitchen', image: 'images/kitchen6.png' },
    { id: 18, name: '榨汁机', desc: '多功能料理，健康生活', price: 179.9, originalPrice: 239.9, sales: 289, category: 'kitchen', image: 'images/kitchen3.png' },
    { id: 19, name: '家居收纳盒', desc: '多功能收纳，整洁生活', price: 39.9, originalPrice: 59.9, sales: 876, category: 'home', image: 'images/home1.webp' },
    { id: 20, name: '舒适沙发垫', desc: '柔软舒适，四季通用', price: 69.9, originalPrice: 89.9, sales: 432, category: 'home', image: 'images/home2.webp' },
    { id: 21, name: '台灯', desc: '护眼设计，阅读必备', price: 59.9, originalPrice: 79.9, sales: 356, category: 'home', image: 'images/home3.webp' },
    { id: 22, name: '地毯', desc: '柔软舒适，装饰美观', price: 149.9, originalPrice: 199.9, sales: 234, category: 'home', image: 'images/home4.webp' },
    { id: 23, name: '绿植', desc: '纯棉材质，柔软吸水', price: 29.9, originalPrice: 39.9, sales: 789, category: 'home', image: 'images/home3.png' },
    { id: 24, name: '收纳架', desc: '多层设计，节省空间', price: 49.9, originalPrice: 69.9, sales: 543, category: 'home', image: 'images/home6.png' }
];

// 商品数据管理类
class ProductService {
    constructor() {
        this.products = mockProducts;
    }
    
    // 获取所有商品
    getAllProducts() {
        return Promise.resolve(this.products);
    }
    
    // 根据分类获取商品
    getProductsByCategory(category) {
        if (!category || category === 'all') {
            return this.getAllProducts();
        }
        const filtered = this.products.filter(p => p.category === category);
        return Promise.resolve(filtered);
    }
    
    // 根据关键词搜索商品
    searchProducts(keyword) {
        if (!keyword) {
            return this.getAllProducts();
        }
        const lowerKeyword = keyword.toLowerCase();
        const filtered = this.products.filter(p => 
            p.name.toLowerCase().includes(lowerKeyword) || 
            p.desc.toLowerCase().includes(lowerKeyword)
        );
        return Promise.resolve(filtered);
    }
    
    // 根据ID获取商品
    getProductById(id) {
        const product = this.products.find(p => p.id === parseInt(id));
        return Promise.resolve(product || null);
    }
    
    // 筛选商品
    filterProducts(options = {}) {
        let filtered = [...this.products];
        
        // 分类筛选
        if (options.category && options.category !== 'all') {
            filtered = filtered.filter(p => p.category === options.category);
        }
        
        // 关键词筛选
        if (options.keyword) {
            const lowerKeyword = options.keyword.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(lowerKeyword) || 
                p.desc.toLowerCase().includes(lowerKeyword)
            );
        }
        
        // 价格筛选
        if (options.minPrice !== undefined) {
            filtered = filtered.filter(p => p.price >= options.minPrice);
        }
        if (options.maxPrice !== undefined) {
            filtered = filtered.filter(p => p.price <= options.maxPrice);
        }
        
        // 排序
        if (options.sort === 'price-asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (options.sort === 'price-desc') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (options.sort === 'sales') {
            filtered.sort((a, b) => b.sales - a.sales);
        }
        
        return Promise.resolve(filtered);
    }
}

// 商品列表页初始化
document.addEventListener('DOMContentLoaded', function() {
    const productService = new ProductService();
    const productGrid = document.getElementById('product-grid');
    const searchResult = document.getElementById('search-result');
    
    // 只有在商品列表页（有 search-result 元素）才执行商品列表逻辑
    if (!searchResult) return;
    
    const resultCount = searchResult.querySelector('strong');
    const currentCategory = document.getElementById('current-category');
    
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const keyword = urlParams.get('keyword');
    
    // 设置当前分类显示
    const categoryNames = {
        all: '全部商品',
        fresh: '生鲜食品',
        clothes: '服装服饰',
        kitchen: '厨房用品',
        home: '家居生活',
        hot: '热门推荐',
        new: '新品上市'
    };
    currentCategory.textContent = keyword ? `搜索: ${keyword}` : categoryNames[category] || '全部商品';
    
    // 分类高亮跟随
    initCategoryFilterHighlight(category);
    
    // 加载商品
    loadProducts({ category, keyword });
    
    // 排序按钮事件
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const sort = this.dataset.sort;
            loadProducts({ category, keyword, sort });
        });
    });
    
    // 视图切换
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const view = this.dataset.view;
            productGrid.classList.toggle('list-view', view === 'list');
        });
    });
    
    // 价格筛选
    document.getElementById('price-filter-btn').addEventListener('click', function() {
        const minPrice = parseFloat(document.getElementById('price-min').value) || undefined;
        const maxPrice = parseFloat(document.getElementById('price-max').value) || undefined;
        loadProducts({ category, keyword, minPrice, maxPrice });
    });
    
    // 加载商品函数
    async function loadProducts(options = {}) {
        const products = await productService.filterProducts(options);
        
        // 更新商品数量
        resultCount.textContent = products.length;
        
        // 渲染商品列表
        renderProducts(products);
    }
    
    // 渲染商品列表
    function renderProducts(products) {
        if (products.length === 0) {
            productGrid.innerHTML = '<div class="no-products">暂无商品</div>';
            return;
        }
        
        productGrid.innerHTML = products.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                </div>
                <div class="product-info">
                    <h3 class="product-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
                    <p class="product-desc">${product.desc}</p>
                    <p class="product-price">¥${product.price.toFixed(2)}<span>¥${product.originalPrice.toFixed(2)}</span></p>
                    <div class="product-footer">
                        <span class="sales-count">已售 ${product.sales}</span>
                        <button class="add-cart-btn" data-id="${product.id}">加入购物车</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // 添加购物车按钮事件
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                addToCart(parseInt(this.dataset.id));
            });
        });
    }
    
    // 添加到购物车
    function addToCart(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = mockProducts.find(p => p.id === productId);
        
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert('已添加到购物车');
        }
    }
});

// 在文件末尾添加以下内容

// 商品详情页初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是商品详情页
    if (!document.getElementById('detail-content')) return;
    
    const productService = new ProductService();
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        alert('请选择商品');
        window.location.href = 'product.html';
        return;
    }
    
    // 加载商品详情
    loadProductDetail(productId);
    
    // 数量控制
    const qtyInput = document.getElementById('qty-input');
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    
    qtyMinus.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    qtyPlus.addEventListener('click', function() {
        let value = parseInt(qtyInput.value);
        if (value < 99) {
            qtyInput.value = value + 1;
        }
    });
    
    // 加入购物车
    document.getElementById('add-cart-btn').addEventListener('click', function() {
        addToCart(productId);
    });
    
    // 立即购买
    document.getElementById('buy-now-btn').addEventListener('click', function() {
        // 先添加到购物车，然后跳转到结算页
        addToCart(productId);
        window.location.href = 'checkout.html';
    });
    
    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const tabId = 'tab-' + this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 缩略图切换
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const mainImg = document.getElementById('main-img');
            mainImg.src = this.querySelector('img').src;
        });
    });
});

// 加载商品详情
function loadProductDetail(productId) {
    const product = mockProducts.find(p => p.id === parseInt(productId));
    
    if (!product) {
        alert('商品不存在');
        window.location.href = 'product.html';
        return;
    }
    
    // 更新页面标题
    document.getElementById('product-name').textContent = product.name;
    document.title = product.name + ' - 优选商城';
    
    // 更新商品信息
    document.getElementById('detail-title').textContent = product.name;
    document.getElementById('detail-desc').textContent = product.desc;
    document.getElementById('current-price').textContent = '¥' + product.price.toFixed(2);
    document.getElementById('original-price').textContent = '¥' + product.originalPrice.toFixed(2);
    
    // 计算折扣
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    document.getElementById('discount').textContent = discount + '折';
    
    // 更新销量
    document.getElementById('sales-count').textContent = product.sales;
    
    // 设置图片
    const mainImg = document.getElementById('main-img');
    mainImg.src = product.image;
    
    // 设置缩略图（使用商品图片及其它相关图片）
    const thumbnails = document.querySelectorAll('.thumbnail img');
    const imageList = [product.image, product.image, product.image, product.image];
    thumbnails.forEach((thumb, index) => {
        thumb.src = imageList[index] || product.image;
    });
    
    // 生成规格选项（模拟）
    const colorOptions = ['红色', '蓝色', '绿色', '黄色'];
    const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];
    
    const colorContainer = document.getElementById('color-options');
    colorOptions.forEach((color, index) => {
        const option = document.createElement('span');
        option.className = 'spec-option' + (index === 0 ? ' active' : '');
        option.textContent = color;
        colorContainer.appendChild(option);
    });
    
    const sizeContainer = document.getElementById('size-options');
    sizeOptions.forEach((size, index) => {
        const option = document.createElement('span');
        option.className = 'spec-option' + (index === 0 ? ' active' : '');
        option.textContent = size;
        sizeContainer.appendChild(option);
    });
    
    // 添加规格选项点击事件
    document.querySelectorAll('.spec-option').forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.spec-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 加载评价
    loadReviews();
}

// 加载评价
function loadReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const mockReviews = [
        { user: '用户***1', rating: '★★★★★', content: '商品质量很好，非常满意！物流也很快，下次还会购买。', date: '2024-01-15' },
        { user: '用户***2', rating: '★★★★★', content: '包装精美，商品新鲜，值得推荐！', date: '2024-01-14' },
        { user: '用户***3', rating: '★★★★☆', content: '总体不错，就是价格稍微有点贵。', date: '2024-01-13' },
        { user: '用户***4', rating: '★★★★★', content: '第二次购买了，质量一如既往的好！', date: '2024-01-12' },
        { user: '用户***5', rating: '★★★★★', content: '客服态度很好，解答问题很耐心。', date: '2024-01-11' }
    ];
    
    reviewsList.innerHTML = mockReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-user">${review.user}</span>
                <span class="review-rating">${review.rating}</span>
            </div>
            <p class="review-content">${review.content}</p>
            <p class="review-date">${review.date}</p>
        </div>
    `).join('');
}

// 添加到购物车
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = mockProducts.find(p => p.id === parseInt(productId));
    const qty = parseInt(document.getElementById('qty-input').value) || 1;
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: qty
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('已添加到购物车');
    }
}

// 分类筛选高亮跟随
function initCategoryFilterHighlight(currentCategory) {
    const filterCategoryLinks = document.querySelectorAll('.filter-category li a');
    if (!filterCategoryLinks.length) return;
    
    // 根据当前分类设置高亮
    filterCategoryLinks.forEach(link => {
        // 移除所有高亮
        link.classList.remove('active');
        
        // 检查是否匹配当前分类
        const href = link.getAttribute('href');
        if (currentCategory === 'all' && href === 'product.html') {
            link.classList.add('active');
        } else if (href.includes(`category=${currentCategory}`)) {
            link.classList.add('active');
        }
    });
    
    // 添加点击事件
    filterCategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有高亮
            filterCategoryLinks.forEach(l => l.classList.remove('active'));
            // 设置当前链接高亮
            this.classList.add('active');
        });
    });
}