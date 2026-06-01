import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import svgPaths from '../../imports/svg-0hwulks6wj';

export function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="bg-background">
      {/* Page Title */}
      <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-[1.2]">
        Mi perfil
      </h1>

      {/* Profile Card */}
      <div className="bg-card rounded-xl border border-border p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 leading-[1.2]">
          Hola, {user.name.split(' ')[0]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Nombre completo */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Nombre completo
            </p>
            <p className="text-base text-foreground leading-[1.5]">
              {user.name}
            </p>
          </div>

          {/* Correo electrónico */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Correo electrónico
            </p>
            <p className="text-base text-foreground leading-[1.5]">
              {user.email}
            </p>
          </div>

          {/* Número de teléfono */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Número de teléfono
            </p>
            <p className="text-base text-foreground leading-[1.5]">
              {user.phone}
            </p>
          </div>

          {/* Cédula de identidad */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Cédula de identidad (C.I.)
            </p>
            <p className="text-base text-foreground leading-[1.5]">
              {user.identificationNumber}
            </p>
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
              <p className="text-sm text-muted-foreground mb-2">
                Nombre o razón social
              </p>
              <p className="text-base text-foreground leading-[1.5]">
                {user.name}
              </p>
            </div>

            {/* Número de C.I. o N.I.T. */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Número de C.I. o N.I.T.
              </p>
              <p className="text-base text-foreground leading-[1.5]">
                {user.taxId}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <Link
          to="/profile/edit"
          className="bg-primary hover:opacity-90 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2 transition-opacity"
        >
          <span className="text-base leading-[1.5]">Editar perfil</span>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 11.3075 6.7075"
          >
            <path
              d={svgPaths.p2e0cc680}
              fill="white"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
