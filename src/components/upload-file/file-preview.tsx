import { FileImage, File, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fileSizeCalc } from "~/lib";
import { Button } from "../ui/button";
import { UploadedFile } from "./types/uploadded-file";
import axios from "axios";

interface Props {
  file: File;
  id: string;
  onRemove: (id: string) => void;
  onUploaded: (uploaded: UploadedFile) => void;
  uploadApiEndpoint: string;
}

function FilePreview({
  file,
  id,
  onRemove,
  onUploaded,
  uploadApiEndpoint,
}: Props) {
  const { name, type, size } = file;
  const isImage = type.startsWith("image");
  const [progress, setProgress] = useState(0);
  const [objectName, setObjectName] = useState<string>("");
  const [objectURL, setObjectURL] = useState<string>("");
  const isUploaded = progress >= 100;

  useEffect(() => {
    const upload = async () => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.put<{ dest: string; objectName: string }>(
        uploadApiEndpoint,
        formData,
        {
          onUploadProgress: (event) => {
            if (event.progress === undefined) return;
            setProgress(Math.round(event.progress * 100));
          },
        },
      );
      setObjectName(data.objectName);
      setObjectURL(data.dest);
    };
    upload();
  }, [file, uploadApiEndpoint]);

  useEffect(() => {
    if (objectURL === "" || objectName === "") return;
    if (progress >= 100) {
      onUploaded({ id, name, url: objectURL, objectName, size, type });
    }
  }, [progress, onUploaded, id, name, size, type, objectName, objectURL]);

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
