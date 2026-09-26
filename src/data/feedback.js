export async function feedbackRequest(path = "", init) {
  const response = await fetch(`/api/feedback${path}`, {
    cache: "no-store",
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(
    typeof payload.detail === "string" ? payload.detail : "The request could not be completed. Please try again.",
  );
  return payload;
}

export const roadmapColumns = [
  { status: "planned", title: "Planned", description: "Ideas we intend to work on." },
  { status: "in_progress", title: "In progress", description: "What the team is working through now." },
  { status: "shipped", title: "Released", description: "Improvements that have made it into Unfold." },
];
