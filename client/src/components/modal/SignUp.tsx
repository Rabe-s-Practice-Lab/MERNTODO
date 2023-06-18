import React from "react";
import EmailIcon from "../../assets/icons/emailIcon";
import LockIcon from "../../assets/icons/lockIcon";
import { useModal } from "../../hooks/useModal";
import UserIcon from "../../assets/icons/userIcon";
import OccIcon from "../../assets/icons/occIcon";

const SignUp = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setModalType } = useModal();

  const [signUpData, setSignUpData] = React.useState<{
    username: string;
    email: string;
    password: string;
    occupation: string;
  }>({
    username: "",
    email: "",
    password: "",
    occupation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (!res.ok) {
        throw new Error("Bad response from server", {
          cause: {
            res,
          },
        });
      }

      const data = await res.json();

      console.log(data.message);
    } catch (error: any) {
      switch (error.cause?.res?.status) {
        case 404:
          console.error("Missing Fields!");
          break;
        case 409:
          console.error("Email already exists!");
          break;
        default:
          console.error(error.cause?.res?.statusText);
      }
    }
  };

  const hasData = Object.keys(signUpData).every(
    (key) => signUpData[key as keyof typeof signUpData].trim() !== ""
  );

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form__container">
      <h1 className="form__title">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <div className="input__group">
            <UserIcon className="input__icon" />
            <input
              name="username"
              type="text"
              id="username"
              ref={inputRef}
              value={signUpData.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <div className="input__group">
            <EmailIcon className="input__icon" />
            <input
              name="email"
              type="email"
              id="email"
              value={signUpData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="password" className="">
            Password
          </label>
          <div className="input__group">
            <LockIcon className="input__icon" />
            <input
              name="password"
              type="password"
              id="password"
              value={signUpData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__group">
          <label htmlFor="occupation">Occupation</label>
          <div className="input__group">
            <OccIcon className="input__icon" />
            <input
              name="occupation"
              type="text"
              id="occupation"
              value={signUpData.occupation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__external">
          have an account?
          <a
            className="form__external__link"
            href="#"
            onClick={() => setModalType("login")}
          >
            Login
          </a>
        </div>
        <button
          className={`btn btn--form__login ${!hasData ? "btn--disabled" : ""}`}
          disabled={!hasData}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
