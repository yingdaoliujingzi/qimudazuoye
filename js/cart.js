// 购物车脚本

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是购物车页面（只有购物车页面有 cart-items 元素）
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        renderCart();
    }
    
    // 全选按钮（只在购物车页面存在）
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox input');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateSelectedItems();
        });
    }
    
    // 清空购物车（只在购物车页面存在）
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('确定要清空购物车吗？')) {
                localStorage.removeItem('cart');
                renderCart();
                updateCartCount();
            }
        });
    }
    
    // 结算按钮（只在购物车页面存在）
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // 获取选中的商品
            const selectedItems = getSelectedItems();
            if (selectedItems.length === 0) {
                alert('请选择要结算的商品');
                return;
            }
            
            // 保存选中的商品到localStorage用于结算
            localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
            
            // 跳转到结算页
            window.location.href = 'checkout.html';
        });
    }
});

// 渲染购物车
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return; // 添加检查
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // 购物车为空
        cartItems.innerHTML = `
            <div class="empty-cart" id="empty-cart">
                <img src="images/shoppingcar.jpg" alt="购物车为空">
                <p>购物车空空如也~</p>
                <a href="product.html" class="go-shopping-btn">去购物</a>
            </div>
        `;
        updateSummary();
        return;
    }
    
    // 渲染购物车商品
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-checkbox">
                <input type="checkbox" class="item-select" data-id="${item.id}">
            </div>
            <div class="item-image">
                <a href="product-detail.html?id=${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                </a>
            </div>
            <div class="item-info">
                <h3 class="item-name"><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
                <p class="item-spec">颜色：红色 | 尺码：M</p>
                <div class="item-price-row">
                    <span class="item-price">¥${item.price.toFixed(2)}</span>
                    <span class="item-original-price">¥${(item.price * 1.3).toFixed(2)}</span>
                </div>
                <div class="item-quantity">
                    <span>数量：</span>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="updateQuantityInput(${item.id}, this)">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="item-actions">
                <button class="item-action-btn" onclick="removeFromCart(${item.id})">删除</button>
            </div>
        </div>
    `).join('');
    
    // 添加复选框点击事件
    document.querySelectorAll('.item-select').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedItems);
    });
    
    updateSummary();
}
// 更新数量
function updateQuantity(productId, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// 通过输入框更新数量
function updateQuantityInput(productId, input) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        let quantity = parseInt(input.value);
        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// 从购物车删除商品
function removeFromCart(productId) {
    if (confirm('确定要删除这件商品吗？')) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
}

// 更新选中商品
function updateSelectedItems() {
    const checkboxes = document.querySelectorAll('.item-checkbox input');
    const selectAll = document.getElementById('select-all');
    
    // 更新全选状态
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    selectAll.checked = allChecked;
    
    updateSummary();
}

// 获取选中的商品
function getSelectedItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedIds = Array.from(document.querySelectorAll('.item-select:checked'))
        .map(cb => parseInt(cb.dataset.id));
    
    return cart.filter(item => selectedIds.includes(item.id));
}

// 更新结算信息
function updateSummary() {
    const selectedItems = getSelectedItems();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 更新选中数量
    document.getElementById('selected-count').textContent = selectedItems.length + ' 件';
    
    // 计算商品金额
    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('subtotal').textContent = '¥' + subtotal.toFixed(2);
    
    // 运费（满99免运费）
    const shipping = subtotal >= 99 ? 0 : 10;
    document.getElementById('shipping').textContent = shipping === 0 ? '免运费' : '¥' + shipping.toFixed(2);
    
    // 合计
    const total = subtotal + shipping;
    document.getElementById('total').textContent = '¥' + total.toFixed(2);
    
    // 更新结算按钮状态
    const checkoutBtn = document.getElementById('checkout-btn');
    if (selectedItems.length > 0) {
        checkoutBtn.classList.add('enabled');
        checkoutBtn.disabled = false;
    } else {
        checkoutBtn.classList.remove('enabled');
        checkoutBtn.disabled = true;
    }
    
    // 更新全选状态
    const selectAll = document.getElementById('select-all');
    if (cart.length > 0) {
        const allChecked = cart.length === selectedItems.length;
        selectAll.checked = allChecked;
    }
}

// 更新购物车数量
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalCount;
    }
}

// 在文件末尾添加以下内容

// 结算页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是结算页面
    if (!document.querySelector('.checkout-container')) return;
    
    // 加载地址列表
    loadAddresses();
    
    // 加载商品清单
    loadCheckoutItems();
    
    // 添加地址按钮
    document.getElementById('add-address-btn').addEventListener('click', function() {
        document.getElementById('address-modal').classList.add('show');
    });
    
    // 关闭地址弹窗
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('address-modal').classList.remove('show');
    });
    
    // 地址表单提交
    document.getElementById('address-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAddress();
    });
    
    // 提交订单按钮
    document.getElementById('submit-order-btn').addEventListener('click', function() {
        submitOrder();
    });
    
    // 查看订单按钮
    document.getElementById('view-order-btn').addEventListener('click', function() {
        window.location.href = 'order.html';
    });
    
    // 继续购物按钮
    document.getElementById('continue-shopping-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // 支付方式选择
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            const paymentAmount = document.getElementById('payment-amount');
            const total = document.getElementById('total').textContent;
            paymentAmount.textContent = total;
            
            document.getElementById('payment-modal').classList.add('show');
            
            // 模拟支付
            setTimeout(() => {
                document.getElementById('payment-modal').classList.remove('show');
                document.getElementById('success-modal').classList.add('show');
            }, 2000);
        });
    });
    
    // 取消支付
    document.querySelector('.cancel-payment').addEventListener('click', function() {
        document.getElementById('payment-modal').classList.remove('show');
    });
    
    // 点击弹窗外部关闭
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
});

// 加载地址列表
function loadAddresses() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [
        {
            id: 1,
            name: '张三',
            phone: '138****8888',
            region: '北京市',
            detail: '朝阳区建国路88号SOHO现代城A座1801',
            isDefault: true
        },
        {
            id: 2,
            name: '李四',
            phone: '139****9999',
            region: '上海市',
            detail: '浦东新区陆家嘴环路1000号恒生银行大厦20层',
            isDefault: false
        }
    ];
    
    const addressList = document.getElementById('address-list');
    
    if (addresses.length === 0) {
        addressList.innerHTML = '<p style="text-align: center; color: #999;">暂无收货地址</p>';
        return;
    }
    
    addressList.innerHTML = addresses.map(addr => `
        <div class="address-item ${addr.isDefault ? 'selected' : ''}" data-id="${addr.id}">
            <div class="address-header">
                <div>
                    <span class="address-name">${addr.name}</span>
                    <span class="address-phone">${addr.phone}</span>
                </div>
                ${addr.isDefault ? '<span class="address-default">默认</span>' : ''}
            </div>
            <p class="address-detail">${addr.region} ${addr.detail}</p>
        </div>
    `).join('');
    
    // 添加地址选择事件
    document.querySelectorAll('.address-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.address-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// 保存地址
function saveAddress() {
    const addresses = JSON.parse(localStorage.getItem('addresses')) || [];
    
    const newAddress = {
        id: Date.now(),
        name: document.getElementById('contact-name').value,
        phone: document.getElementById('contact-phone').value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'),
        region: document.getElementById('address-region').value,
        detail: document.getElementById('address-detail').value,
        isDefault: document.getElementById('is-default').checked
    };
    
    // 如果设为默认，取消其他默认
    if (newAddress.isDefault) {
        addresses.forEach(addr => addr.isDefault = false);
    }
    
    addresses.push(newAddress);
    localStorage.setItem('addresses', JSON.stringify(addresses));
    
    // 刷新地址列表
    loadAddresses();
    
    // 关闭弹窗
    document.getElementById('address-modal').classList.remove('show');
    
    // 清空表单
    document.getElementById('address-form').reset();
}

// 加载结算商品
function loadCheckoutItems() {
    const items = JSON.parse(localStorage.getItem('checkoutItems')) || JSON.parse(localStorage.getItem('cart')) || [];
    
    const productList = document.getElementById('product-list');
    
    if (items.length === 0) {
        productList.innerHTML = '<p style="text-align: center; color: #999;">没有选中的商品</p>';
        return;
    }
    
    productList.innerHTML = items.map(item => `
        <div class="checkout-product">
            <div class="checkout-product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="checkout-product-info">
                <div>
                    <h4 class="checkout-product-name">${item.name}</h4>
                    <p class="checkout-product-spec">颜色：红色 | 尺码：M</p>
                </div>
                <div class="checkout-product-price-row">
                    <span class="checkout-product-price">¥${item.price.toFixed(2)}</span>
                    <span class="checkout-product-quantity">x${item.quantity}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // 更新订单金额
    updateCheckoutSummary(items);
}

