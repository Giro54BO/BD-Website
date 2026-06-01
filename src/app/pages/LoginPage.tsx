import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import svgPaths from '../../imports/svg-8wbzm03iz0';
import imgBigdamAzul1 from 'figma:asset/618631a906a3f14879ebf268c012439e9a59550d.png';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log the user in
    login(email, password);
    // Navigate to profile after login
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-3 py-6">
        <div className="w-full max-w-[364px] flex flex-col gap-6 px-3 py-6 rounded-3xl">
          {/* Title */}
          <div className="flex flex-col gap-1 text-center">
            <h1 className="text-4xl font-bold text-primary leading-[1.2] tracking-[-0.0054px]">
              Iniciar sesión
            </h1>
            <p className="text-2xl text-muted-foreground leading-[1.3]">
              Accede a tu cuenta BigDam
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-primary leading-[1.5]">
                Correo electrónico *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
                className="bg-card h-[52px] border border-primary rounded-xl px-3 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-primary leading-[1.5]">
                Contraseña *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                  className="bg-card h-[52px] border border-primary rounded-xl px-3 pr-12 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <svg className="block size-full" fill="none" viewBox="0 0 20.923 14">
                    <path d={svgPaths.p5d16d00} fill="var(--color-primary)" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-primary h-[52px] rounded-xl flex items-center justify-center px-4 hover:opacity-90 transition-opacity"
            >
              <span className="text-base text-white leading-[1.5]">Iniciar sesión</span>
            </button>

            {/* Forgot Password Button */}
            <Link
              to="/forgot-password"
              className="bg-white h-[52px] rounded-xl flex items-center justify-center px-4 border border-transparent hover:border-border transition-colors"
            >
              <span className="text-base text-primary leading-[1.5]">Olvidaste tu contraseña</span>
            </Link>
          </form>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {/* Handle Google login */}}
              className="bg-white h-[52px] rounded-xl border border-primary flex items-center justify-center gap-3 px-4 hover:bg-card transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.438 15.983 5.482 18 9.003 18z" fill="#34A853"/>
                <path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.482 0 2.438 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
              </svg>
              <span className="text-base text-primary leading-[1.5]">Iniciar sesión con Google</span>
            </button>

            <button
              type="button"
              onClick={() => {/* Handle Facebook login */}}
              className="bg-white h-[52px] rounded-xl border border-primary flex items-center justify-center gap-3 px-4 hover:bg-card transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.4922 3.29115 17.2155 7.59375 17.8907V11.6016H5.30859V9H7.59375V7.01719C7.59375 4.76156 8.93742 3.51562 10.9932 3.51562C11.9776 3.51562 13.0078 3.69141 13.0078 3.69141V5.90625H11.8729C10.755 5.90625 10.4062 6.60001 10.4062 7.31281V9H12.9023L12.5033 11.6016H10.4062V17.8907C14.7089 17.2155 18 13.4922 18 9Z" fill="#1877F2"/>
              </svg>
              <span className="text-base text-primary leading-[1.5]">Iniciar sesión con Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-border w-full" />

          {/* Register Link */}
          <div className="flex gap-6 items-center justify-center">
            <p className="flex-1 text-base text-muted-foreground leading-[1.5]">
              ¿No tienes cuenta?
            </p>
            <Link
              to="/register"
              className="bg-white flex-1 h-[52px] rounded-xl flex items-center justify-center px-4 border border-transparent hover:border-border transition-colors"
            >
              <span className="text-base text-primary leading-[1.5]">Crear cuenta aquí</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}