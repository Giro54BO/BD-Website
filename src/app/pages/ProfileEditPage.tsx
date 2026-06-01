import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export function ProfileEditPage() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    identificationNumber: user?.identificationNumber || '',
    taxId: user?.taxId || '',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/profile');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background">
      {/* Page Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-[1.2]">
        Mi perfil
      </h1>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 leading-[1.2]">
          Mi perfil
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Nombre completo */}
          <div>
            <label className="block text-sm text-foreground mb-2">
              Nombre completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa nombre y apellido"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label className="block text-sm text-foreground mb-2">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Número de teléfono */}
          <div>
            <label className="block text-sm text-foreground mb-2">
              Número de teléfono *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresa tu número"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Cédula de identidad */}
          <div>
            <label className="block text-sm text-foreground mb-2">
              Cédula de identidad (C.I.) *
            </label>
            <input
              type="text"
              name="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              placeholder="Ingresar número de cédula de identidad"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Datos de facturación */}
        <div className="border-t border-border pt-6 mb-8">
          <h3 className="text-xl font-bold text-primary mb-6 leading-[1.2]">
            Datos de facturación
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre o razón social */}
            <div>
              <label className="block text-sm text-foreground mb-2">
                Nombre o razón social
              </label>
              <input
                type="text"
                placeholder="Ingresar nombre o razón social"
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Número de C.I. o N.I.T. */}
            <div>
              <label className="block text-sm text-foreground mb-2">
                Número de C.I. o N.I.T.
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="Ingresa tu número de C.I. o N.I.T."
                className="w-full px-4 py-3 rounded-xl border border-border bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-primary hover:opacity-90 text-white px-8 py-3 rounded-xl transition-opacity"
        >
          <span className="text-base leading-[1.5]">Guardar</span>
        </button>
      </form>
    </div>
  );
}
