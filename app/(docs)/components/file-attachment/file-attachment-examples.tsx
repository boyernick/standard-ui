"use client"

import {
  Attachment,
  AttachmentItem,
  AttachmentList,
  AttachmentName,
  AttachmentPreview,
  AttachmentRemove,
  IllustrationFile,
  IllustrationUpload,
  type FileIllustrationType,
} from "@boyernick/standard-ui-react"
import { useState } from "react"
import { DocBand } from "@/components/doc-band"

const BAND = "max-w-md"

/** Dropzone face — the illustration over its instruction. */
const Dropzone = ({ label }: { label: string }) => (
  <>
    <IllustrationUpload />
    <span>{label}</span>
  </>
)

/** The illustration is presentational, so choosing which one a file gets is
 *  the consumer's call. Anything unrecognised falls through to a blank sheet
 *  rather than guessing. */
const byExtension: Record<string, FileIllustrationType> = {
  pdf: "document",
  doc: "document",
  txt: "document",
  png: "image",
  jpg: "image",
  svg: "image",
  csv: "spreadsheet",
  xlsx: "spreadsheet",
  key: "presentation",
  mp4: "video",
  mp3: "audio",
  tsx: "code",
  json: "code",
  zip: "archive",
}

const fileType = (name: string): FileIllustrationType =>
  byExtension[name.split(".").pop()?.toLowerCase() ?? ""] ?? "generic"

const attached = [
  "quarterly-report.pdf",
  "cover-photo.png",
  "q3-forecast.xlsx",
  "launch-deck.key",
  "walkthrough.mp4",
  "voice-memo.mp3",
  "tokens.json",
  "assets.zip",
  "LICENSE",
]

export const FileAttachmentExamples = () => {
  const [files, setFiles] = useState<File[]>([])

  const handleFiles = (nextFiles: File[]) => {
    setFiles((current) => [...current, ...nextFiles])
  }

  const handleRemove = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index))
  }

  return (
    <div>
      <DocBand
        first
        id="default"
        title="Default"
        description="Choose files from the picker or drop them onto the zone."
        contentClassName={BAND}
      >
        <div className="flex flex-col gap-3">
          <Attachment multiple onFiles={handleFiles}>
            <Dropzone label="Choose files or drop them here" />
          </Attachment>
          {files.length > 0 ? (
            <AttachmentList>
              {files.map((file, index) => (
                <AttachmentItem key={`${file.name}-${index}`}>
                  <AttachmentPreview>
                    <IllustrationFile type={fileType(file.name)} />
                  </AttachmentPreview>
                  <AttachmentName>{file.name}</AttachmentName>
                  <AttachmentRemove onClick={() => handleRemove(index)} />
                </AttachmentItem>
              ))}
            </AttachmentList>
          ) : null}
        </div>
      </DocBand>

      <DocBand
        id="attached"
        title="Attached files"
        description="Each file gets a preview, its name, and a way to take it off."
        contentClassName={BAND}
      >
        {/* Rendered from names rather than real File objects — the list parts
            are presentational, and a picked file cannot be shown statically. */}
        <AttachmentList>
          {attached.map((name) => (
            <AttachmentItem key={name}>
              <AttachmentPreview>
                <IllustrationFile type={fileType(name)} />
              </AttachmentPreview>
              <AttachmentName>{name}</AttachmentName>
              <AttachmentRemove />
            </AttachmentItem>
          ))}
        </AttachmentList>
      </DocBand>

      <DocBand
        id="disabled"
        title="Disabled"
        description="The zone stops accepting both the picker and a drop."
        contentClassName={BAND}
      >
        <Attachment disabled onFiles={() => {}}>
          <Dropzone label="Attachments are turned off" />
        </Attachment>
      </DocBand>
    </div>
  )
}
