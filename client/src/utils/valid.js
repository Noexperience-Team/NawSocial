const valid = ({ fullname, username, email, password, cf_password }) => {
  const err = {};
  if (!fullname) {
    err.fullname = "نسيت الإسم و اللقب";
  } else if (fullname.length > 25) {
    err.fullname = "full name is up to 25 characters long";
  }
  if (!username) {
    err.username = "نسيت التربيجة متاعك";
  } else if (username.replace(/ /g, "").length > 25) {
    err.username = "full name is up to 25 characters long";
  }
  if (!email) {
    err.email = "نسيت الأدريسة";
  } else if (!validateEmail(email)) {
    err.email = "الأدريسة ماهيش مريڨلة";
  }
  if (!password) {
    err.password = "نسيت  مُو دْ بَاسْ";
  } else if (password.length < 6) {
    err.password = "شفلنا  مُو دْ بَاسْ طويلة شوية";
  }
  if (cf_password !== password) {
    err.cf_password = "عاود  مُو دْ بَاسْ بالصحيح";
  }
  return {
    errMsg: err,
    errLength: Object.keys(err).length,
  };
};
function validateEmail(email) {
  // eslint-disable-next-line
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export default valid;
