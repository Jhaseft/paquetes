import { Link } from '@inertiajs/react';
export default function Header({ auth_user }) { 

    return (
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Panel Administrativo</h1>
                    <div className="text-right">
                        <p className="font-semibold">{auth_user?.email || 'Admin'}</p>
                        
                        <Link href={route('logout')} method="post" as="button">
                            <button className="text-red-600 mt-2">Cerrar sesión</button>
                        </Link>

                    </div>
                </header>

    );
}