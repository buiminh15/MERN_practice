export function isLogin() {
  const isLogin = localStorage.getItem("isLogin");
  return JSON.parse(isLogin);
}
