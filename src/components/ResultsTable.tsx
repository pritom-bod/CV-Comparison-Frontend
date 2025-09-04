"use client";

import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Radar chart
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface ResultsTableProps {
  data: {
    candidate_name: string;
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
    recommendation: string;
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
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Analysis Results for {data.candidate_name}
      </h2>
      <div className="mb-6">
        <Radar data={chartData} options={chartOptions} />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subcategory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* General Qualifications */}
          <tr className="bg-gray-100">
            <td colSpan={3} className="px-6 py-4 font-bold">
              General Qualifications (20%)
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Education (10%)</td>
            <td className="px-6 py-4">{data.scores.general_qualifications.education}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Years of Experience (10%)</td>
            <td className="px-6 py-4">{data.scores.general_qualifications.years_of_experience}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4 font-semibold">Total</td>
            <td className="px-6 py-4 font-semibold">{data.scores.general_qualifications.total}</td>
          </tr>

          {/* Adequacy for Assignment */}
          <tr className="bg-gray-100">
            <td colSpan={3} className="px-6 py-4 font-bold">
              Adequacy for Assignment (50%)
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Relevant Project Experience (25%)</td>
            <td className="px-6 py-4">{data.scores.adequacy_for_assignment.relevant_project_experience}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Donor Experience (15%)</td>
            <td className="px-6 py-4">{data.scores.adequacy_for_assignment.donor_experience}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Regional Experience (10%)</td>
            <td className="px-6 py-4">{data.scores.adequacy_for_assignment.regional_experience}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4 font-semibold">Total</td>
            <td className="px-6 py-4 font-semibold">{data.scores.adequacy_for_assignment.total}</td>
          </tr>

          {/* Specific Skills & Competencies */}
          <tr className="bg-gray-100">
            <td colSpan={3} className="px-6 py-4 font-bold">
              Specific Skills & Competencies (30%)
            </td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Technical Skills (15%)</td>
            <td className="px-6 py-4">{data.scores.specific_skills_competencies.technical_skills}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Language Proficiency (10%)</td>
            <td className="px-6 py-4">{data.scores.specific_skills_competencies.language_proficiency}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4">Certifications (5%)</td>
            <td className="px-6 py-4">{data.scores.specific_skills_competencies.certifications}</td>
          </tr>
          <tr>
            <td></td>
            <td className="px-6 py-4 font-semibold">Total</td>
            <td className="px-6 py-4 font-semibold">{data.scores.specific_skills_competencies.total}</td>
          </tr>

          {/* Total Score */}
          <tr className="bg-gray-200">
            <td colSpan={2} className="px-6 py-4 font-bold">Total Score (100%)</td>
            <td className="px-6 py-4 font-bold">{data.scores.total_score}</td>
          </tr>
          <tr>
            <td colSpan={3} className="px-6 py-4">
              <strong>Recommendation:</strong> {data.recommendation}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
