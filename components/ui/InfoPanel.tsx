export function InfoPanel({
  title,
  children,
  tone = "info",
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  tone?: "info" | "success";
  defaultOpen?: boolean;
}) {
  const toneClasses =
    tone === "success"
      ? "border-emerald-200 bg-emerald-50"
      : "border-blue-200 bg-blue-50";

  return (
    <details
      className={`group rounded-xl border ${toneClasses}`}
      {...(defaultOpen ? { open: true } : {})}
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="text-lg leading-none">
          {tone === "success" ? "✓" : "💡"}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold text-slate-900">{title}</span>
        <span
          aria-hidden
          className="shrink-0 text-xs text-slate-400 transition-transform group-open:rotate-180"
        >
          ▾
        </span>
      </summary>
      <div className="px-4 pb-4 pl-11 text-sm text-slate-600 [&_a]:font-medium [&_a]:text-blue-700 [&_a]:underline">
        {children}
      </div>
    </details>
  );
}
