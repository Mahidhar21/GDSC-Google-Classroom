import React from "react";

const LoginIllustration = () => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-secondary-500 opacity-90"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="max-w-lg px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Embrace the future of education
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Connect, collaborate, and learn like never before with our modern
            educational platform
          </p>

          <div className="flex flex-col space-y-8 items-center">
            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-white text-3xl font-bold">30k+</div>
                <div className="text-white/80 text-sm">Students</div>
              </div>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-white text-3xl font-bold">500+</div>
                <div className="text-white/80 text-sm">Classrooms</div>
              </div>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-white text-3xl font-bold">95%</div>
                <div className="text-white/80 text-sm">Growth</div>
              </div>
            </div>

            <div className="flex space-x-1 mt-6">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              <div
                className="h-2 w-2 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              ></div>
              <div
                className="h-2 w-2 bg-white rounded-full animate-pulse"
                style={{ animationDelay: "600ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginIllustration;
