import { DictionaryBuild, DictionaryLinks, DictionarySegments } from "@/components/demos/DictionaryDemos";
import { SlaAdherence, SlaAnomaly, SlaFeed } from "@/components/demos/SlaDemos";
import { WorkflowPrompt, WorkflowRun, WorkflowValidate } from "@/components/demos/WorkflowDemos";
import { ZenbridgeComponents, ZenbridgeEcho, ZenbridgeWaterfall } from "@/components/demos/ZenbridgeDemos";

/** Looping demos referenced by id from each project's `demos` in content/profile.ts. */
export const demos = {
  "workflow-run": WorkflowRun,
  "workflow-validate": WorkflowValidate,
  "workflow-prompt": WorkflowPrompt,
  "dictionary-segments": DictionarySegments,
  "dictionary-build": DictionaryBuild,
  "dictionary-links": DictionaryLinks,
  "zenbridge-echo": ZenbridgeEcho,
  "zenbridge-waterfall": ZenbridgeWaterfall,
  "zenbridge-components": ZenbridgeComponents,
  "sla-feed": SlaFeed,
  "sla-anomaly": SlaAnomaly,
  "sla-adherence": SlaAdherence,
} as const;
