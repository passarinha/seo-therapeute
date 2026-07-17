export function InfoPanel({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "success";
}) {
  const toneClasses =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50"
      : "border-blue-200 bg-blue-50";

  return (
    <div className={`rounded-xl border p-4 ${toneClasses}`}>
      <div className="flex gap-3">
        <span aria-hidden className="text-lg leading-none">
          {tone === "success" ? "✓" : "💡"}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <div className="mt-1 text-sm text-slate-600 [&_a]:font-medium [&_a]:text-blue-700 [&_a]:underline">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
