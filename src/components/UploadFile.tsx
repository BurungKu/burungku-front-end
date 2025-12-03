import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
    type: "image" | "audio";
    onUpload: (file: File) => void;
    isAnalyzing: boolean;
}

export default function UploadFile({ type, onUpload, isAnalyzing }: UploadAreaProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const accept = type === "image" ? "image/*" : "audio/*";
    const title = type === "image" ? "Unggah Gambar Burung" : "Unggah Suara Burung";
    const description = type === "image"
        ? "Taruh gambar atau klik untuk mencari gambar"
        : "Taruh Audio atau klik untuk mencari audio";

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div
            className={cn(
                "relative border-2 border-dashed rounded-xl p-12 transition-all duration-300",
                isDragging ? "border-primary bg-primary/5 scale-105" : "border-border hover:border-primary/50",
                isAnalyzing && "pointer-events-none opacity-50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
            />

            <div className="flex flex-col items-center gap-4 text-center">
                <div className={cn(
                    "p-6 rounded-full bg-muted transition-all duration-300",
                    isDragging && "bg-primary/10 scale-110"
                )}>
                    {isAnalyzing ? (
                        <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    ) : (
                        <Upload className="w-12 h-12 text-primary" />
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="font-semibold text-gray-800">{description}</p>
                </div>

                <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                >
                    {isAnalyzing ? "Analyzing..." : "Select File"}
                </Button>
            </div>
        </div>
    )
}