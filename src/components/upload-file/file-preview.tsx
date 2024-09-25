import { FileImage, File, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fileSizeCalc } from "~/lib";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

interface Props {
  file: File;
  onRemove: () => void;
  onUploaded: (url: string) => void;
}

function FilePreview({ file, onRemove, onUploaded }: Props) {
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
      onUploaded(name);
    }
  }, [progress, onUploaded, name]);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center flex-1 gap-2">
        <div className="w-14 h-14 flex justify-center items-center bg-zinc-100 rounded-lg">
          {isImage ? <FileImage size="1.25rem" /> : <File size="1.25rem" />}
        </div>
        <div className="leading-tight">
          <h6 className="max-w-56 truncate">{name}</h6>
          <span className="text-xs">{fileSizeCalc(size)}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!isUploaded && (
          <>
            <h6 className="text-sm">กำลังอัพโหลด</h6>
            <Progress value={progress} className="w-[200px]" />
            <h6 className="text-sm">{progress} %</h6>
          </>
        )}
      </div>
      {isUploaded && (
        <Button
          onClick={onRemove}
          variant="ghost"
          size="icon"
          className="w-8 h-8"
        >
          <X size="1rem" />
        </Button>
      )}
    </div>
  );
}

export default FilePreview;
