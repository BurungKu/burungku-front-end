import Navbar from "@/components/Navbar.tsx";
import Container from "@/components/Container.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function App() {

    return (
        <div className="relative min-h-screen w-full">
            <Navbar/>
            <Container>
                <div className="flex items-center justify-center h-dvh flex-col">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-4xl font-thin">kenali burung<span className="font-bold">Mu.</span></span>
                        <span className="text-2xl font-thin">membantu burung langka agar tetap lestari</span>
                    </div>
                    <div className="flex flex-row gap-3 items-center mt-6">
                        <Button>Analisa Gambar</Button>
                        <div className="h-5 w-[1px] bg-gray-200"></div>
                        <Button variant="ghost" className="border border-theme-orange text-theme-orange">Analisa Suara</Button>
                    </div>
                </div>
            </Container>
        </div>
    )
}