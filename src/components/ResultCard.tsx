import test from "@/assets/test.jpeg";
import {Image} from "lucide-react";
import {indicatorColor} from "@/lib/utils.ts";
import {Separator} from "@/components/ui/separator.tsx";

export default function ResultCard({result}) {

    return (
        <div className="border rounded-xl md:h-96 w-full flex flex-col md:flex-row overflow-hidden">
            <div className="relative border-b md:border-r h-[15rem] md:h-full md:w-[25rem]">
                {(!result || result.score <= 30) &&
                    <div className="w-full h-full flex justify-center items-center">
                        <Image size="70" className="opacity-50"/>
                    </div>
                }

                {result &&
                    <img src={test}
                         alt="Logo"
                         className="absolute top-0 left-0 w-full h-full object-cover object-center"/>
                }
            </div>
            <div className="p-6 w-full">
                {!result &&
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-gray-500">Tidak ada data</span>
                    </div>
                }

                {result.score <= 30 &&
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="text-gray-500">Data tidak ditemukan</span>
                    </div>
                }

                {result &&
                    <div>
                        <h1 className="text-lg md:text-2xl font-bold">Nama Spesies</h1>
                        <span className={`italic text-sm md:text-md ${indicatorColor(90)}`}>
                            Kecocokan: 90%
                        </span>
                        <Separator className="my-3"/>
                    </div>
                }
            </div>
        </div>
    )
}