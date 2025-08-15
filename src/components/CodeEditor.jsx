// src/components/CodeEditor.jsx
import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({
  initialCode = "",
  language = "javascript",
  onChange,
  height = "60vh",
}) {
  const [code, setCode] = useState(initialCode);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        height={height}
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  );
}
