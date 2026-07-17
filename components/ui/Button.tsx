import Link from "next/link";

const base =
  "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50";
const variants = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
  danger: "bg-red-600 text-white hover:bg-red-500",
  ghost: "text-slate-500 hover:text-slate-900",
};

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  children,
  href,
  variant = "primary",
  className = "",
}: {
  children: React.ReactNode;
  href: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  // Les routes /api/* sont des téléchargements, pas des pages : un <a> évite que
  // Next.js les pré-charge en arrière-plan (ce qui les appellerait sans leurs
  // paramètres de recherche et ferait planter la route).
  if (href.startsWith("/api/")) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
