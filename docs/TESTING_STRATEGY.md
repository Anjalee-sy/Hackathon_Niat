# Testing & Quality Assurance Strategy - ResuMind AI

## 1. Testing Hierarchy

```
   [ E2E User Workflows (Playwright/Cypress) ]
             |
   [ Integration Tests (API + Gemini Mocking + DB) ]
             |
   [ Unit Tests (Zod Schemas + Parser Services) ]
```

## 2. Server Unit & Integration Testing
- **Parser Service Verification**: Validate text extraction from edge-case PDF layouts, multi-page documents, and DOCX files.
- **Zod Validation Shield**: Test invalid payload payloads against endpoint schemas to ensure 400 Bad Request responses with field error details.
- **Gemini Response Schema Validation**: Ensure Gemini AI outputs match strict JSON structures with required fields (`ats_score`, `strengths`, `weaknesses`, `missing_skills`, `section_recommendations`).

## 3. Frontend Component & Accessibility Testing
- **Form Controls**: Validate file drag-n-drop error states (over 5MB, unsupported mime types).
- **Responsive Layout**: Test drawer navigation and score gauges across desktop (1920px), tablet (768px), and mobile (375px).
- **Accessibility**: Ensure ARIA labels on dynamic score progress gauges and theme toggle buttons.
