import { FileImage, File, X } from "lucide-react";
import { fileSizeCalc } from "~/lib";
import { Button } from "../ui/button";

interface Props {
  id: string;
  name: string;
  type: string;
  size: number;
  onRemove: (id: string) => void;
}

function FileRestore({ name, type, size, onRemove, id }: Props) {
  const isImage = type.startsWith("image");

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
      <Button
        onClick={() => onRemove(id)}
        variant="ghost"
        size="icon"
        className="w-8 h-8"
      >
        <X size="1rem" />
      </Button>
    </div>
  );
}

export default FileRestore;
