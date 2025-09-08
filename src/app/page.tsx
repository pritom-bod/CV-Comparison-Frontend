"use client";

import { useState } from 'react';
import CvForm from '@/components/CvForm';
import ResultsTable from '@/components/ResultsTable';

// Define the TypeScript interface for the expected results structure
interface AnalysisResult {
  candidate_name: string;
  recommendation: string;
  scores: {
    general_qualifications: {
      education: number;
      years_of_experience: number;
      total: number;
    };
    adequacy_for_assignment: {
      relevant_project_experience: number;
      donor_experience: number;
      regional_experience: number;
      total: number;
    };
    specific_skills_competencies: {
      technical_skills: number;
      language_proficiency: number;
      certifications: number;
      total: number;
    };
    total_score: number;
  };
  summary_justification: {
    key_strengths: string;
    key_weaknesses: string;
  };
  detailed_evaluation: Array<{
    criterion: string;
    weight: number;
    score: number;
    justification: string;
  }>;
}

export default function Home() {
  const [results, setResults] = useState<AnalysisResult | null>(null);
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

      const data: AnalysisResult = await response.json();
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
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Header with logo + company name */}
      <header className="w-full flex items-center mb-10">
        <img
          src="/max.png"   
          alt="Company Logo"
          className="h-8 w-14 mr-3"
        />
        <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-800">
            Maxwell
            <span className="text-red-700 dark:text-red-800"> Stamp</span>
            <span className="font-bold text-blue-900 dark:text-blue-800"> LTD.</span>
          </h1>
      </header>

      <h1 className="text-4xl font-bold mb-10 text-gray-800"><span className="text-red-700 dark:text-red-800">CV</span>
            <span className="font-bold text-blue-900 dark:text-blue-800"> Analyzer</span></h1>
      <CvForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {results && <ResultsTable data={results} />}
    </main>
  );
}