import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Footer from "@/components/Footer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AudioLines, ImageUp} from "lucide-react";
import Rangkong from "@/assets/BurungKuLogo.svg"
import KakaTua from "@/assets/BurungKakaTua.svg"
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-dvh w-full flex flex-col">
            <Navbar/>
            <Container>
                <div className="lg:h-screen pt-30 lg:pt-0 2xl:pt-0 flex items-center justify-center flex-col text-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-3xl md:text-4xl 2xl:text-5xl font-semibold leading-snug opacity-85">
                            kenali burung
                            <span className="font-bold text-theme-orange">Mu.</span>
                        </h1>
                        <p className="mt-5 text-sm md:text-xl 2xl:text-xl text-gray-500 leading-relaxed">
                            membantu burung langka agar tetap lestari, <br className="hidden md:block"/>
                            menjaga nyanyian alam yang nyaris sunyi
                        </p>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                        <Button className="w-full sm:w-auto"
                                onClick={() => navigate("/analyze")}>
                            <ImageUp/>
                            Analisa Gambar
                        </Button>
                        <div className="hidden sm:block h-5 w-[1px] bg-gray-200"></div>
                        <Button variant="border"
                                onClick={() => navigate("/analyze")}>
                            <AudioLines/>
                            Analisa Suara
                        </Button>
                    </div>
                    <div className="w-full md:w-[35rem] h-56 md:h-72 border rounded-3xl mt-10 relative overflow-hidden">
                        <img src={Rangkong} alt="Logo"
                             className="absolute w-56 h-64 md:w-90 md:h-96 rotate-12 left-0 -ml-16 mt-5 md:mt-0"/>
                        <img src={KakaTua} alt="Logo"
                             className="absolute w-56 h-64 md:w-90 md:h-96 right-0 -mr-22 mt-5 md:mt-0"/>
                    </div>
                </div>
            </Container>

            <Footer isAbsolute={true}/>
        </div>
    )
}