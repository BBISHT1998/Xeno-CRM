const Login = () => {
  const handleLogin = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    window.location.href = `${backendURL}/auth/google`;
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-600">
      <div className="bg-white shadow-md p-8 rounded text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Login to Xeno CRM</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition duration-200 font-semibold"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;