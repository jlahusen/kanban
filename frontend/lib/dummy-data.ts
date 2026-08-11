import type { BoardState } from "@/types";

export const initialBoardState: BoardState = {
  columns: [
    { id: "col-1", title: "Backlog", cardIds: ["card-1", "card-2", "card-3"] },
    { id: "col-2", title: "In Progress", cardIds: ["card-4", "card-5"] },
    { id: "col-3", title: "Review", cardIds: ["card-6", "card-7"] },
    { id: "col-4", title: "Done", cardIds: ["card-8", "card-9"] },
    { id: "col-5", title: "Blocked", cardIds: ["card-10"] },
  ],
  cards: {
    "card-1": {
      id: "card-1",
      title: "Set up CI/CD pipeline",
      details:
        "Configure GitHub Actions for automated testing and deployment to staging and production environments.",
    },
    "card-2": {
      id: "card-2",
      title: "Design system documentation",
      details:
        "Document all design tokens, components, and usage guidelines in Storybook.",
    },
    "card-3": {
      id: "card-3",
      title: "Implement dark mode",
      details:
        "Add dark mode support using CSS variables and a theme toggle in the navigation bar.",
    },
    "card-4": {
      id: "card-4",
      title: "User authentication",
      details:
        "Build JWT-based auth with refresh token rotation. Includes login, signup, and password reset flows.",
    },
    "card-5": {
      id: "card-5",
      title: "Dashboard analytics",
      details:
        "Add charts for DAU, retention, and revenue metrics using Recharts.",
    },
    "card-6": {
      id: "card-6",
      title: "API rate limiting",
      details:
        "Implement per-user rate limiting using Redis sliding window counters.",
    },
    "card-7": {
      id: "card-7",
      title: "Onboarding flow",
      details:
        "Multi-step onboarding wizard with progress indicator and skip functionality.",
    },
    "card-8": {
      id: "card-8",
      title: "Email notifications",
      details:
        "Transactional emails via SendGrid for account events and weekly digest.",
    },
    "card-9": {
      id: "card-9",
      title: "Mobile responsive layout",
      details:
        "Refactor the main dashboard to be fully responsive on mobile and tablet viewports.",
    },
    "card-10": {
      id: "card-10",
      title: "Third-party integrations",
      details:
        "Blocked pending legal review of data processing agreements with Slack and Salesforce.",
    },
  },
};
