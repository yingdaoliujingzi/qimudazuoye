// 全局脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化购物车数量
    updateCartCount();
    
    // 添加平滑滚动
    addSmoothScroll();
    
    // 导航栏滚动效果
    addNavbarScrollEffect();
    
    // 分类导航高亮跟随
    initCategoryNavHighlight();
});

// 更新购物车数量
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (!cartCount) return; // 如果元素不存在，直接返回
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
}

// 平滑滚动
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function addNavbarScrollEffect() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
        }
    });
}

// 分类导航高亮跟随
function initCategoryNavHighlight() {
    const categoryLinks = document.querySelectorAll('.category-list li a');
    if (!categoryLinks.length) return;
    
    // 获取当前页面的URL
    const currentUrl = window.location.href;
    
    // 根据URL设置高亮
    categoryLinks.forEach(link => {
        const linkUrl = link.href;
        
        // 检查是否匹配
        if (currentUrl === linkUrl) {
            // 移除所有高亮
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 设置当前链接高亮
            link.classList.add('active');
        }
        
        // 添加点击事件
        link.addEventListener('click', function(e) {
            // 移除所有高亮
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 设置当前链接高亮
            this.classList.add('active');
        });
    });
}

// 通用工具函数
const utils = {
    // 格式化价格
    formatPrice: function(price) {
        return '¥' + parseFloat(price).toFixed(2);
    },
    
    // 获取URL参数
    getUrlParam: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    // 设置本地存储
    setStorage: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    // 获取本地存储
    getStorage: function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
};

// 导出工具函数
window.utils = utils;