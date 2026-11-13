import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ads.txt')({
  server: {
    handlers: {
      GET: () => {
        const body =
          'google.com, pub-2841223102464177, DIRECT, f08c47fec0942fa0';
        return new Response(body, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      },
    },
  },
});
