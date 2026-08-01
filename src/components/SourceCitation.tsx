import type { Source } from "@/lib/types";

interface SourceCitationProps {
  sources: Source[];
}

export function SourceCitation({ sources }: SourceCitationProps) {
  if (!sources.length) return null;

  return (
    <div className="mt-3 border-t border-slate-200 pt-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        Fontes consultadas
      </p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <span
            key={source.path}
            className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
          >
            <span className="font-medium">{source.category}</span>
            <span className="text-blue-400">·</span>
            <span>{source.title}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
