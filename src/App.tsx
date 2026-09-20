import { useState } from "react";

import { generateMarkdown } from "./utils/parser";

import Header from "./components/Header/Header";
import Panel from "./components/Panel/Panel";
import JSONPanel from "./components/JSONPanel/JSONPanel";

export default function App() {
  const [input, setInput] = useState("");
  const { output, error } = generateMarkdown(input);

  const handleCopy = () => {
    console.log(output)
    if (output.trim() != "") {
      navigator.clipboard.writeText(output);
      alert("Copied to clipboard!"); // TODO: Make a toast!
    } else {
      alert("Please paste a valid JSON before attempting to copy.")
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-73px)]">
        {/* Input */}

        <JSONPanel 
          value={input}
          onChange={setInput}
          error={error}
        />

        {/* Output */}
        <Panel
          title="Generated Documentation"
          badge="Markdown"
          actions={
            <button
              onClick={handleCopy}
              className="rounded bg-indigo-600 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-indigo-500 active:scale-95"
            >
              Copy MD
            </button>
          }
        >
          <div className="w-full h-full p-4 font-mono text-xs text-zinc-300 overflow-auto isolate contain-[paint]">
            <pre className="whitespace-pre">
              {output || "Output will appear here."}
            </pre>
          </div>
        </Panel>
      </main>
    </div>
  );
}
