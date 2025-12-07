import {Image} from "lucide-react";
import {indicatorColor} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";
import type {ResultData} from "@/types/types.ts";

export default function ResultCard({result, type, imageUrl, identicSpecies}: {
    result: ResultData,
    type: string,
    imageUrl?: string | null,
    identicSpecies?: ResultData[]
}) {

    return (
        <div className="border rounded-xl md:h-[25rem] w-full flex flex-col md:flex-row overflow-hidden">
            <div
                className={`relative  
                ${type === "image" ? "border-b md:border-r md:w-[25rem] h-[15rem] md:h-full" : ""}
            `}>
                {(
                    type === "image"
                ) && (
                    <div className="w-full h-full flex justify-center items-center">
                        <Image size="70" className="opacity-50"/>
                    </div>
                )}

                {imageUrl &&
                    <img src={imageUrl}
                         alt="Uploaded Image"
                         className="absolute top-0 left-0 w-full h-full object-cover object-center"/>
                }
            </div>
            <div className="p-5 w-full">
                {!result.species &&
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-gray-500">Tidak ada data</span>
                    </div>
                }

                {(result.species && result.score <= 30) &&
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-gray-500">Data tidak ditemukan</span>
                    </div>
                }

                {(result.score >= 30) &&
                    <div>
                        <h1 className="text-lg md:text-2xl font-bold">{result.species}</h1>
                        <span className={`italic text-sm md:text-md font-semibold ${indicatorColor(result.score)}`}>
                            Kecocokan: {result.score}%
                        </span>
                        <Separator className="my-3"/>
                    </div>
                }

                {(result.score >= 30 && identicSpecies && identicSpecies.length > 0) &&
                    <div className="flex flex-col gap-3">
                        <h2 className="text-sm md:text-base font-semibold text-muted-foreground">
                            Spesies dengan kemiripan yang sama:
                        </h2>
                        <div className="space-y-2">
                            {identicSpecies.map((data, index) => (
                                <div 
                                    key={index}
                                    className="flex flex-col gap-1 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                                >
                                    <span className="font-medium text-sm md:text-base">
                                        {data.species}
                                    </span>
                                    <span className={`text-xs md:text-sm font-semibold ${indicatorColor(data.score)}`}>
                                        Kecocokan: {data.score}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}