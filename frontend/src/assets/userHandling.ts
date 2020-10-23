// this function should probably be in /backend, and of
// course changed so that it works properly

export const registerUser = (username: string, password: string) => {
  console.log(username, password);
};

// on correctly submit: (login, & register? - if auto logged in) when user is created
// const dispatch = useDispatch();
// dispatch(changeLoginStatus(true));

// Should check if password matches the user, and if so the user
// should be logged in. Change loginStatus-redux if so.
export const signInUser = (username: string, password: string) => {
  console.log(username, password);
};
