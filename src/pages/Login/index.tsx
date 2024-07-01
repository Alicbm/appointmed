import { useState } from "react";
import { LoginUser } from "./components/Login";
import { RegisterUser } from "./components/Register";
import bgImage from "./images/bgImage.jpg";

export function Login() {
  const [login, setLogin] = useState(true);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex h-[100vh] z-10">
      <div className="hidden md:block w-[50%] bg-slate-50 filter brightness-[.5]">
        <img
          src={bgImage}
          alt="Appointmed"
          className="w-[100%] h-[100%] object-cover"
        />
      </div>

      {login ? (
        <LoginUser setLogin={setLogin} />
      ) : (
        <RegisterUser setLogin={setLogin} />
      )}
    </div>
  );
}
