import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Rangkong from "@/assets/BurungKuLogo.svg";
import Footer from "@/components/Footer.tsx";
import UploadFile from "@/components/UploadFile.tsx";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.ts";
import ResultCard from "@/components/ResultCard.tsx";
import {useState} from "react";
import type {IucnType} from "@/types/types.ts";
import AlertComponent from "@/components/Alert.tsx";

export default function AnalyzePage() {
    const [iucnData, setIucnData] = useState<IucnType | null>(null)

    const {mutate: analyzeImage, isPending: isPendingAnaylzeImage} = useMutation({
        mutationFn: async (fileToUpload: File) => {
            if (!fileToUpload) throw new Error("File belum dipilih");

            const formData = new FormData();
            formData.append("file", fileToUpload);

            const response = await axiosInstance.post("/predict", formData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
            setIucnData(data.iucn)
        },
        onError: (error) => {
            console.error("Error: ", error)
        },
    })

    const handleFileUpload = (uploadedFile: File) => {
        analyzeImage(uploadedFile);
    };

    return (
        <div className="relative min-h-dvh w-full flex flex-col overflow-hidden">
            <img src={Rangkong}
                 alt="Logo"
                 className="hidden md:block fixed h-[40rem] w-[33rem] 2xl:h-[45rem] 2xl:w-[40rem] bottom-[-12rem] right-[-8rem] -rotate-[15deg] opacity-20 scale-x-[-1]"/>
            <Navbar/>
            <Container>
                <div className="pt-30 lg:pt-40 flex flex-col">
                    <h1 className="font-semibold text-2xl md:text-3xl">Mulai analisa</h1>
                    <h3 className="text-gray-500 texl-base md:text-lg">Unggah foto untuk mulai menganalisa</h3>
                    <div className="w-full mt-2 flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row gap-3">
                            <UploadFile type="image"
                                        onUpload={handleFileUpload}
                                        isAnalyzing={isPendingAnaylzeImage}
                            />
                            <ResultCard result=""/>
                        </div>
                        <AlertComponent iucn="EX"/>
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}