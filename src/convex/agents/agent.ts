import { Agent } from "@convex-dev/agent";
import { components } from "@/convex/_generated/api";
import { languageModels } from "@/convex/agents/models";
import { systemPrompt } from "@/convex/agents/prompts";
import { currentEvents, dateTime, positionHolder, weather } from "./tools";

export const agent = new Agent(components.agent, {
  chat: languageModels["gemini-2.5-flash"].model,
  name: "QBE",
  instructions: systemPrompt,
  maxSteps: 20,
  maxRetries: 3,
  tools: {
    dateTime,
    currentEvents,
    weather,
    positionHolder,
  },
  contextOptions: {
    excludeToolMessages: false,
  },
});
