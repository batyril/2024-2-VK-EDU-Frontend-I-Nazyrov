import { toast } from 'react-toastify';
import { useRef, useState } from 'react';

function useAudioRecorder(handleSubmit) {
  {
    const audioChunksRef = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const startRecording = async () => {
      try {
        audioChunksRef.current = [];
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };
        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        toast.error('Ошибка при доступе к микрофону');
      }
    };

    const stopRecording = () => {
      if (!mediaRecorder) return;

      mediaRecorder.stop();

      if (mediaRecorder.stream) {
        mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }

      setIsRecording(false);
    };

    const deleteAudioMessage = () => {
      stopRecording();
      audioChunksRef.current = [];
      setMediaRecorder(null);
      setIsRecording(false);
    };

    const sendAudioMessage = async () => {
      if (!mediaRecorder) return;

      stopRecording();

      mediaRecorder.onstop = async () => {
        const chunks = audioChunksRef.current;

        if (chunks.length === 0) {
          toast.error(
            'Не удалось записать голосовое сообщение. Попробуйте снова.',
          );
          return;
        }

        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', {
          type: 'audio/wav',
        });

        await handleSubmit(null, { voice: audioFile });
        setMediaRecorder(null);
      };
    };

    return {
      startRecording,
      isRecording,
      deleteAudioMessage,
      sendAudioMessage,
    };
  }
}
export default useAudioRecorder;
