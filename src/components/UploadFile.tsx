import {useState, useRef} from "react";
import {Upload, Loader2, Mic, Camera} from "lucide-react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {toast} from "sonner";

interface UploadAreaProps {
    type: "image" | "audio";
    onUpload: (file: File) => void;
    isAnalyzing: boolean;
}

export default function UploadFile({type, onUpload, isAnalyzing}: UploadAreaProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const fileInputDeviceRef = useRef<HTMLInputElement>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFileSelect = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleOpenCamera = async () => {
        setShowOptions(false);
        setIsCameraOpen(true);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {facingMode: "environment"}
            });
            streamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            toast.error("Butuh akses kamera")
            setIsCameraOpen(false);
        }
    };

    const handleCapturePhoto = () => {
        if (!videoRef.current) {
            return;
        }

        const video = videoRef.current;

        if (video.videoWidth === 0 || video.videoHeight === 0) {
            return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "camera_capture.jpg", {
                        type: "image/jpeg",
                    });
                    handleCloseCamera();
                    onUpload(file);
                } else {
                    console.error("Failed to create blob");
                }
            }, "image/jpeg", 0.95);
        } else {
            console.error("Failed to get canvas context");
            toast.error("Gagal mengambil foto")
        }
    };

    const handleCloseCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
    };

    const handleRecordAudio = async () => {
        setShowOptions(false);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            const chunks: BlobPart[] = [];

            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, {type: "audio/webm"});
                const audioFile = new File([audioBlob], "recorded_audio.webm", {
                    type: "audio/webm",
                });

                onUpload(audioFile);
                stream.getTracks().forEach(track => track.stop());
                setIsRecording(false);
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            toast.error("Butuh akses mikrofon")
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
        }
    };

    return (
        <div
            className={cn(
                "relative border-2 border-dashed border-theme-orange rounded-xl p-12 transition-all duration-300 w-full md:w-[30rem]",
                isDragging ? "border-theme-orange bg-theme-orange/5 scale-105" : "border-border hover:border-theme-orange/50",
                isAnalyzing && "pointer-events-none opacity-50"
            )}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) onUpload(file);
            }}
        >
            <input
                ref={fileInputDeviceRef}
                type="file"
                accept={type === "image" ? "image/*" : "audio/*"}
                className="hidden"
                onChange={handleFileSelect}
            />

            {showOptions && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-64 shadow-xl flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-center">Pilih Sumber</h3>

                        <Button className="w-full"
                                onClick={() => {
                                    setShowOptions(false);
                                    fileInputDeviceRef.current?.click();
                                }}>
                            Unggah dari Perangkat
                        </Button>

                        {type === "image" && (
                            <Button
                                className="w-full"
                                onClick={handleOpenCamera}>
                                Ambil dari Kamera
                            </Button>
                        )}

                        {type === "audio" && (
                            <Button
                                className="w-full flex gap-2"
                                onClick={handleRecordAudio}>
                                <Mic/> Rekam Suara
                            </Button>
                        )}

                        <Button variant="ghost"
                                className="w-full text-gray-600"
                                onClick={() => setShowOptions(false)}>
                            Batal
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center gap-4 text-center">
                <div
                    className={cn(
                        "p-6 rounded-full bg-muted transition-all duration-300",
                        isDragging && "bg-primary/10 scale-110"
                    )}
                >
                    {isAnalyzing ? (
                        <Loader2 className="w-12 h-12 text-primary animate-spin"/>
                    ) : (
                        <Upload className="w-12 h-12 text-primary"/>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">
                        {type === "image" ? "Unggah Gambar Burung" : "Unggah Suara Burung"}
                    </h3>
                    <p className="font-semibold text-gray-800">
                        {type === "image"
                            ? "Taruh gambar atau klik untuk mencari"
                            : "Taruh audio atau klik untuk mencari"}
                    </p>
                </div>

                <Button disabled={isAnalyzing}
                        onClick={() => setShowOptions(true)}>
                    {isAnalyzing ? "Tunggu..." : "Pilih File"}
                </Button>
            </div>

            {isCameraOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-xl">
                        <h3 className="text-lg font-semibold text-center mb-4">Ambil Foto</h3>

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full rounded-lg mb-4 bg-black"
                            style={{maxHeight: '60vh'}}
                        />

                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={handleCapturePhoto}
                                className="flex-1"
                            >
                                <Camera/> Ambil Foto
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={handleCloseCamera}
                                className="flex-1 text-gray-600"
                            >
                                Batal
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {isRecording && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 w-80 shadow-xl flex flex-col items-center gap-6">
                        <div className="relative">
                            <div
                                className="w-24 h-24 rounded-full bg-red-500 animate-pulse flex items-center justify-center">
                                <Mic className="w-12 h-12 text-white"/>
                            </div>
                            <div
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                REC
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Merekam Audio</h3>
                            <p className="text-gray-600">Rekaman sedang berlangsung...</p>
                        </div>

                        <Button
                            onClick={handleStopRecording}
                            variant="destructive"
                            className="w-full"
                        >
                            ⏹ Stop Recording
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}