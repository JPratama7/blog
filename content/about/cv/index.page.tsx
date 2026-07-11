import type {} from "lume/jsx-runtime";

export const layout = "layouts/page.tsx";
export const title = "Curriculum Vitae";
export const description =
  "Professional CV of Jose Chasey Pratama, backend engineer with experience in AI/LLM integrations, data pipelines, and DevOps.";

interface Experience {
  company: string;
  role: string;
  location?: string;
  start: string;
  end?: string;
  description?: string;
  highlights?: string[];
}

interface Education {
  institution: string;
  degree: string;
  field?: string;
  start: string;
  end?: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface CvData {
  name?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: SkillGroup[];
}

export default function CvPage(data: Lume.Data & CvData) {
  const { name, summary, experience, education, skills } = data;

  return (
    <div class="cv-page">
      {name && (
        <p class="cv-name">{name}</p>
      )}

      {summary && (
        <section class="cv-section">
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section class="cv-section">
          <h2>Experience</h2>
          <ul class="cv-list">
            {experience.map((job) => (
              <li class="cv-item" key={job.company + job.role}>
                <div class="cv-item-header">
                  <div class="cv-header-left">
                    <h3>{job.role}</h3>
                    <span class="cv-company">{job.company}</span>
                  </div>
                  <div class="cv-header-right">
                    {job.location && (
                      <span class="cv-location">{job.location}</span>
                    )}
                    <span class="cv-dates">
                      {job.start} to {job.end ?? "Present"}
                    </span>
                  </div>
                </div>
                {job.description && <p>{job.description}</p>}
                {job.highlights && job.highlights.length > 0 && (
                  <ul>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {education && education.length > 0 && (
        <section class="cv-section">
          <h2>Education</h2>
          <ul class="cv-list">
            {education.map((school) => (
              <li class="cv-item" key={school.institution + school.degree}>
                <h3>
                  {school.degree}
                  {school.field && `, ${school.field}`}
                </h3>
                <div class="cv-meta">
                  <span class="cv-institution">{school.institution}</span>
                  <span class="cv-dates">
                    {school.start} – {school.end ?? "Present"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section class="cv-section">
          <h2>Skills</h2>
          <ul class="cv-list">
            {skills.map((group) => (
              <li class="cv-item" key={group.category}>
                <h3>{group.category}</h3>
                <p>{group.items.join(", ")}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
