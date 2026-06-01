import { Link, Outlet, useLocation } from 'react-router';
import svgPaths from '../../imports/svg-zg1n1rczii';

export function ProfileLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[268px] flex-shrink-0">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <nav className="flex flex-col">
                {/* Mi perfil */}
                <Link
                  to="/profile"
                  className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                    isActive('/profile') || isActive('/profile/edit')
                      ? 'bg-muted'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-[10.42%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 19 19"
                      >
                        <path
                          d={svgPaths.p0dfbb480}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-base leading-[1.5] text-foreground">
                    Mi perfil
                  </span>
                </Link>

                {/* Mi garage */}
                <Link
                  to="/profile/garage"
                  className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                    isActive('/profile/garage')
                      ? 'bg-muted'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-[12.5%_8.33%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 19.9998 18"
                      >
                        <path
                          d={svgPaths.p36d82680}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-base leading-[1.5] text-foreground">
                    Mi garage
                  </span>
                </Link>

                {/* Mis pedidos */}
                <Link
                  to="/profile/orders"
                  className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                    isActive('/profile/orders') || location.pathname.startsWith('/profile/orders/')
                      ? 'bg-muted'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-[12.5%_8.33%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 19.9998 18"
                      >
                        <path
                          d={svgPaths.p1efcf180}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-base leading-[1.5] text-foreground">
                    Mis pedidos
                  </span>
                </Link>

                {/* Centro de ayuda */}
                <Link
                  to="/help-center"
                  className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                    isActive('/help-center')
                      ? 'bg-muted'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-[12.5%_8.33%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 19.9998 18"
                      >
                        <path
                          d={svgPaths.p21c2b680}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-base leading-[1.5] text-foreground">
                    Centro de ayuda
                  </span>
                </Link>

                {/* Cerrar sesión */}
                <Link
                  to="/logout"
                  className="flex items-center gap-3 px-6 py-4 hover:bg-muted transition-colors"
                >
                  <div className="relative shrink-0 size-[24px]">
                    <div className="absolute inset-[12.5%_8.33%]">
                      <svg
                        className="absolute block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 19.9998 18"
                      >
                        <path
                          d={svgPaths.p21c2b680}
                          fill="var(--color-primary)"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-base leading-[1.5] text-foreground">
                    Cerrar sesión
                  </span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}