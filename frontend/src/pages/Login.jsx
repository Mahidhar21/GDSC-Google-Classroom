import React from "react";
import LoginHeader from "../components/auth/LoginHeader";
import LoginForm from "../components/auth/LoginForm";
import LoginIllustration from "../components/auth/LoginIllustration";

const LoginPage = () => {
  const handleLogin = (email, password, remember) => {
    console.log("Login attempt:", { email, password, remember });
    alert(`Login successful with ${email}`);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginHeader />
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 xl:w-3/5">
        <LoginIllustration />
      </div>
    </div>
  );
};

export default LoginPage;
