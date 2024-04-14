import { useForm } from "react-hook-form";
import bgImage from "./images/bgImage.jpg";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import { useState } from "react";

export function Login() {
  const [login, setLogin] = useState(true);
  const allForm = useForm();

  const onSubmit = allForm?.handleSubmit((data) => console.log(data));

  return (
    <form
      onSubmit={onSubmit}
      className="fixed top-0 left-0 right-0 bottom-0 flex h-[100vh] z-10"
    >
      <div className="w-[50%] bg-slate-50 filter brightness-[.5]">
        <img
          src={bgImage}
          alt="Appointmed"
          className="w-[100%] h-[100%] object-cover"
        />
      </div>

      {login ? (
        <LoginUser allForm={allForm} setLogin={setLogin} />
      ) : (
        <RegisterUser allForm={allForm} setLogin={setLogin} />
      )}
    </form>
  );
}
