import { useState } from "react";

import { generateMarkdown } from "./utils/parser";

import Header from "./components/Header/Header";
import JSONPanel from "./components/JSONPanel/JSONPanel";
import MarkdownPanel from "./components/MarkdownPanel/MarkdownPanel";

export default function App() {
  const [input, setInput] = useState("");
  const { output, error } = generateMarkdown(input);

  const handleCopy = () => {
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

        <MarkdownPanel
          action={handleCopy}
          output={output}
        />

      </main>
    </div>
  );
}
