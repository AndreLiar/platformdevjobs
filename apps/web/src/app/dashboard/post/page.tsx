'use client';

import { useForm } from 'react-hook-form';
import { db, rtdb } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useAuthUid } from '@/lib/useAuthUid';
import RecruiterLayout from '@/components/RecruiterLayout';
import Link from 'next/link';

export default function PostJobPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { uid } = useAuthUid();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    if (!uid) return;

    const jobData = {
      ...data,
      recruiterId: uid,
      createdAt: serverTimestamp(),
      boosted: false,
      skills: data.skills.split(',').map((s: string) => s.trim()),
    };

    try {
      const docRef = await addDoc(collection(db, 'jobs'), jobData);

      await set(ref(rtdb, `/jobs_feed/${docRef.id}`), {
        title: data.title,
        platform: data.platform,
        location: data.location,
        boosted: false,
      });

      router.push('/dashboard/jobs');
    } catch (error) {
      console.error('Erreur création offre:', error);
    }
  };

  return (
    <RecruiterLayout>
      <div className="container py-5" style={{ maxWidth: '820px' }}>
        <div className="mb-4">
          <h2 className="fw-bold mb-1">📄 Publier une Offre</h2>
          <p className="text-muted">Renseignez les détails de votre offre pour attirer les bons talents.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-4 shadow-sm border p-4">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Titre du poste</label>
            <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} {...register('title', { required: true })} />
            {errors.title && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          {/* Platform */}
          <div className="mb-3">
            <label className="form-label">Plateforme</label>
            <select className={`form-select ${errors.platform ? 'is-invalid' : ''}`} {...register('platform', { required: true })}>
              <option value="">Sélectionner une plateforme</option>
              <option value="Salesforce">Salesforce</option>
              <option value="SAP">SAP</option>
              <option value="HubSpot">HubSpot</option>
              <option value="Workday">Workday</option>
            </select>
            {errors.platform && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          {/* Location */}
          <div className="mb-3">
            <label className="form-label">Localisation</label>
            <input className={`form-control ${errors.location ? 'is-invalid' : ''}`} {...register('location', { required: true })} />
            {errors.location && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          {/* Contract Type */}
          <div className="mb-3">
            <label className="form-label">Type de contrat</label>
            <select className={`form-select ${errors.contractType ? 'is-invalid' : ''}`} {...register('contractType', { required: true })}>
              <option value="">Sélectionner un type</option>
              <option value="freelance">Freelance</option>
              <option value="fulltime">CDI</option>
              <option value="cdd">CDD</option>
            </select>
            {errors.contractType && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          {/* Skills */}
          <div className="mb-3">
            <label className="form-label">Compétences clés (séparées par des virgules)</label>
            <input className={`form-control ${errors.skills ? 'is-invalid' : ''}`} {...register('skills', { required: true })} />
            {errors.skills && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description du poste</label>
            <textarea rows={6} className={`form-control ${errors.description ? 'is-invalid' : ''}`} {...register('description', { required: true })}></textarea>
            {errors.description && <div className="invalid-feedback">Ce champ est requis.</div>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn btn-dark w-100 mt-3">
            {isSubmitting ? 'Publication en cours...' : '📢 Publier l’offre'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link href="/dashboard/jobs" className="text-decoration-none text-muted small">
            ← Retour à mes offres
          </Link>
        </div>
      </div>
    </RecruiterLayout>
  );
}
