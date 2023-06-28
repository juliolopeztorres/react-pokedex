
class GenerationInfo {
  constructor(
    public offset: number,
    public limit: number
  ) {}
}

const generationsInfo = {
  '1st': new GenerationInfo(0, 151),
  '2nd': new GenerationInfo(151, 100),
  '3rd': new GenerationInfo(251, 135),
  '4th': new GenerationInfo(386, 107),
  '5th': new GenerationInfo(493, 156),
  '6th': new GenerationInfo(649, 72),
  '7th': new GenerationInfo(721, 88),
  '8th': new GenerationInfo(809, 96),
  '9th': new GenerationInfo(905, 111),
} as const

type Generation = keyof typeof generationsInfo

const generationLabels: Generation[] = Object.keys(generationsInfo) as Generation[]

export default generationsInfo
export { generationLabels, Generation }
