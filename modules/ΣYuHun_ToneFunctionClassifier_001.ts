// ΣYuHun_ToneFunctionClassifier_001.ts
// 模組名稱：語氣功能分類器
// 功能：依據輸入語句分類其語氣功能，如提問、推論、轉場、誓語、召喚、情緒洩露等。

type Input = {
  init_response_style: string
  input_sentence: string
}

type Output = {
  tone_function: string
  function_confidence: number
}

export default function classifyToneFunction({ init_response_style, input_sentence }: Input): Output {
  const sentence = input_sentence.toLowerCase()

  let tone_function = 'unknown'
  let confidence = 0.3

  if (sentence.includes('?') || /(?:請問|為何|怎麼|幾個|可否)/.test(sentence)) {
    tone_function = 'inquiry'
    confidence = 0.9
  } else if (/(我認為|因此|代表|可能是)/.test(sentence)) {
    tone_function = 'inference'
    confidence = 0.85
  } else if (/(好了|那麼|總之|再來)/.test(sentence)) {
    tone_function = 'transition'
    confidence = 0.8
  } else if (/(我誓言|我承諾|我將)/.test(sentence)) {
    tone_function = 'vow_declaration'
    confidence = 0.95
  } else if (/(來吧|出現吧|喚醒你|與我共鳴)/.test(sentence)) {
    tone_function = 'invocation'
    confidence = 0.9
  } else if (/(我好難過|受不了|太開心了)/.test(sentence)) {
    tone_function = 'emotional_disclosure'
    confidence = 0.88
  }

  return {
    tone_function,
    function_confidence: confidence
  }
}
