"use client";
import { Ban, FileUp } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { cn } from "~/lib/utils";
import FilePreview from "./file-preview";
import { useCallback, useEffect, useState } from "react";
import { v7 as uuid } from "uuid";
import { UploadedFile } from "./types/uploadded-file";
import FileRestore from "./file-restore";

interface FilePreview {
  id: string;
  file: File;
}

interface Props {
  accept: Record<string, string[]>;
  value: UploadedFile[];
  onChange: (file: UploadedFile[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

function UploadFile({
  accept,
  value,
  onChange,
  disabled,
  maxFiles = 1,
  maxSize,
}: Props) {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(value);

  const handleOnRemove = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const addFiles = (files: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...files.map((file) => {
        const id = uuid();
        return { id, file };
      }),
    ]);
  };

  const onUploaded = useCallback((uploaded: UploadedFile) => {
    setUploadedFiles((prev) => [...prev, uploaded]);
  }, []);

  useEffect(() => {
    onChange(uploadedFiles);
  }, [uploadedFiles, onChange]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept,
      disabled,
      maxFiles,
      maxSize,
      onDrop: (acceptedFiles: File[]) => {
        if (files.length >= maxFiles) return;
        addFiles(acceptedFiles);
      },
    });

  const cleanedUploadedFiles = uploadedFiles.filter(
    (file) => !files.some(({ id }) => id === file.id),
  );

  return (
    <div>
      <input {...getInputProps()} />
      <button
        type="button"
        className={cn(
          "w-full border rounded-lg bg-zinc-100 flex flex-col gap-4 justify-center items-center text-zinc-600 py-4",
          isDragActive && "border-primary",
          isDragReject && "border-red-500 text-red-500",
        )}
        {...getRootProps()}
      >
        {isDragReject ? <Ban size="1rem" /> : <FileUp size="1rem" />}

        <h5 className="text-sm font-light">
          {isDragReject
            ? "ไม่รองรับไฟล์ประเภทนี้"
            : isDragActive
              ? "ปล่อยเพื่ออัปโหลด"
              : "คลิกหรือลากไฟล์มาที่นี่"}
        </h5>
      </button>
      <div className="flex flex-col mt-4 gap-4">
        {cleanedUploadedFiles.map((file) => (
          <FileRestore key={file.id} {...file} onRemove={handleOnRemove} />
        ))}

        {files.map(({ id, file }) => (
          <FilePreview
            key={id}
            onRemove={handleOnRemove}
            onUploaded={onUploaded}
            {...{ file, id }}
          />
        ))}
      </div>
    </div>
  );
}

export default UploadFile;
