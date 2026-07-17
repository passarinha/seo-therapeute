export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export function Table<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "Aucune donnée pour l'instant.",
  rowActions,
}: {
  columns: Column<T>[];
  rows: T[];
  emptyMessage?: string;
  rowActions?: (row: T) => React.ReactNode;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-slate-500"
              >
                {col.label}
              </th>
            ))}
            {rowActions && <th className="px-3 py-2" />}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={col.key} className={`px-3 py-2 text-slate-700 ${col.className ?? ""}`}>
                  {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "—")}
                </td>
              ))}
              {rowActions && (
                <td className="px-3 py-2 text-right whitespace-nowrap">{rowActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