// 更新结算金额
function updateCheckoutSummary(items) {
    // 商品金额
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('subtotal').textContent = '¥' + subtotal.toFixed(2);
    
    // 运费（满99免运费）
    const shipping = subtotal >= 99 ? 0 : 10;
    document.getElementById('shipping').textContent = shipping === 0 ? '免运费' : '¥' + shipping.toFixed(2);
    
    // 优惠（满200减20）
    const discount = subtotal >= 200 ? 20 : 0;
    document.getElementById('discount').textContent = discount > 0 ? '-¥' + discount.toFixed(2) : '-¥0.00';
    
    // 实付金额
    const total = subtotal + shipping - discount;
    document.getElementById('total').textContent = '¥' + total.toFixed(2);
    
    // 支付弹窗金额
    document.getElementById('payment-amount').textContent = '¥' + total.toFixed(2);
}

// 提交订单
function submitOrder() {
    // 检查是否选择了地址
    const selectedAddress = document.querySelector('.address-item.selected');
    if (!selectedAddress) {
        alert('请选择收货地址');
        return;
    }
    
    // 获取商品列表
    const items = JSON.parse(localStorage.getItem('checkoutItems')) || JSON.parse(localStorage.getItem('cart')) || [];
    
    if (items.length === 0) {
        alert('没有商品需要结算');
        return;
    }
    
    // 创建订单
    const order = {
        id: 'ORD' + Date.now(),
        items: items,
        total: parseFloat(document.getElementById('total').textContent.replace('¥', '')),
        status: 'pending',
        createdAt: new Date().toISOString(),
        address: {
            name: selectedAddress.querySelector('.address-name').textContent,
            phone: selectedAddress.querySelector('.address-phone').textContent,
            detail: selectedAddress.querySelector('.address-detail').textContent
        },
        note: document.getElementById('order-note').value
    };
    
    // 保存订单
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // 清空购物车中已结算的商品
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutIds = items.map(item => item.id);
    cart = cart.filter(item => !checkoutIds.includes(item.id));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('checkoutItems');
    
    // 更新购物车数量
    updateCartCount();
    
    // 显示支付弹窗
    document.getElementById('payment-modal').classList.add('show');
    
    // 模拟支付过程
    setTimeout(() => {
        document.getElementById('payment-modal').classList.remove('show');
        
        // 更新订单状态为已支付
        orders[0].status = 'paid';
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // 显示成功弹窗
        document.getElementById('success-modal').classList.add('show');
    }, 2000);
}

