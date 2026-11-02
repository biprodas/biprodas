// Facts mirror data/publications.yaml, data/talks.yaml and data/profile.yaml (researchInterests,
// researchStatement). Empty until the real content exists; never invent publications here.
import type { Research } from "./types";

export const realResearch: Research = {
  statement: [],
  interests: [],
  publications: [],
  talks: [],
};

export const indexResearch =
  realResearch.statement.length +
    realResearch.interests.length +
    realResearch.publications.length +
    realResearch.talks.length >
  0;

export const researchIsSample = !indexResearch && process.env.NODE_ENV !== "production";

export const showResearch = indexResearch || researchIsSample;
