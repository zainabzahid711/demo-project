"use client";

interface InputFieldProps {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputField({
  label,
  type,
  required,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        required={required}
        className="w-full border border-slate-300 rounded-lg p-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        className="w-full border border-slate-300 rounded-lg p-3"
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
