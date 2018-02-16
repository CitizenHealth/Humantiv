import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  CREATE_USER,
  LOGOUT_USER,
  GOOGLE_LOGIN_USER,
  FACEBOOK_LOGIN_USER
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false,
  loggedin: "",
  firstLogin: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload,  loggedin: true};
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, password: "", loading: false, loggedin: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case CREATE_USER:
      return { ...state, loading: true, error: "", firstLogin: true};
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case GOOGLE_LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case FACEBOOK_LOGIN_USER:
      return { ...state, loading: true, error: "" }; 
    default:
      return state;
  }
};
