import { useState } from 'react';
import { toast } from 'react-toastify';

function useDragAndDrop(maxFiles = 5) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

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
    handleDragOver,
    handleDragLeave,
    handleDrop,
    setFiles,
  };
}

export default useDragAndDrop;
