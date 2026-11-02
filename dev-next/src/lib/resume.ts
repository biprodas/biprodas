import { profile } from "@/content/profile";
import { publicFileExists } from "./public-file";

export const hasResume = publicFileExists(profile.resume);
