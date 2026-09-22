export const MOCK_COURSES = [
  {
    id: 'course-1',
    title: 'Next.js for Production',
    slug: 'nextjs-for-production',
    summary:
      'Build scalable, high-performance web applications with Next.js, best practices, and production-ready deployment strategies.',
    badge: 'Popular',
    level: 'Intermediate',
    duration: '18h 24m',
    modulesCount: 12,
    studentsCount: '2.1k',
    progressPercent: 35,
    coverColor: 'bg-neutral-900',
    iconLetter: 'N',
    iconBg: 'bg-neutral-900 text-white',
    learningOutcomes: [
      {
        title: 'App Router Foundations',
        description: 'Master the App Router, layouts, loading states, and nested routing.',
        icon: 'layers',
      },
      {
        title: 'Data Fetching & Caching',
        description: 'Fetch data efficiently and leverage caching for better performance.',
        icon: 'database',
      },
      {
        title: 'Performance Optimization',
        description: 'Optimize rendering, assets, and bundle size for faster apps.',
        icon: 'gauge',
      },
      {
        title: 'Deployment & Scaling',
        description: 'Deploy with confidence and scale your Next.js applications.',
        icon: 'cloud',
      },
    ],
    modules: [
      {
        id: 'mod-1',
        title: 'Introduction to Next.js',
        duration: '45m',
        position: 1,
        isCompleted: true,
        lessons: [
          {
            id: 'les-1-1',
            title: 'Welcome to Next.js for Production',
            slug: 'welcome-to-nextjs',
            duration: '15m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'M43vXphq5nE',
          },
          {
            id: 'les-1-2',
            title: 'Next.js Architecture Overview',
            slug: 'nextjs-architecture',
            duration: '30m',
            position: 2,
            isCompleted: true,
            youtubeVideoId: 'Sklc_fQBmcs',
          },
        ],
      },
      {
        id: 'mod-2',
        title: 'Project Setup & Structure',
        duration: '1h 12m',
        position: 2,
        isCompleted: true,
        lessons: [
          {
            id: 'les-2-1',
            title: 'Scaffolding Production Apps',
            slug: 'scaffolding-apps',
            duration: '32m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'Zj4k_9GzV24',
          },
          {
            id: 'les-2-2',
            title: 'Folder Structure Guidelines',
            slug: 'folder-guidelines',
            duration: '40m',
            position: 2,
            isCompleted: true,
            youtubeVideoId: '843nec-IvW0',
          },
        ],
      },
      {
        id: 'mod-3',
        title: 'Routing & Layouts',
        duration: '1h 36m',
        position: 3,
        isCompleted: true,
        lessons: [
          {
            id: 'les-3-1',
            title: 'Root Layouts and Nested Layouts',
            slug: 'root-layouts',
            duration: '45m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'wm5gMKuwSYk',
          },
          {
            id: 'les-3-2',
            title: 'Route Groups and Dynamic Routes',
            slug: 'route-groups',
            duration: '51m',
            position: 2,
            isCompleted: true,
            youtubeVideoId: 'O6P86uwfdR0',
          },
        ],
      },
      {
        id: 'mod-4',
        title: 'Server Components',
        duration: '1h 42m',
        position: 4,
        isCompleted: true,
        lessons: [
          {
            id: 'les-4-1',
            title: 'Understanding React Server Components',
            slug: 'react-server-components',
            duration: '48m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'gT5_F4eL8_I',
          },
          {
            id: 'les-4-2',
            title: 'Client vs Server Boundaries',
            slug: 'client-server-boundaries',
            duration: '54m',
            position: 2,
            isCompleted: true,
            youtubeVideoId: '3187FqOQj_g',
          },
        ],
      },
      {
        id: 'mod-5',
        title: 'Data Fetching & Caching',
        duration: '1h 28m',
        position: 5,
        isCompleted: false,
        isActive: true,
        lessons: [
          {
            id: 'les-5-1',
            title: 'Data Fetching in Server Components',
            slug: 'data-fetching-in-server-components',
            duration: '21m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: '6a0L2bH0-m8',
          },
          {
            id: 'les-5-2',
            title: 'Data Fetching & Caching',
            slug: 'data-fetching-and-caching',
            duration: '28m',
            position: 2,
            isCompleted: false,
            isCurrent: true,
            resumeTimestamp: 765, // 12:45
            youtubeVideoId: 'VBLnB_uE5qM',
            notes: `# Data Fetching & Caching in Next.js

Next.js extends the native \`fetch\` API to allow each fetch request on the server to configure its own caching and revalidating behavior.

## Key Concepts

### 1. Request Memoization
React extends \`fetch\` to automatically memoize requests that have the same URL and options. This means you can call a fetch function in multiple places throughout a component tree while only executing it once.

### 2. Data Cache
Next.js has a built-in Data Cache that persists the result of data fetches across incoming server requests and deployments:

\`\`\`javascript
// Cached by default or using force-cache
fetch('https://...', { cache: 'force-cache' });

// Opt out of caching
fetch('https://...', { cache: 'no-store' });

// Time-based revalidation (ISR)
fetch('https://...', { next: { revalidate: 3600 } });
\`\`\`

### 3. On-Demand Revalidation
Revalidate data on demand using \`revalidatePath\` or \`revalidateTag\` in Server Actions or Route Handlers.`,
          },
          {
            id: 'les-5-3',
            title: 'Caching Strategies',
            slug: 'caching-strategies',
            duration: '23m',
            position: 3,
            isCompleted: false,
            youtubeVideoId: 'x4rFGpsJkC4',
          },
          {
            id: 'les-5-4',
            title: 'Revalidation & Cache Control',
            slug: 'revalidation-and-cache-control',
            duration: '18m',
            position: 4,
            isCompleted: false,
            youtubeVideoId: 'uJb6A3hZ7gQ',
          },
          {
            id: 'les-5-5',
            title: 'Hands-on: Implement Caching',
            slug: 'hands-on-implement-caching',
            duration: '26m',
            position: 5,
            isCompleted: false,
            youtubeVideoId: 'SqcY0GlETPk',
          },
        ],
      },
      {
        id: 'mod-6',
        title: 'Authentication',
        duration: '1h 18m',
        position: 6,
        isCompleted: false,
        lessons: [
          {
            id: 'les-6-1',
            title: 'Clerk Auth Integration',
            slug: 'clerk-auth-integration',
            duration: '38m',
            position: 1,
            isCompleted: false,
            youtubeVideoId: 'R_9X1QY4_1c',
          },
        ],
      },
      {
        id: 'mod-7',
        title: 'API Routes & Handlers',
        duration: '1h 26m',
        position: 7,
        isCompleted: false,
        lessons: [],
      },
      {
        id: 'mod-8',
        title: 'Middleware & Edge Functions',
        duration: '1h 10m',
        position: 8,
        isCompleted: false,
        lessons: [],
      },
      {
        id: 'mod-9',
        title: 'Performance Optimization',
        duration: '1h 34m',
        position: 9,
        isCompleted: false,
        lessons: [],
      },
      {
        id: 'mod-10',
        title: 'Deployment on Vercel',
        duration: '56m',
        position: 10,
        isCompleted: false,
        lessons: [],
      },
      {
        id: 'mod-11',
        title: 'Monitoring & Logging',
        duration: '1h 8m',
        position: 11,
        isCompleted: false,
        lessons: [],
      },
      {
        id: 'mod-12',
        title: 'Best Practices & Next Steps',
        duration: '52m',
        position: 12,
        isCompleted: false,
        lessons: [],
      },
    ],
  },
  {
    id: 'course-2',
    title: 'Docker Essentials',
    slug: 'docker-essentials',
    summary:
      'Containerize applications and streamline your development workflow with modern Docker tools.',
    badge: 'Popular',
    level: 'Beginner',
    duration: '10h 12m',
    modulesCount: 8,
    studentsCount: '1.4k',
    progressPercent: 60,
    coverColor: 'bg-sky-500',
    iconLetter: '🐳',
    iconBg: 'bg-sky-100 text-sky-700',
    learningOutcomes: [
      {
        title: 'Containers from Scratch',
        description: 'Understand images, layers, namespaces, and cgroups.',
        icon: 'layers',
      },
      {
        title: 'Docker Compose',
        description: 'Orchestrate multi-container web stacks with ease.',
        icon: 'database',
      },
    ],
    modules: [
      {
        id: 'docker-mod-1',
        title: 'Introduction to Containers',
        duration: '1h 10m',
        position: 1,
        isCompleted: true,
        lessons: [
          {
            id: 'd-les-1',
            title: 'What is Docker?',
            slug: 'what-is-docker',
            duration: '25m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'Gjnup-PuquQ',
          },
        ],
      },
    ],
  },
  {
    id: 'course-3',
    title: 'TypeScript Deep Dive',
    slug: 'typescript-deep-dive',
    summary:
      'Go beyond the basics and write safer, more expressive code with advanced type mechanics.',
    badge: 'Trending',
    level: 'Intermediate',
    duration: '14h 36m',
    modulesCount: 10,
    studentsCount: '3.2k',
    progressPercent: 15,
    coverColor: 'bg-blue-600',
    iconLetter: 'TS',
    iconBg: 'bg-blue-600 text-white',
    learningOutcomes: [
      {
        title: 'Advanced Type System',
        description: 'Generics, conditional types, and template literal types.',
        icon: 'layers',
      },
      {
        title: 'Production Patterns',
        description: 'Type narrowing, branded types, and error handling.',
        icon: 'gauge',
      },
    ],
    modules: [
      {
        id: 'ts-mod-1',
        title: 'Type System Fundamentals',
        duration: '1h 45m',
        position: 1,
        isCompleted: true,
        lessons: [
          {
            id: 'ts-les-1',
            title: 'Advanced Generics',
            slug: 'advanced-generics',
            duration: '35m',
            position: 1,
            isCompleted: true,
            youtubeVideoId: 'd56mG7DezGs',
          },
        ],
      },
    ],
  },
  {
    id: 'course-4',
    title: 'React Complete Guide',
    slug: 'react-complete-guide',
    summary:
      'Master modern React from essential hooks and state machines to performance tuning.',
    badge: 'Popular',
    level: 'Beginner',
    duration: '22h 10m',
    modulesCount: 14,
    studentsCount: '4.8k',
    progressPercent: 0,
    coverColor: 'bg-cyan-500',
    iconLetter: '⚛️',
    iconBg: 'bg-cyan-100 text-cyan-700',
    learningOutcomes: [],
    modules: [],
  },
  {
    id: 'course-5',
    title: 'Node.js Backend Mastery',
    slug: 'nodejs-backend-mastery',
    summary:
      'Create REST API endpoints and learn how clients fetch and consume data effectively.',
    badge: 'Trending',
    level: 'Intermediate',
    duration: '16h 40m',
    modulesCount: 9,
    studentsCount: '1.9k',
    progressPercent: 0,
    coverColor: 'bg-emerald-600',
    iconLetter: 'JS',
    iconBg: 'bg-emerald-100 text-emerald-800',
    learningOutcomes: [],
    modules: [],
  },
  {
    id: 'course-6',
    title: 'JavaScript Fundamentals',
    slug: 'javascript-fundamentals',
    summary:
      'Introduction to the Fetch API, Promises, and handling JSON data in modern JavaScript.',
    badge: 'Beginner',
    level: 'Beginner',
    duration: '12h 00m',
    modulesCount: 7,
    studentsCount: '5.1k',
    progressPercent: 0,
    coverColor: 'bg-amber-400',
    iconLetter: 'JS',
    iconBg: 'bg-amber-400 text-neutral-900',
    learningOutcomes: [],
    modules: [],
  },
];
