import { forwardRef, useCallback } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useSettings } from "@/hooks/useSettings";

function basename(path: string): string {
  const parts = path.split(/[/\\]/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : path;
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
      className="flex max-w-[200px] select-none items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-neutral-500 hover:bg-white hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
    >
      <FolderIcon className="h-4.5 w-4.5 flex-shrink-0 stroke-current" />
      <span className="truncate">
        {workingDir ? basename(workingDir) : "Working directory"}
      </span>
    </button>
  );
});