// 在文件末尾添加以下内容

// 订单页面初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是订单页面
    if (!document.querySelector('.order-list')) return;
    
    // 初始化订单列表
    loadOrders();
    
    // 订单状态筛选
    document.querySelectorAll('.order-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.order-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const status = this.dataset.status;
            loadOrders(status);
        });
    });
    
    // 关闭订单详情弹窗
    document.getElementById('close-order-modal').addEventListener('click', function() {
        document.getElementById('order-modal').classList.remove('show');
    });
    
    // 点击弹窗外部关闭
    document.getElementById('order-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
});

// 加载订单列表
function loadOrders(status = 'all') {
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const orderList = document.getElementById('order-list');
    
    // 筛选订单
    let filteredOrders = orders;
    if (status !== 'all') {
        filteredOrders = orders.filter(order => order.status === status);
    }
    
    if (filteredOrders.length === 0) {
        orderList.innerHTML = `
            <div class="empty-orders">
                <img src="images/app.png" alt="暂无订单">
                <p>暂无${status === 'all' ? '' : getStatusName(status)}订单</p>
                <a href="product.html">去购物</a>
            </div>
        `;
        return;
    }
    
    orderList.innerHTML = filteredOrders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <div class="order-header">
                <div class="order-id">订单号：<span>${order.id}</span></div>
                <div class="order-status ${order.status}">${getStatusName(order.status)}</div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-product">
                        <div class="order-product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="order-product-info">
                            <div>
                                <h4 class="order-product-name">${item.name}</h4>
                                <p class="order-product-spec">颜色：红色 | 尺码：M</p>
                            </div>
                            <div class="order-product-price-row">
                                <span class="order-product-price">¥${item.price.toFixed(2)}</span>
                                <span class="order-product-quantity">x${item.quantity}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">实付金额：<strong>¥${order.total.toFixed(2)}</strong></div>
                <div class="order-actions">
                    <button class="order-action-btn" onclick="viewOrderDetail('${order.id}')">查看详情</button>
                    ${getOrderActions(order)}
                </div>
            </div>
        </div>
    `).join('');
}

// 获取订单状态名称
function getStatusName(status) {
    const statusNames = {
        pending: '待付款',
        paid: '待发货',
        shipped: '待收货',
        completed: '已完成',
        cancelled: '已取消'
    };
    return statusNames[status] || status;
}

// 获取订单操作按钮
function getOrderActions(order) {
    const actions = [];
    
    switch (order.status) {
        case 'pending':
            actions.push('<button class="order-action-btn primary" onclick="payOrder(\'' + order.id + '\')">立即支付</button>');
            actions.push('<button class="order-action-btn danger" onclick="cancelOrder(\'' + order.id + '\')">取消订单</button>');
            break;
        case 'paid':
            actions.push('<button class="order-action-btn" onclick="remindShip(\'' + order.id + '\')">提醒发货</button>');
            break;
        case 'shipped':
            actions.push('<button class="order-action-btn primary" onclick="confirmReceipt(\'' + order.id + '\')">确认收货</button>');
            break;
        case 'completed':
            actions.push('<button class="order-action-btn" onclick="buyAgain(\'' + order.id + '\')">再次购买</button>');
            break;
        case 'cancelled':
            actions.push('<button class="order-action-btn" onclick="buyAgain(\'' + order.id + '\')">再次购买</button>');
            break;
    }
    
    return actions.join('');
}

// 查看订单详情
function viewOrderDetail(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    const detailHtml = `
        <div class="order-detail-section">
            <h4>订单信息</h4>
            <div class="order-detail-info">
                <p>订单号：${order.id}</p>
                <p>状态：${getStatusName(order.status)}</p>
                <p>创建时间：${formatDate(order.createdAt)}</p>
            </div>
        </div>
        <div class="order-detail-section">
            <h4>收货地址</h4>
            <div class="order-detail-info">
                <p>${order.address.name} ${order.address.phone}</p>
                <p>${order.address.detail}</p>
            </div>
        </div>
        <div class="order-detail-section">
            <h4>商品清单</h4>
            <div class="order-detail-products">
                ${order.items.map(item => `
                    <div class="order-detail-product">
                        <div class="order-detail-product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="order-detail-product-info">
                            <p class="order-detail-product-name">${item.name}</p>
                            <p class="order-detail-product-price">¥${item.price.toFixed(2)} x${item.quantity}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="order-detail-section">
            <div class="order-detail-total">
                <span>实付金额</span>
                <span>¥${order.total.toFixed(2)}</span>
            </div>
        </div>
    `;
    
    document.getElementById('order-detail').innerHTML = detailHtml;
    document.getElementById('order-modal').classList.add('show');
}

// 支付订单
function payOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return;
    
    // 模拟支付
    alert('正在支付...');
    
    setTimeout(() => {
        orders[orderIndex].status = 'paid';
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        alert('支付成功！');
    }, 1000);
}

// 取消订单
function cancelOrder(orderId) {
    if (!confirm('确定要取消订单吗？')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return;
    
    orders[orderIndex].status = 'cancelled';
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
    alert('订单已取消');
}

// 提醒发货
function remindShip(orderId) {
    alert('已提醒卖家发货，卖家会尽快处理');
}

// 确认收货
function confirmReceipt(orderId) {
    if (!confirm('确定已收到商品吗？')) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex === -1) return;
    
    orders[orderIndex].status = 'completed';
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
    alert('已确认收货，感谢您的购买！');
}

// 再次购买
function buyAgain(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    // 将订单商品添加到购物车
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    order.items.forEach(item => {
        const existingItem = cart.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push({ ...item });
        }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    alert('已添加到购物车');
    window.location.href = 'cart.html';
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 获取模拟订单数据
function getMockOrders() {
    const mockOrders = [
        {
            id: 'ORD' + Date.now(),
            items: [
                { id: 1, name: '精选红富士苹果', price: 29.9, image: 'images/fresh1.png', quantity: 2 },
                { id: 2, name: '进口香蕉', price: 15.9, image: 'images/fresh2.png', quantity: 1 }
            ],
            total: 75.7,
            status: 'shipped',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            address: {
                name: '张三',
                phone: '138****8888',
                detail: '北京市朝阳区建国路88号'
            },
            note: ''
        },
        {
            id: 'ORD' + (Date.now() - 1000),
            items: [
                { id: 7, name: '休闲衬衫', price: 129.9, image: 'images/clothes1.png', quantity: 1 },
                { id: 9, name: '经典牛仔裤', price: 99.9, image: 'images/clothes3.png', quantity: 1 }
            ],
            total: 229.8,
            status: 'completed',
            createdAt: new Date(Date.now() - 604800000).toISOString(),
            address: {
                name: '张三',
                phone: '138****8888',
                detail: '北京市朝阳区建国路88号'
            },
            note: '尽快发货'
        },
        {
            id: 'ORD' + (Date.now() - 2000),
            items: [
                { id: 13, name: '厨房刀具套装', price: 199.9, image: 'images/kitchen1.png', quantity: 1 }
            ],
            total: 199.9,
            status: 'paid',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            address: {
                name: '李四',
                phone: '139****9999',
                detail: '上海市浦东新区陆家嘴环路1000号'
            },
            note: ''
        },
        {
            id: 'ORD' + (Date.now() - 3000),
            items: [
                { id: 3, name: '有机蔬菜礼盒', price: 49.9, image: 'images/fresh3.png', quantity: 1 },
                { id: 5, name: '新鲜草莓', price: 39.9, image: 'images/fresh5.png', quantity: 2 }
            ],
            total: 129.7,
            status: 'pending',
            createdAt: new Date().toISOString(),
            address: {
                name: '张三',
                phone: '138****8888',
                detail: '北京市朝阳区建国路88号'
            },
            note: ''
        }
    ];
    
    return mockOrders;
}// 购物车脚本

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是购物车页面（只有购物车页面有 cart-items 元素）
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        renderCart();
    }
    
    // 全选按钮（只在购物车页面存在）
    const selectAll = document.getElementById('select-all');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox input');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateSelectedItems();
        });
    }
    
    // 清空购物车（只在购物车页面存在）
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('确定要清空购物车吗？')) {
                localStorage.removeItem('cart');
                renderCart();
                updateCartCount();
            }
        });
    }
    
    // 结算按钮（只在购物车页面存在）
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // 获取选中的商品
            const selectedItems = getSelectedItems();
            if (selectedItems.length === 0) {
                alert('请选择要结算的商品');
                return;
            }
            
            // 保存选中的商品到localStorage用于结算
            localStorage.setItem('checkoutItems', JSON.stringify(selectedItems));
            
            // 跳转到结算页
            window.location.href = 'checkout.html';
        });
    }
});

