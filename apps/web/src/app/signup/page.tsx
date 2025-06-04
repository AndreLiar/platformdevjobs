'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';

export default function SignupPage() {
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; confirm: string }>();

  const password = watch('password') || '';
  const zxcvbnScore = zxcvbn(password).score;

  const onSubmit = async (data: { email: string; password: string; confirm: string }) => {
    setFirebaseError('');
    if (data.password !== data.confirm) {
      setFirebaseError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push('/dashboard');
    } catch (err: any) {
      setFirebaseError(err.message);
    }
  };

  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Excellent'];
  const strengthColor = ['#dc3545', '#fd7e14', '#ffc107', '#198754', '#0d6efd'];

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
        <h2 className="text-center mb-3 fw-bold">Créer un compte</h2>
        <p className="text-muted text-center mb-4">Rejoignez la plateforme dès aujourd’hui</p>

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
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'Mot de passe requis',
                minLength: { value: 6, message: 'Au moins 6 caractères' },
                onChange: (e) => setPasswordStrength(zxcvbn(e.target.value).score),
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Strength meter */}
          {password && (
            <div className="mb-3">
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${(zxcvbnScore + 1) * 20}%`,
                    backgroundColor: strengthColor[zxcvbnScore],
                  }}
                />
              </div>
              <small className="text-muted">
                Niveau : <strong style={{ color: strengthColor[zxcvbnScore] }}>{strengthLabels[zxcvbnScore]}</strong>
              </small>
            </div>
          )}

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">Confirmez le mot de passe</label>
            <input
              type="password"
              className={`form-control ${errors.confirm ? 'is-invalid' : ''}`}
              {...register('confirm', {
                required: 'Confirmation requise',
                validate: (val: string) => val === watch('password') || 'Les mots de passe ne correspondent pas',
              })}
            />
            {errors.confirm && <div className="invalid-feedback">{errors.confirm.message}</div>}
          </div>

          {firebaseError && <div className="alert alert-danger small">{firebaseError}</div>}

          <button type="submit" className="btn btn-dark w-100 mt-2" disabled={isSubmitting}>
            {isSubmitting ? 'Création...' : '🚀 Créer mon compte'}
          </button>
        </form>

        <p className="text-center small mt-3 text-muted">
          Vous avez déjà un compte ? <Link href="/login">Connectez-vous</Link>
        </p>
      </div>
    </main>
  );
}
