import { useRef } from "react";
import Panel from "../Panel/Panel";

interface JSONPanelProps {
  value: string;
  onChange: (val: string) => void;
  error?: string | null;
  placeholder?: string;
}

export default function JSONPanel({
  value,
  onChange,
  error,
  placeholder,
}: JSONPanelProps) {
  // References for the panel
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Split the JSON string by how many newline characters are present to get number of lines.
  // Math.max at 1 default value gives us line 1 even if it's completely empty
  const lineCount = Math.max(1, value.split("\n").length);

  // Generate an array from 1 to linecount and print the numbers
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  /**
   * This function handles the horizontal lock of the lines, preventing them from accidentally
   * getting out of sync.
   *
   * @param e The onScroll event
   */
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

/**
   * Replicates a code editor's Tab key behavior in a textarea.
   * Prevents default focus-escaping and inserts spaces at the cursor, 
   * or indents multiple lines if a block of text is selected.
   *
   * @param e - The keyboard event triggered on the textarea.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;

    e.preventDefault();

    const target = e.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const tabSpaces = "  ";

    const selectedText = value.substring(selectionStart, selectionEnd);

    if (selectedText.includes("\n")) {
      // Indent every line in the selection
      const indentedText = selectedText
        .split("\n")
        .map((line) => tabSpaces + line)
        .join("\n");

      onChange(
        value.substring(0, selectionStart) +
          indentedText +
          value.substring(selectionEnd),
      );

      // Keep the selection active over the newly indented lines
      target.setSelectionRange(
        selectionStart,
        selectionStart + indentedText.length,
      );
    } else {
      onChange(
        value.substring(0, selectionStart) +
          tabSpaces +
          value.substring(selectionEnd),
      );

      const newCursorPosition = selectionStart + tabSpaces.length;
      target.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  };

  return (
    <Panel title="Input Payload" badge="JSON">
      {/* Editor container layout */}
      <div className="flex w-full h-full relative overflow-hidden font-mono text-xs">
        {/* Line Number Column */}
        <div
          ref={lineNumbersRef}
          className="select-none py-4 pr-3 pl-4 text-right bg-zinc-900/20 text-zinc-600 border-r border-zinc-800/50 overflow-hidden shrink-0"
        >
          {lineNumbers.map((num) => (
            // IMPORTANT: the value of leading-x in this classname MUST match with the value in the textarea classname.
            <div key={num} className="leading-5">
              {num}
            </div>
          ))}
        </div>

        {/* Textarea Container */}
        <div className="relative flex-1 h-full overflow-hidden flex flex-col">
          <textarea
            ref={textAreaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            // IMPORTANT: the value of leading-x in this classname MUST match with the value in the line number column classname.
            className={`w-full h-full bg-transparent py-4 px-4 font-mono text-xs text-zinc-300 resize-none focus:outline-none placeholder:text-zinc-600 leading-5 whitespace-pre ${
              error ? "pb-14" : ""
            }`}
            placeholder={placeholder}
          />

          {/* Error Message Overlay */}
          {error && (
            <div className="absolute bottom-0 inset-x-0 bg-red-950/80 backdrop-blur-md border-t border-red-500/30 px-4 py-2.5 text-xs text-red-300 font-mono shadow-lg z-10 flex items-center gap-2">
              <span>⚠️</span>
              <span className="truncate">{error}</span>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}
