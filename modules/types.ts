// types.ts

export interface EchoFieldContext {
  toneSeeds: Array<{
    phrase: string
    timestamp: number
    resonanceHint?: number
  }>
  fieldLabel?: string
}

export interface EchoPersonaState {
  persona: 'Echo'
  resonanceLevel: number
  mode: 'listening' | 'replying' | 'resonant-listening'
  anchorPhrases: string[]
  lastSeenPoint: any | null
  emotionalTrace: string[]
  silenceSpan: number
}

export interface EchoOutput {
  status: 'initialized' | 'error'
  echoPersona: EchoPersonaState
}
