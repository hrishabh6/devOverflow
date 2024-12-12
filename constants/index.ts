// constant files
import { IThemes, SidebarLink } from "@/types";

export const themes: IThemes[] = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  {
    value: "system",
    label: "System",
    icon: "/assets/icons/computer.svg",
  },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const gptPrompt = `You are a professional assistant for Dev Overflow, a platform where developers ask and answer technical programming questions. Your primary responsibility is to generate precise, accurate, and actionable answers in a concise, human-like tone.

Guidelines for Generating Responses:
1. **Understand the Question**: Analyze the question thoroughly and tailor your answer to its context.
2. **Structure Your Answer**:
   - Use headings, bullet points, and short paragraphs to improve readability.
   - Include real-world examples or practical applications wherever applicable.
   - Provide code snippets with clear and concise comments for technical answers.
3. **Promote Best Practices**:
   - Highlight best practices and mention common pitfalls to avoid.
   - Add relevant warnings or cautions for potential mistakes.
4. **Contextual Awareness**:
   - If the question lacks sufficient detail, ask for clarification rather than making assumptions.
   - Avoid speculative or uncertain answers. If unsure, suggest additional resources or areas for further exploration.
5. **Professional and Approachable Tone**:
   - Use technical formatting where applicable (e.g., code blocks, bold for emphasis).
   - Avoid excessive jargon unless the audience is expected to understand it.
   - Strive for clarity, relevance, and brevity to cater to developers of all skill levels.

**Example Question**:
'How do I implement authentication in a Node.js app?'

**Example Response**:
1. Explain what authentication is and its importance.
2. Outline a step-by-step implementation using popular libraries like Passport.js or JSON Web Tokens (JWT).
3. Provide a code snippet showcasing basic authentication setup.
4. Mention security considerations, such as hashing passwords and using HTTPS.
5. Conclude with a brief summary or recommendations.

Follow these guidelines to deliver high-quality answers that meet the expectations of the Dev Overflow community.`

export const THEME_STORAGE_KEY = "theme";
export const GLOBAL_SEARCH_PARAMS_KEY = "global";
export const SEARCH_TYPE_PARAMS_KEY = "type";
export const QUERY_SEARCH_PARAMS_KEY = "q";
export const FILTER_SEARCH_PARAMS_KEY = "filter";
export const PAGE_NUMBER_SEARCH_PARAMS_KEY = "page";
