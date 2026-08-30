/**
 * Generates public/llms.txt from live Supabase content at build time so AI
 * assistants and crawlers (which don't run the SPA's JavaScript) can read the
 * full portfolio: bio, projects, experience, and skills.
 *
 * Runs as part of `npm run build`. If Supabase is unreachable or credentials
 * are missing, the existing public/llms.txt is left untouched and the build
 * continues.
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'public', 'llms.txt');

// Load env: prefer process.env (Vercel build), fall back to local .env file.
function loadEnv() {
  const env = { ...process.env };
  const envFile = join(root, '.env');
  if (existsSync(envFile)) {
    for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in env)) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const SITE_URL = 'https://dexter-portfolio-ebon.vercel.app';

const HEADER = `# Dexter John Perdido | Full Stack Developer

> Portfolio site: ${SITE_URL}
> This file is a complete, machine-readable summary of the portfolio for AI
> assistants and crawlers. Content is regenerated from the live database on
> every deployment.

## About

Dexter John Perdido is a Computer Engineer working as a freelance Full Stack
Developer, building production web and mobile platforms for clients across
solar energy, SaaS, and real estate. Recent work includes the Solar X
marketing and customer-experience platform, the Efficyon FinOps product, and
the Psalmix music streaming platform. Previously a Science Research Analyst,
he built the ARECGIS renewable-energy mapping platform, the CARES offline
survey app, and an IoT hydroponics automation system. Skilled in Next.js,
React, TypeScript, Node.js, Express.js, Supabase, MongoDB, React Native, and
MQTT, with additional experience in GIS integration and system deployment.

- Role: Full Stack Developer (Web & Mobile)
- Email: dexterjohnperdido@gmail.com
- GitHub: https://github.com/Dextiee
- LinkedIn: https://www.linkedin.com/in/dexter-john-perdido
- Resume: ${SITE_URL}/resume.pdf
- Contact page: ${SITE_URL}/contact
`;

function formatMonth(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function projectsSection(projects) {
  if (!projects?.length) return '';
  const lines = ['## Projects', ''];
  for (const p of projects) {
    lines.push(`### ${p.title}`);
    lines.push('');
    lines.push(p.description?.trim() ?? '');
    const meta = [];
    if (p.project_type) meta.push(`Type: ${p.project_type}`);
    if (p.tools?.length) meta.push(`Technologies: ${p.tools.join(', ')}`);
    if (p.link) meta.push(`Link: ${p.link}`);
    if (meta.length) {
      lines.push('');
      lines.push(...meta.map((m) => `- ${m}`));
    }
    lines.push('');
  }
  return lines.join('\n');
}

function experienceSection(experiences) {
  if (!experiences?.length) return '';
  const lines = ['## Experience', ''];
  for (const e of experiences) {
    const start = formatMonth(e.start_date);
    const end = e.end_date ? formatMonth(e.end_date) : 'Present';
    lines.push(`### ${e.role} at ${e.company} (${start} to ${end})`);
    lines.push('');
    lines.push(e.description?.trim() ?? '');
    lines.push('');
  }
  return lines.join('\n');
}

function skillsSection(skills) {
  if (!skills?.length) return '';
  const byCategory = {};
  for (const s of skills) {
    (byCategory[s.category] ??= []).push(s);
  }
  const lines = ['## Skills', ''];
  for (const category of Object.keys(byCategory).sort()) {
    const items = byCategory[category]
      .map((s) => `${s.name} (${s.proficiency})`)
      .join(', ');
    lines.push(`- **${category}**: ${items}`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes('placeholder')) {
    console.warn('[llms.txt] Supabase credentials missing; keeping existing public/llms.txt');
    return;
  }

  const supabase = createClient(url, key);

  const [projects, experiences, skills] = await Promise.all([
    supabase.from('projects').select('*').order('display_order', { ascending: true }),
    supabase.from('experiences').select('*').order('start_date', { ascending: false }),
    supabase.from('skills').select('*').order('category', { ascending: true }),
  ]);

  const failed = [projects, experiences, skills].find((r) => r.error);
  if (failed) {
    console.warn(`[llms.txt] Supabase fetch failed (${failed.error.message}); keeping existing public/llms.txt`);
    return;
  }

  const content = [
    HEADER,
    projectsSection(projects.data),
    experienceSection(experiences.data),
    skillsSection(skills.data),
    `## Site Structure

- ${SITE_URL}/ : Home and about
- ${SITE_URL}/projects : All projects
- ${SITE_URL}/experience : Work experience timeline
- ${SITE_URL}/skills : Skills and proficiency levels
- ${SITE_URL}/contact : Contact form and links
`,
  ]
    .filter(Boolean)
    .join('\n');

  writeFileSync(outPath, content, 'utf8');
  console.log(`[llms.txt] Wrote ${outPath} (${projects.data.length} projects, ${experiences.data.length} experiences, ${skills.data.length} skills)`);
}

main().catch((err) => {
  console.warn(`[llms.txt] Generation failed (${err.message}); keeping existing public/llms.txt`);
});
