const isLoggedIn = (state) => state.auth.token;

const getEmail = (state) => state.auth.user.email;

const getUsername = (state) => state.auth.user.firstname;

const authSelectors = {
  isLoggedIn,
  getEmail,
  getUsername,
};

export default authSelectors;
