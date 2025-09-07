"use client";

import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Bar chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ResultsTableProps {
  data: {
    candidate_name: string;
    recommendation: string;
    scores: {
      general_qualifications: { education: number; years_of_experience: number; total: number };
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
  };
}

export default function ResultsTable({ data }: ResultsTableProps) {
  const chartData = {
    labels: [
      "Education",
      "Years of Experience",
      "Project Experience",
      "Donor Experience",
      "Regional Experience",
      "Technical Skills",
      "Language Proficiency",
      "Certifications",
    ],
    datasets: [
      {
        label: "Candidate Scores",
        data: [
          data.scores.general_qualifications.education,
          data.scores.general_qualifications.years_of_experience,
          data.scores.adequacy_for_assignment.relevant_project_experience,
          data.scores.adequacy_for_assignment.donor_experience,
          data.scores.adequacy_for_assignment.regional_experience,
          data.scores.specific_skills_competencies.technical_skills,
          data.scores.specific_skills_competencies.language_proficiency,
          data.scores.specific_skills_competencies.certifications,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.6)", // Professional blue
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(59, 130, 246, 0.8)",
        hoverBorderColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const, // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Candidate Performance Overview",
        font: { size: 18, weight: "bold" as const },
        color: "#1F2937", // Gray-800
        padding: { top: 20, bottom: 20 },
      },
      legend: {
        display: true,
        position: "top" as const,
        labels: {
          font: { size: 14 },
          color: "#4B5563", // Gray-600
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(59, 130, 246, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.x}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value: number) => `${value}%`,
          color: "#6B7280", // Gray-500
          font: { size: 12 },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        title: {
          display: true,
          text: "Score (%)",
          color: "#4B5563", // Gray-600
          font: { size: 14, weight: "bold" as const },
        },
      },
      y: {
        ticks: {
          color: "#4B5563", // Gray-600
          font: { size: 12, weight: "bold" as const },
        },
        grid: {
          display: false, // Hide vertical grid lines for cleaner look
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad" as const, // Explicitly typed to fix TypeScript error
    },
  };

  return (
    <div className="mt-12 w-full max-w-7xl bg-white p-10 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Analysis Results for {data.candidate_name}
      </h2>
      <div className="flex flex-col lg:flex-row gap-12 mb-10">
        {/* Chart Section */}
        <div className="flex-1 lg:min-w-[450px] bg-gray-50 p-8 rounded-lg shadow-inner">
          <div className="h-[600px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        {/* Table Section */}
        <div className="flex-1">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subcategory
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* General Qualifications */}
              <tr className="bg-blue-50">
                <td colSpan={3} className="px-6 py-4 font-bold text-blue-900">
                  General Qualifications (20%)
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Education (10%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{data.scores.general_qualifications.education}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Years of Experience (10%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{data.scores.general_qualifications.years_of_experience}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm font-bold text-blue-800">{data.scores.general_qualifications.total}%</td>
              </tr>
              {/* Adequacy for Assignment */}
              <tr className="bg-green-50">
                <td colSpan={3} className="px-6 py-4 font-bold text-green-900">
                  Adequacy for Assignment (50%)
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Relevant Project Experience (25%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{data.scores.adequacy_for_assignment.relevant_project_experience}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Donor Experience (15%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{data.scores.adequacy_for_assignment.donor_experience}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Regional Experience (10%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600">{data.scores.adequacy_for_assignment.regional_experience}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm font-bold text-green-800">{data.scores.adequacy_for_assignment.total}%</td>
              </tr>
              {/* Specific Skills & Competencies */}
              <tr className="bg-purple-50">
                <td colSpan={3} className="px-6 py-4 font-bold text-purple-900">
                  Specific Skills & Competencies (30%)
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Technical Skills (15%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{data.scores.specific_skills_competencies.technical_skills}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Language Proficiency (10%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{data.scores.specific_skills_competencies.language_proficiency}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">Certifications (5%)</td>
                <td className="px-6 py-4 text-sm font-semibold text-purple-600">{data.scores.specific_skills_competencies.certifications}%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td></td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-900">Total</td>
                <td className="px-6 py-4 text-sm font-bold text-purple-800">{data.scores.specific_skills_competencies.total}%</td>
              </tr>
              {/* Total Score */}
              <tr className="bg-gray-100">
                <td colSpan={2} className="px-6 py-4 font-bold text-gray-900">Total Score (100%)</td>
                <td className="px-6 py-4 font-bold text-gray-900">{data.scores.total_score}%</td>
              </tr>
              <tr className="bg-yellow-50">
                <td colSpan={3} className="px-6 py-4 text-sm font-semibold text-yellow-800">
                  <strong>Recommendation:</strong> {data.recommendation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Summary Justification Section */}
      <div className="bg-gray-50 p-8 rounded-lg shadow-inner">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Analysis Summary</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium text-green-600 mb-2">Key Strengths</h4>
            <p className="text-gray-700">{data.summary_justification.key_strengths}</p>
          </div>
          <div>
            <h4 className="text-lg font-medium text-red-600 mb-2">Key Weaknesses</h4>
            <p className="text-gray-700">{data.summary_justification.key_weaknesses}</p>
          </div>
        </div>
      </div>
    </div>
  );
}