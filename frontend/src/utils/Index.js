export function isLogin() {
    const isLogin = localStorage.getItem('isLogin');
    return isLogin;
}