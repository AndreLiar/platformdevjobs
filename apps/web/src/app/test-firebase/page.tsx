// apps/web/src/app/test-firebase/page.tsx
"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FirebaseTest() {
  useEffect(() => {
    const fetchJobs = async () => {
      const snap = await getDocs(collection(db, "jobs"));
      snap.forEach(doc => console.log(doc.id, doc.data()));
    };
    fetchJobs();
  }, []);

  return (
    <div className="container py-4">
      <h2>📦 Firebase is working 🎉</h2>
    </div>
  );
}
