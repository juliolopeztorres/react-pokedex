
class GenerationInfo {
  constructor(
    public offset: number,
    public limit: number
  ) {}
}

type Generation = '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th' | '9th'

const generationsInfo: {[key in Generation]: GenerationInfo} = {
  '1st': new GenerationInfo(0, 151),
  '2nd': new GenerationInfo(151, 100),
  '3rd': new GenerationInfo(251, 135),
  '4th': new GenerationInfo(386, 107),
  '5th': new GenerationInfo(493, 156),
  '6th': new GenerationInfo(649, 72),
  '7th': new GenerationInfo(721, 88),
  '8th': new GenerationInfo(809, 96),
  '9th': new GenerationInfo(905, 111),
}

const generationLabels: Generation[] = Object.keys(generationsInfo) as Generation[]

export default generationsInfo
export { generationLabels, Generation }
