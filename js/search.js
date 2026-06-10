// 搜索功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !searchBtn) return;
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // 回车键搜索
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 执行搜索
    function performSearch() {
        const keyword = searchInput.value.trim();
        
        if (!keyword) {
            alert('请输入搜索关键词');
            return;
        }
        
        // 跳转到商品列表页并携带搜索参数
        window.location.href = `product.html?keyword=${encodeURIComponent(keyword)}`;
    }
    
    // 搜索建议功能
    searchInput.addEventListener('input', function() {
        const keyword = this.value.trim();
        
        if (keyword.length > 0) {
            showSearchSuggestions(keyword);
        } else {
            hideSearchSuggestions();
        }
    });
    
    // 显示搜索建议
    function showSearchSuggestions(keyword) {
        // 从商品数据中获取搜索建议
        const suggestions = getProductSuggestions(keyword);
        
        // 如果已有建议框，先移除
        let suggestionBox = document.querySelector('.search-suggestions');
        if (suggestionBox) {
            suggestionBox.remove();
        }
        
        // 如果没有匹配的建议，不显示下拉框
        if (suggestions.length === 0) {
            return;
        }
        
        // 创建建议框
        suggestionBox = document.createElement('div');
        suggestionBox.className = 'search-suggestions';
        suggestionBox.innerHTML = suggestions.map(suggestion => `
            <div class="suggestion-item">
                <span class="suggestion-icon">🔍</span>
                <span class="suggestion-text">${suggestion}</span>
            </div>
        `).join('');
        
        // 添加到搜索框下方
        searchInput.parentNode.appendChild(suggestionBox);
        
        // 添加建议项点击事件
        suggestionBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                searchInput.value = this.querySelector('.suggestion-text').textContent;
                hideSearchSuggestions();
                performSearch();
            });
        });
    }
    
    // 从商品数据中获取搜索建议
    function getProductSuggestions(keyword) {
        // 模拟商品数据
        const products = [
            '精选红富士苹果', '进口香蕉', '有机蔬菜礼盒', '新鲜猪肉', '新鲜草莓', '优质大米',
            '休闲衬衫', '运动外套', '经典牛仔裤', '优雅连衣裙', '时尚T恤', '休闲裤',
            '厨房刀具套装', '不粘锅', '保温杯', '餐具套装', '电饭煲', '榨汁机',
            '家居收纳盒', '舒适沙发垫', '台灯', '地毯', '毛巾套装', '收纳架'
        ];
        
        // 过滤匹配的商品
        const filtered = products.filter(product => 
            product.toLowerCase().includes(keyword.toLowerCase())
        );
        
        // 最多返回5条建议
        return filtered.slice(0, 5);
    }
    
    // 隐藏搜索建议
    function hideSearchSuggestions() {
        const suggestionBox = document.querySelector('.search-suggestions');
        if (suggestionBox) {
            suggestionBox.remove();
        }
    }
    
    // 点击页面其他地方隐藏建议
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            hideSearchSuggestions();
        }
    });
});