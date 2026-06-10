// 个人中心脚本

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是个人中心页面
    if (!document.querySelector('.profile-main')) return;
    
    // 初始化用户信息
    loadUserInfo();
    
    // 加载订单统计
    loadOrderStats();
    
    // 编辑资料按钮
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        document.getElementById('edit-modal').classList.add('show');
        loadCurrentUserInfo();
    });
    
    // 关闭编辑弹窗
    document.getElementById('close-edit-modal').addEventListener('click', function() {
        document.getElementById('edit-modal').classList.remove('show');
    });
    
    // 编辑表单提交
    document.getElementById('edit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });
    
    // 退出登录按钮
    document.getElementById('logout-btn').addEventListener('click', function() {
        if (confirm('确定要退出登录吗？')) {
            localStorage.removeItem('currentUser');
            loadUserInfo();
            alert('已退出登录');
        }
    });
    
    // 收货地址链接
    document.getElementById('address-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('address-modal').classList.add('show');
        loadAddresses();
    });
    
    // 关闭地址弹窗
    document.getElementById('close-address-modal').addEventListener('click', function() {
        document.getElementById('address-modal').classList.remove('show');
    });
    
    // 添加地址按钮
    document.getElementById('profile-add-address').addEventListener('click', function() {
        // 跳转到结算页添加地址的逻辑
        alert('地址管理功能已在结算页面实现');
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

// 加载用户信息
function loadUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser && currentUser.isLoggedIn) {
        document.getElementById('user-name').textContent = currentUser.username;
        document.getElementById('user-email').textContent = currentUser.email;
        document.getElementById('logout-btn').style.display = 'block';
    } else {
        document.getElementById('user-name').textContent = '未登录用户';
        document.getElementById('user-email').textContent = '请登录查看更多信息';
        document.getElementById('logout-btn').style.display = 'none';
    }
}

// 加载当前用户信息到表单
function loadCurrentUserInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    
    if (currentUser) {
        document.getElementById('edit-username').value = currentUser.username || '';
        document.getElementById('edit-email').value = currentUser.email || '';
        document.getElementById('edit-phone').value = userProfile.phone || '';
        document.getElementById('edit-gender').value = userProfile.gender || '';
        document.getElementById('edit-birthday').value = userProfile.birthday || '';
    }
}

// 保存用户资料
function saveProfile() {
    const userProfile = {
        phone: document.getElementById('edit-phone').value,
        gender: document.getElementById('edit-gender').value,
        birthday: document.getElementById('edit-birthday').value
    };
    
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // 更新当前用户信息
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        currentUser.username = document.getElementById('edit-username').value;
        currentUser.email = document.getElementById('edit-email').value;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // 更新页面显示
    loadUserInfo();
    
    // 关闭弹窗
    document.getElementById('edit-modal').classList.remove('show');
    
    alert('资料保存成功');
}

// 加载订单统计
function loadOrderStats() {
    const orders = JSON.parse(localStorage.getItem('orders')) || getMockOrders();
    
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    const paidCount = orders.filter(o => o.status === 'paid').length;
    const shippedCount = orders.filter(o => o.status === 'shipped').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;
    
    document.getElementById('order-count').textContent = orders.length;
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('paid-count').textContent = paidCount;
    document.getElementById('shipped-count').textContent = shippedCount;
    document.getElementById('completed-count').textContent = completedCount;
    
    // 设置收藏和优惠券数量（模拟）
    document.getElementById('favorite-count').textContent = 5;
    document.getElementById('coupon-count').textContent = 3;
}

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
    
    const addressList = document.getElementById('profile-address-list');
    
    if (addresses.length === 0) {
        addressList.innerHTML = '<p style="text-align: center; color: #999;">暂无收货地址</p>';
        return;
    }
    
    addressList.innerHTML = addresses.map(addr => `
        <div class="address-item">
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
}

// 获取模拟订单数据（与cart.js中相同，确保函数存在）
function getMockOrders() {
    return [];
}