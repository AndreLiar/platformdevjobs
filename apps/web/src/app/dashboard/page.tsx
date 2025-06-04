'use client';

import ProtectRoute from '@/lib/protectRoute';
import RecruiterLayout from '@/components/RecruiterLayout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthUid } from '@/lib/useAuthUid';

interface Job {
  id: string;
  title: string;
  platform: string;
  createdAt: any;
  contractType: string;
}

export default function DashboardPage() {
  const { uid } = useAuthUid();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!uid) return;

      const q = query(collection(db, 'jobs'), where('recruiterId', '==', uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Job[];
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, [uid]);

  return (
    <ProtectRoute>
      <RecruiterLayout>
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
          <h2 className="fw-bold text-center text-sm-start mb-0">
            <i className="bi bi-file-earmark-text me-2"></i>Vos Offres d’Emploi
          </h2>
          <Link href="/dashboard/post" className="btn btn-dark rounded-pill px-4 py-2 fw-semibold">
            + Publier une offre
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-secondary" role="status"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-4 shadow-sm p-4 text-center border mb-5">
            <h5 className="fw-semibold text-muted mb-2">Aucune offre disponible</h5>
            <p className="text-muted mb-3">Commencez à publier vos premières offres pour recevoir des candidatures.</p>
            <Link href="/dashboard/post" className="btn btn-outline-primary">
              Publier ma première offre
            </Link>
          </div>
        ) : (
          <div className="row g-3">
            {jobs.map((job) => (
              <div key={job.id} className="col-md-6">
                <div className="card border shadow-sm p-3 h-100">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold mb-1">{job.title}</h5>
                    <span className="badge bg-primary">{job.platform}</span>
                  </div>
                  <p className="text-muted mb-2">{job.contractType.toUpperCase()}</p>
                  <Link href={`/dashboard/jobs/${job.id}`} className="btn btn-outline-secondary btn-sm">
                    Voir les candidats
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-5">
          <h4 className="fw-bold mb-3 text-muted">
            <i className="bi bi-people-fill me-2"></i>Candidats
          </h4>
          <div className="bg-white border rounded-4 p-4 text-center text-muted shadow-sm">
            Aucun candidat disponible pour le moment.
          </div>
        </div>
      </RecruiterLayout>
    </ProtectRoute>
  );
}
