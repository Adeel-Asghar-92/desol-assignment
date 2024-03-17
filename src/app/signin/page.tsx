import LoginForm from "./login-form";
import style from "./login-form.module.css";
export default function SignIn() {
  return (
    <div className={style.formContainer}>
      <h1>Sign In</h1>

      <LoginForm />
    </div>
  );
}
