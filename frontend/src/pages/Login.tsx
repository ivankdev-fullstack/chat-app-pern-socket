import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { loading, login } = useLogin();

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    login(inputs.username, inputs.password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg bg-neutral-900">
        <h1 className="text-3xl font-semibold text-center text-white mb-5">
          Login
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmitForm} className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className=""
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered h-10"
                value={inputs.password}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link
              to="/signup"
              className="text-sm text-neutral-500 hover:text-blue-400 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>
          </div>
          <div className="flex justify-center">
            <div>
              <button
                className="auth btn btn-block btn-sm mt-2"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
