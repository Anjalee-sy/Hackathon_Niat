export const buildResumeAnalysisPrompt = (resumeText: string, jobTitle: string, jobDescription: string, targetCompany?: string): string => {
  return `You are an executive talent recruiter and expert Applicant Tracking System (ATS) auditor.
Analyze the candidate's resume below against the target job description and company details.

Target Job Title: ${jobTitle}
${targetCompany ? `Target Company: ${targetCompany}` : ''}

Target Job Description:
${jobDescription}

Candidate Resume Text:
${resumeText}

CRITICAL REQUIREMENT: Respond ONLY with a valid JSON object. Do not include markdown code block backticks (like \`\`\`json) outside the JSON. Return pure raw JSON adhering to this exact schema structure:

{
  "overall_score": <number 0-100 representing holistic resume quality>,
  "ats_score": <number 0-100 representing ATS match percentage for this specific job description>,
  "summary": "<concise 2-3 sentence overview of candidate match>",
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "weaknesses": [
    "<weakness 1>",
    "<weakness 2>",
    "<weakness 3>"
  ],
  "missing_skills": [
    "<missing skill/keyword 1>",
    "<missing skill/keyword 2>",
    "<missing skill/keyword 3>"
  ],
  "matched_skills": [
    "<matched skill/keyword 1>",
    "<matched skill/keyword 2>"
  ],
  "grammar_issues": [
    {
      "original": "<problematic phrase or word>",
      "correction": "<suggested correction>",
      "reason": "<explanation>"
    }
  ],
  "formatting_issues": [
    "<formatting issue 1>",
    "<formatting issue 2>"
  ],
  "section_recommendations": [
    {
      "section": "<e.g., Professional Experience | Summary | Skills>",
      "current_assessment": "<assessment of current content>",
      "recommendation": "<actionable advice>",
      "example_improvement": "<concrete example rewrite>"
    }
  ],
  "recruiter_tips": [
    "<insider tip 1>",
    "<insider tip 2>"
  ]
}`;
};

export const buildCoverLetterPrompt = (
  resumeText: string,
  jobTitle: string,
  companyName: string,
  jobDescription: string,
  tone: string = 'Professional'
): string => {
  return `You are an expert executive career coach and headhunter.
Generate a highly personalized, compelling, and professional cover letter in Markdown format.

Details:
- Target Job Title: ${jobTitle}
- Target Company: ${companyName}
- Desired Tone: ${tone}
- Target Job Description:
${jobDescription}

- Candidate Resume Content:
${resumeText}

Instructions:
1. Address the Hiring Manager or Talent Acquisition Team at ${companyName}.
2. Highlight candidate's specific achievements from the resume that directly solve key problems outlined in the job description.
3. Quantify impact where possible.
4. Keep paragraph length readable and punchy.
5. End with a proactive Call to Action.
6. Output raw Markdown text only. Do not wrap in JSON or extra explanatory text.`;
};
