import { useState } from 'react';
import { toast } from 'react-toastify';

function useDragAndDrop(maxFiles = 5) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const deleteFile = (name: string) => {
    setFiles((prevFiles) => {
      const indexToDelete = prevFiles.findIndex((file) => file.name === name);
      if (indexToDelete !== -1) {
        return [
          ...prevFiles.slice(0, indexToDelete),
          ...prevFiles.slice(indexToDelete + 1),
        ];
      }
      return prevFiles;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!e.dataTransfer) {
      toast.error(
        'Ошибка при обработке перетаскивания: dataTransfer отсутствует.',
      );
      return;
    }

    const droppedFiles = Array.from(e.dataTransfer.files);

    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith('image/'),
    );

    if (imageFiles.length < droppedFiles.length) {
      toast.error('Можно загружать только изображения!');
    }

    if (files.length + imageFiles.length > maxFiles) {
      toast.error(`Нельзя загружать больше ${maxFiles} файлов!`);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  };
  return {
    isDragging,
    files,
    deleteFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFiles,
  };
}

export default useDragAndDrop;
