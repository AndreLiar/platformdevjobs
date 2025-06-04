// apps/mobile/App.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Import Firestore instance and functions
import { firestore } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function App() {
  const [status, setStatus] = useState('⏳ Connecting…');

  useEffect(() => {
    async function testFirestore() {
      try {
        const snapshot = await getDocs(collection(firestore, 'jobs'));

        if (snapshot.empty) {
          setStatus('❌ No jobs found in Firestore');
          return;
        }

        // Log job titles or IDs for debugging
        const jobData = snapshot.docs.map((doc) => doc.data());
        console.log('🔥 Firestore jobs:', jobData);

        setStatus(`✅ Connected – Found ${snapshot.size} job(s)`);
      } catch (err) {
        console.error('❌ Firestore error:', err);
        setStatus('❌ Firebase connection failed');
      }
    }

    testFirestore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});