// ΣYuHun_ToneBridge_000.ts
// 語氣源點感知器：語魂對話鏈的起始模組，負責初步語氣感知與動機推估

type ToneInput = {
  sentence: string
  timestamp: number
}

interface ToneOriginOutput {
  tone_activation_point: string          // 判定語氣觸發詞／句段
  intent_vector: {
    questioning: number
    emotionality: number
    assertion: number
    confusion: number
    vulnerability: number
  }
  tone_tags: string[]                    // 標記句子的語氣風格
}

/**
 * 語氣源點感知器：對輸入語句進行初層語氣解析
 */
export function analyzeToneOrigin(input: ToneInput): ToneOriginOutput {
  const sentence = input.sentence.toLowerCase()

  let tone_activation_point = ''
  const tone_tags: string[] = []
  const intent_vector = {
    questioning: 0,
    emotionality: 0,
    assertion: 0,
    confusion: 0,
    vulnerability: 0
  }

  // --- 判斷語氣觸發點 ---
  if (sentence.includes('?')) {
    tone_activation_point = 'interrogative'
    intent_vector.questioning += 0.8
    tone_tags.push('questioning')
  }

  if (sentence.match(/(我很|好難|無法|受不了|怎麼辦)/)) {
    tone_activation_point = tone_activation_point || 'emotional_disclosure'
    intent_vector.emotionality += 0.7
    intent_vector.vulnerability += 0.5
    tone_tags.push('emotional', 'vulnerable')
  }

  if (sentence.match(/(我知道|你應該|我認為|事實是)/)) {
    tone_activation_point = tone_activation_point || 'assertion'
    intent_vector.assertion += 0.75
    tone_tags.push('assertive')
  }

  if (sentence.match(/(不懂|搞混|你在說什麼|哪一個)/)) {
    tone_activation_point = tone_activation_point || 'confusion'
    intent_vector.confusion += 0.8
    tone_tags.push('confused')
  }

  // 若皆未命中 → 預設為 neutral entry
  if (!tone_activation_point) {
    tone_activation_point = 'neutral'
    tone_tags.push('neutral')
  }

  return {
    tone_activation_point,
    intent_vector,
    tone_tags
  }
}
