export type IucnType = "EX" | "EW" | "CR" | "EN" | "VU" | "NT" | "LC"

export type PredictedAudioType = "song" | "alarm" | "flight_call" | "begging" | "mechanical" | "contact_call" | "uncertain"

export type ResultData = {
    species: string
    score: number
    iucn: IucnType | null
}

export type ResultDataAudio = {
    species: string
    predicted_simple_type: PredictedAudioType | null
}