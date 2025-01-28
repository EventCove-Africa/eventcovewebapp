import { Copy } from "iconsax-react";
import React, { useState } from "react";

type CopyToClipboardProps = {
  text: string; // The text to be copied to the clipboard
  onCopy?: () => void; // Optional callback triggered after copying
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy text to clipboard: ", err);
    }
  };

  return (
    <>
      {copied ? (
        <h3 className="text-dark_200 text-xs font-normal">Copied!</h3>
      ) : (
        <Copy
          size="16"
          className="text-dark_200 cursor-pointer"
          variant="Bold"
          onClick={handleCopy}
        />
      )}
    </>
  );
};

export default CopyToClipboard;
