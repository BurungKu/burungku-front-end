import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {IucnType} from "@/types/types.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function indicatorColor(value: number) {
    switch (true) {
        case value > 70:
            return "text-green-500";

        case value >= 50 && value <= 70:
            return "text-yellow-500";

        default:
            return "text-red-500";
    }
}
export function getIucnInfo(
    iucn: IucnType
) {
    switch (iucn) {
        case "EX":
        case "EW":
            return {
                title: "Punah",
                description: "Spesies ini sudah tidak ditemukan lagi di alam maupun penangkaran",
                variant: "destructive" as const
            }

        case "VU":
            return {
                title: "Dilindungi",
                description: "Spesies ini termasuk satwa yang dilindungi, hanya boleh ditemui atau dipelihara di penangkaran",
            }

        case "CR":
        case "EN":
        case "NT":
            return {
                title: "Dilindungi",
                description: "Spesies ini termasuk satwa yang dilindungi, diperlukan surat bukti captive breed dan surat kesehatan",
                variant: "warning" as const
            }

        case "LC":
            return {
                title: "Aman diperjualbelikan bebas",
                description: "Spesies ini boleh diperjualbelikan bebas dengan ketentuan yang berlaku",
                variant: "success" as const
            }

        default:
            return {
                title: "",
                description: "",
                variant: "default" as const
            }
    }
}


