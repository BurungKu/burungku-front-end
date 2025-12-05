import {CircleAlert} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import type {IucnType} from "@/types/types.ts";
import {getIucnInfo} from "@/lib/utils.ts";

export type AlertProps = {
    iucn: IucnType;
};

export default function AlertComponent({ iucn }: AlertProps) {
    const { title, description, variant } = getIucnInfo(iucn);

    return (
        <Alert variant={variant}>
            <CircleAlert />
            <AlertTitle className="font-bold">{title}</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    )
}
