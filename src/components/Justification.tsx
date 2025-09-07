"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

// Props now accept ReactNode to render arrays of JSX
interface JustificationProps {
  summary: ReactNode;
  details: ReactNode;
}

export function Justification({ summary, details }: JustificationProps) {
  return (
    <Card className="w-full max-w-5xl">
      {/* Summary Section */}
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>{summary}</CardContent>

      {/* Detailed Evaluation Section */}
      <div className="mt-4">
        <CardHeader>
          <CardTitle>Detailed Evaluation</CardTitle>
        </CardHeader>
        <CardContent>{details}</CardContent>
      </div>
    </Card>
  );
}

export default Justification;
