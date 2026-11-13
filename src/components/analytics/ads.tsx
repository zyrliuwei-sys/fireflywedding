// React 19 hoists this async loader into the SSR <head>. The root route
// declares the matching account meta tag so it appears once in page source.
export function Ads({ code }: { code: string }) {
  if (!code) return null;
  return (
    <script
      id="adsbygoogle-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${code}`}
      crossOrigin="anonymous"
    />
  );
}
