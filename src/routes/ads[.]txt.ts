import { createFileRoute } from '@tanstack/react-router';

import { ADSENSE_ADS_TXT_RECORD } from '@/config/adsense';

export const Route = createFileRoute('/ads.txt')({
  server: {
    handlers: {
      GET: () => {
        return new Response(ADSENSE_ADS_TXT_RECORD, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
          },
        });
      },
    },
  },
});
