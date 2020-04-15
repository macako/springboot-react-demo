class AuthenticationService {
  registerSuccessfullLogin(username, password) {
    sessionStorage.setItem('authenticationUser', username);
  }

  logout() {
    sessionStorage.removeItem('authenticationUser');
  }

  isUserLogged() {
    let user = sessionStorage.getItem('authenticationUser');

    if (user === null) {
      return false;
    }

    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem('authenticationUser');

    if (user === null) {
      return '';
    }

    return user;
  }
}

export default new AuthenticationService();
