import { forwardRef, useCallback } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/hooks/useSettings";

function displayPath(path: string): string {
  const parts = path.split(/[/\\]/).filter(Boolean);
  if (parts.length === 0) return path;
  // Show the last two segments for context (e.g. "DEV_LOCAL/ollama"),
  // falling back to the single folder name when that's all there is.
  return parts.slice(-2).join("/");
}

interface WorkingDirButtonProps {
  isDisabled?: boolean;
}

export const WorkingDirButton = forwardRef<
  HTMLButtonElement,
  WorkingDirButtonProps
>(function WorkingDirButton({ isDisabled = false }, ref) {
  const {
    settings: { workingDir },
    setSettings,
  } = useSettings();

  const handleClick = useCallback(async () => {
    if (!window.webview?.selectWorkingDirectory) {
      return;
    }
    try {
      const directory = await window.webview.selectWorkingDirectory();
      if (directory) {
        await setSettings({ WorkingDir: directory });
      }
    } catch (error) {
      console.error("Error selecting working directory:", error);
    }
  }, [setSettings]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      title={workingDir || "Choose a working directory"}
      className={`flex max-w-[240px] select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-neutral-700 cursor-pointer ${
        workingDir
          ? "text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
          : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      }`}
    >
      <FolderIcon className="h-4.5 w-4.5 flex-shrink-0 stroke-current" />
      <span className="truncate">
        {workingDir ? displayPath(workingDir) : "Working directory"}
      </span>
    </button>
  );
});
