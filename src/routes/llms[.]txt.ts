import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';

const STATIC_PAGES: { path: string; title: string; description: string }[] = [
  {
    path: '',
    title: 'Firefly Wedding (Hotaru no Yomeiri) fan hub',
    description:
      'Where to watch the 2026 anime, episode schedule, story, characters and news',
  },
  {
    path: '/watch',
    title: 'Where to watch Firefly Wedding anime',
    description:
      'Streaming platforms by region and the weekly episode schedule',
  },
  {
    path: '/story',
    title: 'Firefly Wedding story guide',
    description:
      'Spoiler-light premise, story beats, setting and manga overview',
  },
  {
    path: '/characters',
    title: 'Firefly Wedding characters',
    description: 'Main characters and Japanese voice cast',
  },
  {
    path: '/news',
    title: 'Firefly Wedding anime news',
    description: 'Timeline of announcements, releases and milestones',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'Privacy information',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service',
    description: 'Terms of use',
  },
];

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const { app_url, app_name } = envConfigs;

        let posts: { slug: string; title: string; description: string }[] = [];
        try {
          const { listPublishedArticles } =
            await import('@/modules/posts/service');
          const rows = await listPublishedArticles().catch(() => []);
          posts = rows.map((row) => ({
            slug: row.slug,
            title: row.title || row.slug,
            description: row.description || '',
          }));
        } catch {
          // Database unreachable — static project pages still listed.
        }

        const lines: string[] = [
          `# ${app_name}`,
          '',
          `> ${m['common.metadata.description']({}, { locale: 'en' })}`,
          '',
          '## Pages',
          '',
          ...STATIC_PAGES.map(
            (p) => `- [${p.title}](${app_url}${p.path}): ${p.description}`
          ),
        ];

        if (posts.length > 0) {
          lines.push('', '## Blog Posts', '');
          for (const post of posts) {
            lines.push(
              `- [${post.title}](${app_url}/blog/${post.slug}): ${post.description}`
            );
          }
        }

        lines.push('');

        return new Response(lines.join('\n'), {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
