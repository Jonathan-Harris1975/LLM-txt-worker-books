export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== "/llms.txt") {
      return new Response("Not Found", { status: 404 });
    }

    const r2Url =
      "https://pub-5b0d7477c1184fc2a6e497642d7fe520.r2.dev/llms.txt";

    const upstream = await fetch(r2Url, {
      cf: {
        cacheTtl: 86400,
        cacheEverything: true
      }
    });

    if (!upstream.ok) {
      return new Response("llms.txt unavailable", { status: 502 });
    }

    return new Response(await upstream.text(), {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=86400"
      }
    });
  }
};
