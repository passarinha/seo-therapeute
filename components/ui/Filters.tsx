"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  param: string;
  label: string;
  options: FilterOption[];
}

export function Filters({ fields }: { fields: FilterField[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(param: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasActiveFilters = fields.some((f) => searchParams.get(f.param));

  return (
    <div className="flex flex-wrap items-center gap-3">
      {fields.map((field) => (
        <select
          key={field.param}
          value={searchParams.get(field.param) ?? ""}
          onChange={(e) => updateParam(field.param, e.target.value)}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="">{field.label}</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          Réinitialiser
        </button>
      )}
    </div>
  );
}
