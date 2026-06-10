// 轮播图组件
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicators = document.getElementById('indicators');
    
    let currentIndex = 0;
    const itemCount = items.length;
    let itemWidth = 0;
    let autoPlayTimer;
    
    // 获取当前轮播图宽度
    function getItemWidth() {
        return items[0] ? items[0].offsetWidth : 0;
    }
    
    // 初始化
    function init() {
        // 等待图片加载完成后再初始化
        const images = carousel.querySelectorAll('img');
        let loadedCount = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', function() {
                    loadedCount++;
                    if (loadedCount === images.length) {
                        startInit();
                    }
                });
            }
        });
        
        // 如果所有图片已经加载完成
        if (loadedCount === images.length) {
            startInit();
        }
    }
    
    // 开始初始化
    function startInit() {
        itemWidth = getItemWidth();
        
        // 设置初始位置
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // 添加指示器点击事件
        indicators.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                goToSlide(index);
            });
        });
        
        // 添加左右按钮事件
        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);
        
        // 启动自动播放
        startAutoPlay();
        
        // 鼠标悬停暂停
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 跳转到指定轮播图
    function goToSlide(index) {
        if (index < 0 || index >= itemCount) return;
        
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * getItemWidth()}px)`;
        
        // 更新指示器
        indicators.querySelectorAll('.indicator').forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
        
        // 更新轮播图激活状态
        items.forEach((item, i) => {
            item.classList.toggle('active', i === currentIndex);
        });
    }
    
    // 上一张
    function goToPrev() {
        const newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : itemCount - 1;
        goToSlide(newIndex);
    }
    
    // 下一张
    function goToNext() {
        const newIndex = currentIndex + 1 < itemCount ? currentIndex + 1 : 0;
        goToSlide(newIndex);
    }
    
    // 启动自动播放
    function startAutoPlay() {
        autoPlayTimer = setInterval(goToNext, 5000);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }
    
    // 窗口大小改变时重新计算
    window.addEventListener('resize', function() {
        const newWidth = items[0].offsetWidth;
        track.style.transform = `translateX(-${currentIndex * newWidth}px)`;
    });
    
    // 初始化轮播图
    init();
});