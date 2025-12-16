export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Hard gate: only intercept the exact llms.txt path
    if (
      url.hostname === "ebooks.jonathan-harris.online" &&
      url.pathname === "/llms.txt"
    ) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: "https://jonathan-harris.online/llms.txt",
          "Cache-Control": "public, max-age=86400"
        }
      });
    }

    // Everything else passes through untouched
    return fetch(request);
  }
};
