export type IucnType = "EX" | "EW" | "CR" | "EN" | "VU" | "NT" | "LC"

export type ResultData = {
    species: string
    score: number
    iucn: IucnType | null
}