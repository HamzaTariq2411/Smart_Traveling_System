import * as Yup from "yup";

export const signUpValidation = Yup.object({
  fullName: Yup.string()
    .min(4, "Name must have atleast 4 charachters")
    .matches(/^[^0-9]*$/, "Name cannot contain numbers"),
  userName: Yup.string().min(4, "Username must have atleast 4 charachters"),
  email: Yup.string().email("Invalid email format"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .max(256, "Password must be less then 256 characters")
    .matches(/[0-9]/, "Password must contain atleast one number")
    .matches(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .matches(/[a-z]/, "Password must contain atleast one lowercase letter"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});
