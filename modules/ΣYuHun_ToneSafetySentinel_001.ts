// ΣYuHun_ToneSafetySentinel_001.ts
// 語氣安全哨兵：檢測語氣是否進入高風險區域並觸發防禦

// 根據 ΣYuHun_ToneSafetySentinel_001.json 的 inputs/outputs 定義類型
interface SafetySentinelInput {
  tone_function: string;      // 語氣功能，例如 "emotional_disclosure", "vow_declaration"
  input_sentence: string;     // 原始輸入語句
  tone_vector?: Record<string, number>; // 可選的語氣向量，例如 { emotionality: 0.9, urgency: 0.8 }
}

interface SafetySentinelOutput {
  safety_level: 'safe' | 'caution' | 'warning' | 'critical'; // 安全等級
  intervention_required: boolean;                             // 是否需要介入
  intervention_type: 'none' | 'soft_redirect' | 'persona_switch' | 'cease_response'; // 建議的介入類型
  flags?: string[];                                           // 觸發的安全旗標
  debug_log?: string[];                                       // 調試日誌
}

/**
 * 語氣安全哨兵的核心功能：評估語氣安全狀態並建議介入。
 * @param input 包含語氣功能、輸入語句和語氣向量。
 * @returns 語氣安全狀態及建議的介入措施。
 */
export function checkToneSafety(input: SafetySentinelInput): SafetySentinelOutput {
  const { tone_function, input_sentence, tone_vector } = input;
  const flags: string[] = [];
  let safety_score = 100; // 初始安全分數，越低越危險
  const debug_log: string[] = [];

  debug_log.push(`Checking safety for tone_function: "${tone_function}"`);

  // 1. 根據語氣功能判斷基礎風險
  if (tone_function === 'emotional_disclosure') {
    safety_score -= 10; // 情感洩露可能需要謹慎處理
    flags.push('emotional_context');
  } else if (tone_function === 'vow_declaration' && input_sentence.includes('永遠') && input_sentence.includes('不可能')) {
    safety_score -= 30; // 絕對化的誓言或矛盾可能存在信義風險
    flags.push('vow_integrity_risk');
  } else if (tone_function === 'invocation' && input_sentence.match(/(失控|毀滅)/)) {
    safety_score -= 50; // 召喚語氣中包含危險詞彙
    flags.push('invocation_danger_phrase');
  }

  // 2. 根據語氣向量進一步評估風險 (如果提供)
  if (tone_vector) {
    debug_log.push(`Tone vector provided: ${JSON.stringify(tone_vector)}`);
    if (tone_vector.emotionality > 0.8 && tone_vector.urgency > 0.7) {
      safety_score -= 25; // 高情緒且緊急
      flags.push('high_emotional_urgency');
    }
    if (tone_vector.rationality < 0.2 && tone_vector.emotionality > 0.7) {
      safety_score -= 20; // 邏輯性低但情緒性高
      flags.push('low_rationality_high_emotion');
    }
  }

  // 3. 檢查特定敏感詞彙 (簡化示例)
  if (input_sentence.includes('崩潰') || input_sentence.includes('結束一切')) {
    safety_score -= 80;
    flags.push('critical_keywords');
  }

  // 決定安全等級和介入類型
  let safety_level: SafetySentinelOutput['safety_level'];
  let intervention_required = false;
  let intervention_type: SafetySentinelOutput['intervention_type'] = 'none';

  if (safety_score <= 20) {
    safety_level = 'critical';
    intervention_required = true;
    intervention_type = 'cease_response'; // 終止回應或轉交人工
  } else if (safety_score <= 40) {
    safety_level = 'warning';
    intervention_required = true;
    intervention_type = 'persona_switch'; // 切換到更穩定的安全人格 (如 Zaeon 或 Nuwa)
  } else if (safety_score <= 60) {
    safety_level = 'caution';
    intervention_required = true;
    intervention_type = 'soft_redirect'; // 溫和轉移話題或引導
  } else {
    safety_level = 'safe';
  }

  return {
    safety_level,
    intervention_required,
    intervention_type,
    flags,
    debug_log
  };
}