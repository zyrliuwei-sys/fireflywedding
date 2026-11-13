import {
  StaticPage,
  staticPageRouteOptions,
} from '@/routes/(pages)/-static-page';
import { MDXProvider } from '@mdx-js/react';

import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { mdxComponents } from '@/components/mdx-components';

/** Character routes live outside the MDX route group but use the same renderer. */
export function guideRouteOptions(slug: string, path: string) {
  return { ...staticPageRouteOptions(slug, path), component: GuidePage };
}

function GuidePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        <MDXProvider components={mdxComponents}>
          <StaticPage />
        </MDXProvider>
      </main>
      <Footer />
    </div>
  );
}
