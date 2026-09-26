export const promptGroups = {
  "Checking in": [
    "What is taking up the most space in your mind today?",
    "If today had a weather forecast, what would it be?",
    "What do you need more of right now? What do you need less of?",
    "What feeling have you been moving past without naming?",
    "What is one thing you wish someone would ask you today?",
    "Where in your day did you find a moment to pause?",
  ],
  "Small joys": [
    "What felt good today, even for a moment?",
    "What ordinary detail would you like to remember?",
    "Who made your day a little easier, and how?",
    "What is something you enjoyed without needing to be good at it?",
    "What familiar place helps you feel at home?",
    "What small kindness could you offer yourself this week?",
  ],
  "Making space": [
    "What could you give yourself permission to leave unfinished?",
    "Which expectation is yours, and which one did you inherit?",
    "What would a gentler version of tomorrow look like?",
    "What is one thing you can put down for the evening?",
    "When is saying no a way of saying yes to something you value?",
    "What helps you return to yourself after a full day?",
  ],
  "Looking back": [
    "When did you feel most like yourself this week?",
    "What surprised you about the way you handled something recently?",
    "What is one small thing you want to carry into tomorrow?",
    "What has changed in your life that you are still getting used to?",
    "Which moment from this week would you like to revisit?",
    "What would you like to thank your past self for?",
  ],
};
export const promptLibrary = Object.entries(promptGroups).flatMap(
  ([category, prompts], group) =>
    prompts.map((text, index) => ({
      id: `prompt-${group + 1}-${index + 1}`,
      category,
      text,
    })),
);
export const helpItems = [
  {
    category: "Getting started",
    q: "What is Unfold?",
    a: "Unfold brings together journaling, mood check-ins, and everyday wellness reflection. You can write or speak, use a prompt to begin, and return to your entries to notice what matters to you.",
    to: "/features",
    label: "Explore the features",
  },
  {
    category: "Getting started",
    q: "Where can I download the app?",
    a: "Unfold is available on the App Store and Google Play. Open our download page to choose your store. Compatibility requirements and current availability are listed there.",
    to: "/get-app",
    label: "Get Unfold",
  },
  {
    category: "Getting started",
    q: "Do I need a watch or wearable?",
    a: "No. Journaling and mood check-ins do not require a wearable. Optional Apple Health on iOS or Health Connect on Android can add context on supported devices with your permission. The Apple Watch companion requires a supported Apple device.",
  },
  {
    category: "Getting started",
    q: "Is Unfold a medical or therapy service?",
    a: "No. Unfold is a general wellness app for reflection. Its observations are not diagnoses, predictions, or proof of cause and effect. It is not a substitute for professional care or an emergency service.",
  },
  {
    category: "Journaling",
    q: "What can I write about?",
    a: "Start with a moment from your day, a feeling, or a question you are sitting with. A few words are enough. Our prompt library gives you starting points without needing an account.",
    to: "/prompts",
    label: "Find a prompt",
  },
  {
    category: "Journaling",
    q: "Can I journal by speaking?",
    a: "Unfold supports written and voice journaling. Check your microphone permission if voice input is unavailable, and review your app version and device settings.",
  },
  {
    category: "Journaling",
    q: "Do I have to journal every day?",
    a: "No. Your journal can fit the time and energy you have. You can return after a break without catching up on every day you missed.",
    to: "/blog/finding-your-own-journaling-rhythm",
    label: "Find your own rhythm",
  },
  {
    category: "Journaling",
    q: "What does Luma do?",
    a: "Luma offers AI-guided questions and reflections. You decide what feels useful and what does not. AI can misunderstand context, so treat its responses as a starting point for your own reflection.",
    to: "/blog/reflecting-with-ai",
    label: "Read about reflecting with AI",
  },
  {
    category: "Privacy & data",
    q: "Is using AI optional?",
    a: "Applicable AI features ask for your permission before first use. You can withdraw that consent in Settings. The privacy notice explains the processors involved and how information is handled.",
    to: "/privacy",
    label: "Read the privacy notice",
  },
  {
    category: "Privacy & data",
    q: "Do I have to connect Apple Health or Health Connect?",
    a: "No. Health connections are optional. On supported iOS and Android devices, you choose which permissions to allow. You can manage those permissions in Apple Health, Health Connect, or your device settings.",
  },
  {
    category: "Privacy & data",
    q: "Is my journal used for advertising?",
    a: "Unfold’s privacy notice states that journal content and health information are not sold or used for advertising. Read the full notice for processing, retention, and your rights.",
    to: "/privacy",
    label: "Understand your data choices",
  },
  {
    category: "Privacy & data",
    q: "How do I delete my account?",
    a: "You can request deletion in the app or by email. Our account deletion page explains the process and timelines. If you have an active store subscription, manage that separately through the store that bills you.",
    to: "/delete-account",
    label: "Account deletion instructions",
  },
  {
    category: "Subscriptions",
    q: "Is Unfold free to download?",
    a: "Yes, with optional subscriptions for premium features. Your app store and the purchase screen show the current options, local prices, and billing terms before you subscribe.",
    to: "/plans",
    label: "About plans and subscriptions",
  },
  {
    category: "Subscriptions",
    q: "How do I cancel a subscription?",
    a: "Manage your subscription through the Apple or Google account used for the purchase. Deleting the app does not cancel a subscription. Our plans page links to both stores’ instructions.",
    to: "/plans#manage",
    label: "Manage a subscription",
  },
  {
    category: "Subscriptions",
    q: "Where do I find trial and renewal details?",
    a: "Check the in-app purchase screen before confirming. Any available trial, its end date, the amount charged afterward, and the billing period should be reviewed there. Offers and prices can vary by region and store.",
  },
  {
    category: "Subscriptions",
    q: "What if a purchase is not showing up?",
    a: "Confirm that you are using the store account that made the purchase and look for the restore-purchases option in the app. If access is still missing, contact support with your platform and app version. Never send a password or full payment details.",
  },
];
export function filterResources(items, query = "", category = "All") {
  const term = query.trim().toLocaleLowerCase();
  return items.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      [item.text, item.q, item.a, item.category]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase()
        .includes(term),
  );
}
