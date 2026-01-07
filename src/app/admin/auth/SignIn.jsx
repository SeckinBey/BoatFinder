import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useToastContext } from "../../../context/ToastContext.jsx";
import { ROUTES } from "../../../constants/index.js";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { success, error: showError } = useToastContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showError("Lütfen email ve şifre giriniz");
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      success("Giriş başarılı!");
      navigate(ROUTES.ADMIN);
    } else {
      showError(result.error || "Giriş yapılırken bir hata oluştu");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="m-auto w-full max-w-[496px] rounded-lg border border-gray-200 bg-white p-6 pt-9 sm:p-12">
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold uppercase leading-12 text-primary items">
              Sign In
            </h2>
            <p className="text-base leading-5 text-gray">
              Welcome Back! Please enter your details
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="block text-base font-bold leading-7">
                <span className="block text-sm mb-1.5">Email</span>
                <div className="relative">
                  <input
                    type="email"
                    required
                    name="email"
                    value={email}
                    placeholder="Email adresinizi giriniz"
                    spellCheck="false"
                    className="block peer w-full font-normal focus:outline-none focus:ring-[1px] transition duration-200 disabled:bg-gray-100 disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 px-4 py-2 text-sm h-10 lg:h-11 2xl:h-12 leading-10 lg:leading-11 2xl:leading-12 rounded-md bg-transparent border border-gray-300 read-only:border-gray-300 read-only:focus:ring-0 placeholder:text-gray-500 not-read-only:hover:enabled:border-gray-1000 focus:border-gray-1000 not-read-only:focus:enabled:border-gray-1000 focus:ring-gray-900/20"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </label>
            </div>
            <div className="flex flex-col mb-4">
              <label className="block text-base font-bold leading-7">
                <span className="block text-sm mb-1.5">Password</span>
                <div className="relative">
                  <input
                    type="password"
                    required
                    name="password"
                    value={password}
                    placeholder="Şifrenizi giriniz"
                    spellCheck="false"
                    className="block peer w-full bg-transparent font-normal focus:outline-none focus:ring-[1px] transition duration-200 disabled:bg-gray-100 disabled:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 px-4 py-2 text-sm h-10 lg:h-11 2xl:h-12 leading-10 lg:leading-11 2xl:leading-12 rounded-md border border-gray-300 read-only:border-gray-300 read-only:focus:ring-0 placeholder:text-gray-500 not-read-only:hover:enabled:border-gray-1000 focus:border-gray-1000 not-read-only:focus:enabled:border-gray-1000 focus:ring-gray-900/20"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex font-medium items-center justify-center focus:outline-none transition duration-200 active:scale-90 px-8 py-2.5 text-base rounded-md border border-transparent bg-gray-900 text-white hover:enabled:bg-gray-1000 focus:ring-gray-900/30 text-gray-0 mb-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Giriş yapılıyor..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
