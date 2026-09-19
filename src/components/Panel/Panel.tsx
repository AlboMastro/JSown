import React, { type ReactNode } from "react";

interface PanelProps {
  title: string;
  badge?: string;
  children: ReactNode;
  actions?: ReactNode;
}

export default function Panel({ title, badge, children, actions }: PanelProps) {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-xl backdrop-blur-sm overflow-hidden h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-200">{title}</h2>
          {badge && (
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
              {badge}
            </span>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Panel Body / Content */}
      <div className="flex-1 relative flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
