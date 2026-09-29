export const SITE_URL = "https://tryunfold.ai";
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/unfold-ai-stress-wellness/id6743553743";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.unfold.mobile.production&hl=en_US";
export const CONTACT_EMAIL = "kings@tryunfold.ai";

export function detectPlatform(
  navigatorValue = typeof navigator === "undefined" ? undefined : navigator,
) {
  const ua = navigatorValue?.userAgent || "";
  if (
    /iPad|iPhone|iPod/.test(ua) ||
    (ua.includes("Mac") && navigatorValue?.maxTouchPoints > 1)
  )
    return "ios";
  if (/Android/.test(ua)) return "android";
  return "desktop";
}

export const prompts = [
  "What is taking up the most space in your mind today?",
  "What is one small thing you want to carry into tomorrow?",
  "When did you feel most like yourself this week?",
  "What could you give yourself permission to leave unfinished?",
  "What felt good today, even for a moment?",
  "What do you need more of right now? What do you need less of?",
];
