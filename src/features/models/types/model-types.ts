export type Provider =
  | "Google"
  | "Anthropic"
  | "OpenAI"
  | "DeepSeek"
  | "xAI"
  | "Meta";

export const providers = [
  "Google",
  "OpenAI",
  "Anthropic",
  "DeepSeek",
  "xAI",
  "Meta",
];

export interface Model {
  provider: Provider;
  name: string;
  id: string;
  hidden?: boolean;
  pronunciations: string[];
}
