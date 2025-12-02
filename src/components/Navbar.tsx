import {Github} from "lucide-react";
import logo from "@/assets/BurungKuLogo.svg";
import {Button} from "@/components/ui/button.tsx";
import Container from "@/components/Container.tsx";

export default function Navbar() {

    return (
        <nav className="fixed top-0 left-0 right-0 bg-background z-50 ">
            <Container>
                <div className="flex justify-between py-5">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-14 h-14"/>
                        <span>Burung<span className="font-bold text-theme-orange">Ku.</span></span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="">
                            Policy
                        </div>
                        <div className="h-5 w-[1px] bg-gray-200"></div>
                        <Button className="flex items-center gap-2">
                            <Github size="18"/>
                        </Button>
                    </div>
                </div>
            </Container>
        </nav>
    )
}