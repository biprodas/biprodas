import { indexResearch, realResearch, researchIsSample } from "./research";
import { sampleResearch } from "./research-samples";

export const research = indexResearch ? realResearch : researchIsSample ? sampleResearch : null;
