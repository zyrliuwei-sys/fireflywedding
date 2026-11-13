import { createFileRoute } from '@tanstack/react-router';

import { guideRouteOptions } from '@/blocks/fw-info-page';

export const Route = createFileRoute('/characters_/kotaro-ogawa')(
  guideRouteOptions('kotaro-ogawa', '/characters/kotaro-ogawa')
);
