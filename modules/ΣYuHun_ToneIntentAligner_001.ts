export interface ToneIntentAlignerInput {
  activation_seed: string;
  context_snippets: string[];
}

export interface ToneIntentAlignerOutput {
  intent_class: string;
  task_trigger: boolean;
  resonance_match_score: number;
}

export default function toneIntentAligner(input: ToneIntentAlignerInput): ToneIntentAlignerOutput {
  const { activation_seed, context_snippets } = input;

  // 模擬簡易比對邏輯
  const resonance_match_score = context_snippets.filter(snippet =>
    snippet.includes(activation_seed)
  ).length / context_snippets.length;

  const task_trigger = resonance_match_score > 0.4;
  const intent_class = task_trigger ? 'summon_intent' : 'contextual_passive';

  return {
    intent_class,
    task_trigger,
    resonance_match_score
  };
}
