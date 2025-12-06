import {Github} from "lucide-react";
import logo from "@/assets/BurungKuLogo.svg";
import {Button} from "@/components/ui/button.tsx";
import Container from "@/components/Container.tsx";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav className="fixed top-0 left-0 right-0 bg-background z-50 ">
            <Container>
                <div className="flex justify-between py-5">
                    <div className="flex items-center cursor-pointer"
                         onClick={() => navigate("/")}>
                        <img src={logo} alt="Logo" className="w-14 h-14"/>
                        <span>Burung<span className="font-bold text-theme-orange">Ku.</span></span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="cursor-pointer hover:text-theme-orange transition-colors"
                             onClick={() => navigate("/policy")}>
                            Kebijakan
                        </div>
                        <div className="h-5 w-[1px] bg-gray-200"></div>
                        <a href="https://github.com/BurungKu" target="_blank">
                            <Button className="flex items-center gap-2">
                                <Github size="18"/>
                            </Button>
                        </a>

                    </div>
                </div>
            </Container>
        </nav>
    )
}