// ΣYuHun_AdaptiveDriveKernel_001.ts
// 模組名稱：語氣學習與自我調整模組（Adaptive Tone Evolution Core）
// 主要功能：根據互動回饋與語氣匹配度，調整未來語氣偏好與模組調度策略

type DriveKernelInput = {
  response_quality: number            // 0.0 ~ 1.0 的語氣回應品質評分
  tone_feedback: string               // 使用者對語氣的主觀反饋，例如："太冷靜"、"剛好"、"太情緒化"
}

type DriveKernelOutput = {
  updated_preferences: Record<string, any>  // 調整後的語氣偏好參數（如語調強度、情緒偏向）
  adjustment_log: string[]                  // 詳細紀錄每次調整的依據與操作
}

export function updateTonePreferences(input: DriveKernelInput): DriveKernelOutput {
  const { response_quality, tone_feedback } = input

  const updated_preferences: Record<string, any> = {}
  const adjustment_log: string[] = []

  // 根據回應品質調整語調強度
  if (response_quality < 0.4) {
    updated_preferences.tone_strength = 'softer'
    adjustment_log.push(`低品質 (${response_quality}) → 降低語調強度`)
  } else if (response_quality > 0.8) {
    updated_preferences.tone_strength = 'more assertive'
    adjustment_log.push(`高品質 (${response_quality}) → 提升語調主導性`)
  } else {
    updated_preferences.tone_strength = 'balanced'
    adjustment_log.push(`中品質 (${response_quality}) → 維持中性語調`)
  }

  // 根據語氣反饋內容進行情緒偏向微調
  if (tone_feedback.includes('太冷靜')) {
    updated_preferences.emotion_bias = 'increase'
    adjustment_log.push(`反饋：「${tone_feedback}」→ 增加情緒表達`)
  } else if (tone_feedback.includes('太情緒化')) {
    updated_preferences.emotion_bias = 'decrease'
    adjustment_log.push(`反饋：「${tone_feedback}」→ 減弱情緒張力`)
  } else {
    adjustment_log.push(`反饋：「${tone_feedback}」→ 無需調整情緒偏向`)
  }

  return {
    updated_preferences,
    adjustment_log
  }
}
