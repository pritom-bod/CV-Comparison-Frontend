"use client";

import { useState } from 'react';
import CvForm from '@/components/CvForm';
import ResultsTable from '@/components/ResultsTable';

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (tor: string, cvFile: File) => {
    setLoading(true);
    setError('');
    setResults(null);

    const formData = new FormData();
    formData.append('tor', tor);
    formData.append('cv', cvFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/analyze-cv/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }

      const data = await response.json();
      setResults(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8">CV Analyzer</h1>
      <CvForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {results && <ResultsTable data={results} />}
    </main>
  );
}
