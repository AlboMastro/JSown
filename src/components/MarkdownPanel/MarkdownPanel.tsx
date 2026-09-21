import Panel from "../Panel/Panel";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPanelProps {
  action: () => void;
  buttonText: string;
  output: string;
}

export default function MarkdownPanel({
  action,
  buttonText,
  output,
}: MarkdownPanelProps) {
  return (
    <Panel
      title="Generated Documentation"
      badge="Markdown"
      actions={
        <button
          disabled={!output.length}
          onClick={action}
          className="rounded bg-indigo-600 px-2 py-0.5 text-[11px] font-medium text-white transition 
             cursor-pointer hover:bg-indigo-500 active:scale-95 
             disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          {buttonText}
        </button>
      }
    >
      <div className="prose prose-invert max-w-none w-full h-full p-4 font-mono text-xs text-zinc-300 overflow-auto [&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_th]:border [&_th]:border-zinc-700 [&_th]:p-2.5 [&_td]:border [&_td]:border-zinc-700 [&_td]:p-2.5">
        <Markdown remarkPlugins={[remarkGfm]}>
          {output || "Output will appear here."}
        </Markdown>
      </div>
    </Panel>
  );
}
