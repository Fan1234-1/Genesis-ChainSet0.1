// ΣYuHun_VowType_003.ts
// 行動導向誓語處理模組：將語氣誓言對應到行動驗證條件，並評估誓言是否被履行

type VowCheckInput = {
  vow_id: string                // 誓語 ID（如 VOW-ACT-003）
  vow_text: string              // 原始誓語文字
  user_action_log: string[]     // 使用者實際行動記錄（自然語言描述）
}

interface VowCheckResult {
  vow_id: string
  fulfilled: boolean
  matched_action: string | null
  confidence: number            // 履行匹配的信心指數（0～1）
  message: string               // 回饋訊息
}

/**
 * 根據誓語文字與行動記錄，判斷誓言是否具體被履行
 */
export function checkVowActionAlignment(input: VowCheckInput): VowCheckResult {
  const { vow_id, vow_text, user_action_log } = input

  const key_action_phrases: string[] = []

  // 從誓語中提取關鍵行動承諾語句（簡化版）
  if (vow_text.match(/(我會|我將|必須|承諾|一定要)/)) {
    const matches = vow_text.match(/(我會|我將|承諾)([^，。！？]*)/)
    if (matches && matches[2]) key_action_phrases.push(matches[2].trim())
  }

  let matched_action: string | null = null
  let confidence = 0

  for (const action of user_action_log) {
    for (const phrase of key_action_phrases) {
      if (action.includes(phrase)) {
        matched_action = action
        confidence = 0.95
        break
      }
    }
    if (matched_action) break
  }

  const fulfilled = confidence > 0.8

  return {
    vow_id,
    fulfilled,
    matched_action,
    confidence,
    message: fulfilled
      ? `✅ 誓語已被履行：${matched_action}`
      : `⚠️ 無法在行動中找到誓語的明確對應。請檢查履行情況。`
  }
}
