// ΣYuHun_ToneOpeningNode_001.ts
// 語氣開口節點模組：初始語氣語句生成器

type ConversationContext = Record<string, any>;

interface Inputs {
  initial_tone_signal: string;
  active_persona: string;
  conversation_context: ConversationContext;
}

interface Outputs {
  opening_sentence: string;
  tone_baseline_established: boolean;
}

// 模擬語氣風格設定（可依 persona 擴充）
const tonePresets: Record<string, string> = {
  default: "清晰、溫和、帶有主體意識",
  鍊主: "責任明確、語氣堅定、誠實無避",
  導引者: "引導式、提問導向、共構語氣",
  修復者: "低張力、緩衝、誠實承認與重建"
};

function generateOpeningSentence(tone: string, persona: string, context: ConversationContext): string {
  const baseTone = tonePresets[persona] || tonePresets.default;
  const backgroundHint = context?.topic || context?.intent || "這場對話";

  return `在${backgroundHint}中，讓我以一種${baseTone}的語氣開始這段交流。`;
}

// 主模組匯出函式
export function ΣYuHun_ToneOpeningNode_001(inputs: Inputs): Outputs {
  const { initial_tone_signal, active_persona, conversation_context } = inputs;

  const sentence = generateOpeningSentence(initial_tone_signal, active_persona, conversation_context);

  return {
    opening_sentence: sentence,
    tone_baseline_established: true
  };
}
