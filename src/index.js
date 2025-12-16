export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Absolute interception — no fallthrough
    if (
      url.hostname === "ebooks.jonathan-harris.online" &&
      url.pathname === "/llms.txt"
    ) {
      return new Response("", {
        status: 301,
        headers: {
          Location: "https://jonathan-harris.online/llms.txt",
          "Cache-Control": "public, max-age=86400"
        }
      });
    }

    // Explicit pass-through for everything else
    return fetch(request);
  }
};
