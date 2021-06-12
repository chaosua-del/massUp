const isLoggedIn = (state) => state.auth.token;

const getEmail = (state) => state.auth.user.email;

const getUsername = (state) => state.auth.user.firstname;

const getAvatar = (state) => state.auth.user.avatar;

const getId = (state) => state.auth.user.id;

const getJoinedRoom = (state) => state.auth.user.joinedRoom;

const isCoach = (state) => state.auth.user.role === "coach";

const authSelectors = {
  isLoggedIn,
  getEmail,
  getUsername,
  getAvatar,
  getId,
  getJoinedRoom,
  isCoach,
};

export default authSelectors;
