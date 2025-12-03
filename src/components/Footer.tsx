import {cn} from "@/lib/utils";
import Container from "@/components/Container.tsx";

type FooterProps = {
    isAbsolute?: boolean;
    customClass?: string;
};

export default function Footer({isAbsolute = false, customClass}: FooterProps) {

    const year = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "flex items-center justify-center pt-10 pb-4 text-gray-500",
                customClass,
                isAbsolute
                    ? "lg:absolute lg:bottom-0 lg:left-0 lg:right-0"
                    : "mt-auto"
            )}
        >
            <Container>
                <div className="text-sm md:text-base font-thin flex flex-col justify-center items-center z-10">
                    <span>{year} © BurungKu, {" "}
                        <span className="italic">IMPHNEN x Kolosal AI Hackathon</span>
                    </span>
                </div>
            </Container>
        </footer>
    );
}
