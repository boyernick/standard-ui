"use client";

import {
  Attachment,
  AttachmentItem,
  AttachmentList,
  AttachmentName,
  AttachmentPreview,
  AttachmentRemove,
  IconPlus,
} from "@boyernick/standard-ui-react";
import { useState } from "react";
import { ComponentCanvas } from "@/components/component-canvas";

export const FileAttachmentExamples = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (nextFiles: File[]) => {
    setFiles((currentFiles) => [...currentFiles, ...nextFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  return (
    <div className="mt-6">
      <ComponentCanvas
        label="Upload files"
        contentClassName="w-full max-w-md flex-col items-stretch gap-3"
      >
        <Attachment multiple onFiles={handleFiles}>
          <IconPlus />
          <span>Choose files or drop them here</span>
        </Attachment>
        {files.length > 0 ? (
          <AttachmentList>
            {files.map((file, index) => (
              <AttachmentItem key={`${file.name}-${index}`}>
                <AttachmentPreview>{file.name.slice(0, 1)}</AttachmentPreview>
                <AttachmentName>{file.name}</AttachmentName>
                <AttachmentRemove onClick={() => handleRemove(index)} />
              </AttachmentItem>
            ))}
          </AttachmentList>
        ) : null}
      </ComponentCanvas>
    </div>
  );
};
