import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Rangkong from "@/assets/BurungKuLogo.svg";
import Footer from "@/components/Footer.tsx";
import UploadFile from "@/components/UploadFile.tsx";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.ts";
import {useState} from "react";

export default function AnalyzePage() {
    const [file, setFile] = useState<File | null>(null);

    const {mutate: analyzeImage, isPending: isPendingAnaylzeImage} = useMutation({
        mutationFn: async (fileToUpload: File) => {
            if (!file) throw new Error("File belum dipilih");

            const formData = new FormData();
            formData.append("file", fileToUpload);

            const response = await axiosInstance.post("/predict", formData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error("Error: ", error)
        },
    })

    const handleFileUpload = (uploadedFile: File) => {
        setFile(uploadedFile);
        analyzeImage(uploadedFile);
    };

    return (
        <div className="relative min-h-dvh w-full flex flex-col overflow-hidden">
            <img src={Rangkong}
                 alt="Logo"
                 className="hidden md:block fixed h-[40rem] w-[33rem] bottom-[-12rem] left-[-8rem] rotate-[18deg] opacity-20"/>
            <Navbar/>
            <Container>
                <div className="pt-30 lg:pt-40 flex flex-col">
                    <h1 className="font-semibold text-2xl md:text-3xl">Mulai analisa</h1>
                    <h3 className="text-gray-500 texl-base md:text-lg">Unggah foto untuk mulai menganalisa</h3>
                    <div className="w-full mt-2">
                        <div className="flex flex-col gap-3">
                            <UploadFile type="image"
                                        onUpload={handleFileUpload}
                                        isAnalyzing={isPendingAnaylzeImage}
                            />
                        </div>
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}