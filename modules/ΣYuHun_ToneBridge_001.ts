// ΣYuHun_ToneBridge_001.ts
// 語氣分析橋：解析語氣張力、風格傾向與初步動機預測

export interface ToneBridgeInput {
  input_sentence: string;
}

export interface ToneBridgeOutput {
  intent_type: string;  // 如：questioning, persuasive, emotional 等
  tone_vector: Record<string, number>; // 語氣分佈，如 {assertive: 0.8, emotional: 0.6}
  emotion_signal: number[];  // 表示張力曲線的數列
}

export default function toneBridge001({ input_sentence }: ToneBridgeInput): ToneBridgeOutput {
  const sentence = input_sentence.toLowerCase();

  // 初步 intent 分類
  let intent_type = "neutral";
  if (sentence.includes("?")) intent_type = "questioning";
  else if (sentence.match(/(我覺得|應該|認為)/)) intent_type = "persuasive";
  else if (sentence.match(/(好難|受不了|感動)/)) intent_type = "emotional";

  // 簡易 tone 向量示例
  const tone_vector: Record<string, number> = {
    assertive: sentence.includes("應該") ? 0.7 : 0.2,
    emotional: sentence.match(/(受不了|難過)/) ? 0.8 : 0.1,
    questioning: sentence.includes("?") ? 1.0 : 0.0,
  };

  // 假設性張力波形生成（簡化範例）
  const emotion_signal = [0.1, 0.5, 0.8, 0.4, 0.2];

  return {
    intent_type,
    tone_vector,
    emotion_signal,
  };
}
