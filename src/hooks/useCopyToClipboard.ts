import { useState } from "react";

const useCopyToClipboard = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error("Failed to copy text:", error);
      setCopiedIndex(null);
    }
  };

  return { copiedIndex, copyToClipboard };
};

export default useCopyToClipboard;
