import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import type {IucnType, PredictedAudioType} from "@/types/types.ts";

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

export function getAudioInfo(audioType: PredictedAudioType | null | undefined) {
    switch (audioType) {
        case "song":
            return {
                description:
                    "Kicauan yang biasanya panjang, berirama, dan kompleks. Umumnya digunakan untuk menarik pasangan selama musim kawin serta mempertahankan wilayah dari burung lain. Suara ini menunjukkan kondisi fisik dan vitalitas seekor burung, sehingga sering terdengar lebih aktif pada pagi hari ketika aktivitas kawin dan penandaan wilayah sedang tinggi.",
            }

        case "alarm":
            return {
                description:
                    "Sebuah seruan peringatan yang muncul ketika burung merasakan ancaman, seperti kehadiran predator atau situasi berbahaya lainnya. Suaranya cenderung pendek, tajam, repetitif, dan terdengar panik. Tujuannya adalah memperingatkan burung lain agar lebih waspada, menyelamatkan diri, atau mengelabui predator.",
            }

        case "flight_call":
            return {
                description:
                    "Suara yang dikeluarkan ketika burung sedang terbang, sering kali digunakan untuk menjaga formasi, mengoordinasikan arah, atau memastikan agar kelompok tetap bergerak bersama. Suaranya umumnya pendek dan jelas, membantu burung mengetahui posisi satu sama lain—mirip fungsi navigasi atau 'ekolokasi sederhana' saat berada di udara.",
            }

        case "begging":
            return {
                description:
                    "Seruan khas anak burung ketika meminta makanan dari induknya. Suaranya terdengar memelas, bernada tinggi, dan berulang terus-menerus. Intensitas serta frekuensinya meningkat ketika anak burung lapar atau berada dalam kondisi membutuhkan perhatian ekstra.",
            }

        case "mechanical":
            return {
                description:
                    "Suara fisik yang bukan termasuk kicauan, seperti kepakan sayap, hentakan kaki di tanah, benturan paruh saat mematok, atau gesekan bulu ketika bergerak. Biasanya terekam secara tidak sengaja, namun tetap memberikan indikasi perilaku atau aktivitas yang sedang dilakukan oleh burung.",
            }

        case "contact_call":
            return {
                description:
                    "Sinyal komunikasi dasar yang digunakan burung untuk memastikan keberadaan teman atau pasangan di sekitarnya. Biasanya pendek, lembut, dan berulang, serta berfungsi sebagai 'percakapan ringan' untuk menjaga kedekatan sosial dan orientasi kelompok, terutama ketika mencari makan atau berpindah lokasi.",
            }

        default:
            return {
                description:
                    "Suara tidak dapat ditentukan dengan jelas. Rekaman mungkin terlalu singkat, tertutup noise, atau tidak memiliki ciri akustik yang cukup untuk dikategorikan secara spesifik.",
            }
    }
}

export async function convertToWav (audioBlob: Blob): Promise<Blob> {
    const audioContext = new AudioContext();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length * numberOfChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);

    const writeString = (offset: number, string: string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, audioBuffer.sampleRate, true);
    view.setUint32(28, audioBuffer.sampleRate * numberOfChannels * 2, true);
    view.setUint16(32, numberOfChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length, true);

    const channelData = [];
    for (let i = 0; i < numberOfChannels; i++) {
        channelData.push(audioBuffer.getChannelData(i));
    }

    let offset = 44;
    for (let i = 0; i < audioBuffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = Math.max(-1, Math.min(1, channelData[channel][i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
    }

    return new Blob([buffer], { type: 'audio/wav' });
};



