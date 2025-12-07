import {CircleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import type {IucnType} from "@/types/types.ts";
import {getIucnInfo} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export type AlertProps = {
    iucn: IucnType;
    onYes: () => void,
};

export default function AlertComponent({iucn, onYes}: AlertProps) {
    const [showQuestion, setShowQuestion] = useState<boolean>(true);
    const {title, description, variant} = getIucnInfo(iucn);

    return (
        <Alert variant={variant}>
            <CircleAlert/>
            <AlertTitle className="font-bold">{title}</AlertTitle>
            <AlertDescription>
                {description}

                {showQuestion && (
                    <div className="mt-5">
                        <span className="font-semibold">
                            Ingin lanjut analisa suara spesies tersebut?
                        </span>

                        <div className="mt-2 flex gap-2">
                            <Button onClick={() => {
                                onYes()
                                setShowQuestion(false)
                            }}>Iya</Button>
                            <Button variant="ghost"
                                    onClick={() => setShowQuestion(false)}>
                                Tidak
                            </Button>
                        </div>
                    </div>
                )}
            </AlertDescription>
        </Alert>
    )
}
