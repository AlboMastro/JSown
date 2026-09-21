import { useRef, useState } from "react";

import { generateMarkdown } from "./utils/parser";

import Header from "./components/Header/Header";
import JSONPanel from "./components/JSONPanel/JSONPanel";
import MarkdownPanel from "./components/MarkdownPanel/MarkdownPanel";

export default function App() {
  const [input, setInput] = useState("");
  const [buttonText, setButtonText] = useState("Copy MD");
  const timeOutRef = useRef(0);
  const { output, error } = generateMarkdown(input);

  const handleCopy = () => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);

    if (output.trim() != "") {
      navigator.clipboard.writeText(output);
      setButtonText("Copied!");

      timeOutRef.current = setTimeout(() => {
        setButtonText("Copy MD");
      }, 1250);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-73px)]">
        {/* Input */}

        <JSONPanel value={input} onChange={setInput} error={error} />

        {/* Output */}

        <MarkdownPanel
          action={handleCopy}
          buttonText={buttonText}
          output={output}
        />
      </main>
    </div>
  );
}