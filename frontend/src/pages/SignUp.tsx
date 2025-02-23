import { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckbox from "../components/GenderCheckbox";
import useSignup from "../hooks/useSignup";
import { SignupInputs } from "../types/types";

const SignUp = () => {
  const [inputs, setInputs] = useState<SignupInputs>({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender: string) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-110 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-neutral-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300 mb-5">
          SignUp
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({ ...inputs, fullname: e.target.value.trim() })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value.trim() })
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
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value.trim() })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    confirmPassword: e.target.value.trim(),
                  })
                }
              />
            </div>

            <GenderCheckbox
              selectedGender={inputs.gender}
              onCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="flex justify-end">
            <Link
              to={"/login"}
              className="text-sm text-neutral-500 hover:text-blue-400 mt-2 inline-block"
            >
              Already have an account?
            </Link>
          </div>
          <div className="flex justify-center">
            <div>
              <button className="auth btn btn-block btn-sm mt-2 border border-slate-700">
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
