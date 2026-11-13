import { createFileRoute } from '@tanstack/react-router';

import { staticPageRouteOptions } from './-static-page';

export const Route = createFileRoute('/(pages)/manga-vs-anime')(
  staticPageRouteOptions('manga-vs-anime')
);
