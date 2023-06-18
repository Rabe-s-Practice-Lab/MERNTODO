import React from "react";
import LockIcon from "../../assets/icons/lockIcon";
import EmailIcon from "../../assets/icons/emailIcon";
import { useModal } from "../../hooks/useModal";

const Login = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { setModalType } = useModal();

  const [loginData, setLoginData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const hasData = Object.keys(loginData).every(
    (key) => loginData[key as keyof typeof loginData].trim() !== ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        throw new Error("Bad response from server", {
          cause: {
            res,
          },
        });
      }

      const data = await res.json();

      console.log(data);
    } catch (error: any) {
      switch (error.cause?.res?.status) {
        case 403:
          console.error("Invalid email or password!");
          break;
        case 404:
          console.error("Email Not Found! Please register!");
          break;
        default:
          console.log("error");
      }
    }
  };

  /*
    const hasData1 =
    loginData.email.trim() !== "" && loginData.password.trim() !== "";
  */

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form__container">
      <h1 className="form__title">Login</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <div className="input__group">
            <EmailIcon className="input__icon" />
            <input
              name="email"
              type="email"
              id="email"
              ref={inputRef}
              value={loginData.email}
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
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form__external">
          Don't have an account?
          <a
            className="form__external__link"
            href="#"
            onClick={() => setModalType("signup")}
          >
            Sign Up
          </a>
        </div>
        <button
          className={`btn btn--form__login ${!hasData ? "btn--disabled" : ""}`}
          disabled={!hasData}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
