'use client';

import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setFirebaseError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (error: any) {
      setFirebaseError("Email ou mot de passe incorrect");
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <h2 className="text-center mb-3 fw-bold">Connexion</h2>
        <p className="text-muted text-center mb-4">Connectez-vous pour accéder à votre espace</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Adresse email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'Email requis',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email invalide',
                },
              })}
            />
{errors.email && (
  <div className="invalid-feedback">
    {typeof errors.email.message === 'string' ? errors.email.message : 'Erreur'}
  </div>
)}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Mot de passe requis',
                minLength: { value: 6, message: 'Au moins 6 caractères' },
              })}
            />
{errors.password && (
  <div className="invalid-feedback">
    {typeof errors.password.message === 'string' ? errors.password.message : 'Erreur'}
  </div>
)}
          </div>

          {/* Error Message */}
          {firebaseError && <div className="alert alert-danger small">{firebaseError}</div>}

          <button type="submit" className="btn btn-dark w-100 mt-2" disabled={isSubmitting}>
            {isSubmitting ? 'Connexion...' : '🔐 Se connecter'}
          </button>
        </form>

        <p className="text-center small mt-3 text-muted">
          Pas encore de compte ? <Link href="/signup">Créer un compte</Link>
        </p>
      </div>
    </main>
  );
}
