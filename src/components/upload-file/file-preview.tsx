import { FileImage, File, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fileSizeCalc } from "~/lib";
import { Button } from "../ui/button";
import { UploadedFile } from "./types/uploadded-file";

interface Props {
  file: File;
  id: string;
  onRemove: (id: string) => void;
  onUploaded: (uploaded: UploadedFile) => void;
}

function FilePreview({ file, id, onRemove, onUploaded }: Props) {
  const { name, type, size } = file;
  const isImage = type.startsWith("image");
  const [progress, setProgress] = useState(0);
  const isUploaded = progress >= 100;

  useEffect(() => {
    if (progress >= 100) return;
    const interval = setInterval(() => setProgress((prev) => prev + 20), 1000);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      onUploaded({ id, name, url: "https://example.com", size, type });
    }
  }, [progress, onUploaded, id, name, size, type]);

  return (
    <div className="flex justify-between items-center flex-row gap-4">
      <div className="flex items-center flex-1 gap-2">
        <div className="w-14 h-14 flex justify-center items-center bg-zinc-100 rounded-lg">
          {isImage ? <FileImage size="1.25rem" /> : <File size="1.25rem" />}
        </div>
        <div className="leading-tight">
          <h6 className="max-w-56 truncate">{name}</h6>
          <span className="text-xs">{fileSizeCalc(size)}</span>
        </div>
      </div>
      {isUploaded && (
        <Button
          onClick={() => onRemove(id)}
          variant="ghost"
          size="icon"
          className="w-8 h-8"
        >
          <X size="1rem" />
        </Button>
      )}
      {!isUploaded && (
        <div className="flex justify-between items-center gap-4">
          <h6 className="text-sm">กำลังอัพโหลด</h6>
          <h6 className="text-sm">{progress} %</h6>
        </div>
      )}
    </div>
  );
}

export default FilePreview;
