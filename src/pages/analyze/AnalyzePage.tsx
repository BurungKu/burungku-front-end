import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Rangkong from "@/assets/BurungKuLogo.svg";
import Footer from "@/components/Footer.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import UploadFile from "@/components/UploadFile.tsx";

export default function AnalyzePage() {

    return (
        <div className="relative min-h-dvh w-full flex flex-col overflow-hidden">
            <img src={Rangkong} alt="Logo" className="hidden md:block absolute h-[40rem] w-[33rem] bottom-[-12rem] left-[-8rem] rotate-[18deg] opacity-20"/>
            <Navbar/>
            <Container>
                <div className="lg:h-screen pt-30 lg:pt-40 flex flex-col">
                    <h1 className="font-semibold text-2xl md:text-3xl">Mulai analisa</h1>
                    <h3 className="text-gray-500 texl-base md:text-lg">Unggah foto atau suara untuk mulai menganalisa</h3>

                    <Tabs defaultValue="image" className="w-[400px] mt-3">
                        <TabsList>
                            <TabsTrigger value="image">Gambar</TabsTrigger>
                            <TabsTrigger value="sound">Suara</TabsTrigger>
                        </TabsList>
                        <TabsContent value="image">
                            {/*<UploadFile type="image"*/}
                            {/*            onUpload={}*/}
                            {/*            isAnalyzing={}/>*/}
                        </TabsContent>
                        <TabsContent value="sound">
                            {/*<UploadFile type="audio"*/}
                            {/*            onUpload={}*/}
                            {/*            isAnalyzing={}/>*/}
                        </TabsContent>
                    </Tabs>
                </div>
            </Container>
            <Footer isAbsolute={true}/>
        </div>
    )
}