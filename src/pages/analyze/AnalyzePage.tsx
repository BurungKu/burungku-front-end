import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Rangkong from "@/assets/BurungKuLogo.svg";
import Footer from "@/components/Footer.tsx";
import UploadFile from "@/components/UploadFile.tsx";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.ts";
import ResultCard from "@/components/ResultCard.tsx";
import {useState} from "react";
import type {ResultData} from "@/types/types.ts";
import AlertComponent from "@/components/Alert.tsx";

export default function AnalyzePage() {
    const [resultImage, setResultImage] = useState<ResultData>({
        species: "",
        score: 0,
        iucn: null,
    })
    const [resultIdenticSpecies, setResultIdenticSpecies] = useState<ResultData[]>([])
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
    const [showAnalyzeAudio, setShowAnalyzeAudio] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);


    const {mutate: analyzeImage, isPending: isPendingAnaylzeImage} = useMutation({
        mutationFn: async (fileToUpload: File) => {
            if (!fileToUpload) throw new Error("File belum dipilih");

            const formData = new FormData();
            formData.append("file", fileToUpload);

            const response = await axiosInstance.post("/predict", formData);
            return {data: response.data, file: fileToUpload}
        },
        onSuccess: ({data, file}) => {
            setResultImage({
                species: data.top1.species,
                score: data.top1.score,
                iucn: data.top1.iucn
            })

            setResultIdenticSpecies(data.topk)
            setShowAlert(true)
            setShowAnalyzeAudio(false)

            const imageUrl = URL.createObjectURL(file);
            setUploadedImageUrl(imageUrl);
        },
        onError: (error) => {
            console.error("Error: ", error)
        },
    })

    const {mutate: analyzeAudio, isPending: isPendingAnaylzeAudio} = useMutation({
        mutationFn: async (fileToUpload: File) => {
            if (!fileToUpload) throw new Error("Audio belum dipilih");

            const formData = new FormData();
            formData.append("audio_file", fileToUpload);
            formData.append("species", resultImage.species);

            const response = await axiosInstance.post("/predict_audio", formData);
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error("Error: ", error)
        },
    })

    const handleFileUploadImage = (uploadedFile: File) => {
        setShowAlert(false)
        setShowAnalyzeAudio(false)
        analyzeImage(uploadedFile)
    };

    const handleFileUploadAudio = (uploadedFile: File) => {
        analyzeAudio(uploadedFile);
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
                                        onUpload={handleFileUploadImage}
                                        isAnalyzing={isPendingAnaylzeImage}
                            />
                            <ResultCard result={resultImage}
                                        identicSpecies={resultIdenticSpecies}
                                        type="image"
                                        imageUrl={uploadedImageUrl}/>
                        </div>
                        {showAlert && resultImage?.iucn && resultImage.score >= 30 && (
                            <AlertComponent
                                iucn={resultImage.iucn}
                                onYes={() => {
                                    setShowAnalyzeAudio(true);
                                }}
                            />
                        )}

                        {showAnalyzeAudio && (
                            <div className="flex flex-col md:flex-row gap-3">
                                <UploadFile
                                    type="audio"
                                    onUpload={handleFileUploadAudio}
                                    isAnalyzing={isPendingAnaylzeAudio}
                                />
                                <ResultCard result="" type="audio" />
                            </div>
                        )}
                    </div>
                </div>
            </Container>
            <Footer/>
        </div>
    )
}