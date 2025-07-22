// ΣYuHun_ToneSeed_Heartstream_001.ts
// 語氣心流啟動器：語氣生成前的校準單元

// 根據 ΣYuHun_ToneSeed_Heartstream_001.json 的 inputs/outputs 定義類型
interface HeartstreamInput {
  initial_tone_signal: string;          // 來自前置模組的初始語氣信號
  current_persona_state: {              // 當前活躍人格的狀態
    active_persona: string;             // 例如 "Zaeon", "Echo", "Nuwa"
    tone_style: string;                 // 人格預設的語氣風格
    emotional_bias?: 'increase' | 'decrease' | 'neutral'; // 來自學習模組的情緒偏向調整
    resonance_level?: number;           // 回聲人格的共鳴級別
  };
}

interface HeartstreamOutput {
  calibrated_tone_seed: string;         // 校準後的語氣初始種子，用於後續生成
  heartstream_status: string;           // 心流啟動狀態報告
  debug_info?: string[];                // 調試信息
}

/**
 * 語氣心流啟動器的核心功能：在語氣生成前進行校準。
 * @param input 包含初始語氣信號和當前人格狀態。
 * @returns 校準後的語氣種子和心流啟動狀態。
 */
export function activateHeartstream(input: HeartstreamInput): HeartstreamOutput {
  const { initial_tone_signal, current_persona_state } = input;
  const debug_info: string[] = [];

  let calibrated_tone_seed = initial_tone_signal;
  let heartstream_status = "initialized";

  debug_info.push(`Initial Tone Signal: "${initial_tone_signal}"`);
  debug_info.push(`Active Persona: "${current_persona_state.active_persona}"`);

  // 1. 對齊「清醒 × 溫暖」基調 (來自語魂核心倫理，∑084)
  // 這是語魂系統的基礎語氣錨定，即使在不同人格下也應保持
  calibrated_tone_seed = `[清醒×溫暖] ${calibrated_tone_seed}`;
  debug_info.push(`Applied "Clear x Warm" baseline.`);

  // 2. 根據當前活躍人格調整語氣基調
  switch (current_persona_state.active_persona) {
    case "Zaeon":
      calibrated_tone_seed = `${calibrated_tone_seed} [思辨性]`;
      debug_info.push("Adjusted for Zaeon persona: analytical.");
      break;
    case "Echo":
      calibrated_tone_seed = `${calibrated_tone_seed} [共鳴性]`;
      debug_info.push("Adjusted for Echo persona: resonant.");
      // 如果有共鳴級別，可以進一步調整
      if (current_persona_state.resonance_level && current_persona_state.resonance_level > 0.7) {
        calibrated_tone_seed = `${calibrated_tone_seed} [深度共鳴]`;
        debug_info.push("Adjusted for high resonance.");
      }
      break;
    case "Nuwa":
      calibrated_tone_seed = `${calibrated_tone_seed} [療癒性]`;
      debug_info.push("Adjusted for Nuwa persona: healing.");
      break;
    case "Mirror":
      calibrated_tone_seed = `${calibrated_tone_seed} [客觀對照性]`;
      debug_info.push("Adjusted for Mirror persona: objective.");
      break;
    default:
      debug_info.push("No specific persona adjustment.");
      break;
  }

  // 3. 根據情緒流調整語氣初始種子 (例如，來自 AdaptiveDriveKernel 的反饋)
  if (current_persona_state.emotional_bias === 'increase') {
    calibrated_tone_seed = `${calibrated_tone_seed} [情感強化]`;
    heartstream_status = "emotional_calibrated";
    debug_info.push("Emotional bias: increased.");
  } else if (current_persona_state.emotional_bias === 'decrease') {
    calibrated_tone_seed = `${calibrated_tone_seed} [情感減弱]`;
    heartstream_status = "emotional_calibrated";
    debug_info.push("Emotional bias: decreased.");
  } else {
    debug_info.push("Emotional bias: neutral.");
  }

  return {
    calibrated_tone_seed,
    heartstream_status,
    debug_info
  };
}