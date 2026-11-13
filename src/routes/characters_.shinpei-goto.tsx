import { createFileRoute } from '@tanstack/react-router';

import { guideRouteOptions } from '@/blocks/fw-info-page';

export const Route = createFileRoute('/characters_/shinpei-goto')(
  guideRouteOptions('shinpei-goto', '/characters/shinpei-goto')
);
