const COLORS: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700",
  red: "bg-red-100 text-red-700",
  amber: "bg-amber-100 text-amber-700",
  emerald: "bg-emerald-100 text-emerald-700",
  blue: "bg-blue-100 text-blue-700",
};

export function Badge({
  children,
  color = "slate",
}: {
  children: React.ReactNode;
  color?: keyof typeof COLORS;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${COLORS[color]}`}
    >
      {children}
    </span>
  );
}

export function priorityColor(priority: string) {
  if (priority === "high") return "red";
  if (priority === "medium") return "amber";
  return "slate";
}

export function statusColor(status: string) {
  if (status === "done") return "emerald";
  if (status === "in_progress") return "blue";
  return "slate";
}

export function statusLabel(status: string) {
  if (status === "done") return "Fait";
  if (status === "in_progress") return "En cours";
  return "À faire";
}

export function priorityLabel(priority: string) {
  if (priority === "high") return "Haute";
  if (priority === "medium") return "Moyenne";
  return "Basse";
}
