'use client';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import RecruiterLayout from '@/components/RecruiterLayout';
import JobEditModal from '@/components/Modals/JobEditModal';
import JobDeleteModal from '@/components/Modals/JobDeleteModal';

interface Job {
  id: string;
  title?: string;
  platform?: string;
  createdAt?: { seconds: number };
  contractType?: string;
}

export default function JobListPage() {
  const [user] = useAuthState(auth);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user) return;
      const q = query(collection(db, 'jobs'), where('recruiterId', '==', user.uid));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Job[];
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, [user]);

  const handleSaveEdit = async (updated: any) => {
    if (!selectedJob) return;
    await updateDoc(doc(db, 'jobs', selectedJob.id), updated);
    setJobs(prev =>
      prev.map(job => (job.id === selectedJob.id ? { ...job, ...updated } : job))
    );
    setShowEdit(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedJob) return;
    await deleteDoc(doc(db, 'jobs', selectedJob.id));
    setJobs(prev => prev.filter(job => job.id !== selectedJob.id));
    setShowDelete(false);
  };

  return (
    <RecruiterLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold"><i className="bi bi-briefcase me-2"></i>Mes Offres</h2>
        <Link href="/dashboard/post" className="btn btn-dark">+ Nouvelle Offre</Link>
      </div>

      {loading ? (
        <div className="text-center text-muted py-5">Chargement...</div>
      ) : jobs.length === 0 ? (
        <div className="alert alert-info text-center">Aucune offre trouvée.</div>
      ) : (
        <div className="row g-3">
          {jobs.map((job: Job) => (
            <div className="col-md-6" key={job.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {job.title}
                    <span className="badge bg-secondary text-uppercase">{job.platform}</span>
                  </h5>
                  <p className="card-text mb-1">
                    <i className="bi bi-calendar3 me-2"></i>
                    {job.createdAt ? new Date(job.createdAt.seconds * 1000).toLocaleDateString() : '—'}
                  </p>
                  <p className="card-text">
                    <span className="badge bg-light text-dark">{job.contractType}</span>
                  </p>
                  <div className="d-flex gap-2 mt-3">
                    <Link href={`/dashboard/jobs/${job.id}/candidates`} className="btn btn-outline-primary btn-sm">
                      Voir Candidats
                    </Link>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowEdit(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        setSelectedJob(job);
                        setShowDelete(true);
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {selectedJob && (
        <>
          <JobEditModal
            show={showEdit}
            onClose={() => setShowEdit(false)}
            initialData={selectedJob}
            onSave={handleSaveEdit}
          />
          <JobDeleteModal
            show={showDelete}
            onClose={() => setShowDelete(false)}
            jobTitle={selectedJob.title}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </RecruiterLayout>
  );
}
