export type ConciergeSource =
  | "work"
  | "knowledge"
  | "framework"
  | "system"
  | "about"
  | "experience"
  | "services";

export type ConciergeMode = "hiring" | "project" | "speaking";

export type ConciergeEntry = {
  id: string;
  source: ConciergeSource;
  type: string;
  title: string;
  slug: string;
  topics: string[];
  summary: string;
  content: string;
  url: string;
};

export type RankedEntry = ConciergeEntry & { score: number };

export type ConciergeEvidence = {
  label: string;
  title: string;
  url: string;
  source: ConciergeSource;
};

export type ConciergeAnswer = {
  answer: string;
  evidence: ConciergeEvidence[];
  related: ConciergeEvidence[];
  nextQuestions: string[];
  noResult: boolean;
};

export type ConciergeEvent =
  | "concierge_open"
  | "concierge_query"
  | "concierge_result_click"
  | "concierge_no_result";
