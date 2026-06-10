// 表单验证脚本

document.addEventListener('DOMContentLoaded', function() {
    // 登录表单验证
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        initLoginForm();
    }
    
    // 注册表单验证
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        initRegisterForm();
    }
    
    // 密码显示/隐藏切换
    const togglePassword = document.getElementById('toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁' : '🙈';
        });
    }
});

// 初始化登录表单
function initLoginForm() {
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    
    // 表单提交
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 验证表单
        if (validateLoginForm()) {
            // 执行登录
            performLogin();
        }
    });
    
    // 用户名验证
    usernameInput.addEventListener('blur', function() {
        validateUsername();
    });
    
    usernameInput.addEventListener('input', function() {
        if (usernameError.textContent) {
            validateUsername();
        }
    });
    
    // 密码验证
    passwordInput.addEventListener('blur', function() {
        validatePassword();
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordError.textContent) {
            validatePassword();
        }
    });
    
    // 验证用户名
    function validateUsername() {
        const value = usernameInput.value.trim();
        
        if (!value) {
            usernameError.textContent = '请输入用户名或邮箱';
            return false;
        }
        
        // 检查是否为邮箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        
        if (!emailRegex.test(value) && !usernameRegex.test(value)) {
            usernameError.textContent = '用户名或邮箱格式不正确';
            return false;
        }
        
        usernameError.textContent = '';
        return true;
    }
    
    // 验证密码
    function validatePassword() {
        const value = passwordInput.value;
        
        if (!value) {
            passwordError.textContent = '请输入密码';
            return false;
        }
        
        if (value.length < 6) {
            passwordError.textContent = '密码长度不能少于6位';
            return false;
        }
        
        passwordError.textContent = '';
        return true;
    }
    
    // 验证整个表单
    function validateLoginForm() {
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        return isUsernameValid && isPasswordValid;
    }
    
    // 执行登录
    function performLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // 读取用户数据
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // 查找用户
        const user = users.find(u => 
            (u.username === username || u.email === username) && u.password === password
        );
        
        if (user) {
            // 登录成功
            const userData = {
                id: user.id,
                username: user.username,
                email: user.email,
                isLoggedIn: true
            };
            
            // 保存登录状态
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // 如果勾选记住我，保存到localStorage
            if (rememberMe) {
                localStorage.setItem('rememberMe', JSON.stringify({
                    username: username,
                    password: password
                }));
            } else {
                localStorage.removeItem('rememberMe');
            }
            
            // 跳转到首页
            alert('登录成功！');
            window.location.href = 'index.html';
        } else {
            passwordError.textContent = '用户名或密码错误';
        }
    }
}

// 初始化注册表单
function initRegisterForm() {
    const form = document.getElementById('register-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const phoneInput = document.getElementById('phone');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateRegisterForm()) {
            performRegister();
        }
    });
    
    // 验证用户名
    function validateUsername() {
        const value = usernameInput.value.trim();
        const error = document.getElementById('username-error');
        
        if (!value) {
            error.textContent = '请输入用户名';
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
            error.textContent = '用户名长度3-20位，只能包含字母、数字和下划线';
            return false;
        }
        
        // 检查用户名是否已存在
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === value)) {
            error.textContent = '用户名已存在';
            return false;
        }
        
        error.textContent = '';
        return true;
    }
    
    // 验证邮箱
    function validateEmail() {
        const value = emailInput.value.trim();
        const error = document.getElementById('email-error');
        
        if (!value) {
            error.textContent = '请输入邮箱';
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error.textContent = '邮箱格式不正确';
            return false;
        }
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.email === value)) {
            error.textContent = '邮箱已被注册';
            return false;
        }
        
        error.textContent = '';
        return true;
    }
    
    // 验证密码
    function validatePassword() {
        const value = passwordInput.value;
        const error = document.getElementById('password-error');
        
        if (!value) {
            error.textContent = '请输入密码';
            return false;
        }
        
        if (value.length < 6) {
            error.textContent = '密码长度不能少于6位';
            return false;
        }
        
        error.textContent = '';
        return true;
    }
    
    // 验证确认密码
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const error = document.getElementById('confirm-password-error');
        
        if (!confirmPassword) {
            error.textContent = '请确认密码';
            return false;
        }
        
        if (password !== confirmPassword) {
            error.textContent = '两次输入的密码不一致';
            return false;
        }
        
        error.textContent = '';
        return true;
    }
    
    // 验证手机号
    function validatePhone() {
        const value = phoneInput.value.trim();
        const error = document.getElementById('phone-error');
        
        if (!value) {
            error.textContent = '';
            return true; // 手机号可选
        }
        
        if (!/^1[3-9]\d{9}$/.test(value)) {
            error.textContent = '手机号格式不正确';
            return false;
        }
        
        error.textContent = '';
        return true;
    }
    
    // 验证整个表单
    function validateRegisterForm() {
        return validateUsername() && validateEmail() && 
               validatePassword() && validateConfirmPassword() && validatePhone();
    }
    
    // 执行注册
    function performRegister() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const newUser = {
            id: Date.now(),
            username: usernameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
            phone: phoneInput.value.trim() || null,
            createdAt: new Date().toISOString(),
            role: 'user'
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('注册成功！请登录');
        window.location.href = 'login.html';
    }
}