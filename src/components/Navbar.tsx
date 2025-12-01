import {Github} from "lucide-react";
import logo from "@/assets/BurungKuLogo.svg";
import {Button} from "@/components/ui/button.tsx";

export default function Navbar() {

    return (
        <nav>
            <div className="flex justify-between py-5">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-14 h-14" />
                    <span>Burung<span className="font-bold">Ku.</span></span>
                </div>

                <div className="mt-2">
                    <Button className="flex items-center gap-2">
                        <Github size="18"/>
                        Repository
                    </Button>
                </div>
            </div>
        </nav>
    )
}