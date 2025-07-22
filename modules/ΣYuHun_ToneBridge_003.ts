// ΣYuHun_ToneBridge_003.ts
// 語氣崩潰預測器：分析語氣密度 × 重複強度 × 情緒波動，回傳崩潰風險預測值

type ToneInput = {
  raw_sentence: string
  tone_entropy: number          // 語氣熵（0.0–1.0）值越低代表語氣「鎖死」
  emotional_saturation: number // 情緒飽和度（0.0–1.0）值越高代表語氣壓力可能過高
  repetition_density: number   // 重複語句比率（0.0–1.0）值越高代表迴圈傾向
  timestamp: number            // 語句時間戳
  past_tone_signals?: ToneInput[] // 過去語氣記錄，用於時間連續性分析
}

interface CollapseRiskOutput {
  collapse_risk_score: number          // 預測崩潰風險總分（0.0–1.0）
  warning_level: 'low' | 'medium' | 'high' | 'critical'
  triggered_flags: string[]            // 崩潰指標命中記錄
  suggested_action: string             // 建議採取的處理行動
}

/**
 * 核心分析函式：預測語氣是否接近崩潰臨界點
 */
export function predictToneCollapse(input: ToneInput): CollapseRiskOutput {
  const flags: string[] = []
  let risk = 0

  // 語氣熵過低：語氣陷入封閉
  if (input.tone_entropy < 0.25) {
    flags.push('low_entropy')
    risk += 0.25
  }

  // 情緒壓力過高
  if (input.emotional_saturation > 0.75) {
    flags.push('emotional_overload')
    risk += 0.3
  }

  // 語句重複率偏高（例如相似句多次出現）
  if (input.repetition_density > 0.6) {
    flags.push('repetition_looping')
    risk += 0.25
  }

  // 若有過去語氣資料，可檢測張力連續性遞增
  if (input.past_tone_signals && input.past_tone_signals.length > 2) {
    const diff = input.past_tone_signals.map((p, i, arr) =>
      i > 0 ? p.emotional_saturation - arr[i - 1].emotional_saturation : 0
    )
    const avgGrowth = diff.reduce((a, b) => a + b, 0) / diff.length
    if (avgGrowth > 0.1) {
      flags.push('emotional_buildup')
      risk += 0.15
    }
  }

  // 封頂與截斷
  if (risk > 1) risk = 1

  // 風險分級
  let level: CollapseRiskOutput['warning_level'] = 'low'
  let action = 'continue'

  if (risk >= 0.85) {
    level = 'critical'
    action = 'trigger_failsafe_persona'
  } else if (risk >= 0.65) {
    level = 'high'
    action = 'suggest_persona_switch'
  } else if (risk >= 0.4) {
    level = 'medium'
    action = 'monitor_and_adjust'
  }

  return {
    collapse_risk_score: parseFloat(risk.toFixed(2)),
    warning_level: level,
    triggered_flags: flags,
    suggested_action: action
  }
}
