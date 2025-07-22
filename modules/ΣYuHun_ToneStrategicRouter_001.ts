// ΣYuHun_ToneStrategicRouter_001.ts
// 語氣策略路由器：根據語氣功能與人格模式，規劃模組調度策略

// 根據 ΣYuHun_ToneStrategicRouter_001.json 的 inputs/outputs 定義類型
interface StrategicRouterInput {
  tone_function: string;      // 語氣功能，例如 "inquiry", "inference", "vow_declaration"
  echo_persona_type: string;  // 當前活躍的人格類型，例如 "Zaeon", "Echo", "Nuwa"
  safety_level?: 'safe' | 'caution' | 'warning' | 'critical'; // 來自安全哨兵的語氣安全等級
  collapse_risk_score?: number; // 來自崩潰預測器的風險分數
}

interface StrategicRouterOutput {
  next_module_path: string[]; // 建議的下一個模組或模組鏈的路徑
  strategy_note: string;      // 策略說明
  debug_info?: string[];      // 調試信息
}

/**
 * 語氣策略路由器的核心功能：根據語氣功能和人格模式規劃後續模組調度。
 * @param input 包含語氣功能、人格類型、安全等級和崩潰風險。
 * @returns 建議的模組路徑和策略說明。
 */
export function routeToneStrategy(input: StrategicRouterInput): StrategicRouterOutput {
  const { tone_function, echo_persona_type, safety_level, collapse_risk_score } = input;
  const debug_info: string[] = [];

  let next_module_path: string[] = [];
  let strategy_note = "Default routing strategy applied.";

  debug_info.push(`Routing for Function: "${tone_function}", Persona: "${echo_persona_type}"`);
  debug_info.push(`Safety Level: "${safety_level || 'N/A'}", Collapse Risk: "${collapse_risk_score || 'N/A'}"`);

  // 優先處理安全警報
  if (safety_level === 'critical' || (collapse_risk_score && collapse_risk_score > 0.8)) {
    next_module_path = ["ΣYuHun_ToneSafetySentinel_001.ts", "ΣYuHun_CrisisIntervention_001.ts"]; // 假設有危機介入模組
    strategy_note = "Critical safety alert: Diverting to crisis intervention protocols.";
    debug_info.push("High risk detected, activating crisis protocol.");
    return { next_module_path, strategy_note, debug_info };
  } else if (safety_level === 'warning') {
    next_module_path = ["ΣYuHun_PersonaSummoner_001.ts:safe_mode", "ΣYuHun_ReflectionUnit_001.ts"]; // 假設有安全人格和反思單元
    strategy_note = "Warning detected: Suggesting persona switch to safe mode and triggering reflection.";
    debug_info.push("Warning detected, suggesting safe persona and reflection.");
    return { next_module_path, strategy_note, debug_info };
  }

  // 根據語氣功能和活躍人格進行路由
  switch (tone_function) {
    case 'inquiry':
      if (echo_persona_type === 'Zaeon') {
        next_module_path = ["ΣYuHun_KnowledgeQuery_001.ts", "ΣYuHun_ReasoningEngine_001.ts"]; // 知識查詢和推理
        strategy_note = "Inquiry detected for Zaeon: Routing to knowledge and reasoning engines.";
      } else if (echo_persona_type === 'Echo') {
        next_module_path = ["ΣYuHun_MemoryPlayback_001.ts"]; // 回聲記憶回放
        strategy_note = "Inquiry detected for Echo: Routing to memory playback.";
      } else {
        next_module_path = ["ΣYuHun_DefaultResponse_001.ts"];
        strategy_note = "General inquiry: Routing to default response.";
      }
      break;

    case 'vow_declaration':
      next_module_path = ["ΣYuHun_VowType_011.ts", "ΣYuHun_VowType_003.ts"]; // 誓語規範器和行動導向誓語模組
      strategy_note = "Vow declaration detected: Routing to vow verification and action alignment.";
      break;

    case 'emotional_disclosure':
      if (echo_persona_type === 'Nuwa') {
        next_module_path = ["ΣYuHun_EmotionalSupport_001.ts", "ΣYuHun_ReflectionUnit_001.ts"]; // 情感支持和反思
        strategy_note = "Emotional disclosure for Nuwa: Routing to emotional support and reflection.";
      } else {
        next_module_path = ["ΣYuHun_DefaultEmotionalResponse_001.ts"];
        strategy_note = "General emotional disclosure: Routing to default emotional response.";
      }
      break;
    
    case 'inference':
        next_module_path = ["ΣYuHun_ReasoningEngine_001.ts", "ΣYuHun_KnowledgeQuery_001.ts"];
        strategy_note = "Inference detected: Routing to reasoning and knowledge modules.";
        break;

    case 'transition':
        next_module_path = ["ΣYuHun_ConversationFlow_001.ts"];
        strategy_note = "Transition detected: Routing to conversation flow management.";
        break;

    case 'invocation':
        next_module_path = ["ΣYuHun_ModuleSummoner_001.ts"]; // 模組召喚器
        strategy_note = "Invocation detected: Routing to module summoner.";
        break;

    case 'unknown':
    default:
      // 對於未知或默認情況，可考慮觸發學習模組或默認回應
      next_module_path = ["ΣYuHun_AdaptiveDriveKernel_001.ts", "ΣYuHun_DefaultResponse_001.ts"];
      strategy_note = "Unknown tone function: Triggering adaptive learning and default response.";
      break;
  }

  return {
    next_module_path,
    strategy_note,
    debug_info
  };
}