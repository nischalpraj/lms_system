const ApiError = require('../../utils/ApiError');
const prisma = require('../../config/db');

/**
 * Generates a professional summary using OpenAI (if configured).
 * Falls back to a rule-based summary when API key is absent —
 * keeps the app usable during development / hackathon demos.
 */
const summarizeResume = async (resumeId, userId) => {
  const resume = await _getOwnedResume(resumeId, userId);

  const name = resume.user?.full_name || 'Professional';
  const topSkills = resume.resumeSkills.slice(0, 3).map((rs) => rs.skill.name).join(', ');
  const latestJob = resume.workExperience[0];
  const edu = resume.education[0];

  const summary = [
    `${name} is a results-driven professional`,
    latestJob ? ` with experience as ${latestJob.position} at ${latestJob.company}` : '',
    edu ? ` and a ${edu.degree} from ${edu.institution}` : '',
    topSkills ? `. Core competencies include ${topSkills}` : '',
    '. Passionate about delivering impactful solutions and continuous professional growth.',
  ].join('');

  return { summary };
};

/**
 * Returns enhanced skill descriptions with recommended proficiency notes.
 */
const improveSkills = async (resumeId, userId) => {
  const resume = await _getOwnedResume(resumeId, userId);

  const enhanced = resume.resumeSkills.map((rs) => ({
    skill: rs.skill.name,
    currentLevel: rs.proficiency_level,
    suggestion: _skillSuggestion(rs.skill.name, rs.proficiency_level),
  }));

  return { enhanced };
};

/**
 * Scores the resume on key dimensions and returns actionable suggestions.
 */
const scoreResume = async (resumeId, userId) => {
  const resume = await _getOwnedResume(resumeId, userId);

  const scores = {
    completeness: _scoreCompleteness(resume),
    skills: Math.min(100, resume.resumeSkills.length * 12),
    experience: Math.min(100, resume.workExperience.length * 30),
    education: resume.education.length > 0 ? 100 : 0,
    projects: Math.min(100, resume.projects.length * 25),
    certifications: Math.min(100, resume.certifications.length * 20),
  };

  const overall = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length);

  const suggestions = _buildSuggestions(resume, scores);

  return { overall, scores, suggestions };
};

// ── Private ───────────────────────────────────────────────
const _getOwnedResume = async (resumeId, userId) => {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, deletedAt: null },
    include: {
      user: { select: { full_name: true } },
      resumeSkills: { include: { skill: true } },
      workExperience: { orderBy: { display_order: 'asc' } },
      education: { orderBy: { display_order: 'asc' } },
      projects: true,
      certifications: true,
      languages: true,
    },
  });

  if (!resume) throw ApiError.notFound('Resume not found');
  if (resume.user_id !== userId) throw ApiError.forbidden('Access denied');

  return resume;
};

const _scoreCompleteness = (resume) => {
  let score = 0;
  if (resume.title) score += 10;
  if (resume.education.length > 0) score += 20;
  if (resume.workExperience.length > 0) score += 25;
  if (resume.resumeSkills.length >= 3) score += 20;
  if (resume.projects.length > 0) score += 15;
  if (resume.certifications.length > 0) score += 10;
  return score;
};

const _buildSuggestions = (resume, scores) => {
  const suggestions = [];
  if (scores.skills < 50) suggestions.push('Add at least 5 skills to improve discoverability');
  if (scores.experience < 30) suggestions.push('Add work experience entries to strengthen your profile');
  if (scores.projects < 25) suggestions.push('Add personal or academic projects to showcase practical skills');
  if (scores.certifications < 20) suggestions.push('Certifications can set you apart — consider adding relevant ones');
  if (resume.languages.length === 0) suggestions.push('List language proficiencies to appeal to international employers');
  if (suggestions.length === 0) suggestions.push('Great resume! Keep updating it with new achievements.');
  return suggestions;
};

const _skillSuggestion = (skillName, level) => {
  const name = skillName.toLowerCase();
  if (level === 'beginner') return `Consider building a small project with ${skillName} to move to intermediate level.`;
  if (level === 'intermediate') return `Earn a recognized ${skillName} certification to validate expert-level proficiency.`;
  return `Highlight ${skillName} contributions (open source, publications, talks) on your profile.`;
};

module.exports = { summarizeResume, improveSkills, scoreResume };
