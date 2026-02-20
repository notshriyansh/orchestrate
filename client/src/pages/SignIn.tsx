import AuthLayout from "../modules/auth/AuthLayout";
import SignInForm from "../modules/auth/SignInForm";

export default function SignIn() {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}
