const checkValidation = (email, password) => {
  const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);
  console.log(isEmailValid, isPasswordValid);
  if (!isEmailValid && !isPasswordValid)
    return "both email and password are invalid";
  if (!isEmailValid) return "email is invalid";
  if (!isPasswordValid) return "password is invalid";

  return null;
};
export { checkValidation };
