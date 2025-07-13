import { useState, useRef, useEffect } from "react";
import { Export } from "iconsax-react";

type ExportButtonProp = {
  loadingEventDetails: { export: boolean };
  handleExportEvent: (prop: string) => void;
};

export default function ExportButton({
  loadingEventDetails,
  handleExportEvent,
}: ExportButtonProp) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative md:self-end">
      <button
        type="button"
        className="px-3 py-2 bg-primary_300 text-primary_100 rounded-md flex items-center justify-center gap-1 text-sm outline-none"
        aria-label="Export details"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Export size="20" color="currentColor" />
        <span>
          {loadingEventDetails?.export ? "Downloading..." : "Download details"}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md border z-10">
          <button
            type="button"
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              handleExportEvent("pdf");
            }}
          >
            As PDF
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              handleExportEvent("csv");
            }}
          >
            As CSV
          </button>
        </div>
      )}
    </div>
  );
}
