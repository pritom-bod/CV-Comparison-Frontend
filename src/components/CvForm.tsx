"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for validation
const schema = z.object({
  tor: z.string().min(1, "Terms of Reference is required"),
  cv: z
    .custom<FileList>(
      (value) => value instanceof FileList && value.length > 0,
      "Please select a CV file"
    )
    .refine(
      (fileList) => {
        const file = fileList[0];
        if (!file) return false;
        return [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
        ].includes(file.type);
      },
      "Invalid file type. Only PDF, DOC, DOCX, or TXT files are allowed"
    ),
});

// Types
type FormInput = z.infer<typeof schema>; // { tor: string; cv: FileList }
type FormDataOutput = {
  tor: string;
  cv: File;
};

// Props for the form
interface CvFormProps {
  onSubmit: (tor: string, cvFile: File) => void;
  loading: boolean;
}

export default function CvForm({ onSubmit, loading }: CvFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  // Submit handler
  const onFormSubmit: SubmitHandler<FormInput> = (data) => {
    const file = data.cv[0]; // Pick first file from FileList
    onSubmit(data.tor, file);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <div className="mb-4">
        <label htmlFor="tor" className="block text-sm font-medium text-gray-700">
          Terms of Reference (ToR)
        </label>
        <textarea
          id="tor"
          {...register("tor")}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
        {errors.tor && (
          <p className="text-red-500 text-xs mt-1">{errors.tor.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="cv" className="block text-sm font-medium text-gray-700">
          Upload CV (PDF, DOC, DOCX, TXT)
        </label>
        <input
          type="file"
          id="cv"
          {...register("cv")}
          accept=".pdf,.doc,.docx,.txt"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.cv && (
          <p className="text-red-500 text-xs mt-1">{errors.cv.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze CV"}
      </button>
    </form>
  );
}
