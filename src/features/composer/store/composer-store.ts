import { create } from "zustand";
import { MAX_ATTACHMENTS_PER_MESSAGE } from "@/convex/library/library_config";
import { LibraryFile } from "@/features/library/types/library-types";

interface ComposerStore {
  prompt: string;
  setPrompt: (prompt: string) => void;
  storeIsListening: boolean;
  setStoreIsListening: (isListening: boolean) => void;
  storeIsRecording: boolean;
  setStoreIsRecording: (isRecording: boolean) => void;
  storeIsTranscribing: boolean;
  setStoreIsTranscribing: (isTranscribing: boolean) => void;
  attachedFiles: LibraryFile[];
  setAttachedFiles: (files: LibraryFile[]) => void;
  addAttachment: (file: LibraryFile) => void;
  addAttachments: (files: LibraryFile[]) => { errors: string[] };
  removeAttachment: (id: LibraryFile["id"]) => void;
  clearAttachments: () => void;
}

export const useComposerStore = create<ComposerStore>((set, get) => ({
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),
  storeIsListening: false,
  setStoreIsListening: (storeIsListening) => set({ storeIsListening }),
  storeIsRecording: false,
  setStoreIsRecording: (storeIsRecording) => set({ storeIsRecording }),
  storeIsTranscribing: false,
  setStoreIsTranscribing: (storeIsTranscribing) => set({ storeIsTranscribing }),
  attachedFiles: [],
  setAttachedFiles: (files) => set({ attachedFiles: files }),
  addAttachment: (file) => {
    const { attachedFiles } = get();
    const dedupedFiles = attachedFiles.filter((f) => f.id !== file.id);
    set({ attachedFiles: [...dedupedFiles, file] });
  },
  addAttachments: (files) => {
    const { attachedFiles } = get();
    const errors = [];
    // remove duplicates
    const dedupedFiles = files.filter(
      (file) => !attachedFiles.some((f) => f.id === file.id),
    );
    // make sure user is not exceeding max attachments
    let slicedFiles = dedupedFiles;
    if (
      attachedFiles.length + dedupedFiles.length >
      MAX_ATTACHMENTS_PER_MESSAGE
    ) {
      errors.push(
        `You can only attach up to ${MAX_ATTACHMENTS_PER_MESSAGE} files per message.`,
      );
      slicedFiles = dedupedFiles.slice(
        0,
        MAX_ATTACHMENTS_PER_MESSAGE - attachedFiles.length,
      );
    }
    set({ attachedFiles: [...attachedFiles, ...slicedFiles] });
    return { errors };
  },
  removeAttachment: (id) => {
    const { attachedFiles } = get();
    set({ attachedFiles: attachedFiles.filter((f) => f.id !== id) });
  },
  clearAttachments: () => set({ attachedFiles: [] }),
}));

export default useComposerStore;
