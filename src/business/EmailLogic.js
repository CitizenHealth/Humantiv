import zxcvbn from 'zxcvbn';

export const checkEmail = (email) => {

  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  return (filter.test(email)) ? true : false;
};

export const checkPassword = (password) => {
  let result = zxcvbn(password, []);
  let valid = false;
  
  if (result.score >= 3) {
    valid = true;
  }

  return {
    valid: valid,
    message: result.feedback.suggestions[0]
  }
};

export const parseErrorMessage = (message) => {

}