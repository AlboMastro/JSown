import Panel from "../Panel/Panel";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownPanelProps {
    action: () => void
    output: string
}

export default function MarkdownPanel({action, output} : MarkdownPanelProps )  {

  return (
    <Panel
      title="Generated Documentation"
      badge="Markdown"
      actions={
        <button
          onClick={action}
          className="rounded bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-indigo-500 active:scale-95"
        >
          Copy MD
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
