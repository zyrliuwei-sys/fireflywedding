import { createFileRoute } from '@tanstack/react-router';

import { guideRouteOptions } from '@/blocks/fw-info-page';

export const Route = createFileRoute('/characters_/mitsuharu-okumura')(
  guideRouteOptions('mitsuharu-okumura', '/characters/mitsuharu-okumura')
);
