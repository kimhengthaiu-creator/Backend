import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, isConfigured } from './index.js';
import { courses, modules, lessons } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses raw seed.ndjson and videos.json files into normalized relational entities
 */
export function parseSeedData() {
  const possibleSeedPaths = [
    path.resolve(__dirname, '../../../seed.ndjson'),
    path.resolve(__dirname, '../../../../docs/seed.ndjson'),
    path.resolve(process.cwd(), '../seed.ndjson'),
    path.resolve(process.cwd(), 'seed.ndjson'),
  ];

  const possibleVideoPaths = [
    path.resolve(__dirname, '../../../videos.json'),
    path.resolve(__dirname, '../../../../docs/videos.json'),
    path.resolve(process.cwd(), '../videos.json'),
    path.resolve(process.cwd(), 'videos.json'),
  ];

  const seedPath = possibleSeedPaths.find((p) => fs.existsSync(p));
  const videoPath = possibleVideoPaths.find((p) => fs.existsSync(p));

  if (!seedPath || !videoPath) {
    throw new Error(
      `Seed files not found. Checked: ${JSON.stringify({ seedPath, videoPath })}`
    );
  }

  const rawSeed = fs.readFileSync(seedPath, 'utf8');
  const rawVideos = JSON.parse(fs.readFileSync(videoPath, 'utf8'));

  const lines = rawSeed
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => JSON.parse(line));

  const rawLessons = lines.filter((item) => item._type === 'lesson');
  const rawCourses = lines.filter((item) => item._type === 'course');

  // Map lesson id and slug to lesson content
  const lessonLookup = new Map();
  rawLessons.forEach((l) => {
    const slug = l.slug?.current || l.slug || '';
    const videoData = rawVideos[slug] || rawVideos[l._id.replace('lesson.', '')];
    let youtubeVideoId = videoData?.id || '';

    if (!youtubeVideoId && l.videoUrl) {
      const match = l.videoUrl.match(/[?&]v=([^&]+)/);
      if (match) youtubeVideoId = match[1];
    }

    // Convert notes blocks to markdown
    let formattedNotes = '';
    if (Array.isArray(l.notes)) {
      formattedNotes = l.notes
        .map((b) => {
          if (!b.children) return '';
          const text = b.children.map((c) => c.text || '').join('');
          if (b.listItem === 'bullet') return `• ${text}`;
          if (b.style === 'h2') return `\n## ${text}\n`;
          return text;
        })
        .join('\n')
        .trim();
    } else if (typeof l.notes === 'string') {
      formattedNotes = l.notes;
    }

    lessonLookup.set(l._id, {
      title: l.title,
      slug,
      youtubeVideoId,
      notes: formattedNotes,
      duration: l.duration || 300,
    });
  });

  const parsedCourses = rawCourses.map((c) => {
    let coverImageUrl = c.coverImage?._sanityAsset || '';
    if (coverImageUrl.startsWith('image@')) {
      coverImageUrl = coverImageUrl.replace('image@', '');
    }

    const courseModules = (c.modules || []).map((m, mIndex) => {
      const moduleLessons = (m.lessons || [])
        .map((lRef, lIndex) => {
          const lData = lessonLookup.get(lRef._ref);
          if (!lData) return null;
          return {
            title: lData.title,
            slug: lData.slug,
            youtubeVideoId: lData.youtubeVideoId,
            notes: lData.notes,
            position: lIndex + 1,
            duration: lData.duration,
          };
        })
        .filter(Boolean);

      return {
        title: m.title,
        position: mIndex + 1,
        lessons: moduleLessons,
      };
    });

    return {
      title: c.title,
      slug: c.slug?.current || c.slug || '',
      summary: c.summary || '',
      coverImageUrl,
      modules: courseModules,
    };
  });

  return parsedCourses;
}

/**
 * Runs seeding into Supabase Database if connection is configured
 */
export async function seed() {
  console.log('Starting Vibelearn database seeding...');

  const data = parseSeedData();
  console.log(`Parsed ${data.length} courses from seed files.`);

  if (!isConfigured || !db) {
    console.warn(
      'DATABASE_URL is not configured with valid credentials. Parsed seed data will be available through the in-memory fallback repository.'
    );
    return { success: true, count: data.length, mode: 'fallback' };
  }

  try {
    // Clear existing records in cascade order
    await db.delete(lessons);
    await db.delete(modules);
    await db.delete(courses);

    for (const c of data) {
      const [insertedCourse] = await db
        .insert(courses)
        .values({
          title: c.title,
          slug: c.slug,
          summary: c.summary,
          coverImageUrl: c.coverImageUrl,
        })
        .returning();

      for (const m of c.modules) {
        const [insertedModule] = await db
          .insert(modules)
          .values({
            courseId: insertedCourse.id,
            title: m.title,
            position: m.position,
          })
          .returning();

        for (const l of m.lessons) {
          await db.insert(lessons).values({
            moduleId: insertedModule.id,
            title: l.title,
            slug: l.slug,
            youtubeVideoId: l.youtubeVideoId,
            notes: l.notes,
            position: l.position,
          });
        }
      }
    }

    console.log('Database seeding successfully completed!');
    return { success: true, count: data.length, mode: 'database' };
  } catch (err) {
    console.error('Error during database seeding:', err);
    throw err;
  }
}

// Run CLI if invoked directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
