import { createFileRoute } from '@tanstack/react-router';

import { guideRouteOptions } from '@/blocks/fw-info-page';

export const Route = createFileRoute('/characters_/satoko-kirigaya')(
  guideRouteOptions('satoko-kirigaya', '/characters/satoko-kirigaya')
);