// 渲染购物车
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return; // 添加检查
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        // 购物车为空
        cartItems.innerHTML = `
            <div class="empty-cart" id="empty-cart">
                <img src="images/shoppingcar.jpg" alt="购物车为空">
                <p>购物车空空如也~</p>
                <a href="product.html" class="go-shopping-btn">去购物</a>
            </div>
        `;
        updateSummary();
        return;
    }
    
    // 渲染购物车商品
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-checkbox">
                <input type="checkbox" class="item-select" data-id="${item.id}">
            </div>
            <div class="item-image">
                <a href="product-detail.html?id=${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                </a>
            </div>
            <div class="item-info">
                <h3 class="item-name"><a href="product-detail.html?id=${item.id}">${item.name}</a></h3>
                <p class="item-spec">颜色：红色 | 尺码：M</p>
                <div class="item-price-row">
                    <span class="item-price">¥${item.price.toFixed(2)}</span>
                    <span class="item-original-price">¥${(item.price * 1.3).toFixed(2)}</span>
                </div>
                <div class="item-quantity">
                    <span>数量：</span>
                    <div class="qty-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" onchange="updateQuantityInput(${item.id}, this)">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="item-actions">
                <button class="item-action-btn" onclick="removeFromCart(${item.id})">删除</button>
            </div>
        </div>
    `).join('');
    
    // 添加复选框点击事件
    document.querySelectorAll('.item-select').forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectedItems);
    });
    
    updateSummary();
}