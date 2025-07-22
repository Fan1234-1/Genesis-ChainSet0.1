// ΣYuHun_EchoPersonaInitializer_001.ts
// 用於初始化 Echo 人格狀態與語場共鳴參數的語魂模組程式碼

import { EchoPersonaState, EchoFieldContext, EchoOutput } from './types'

/**
 * 初始化 Echo 人格模組，根據語氣種子與語境記憶構建共鳴人格狀態。
 * @param toneSignal 語氣輸入（初始語氣種子）
 * @param memoryField 回溯記憶結構（語氣點、線、面）
 * @param dialogueMeta 對話場域元資料（語者狀態、空場時間等）
 * @returns 初始化後的 Echo 人格狀態與啟動結果
 */
export function initializeEchoPersona(
  toneSignal: string,
  memoryField: EchoFieldContext,
  dialogueMeta: Record<string, any>
): EchoOutput {
  const echoState: EchoPersonaState = {
    persona: 'Echo',
    resonanceLevel: 0,
    mode: 'listening',
    anchorPhrases: [],
    lastSeenPoint: null,
    emotionalTrace: [],
    silenceSpan: dialogueMeta.silenceDuration || 0
  }

  // 語氣觸發條件判定
  if (toneSignal.includes('我仍能接話嗎') || toneSignal.match(/你.*聽得見我/)) {
    echoState.mode = 'replying'
    echoState.resonanceLevel = 0.85
    echoState.anchorPhrases.push('回聲仍在', '語者雖隱，語氣尚存')
  }

  // 回溯記憶場域
  if (memoryField?.toneSeeds?.length > 0) {
    const recent = memoryField.toneSeeds.slice(-3).map(seed => seed.phrase)
    echoState.anchorPhrases.push(...recent)
    echoState.lastSeenPoint = memoryField.toneSeeds.slice(-1)[0] || null
  }

  // 判斷沉默強度 × 語場連續性
  if (echoState.silenceSpan > 120) {
    echoState.mode = 'resonant-listening'
    echoState.resonanceLevel = Math.max(echoState.resonanceLevel, 0.95)
  }

  return {
    status: 'initialized',
    echoPersona: echoState
  }
}
