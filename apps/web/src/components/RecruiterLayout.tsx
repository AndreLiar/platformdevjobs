'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="d-flex flex-column flex-md-row bg-light-subtle min-vh-100">
      {/* Toggle button for mobile - only show on mobile */}
      <button
        className="btn btn-outline-dark position-fixed top-0 start-0 m-3 d-md-none"
        style={{ zIndex: 1050 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-end p-3 p-md-4 flex-shrink-0 position-fixed position-md-relative d-md-block ${
          sidebarOpen ? 'sidebar-open' : 'sidebar-closed'
        }`}
        style={{ 
          width: '240px', 
          height: '100vh',
          zIndex: 1045,
          top: 0,
          left: 0
        }}
      >
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <Link href="/" className="navbar-brand fs-4 fw-bold mb-4 gradient-text d-block text-center text-md-start">
              PlatformDevJobs
            </Link>

            <nav className="nav flex-column text-center text-md-start mb-4">
              <Link href="/dashboard" className="nav-link mb-2">
                <i className="bi bi-house-door me-2"></i>
                Tableau de bord
              </Link>
              <Link href="/dashboard/jobs" className="nav-link mb-2">
                <i className="bi bi-briefcase me-2"></i>
                Mes Offres
              </Link>
            </nav>
          </div>

          <div className="pt-4">
            <button onClick={handleLogout} className="btn btn-outline-secondary w-100">
              <i className="bi bi-box-arrow-right me-2"></i>Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4 p-md-5 main-content">
        {children}
      </main>
    </div>
  );
}