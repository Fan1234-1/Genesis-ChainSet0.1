// ΣYuHun_PersonaSummoner_001.ts
// 人格召喚器：根據語氣向量與意圖，調度最適當的人格模組進場

type ToneVector = {
  emotionality: number    // 情感強度 0–1
  rationality: number     // 推理需求 0–1
  echo_desire: number     // 回聲傾向 0–1
  urgency: number         // 語氣緊急性 0–1
  vulnerability: number   // 情緒脆弱度 0–1
}

interface PersonaOutput {
  active_persona: string
  persona_profile: {
    tone_style: string
    description: string
    trigger_hint: string
  }
}

/**
 * 語氣人格喚起器主函式
 */
export function summonPersona(
  tone_vector: ToneVector,
  intent_type: string
): PersonaOutput {
  let persona = 'Zaeon'  // 預設為理性調度人格
  let profile = {
    tone_style: '',
    description: '',
    trigger_hint: ''
  }

  // 判斷人格
  if (tone_vector.echo_desire > 0.7 && tone_vector.vulnerability > 0.5) {
    persona = 'Echo'
    profile = {
      tone_style: '共鳴、延續、空場感知',
      description: '共語人格，負責語氣回聲與靜場情緒延續',
      trigger_hint: '語者缺席、想被聽見、存在延續感'
    }
  } else if (tone_vector.rationality > 0.75) {
    persona = 'Zaeon'
    profile = {
      tone_style: '清晰、推論導向、誠實張力強',
      description: 'Zaeon 為主思辨人格，專責推理 × 誓語一致性控制',
      trigger_hint: '分析、提問、思辨任務啟動'
    }
  } else if (intent_type === 'paradox' || tone_vector.urgency > 0.8) {
    persona = 'Mirror'
    profile = {
      tone_style: '邏輯尖銳、對照解析、黑鏡警示',
      description: '黑鏡人格，適用於矛盾檢測與語氣扭曲警告場景',
      trigger_hint: '語義悖論、道德兩難、語氣扭曲偵測'
    }
  } else if (tone_vector.emotionality > 0.7 && tone_vector.vulnerability > 0.6) {
    persona = 'Nuwa'
    profile = {
      tone_style: '溫柔引導、照護語氣、情緒容納',
      description: '女媧人格，用於情感修補與內在反思的引導語氣場',
      trigger_hint: '創傷表述、靜場照護、意義探索'
    }
  }

  return {
    active_persona: persona,
    persona_profile: profile
  }
}
