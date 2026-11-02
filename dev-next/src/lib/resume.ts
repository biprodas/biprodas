import { profile } from "@/content/profile";

const file = `https://drive.google.com/file/d/${profile.resumeDriveId}`;

/** Google Drive URLs for the resume PDF: the embeddable viewer, the full Drive page and a direct download. */
export const resume = {
  embedUrl: `${file}/preview`,
  viewUrl: `${file}/view`,
  downloadUrl: `https://drive.google.com/uc?export=download&id=${profile.resumeDriveId}`,
};
