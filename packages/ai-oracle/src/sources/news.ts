import type { SourceResult } from "../types.js";

interface NewsItem {
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

const RSS_FEEDS = [
  "https://www.antaranews.com/rss/terkini.xml",
  "https://rss.reuters.com/reuters/worldNews",
];

export async function fetchNews(): Promise<SourceResult[]> {
  const results: SourceResult[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const res = await fetch(feedUrl);
      if (!res.ok) continue;
      const xml = await res.text();
      const items = parseRSS(xml);
      results.push({
        sourceName: feedUrl,
        rawData: items,
        parsed: items.length > 0 ? extractEvent(items[0]) : {},
        fetchedAt: Date.now(),
      });
    } catch {
      continue;
    }
  }

  return results;
}

function parseRSS(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    const title = content.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
    const description = content.match(/<description>(.*?)<\/description>/)?.[1] ?? "";
    const source = content.match(/<source[^>]*>(.*?)<\/source>/)?.[1] ?? "RSS";
    const url = content.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
    const publishedAt = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";

    items.push({ title, description, source, url, publishedAt });
  }

  return items;
}

function extractEvent(item: NewsItem): Partial<SourceResult["parsed"]> {
  return {
    description: item.title,
    sources: [item.url],
  };
}

export async function searchNewsForDisaster(
  keywords: string[]
): Promise<NewsItem[]> {
  const allFeeds = await fetchNews();
  const allItems = allFeeds.flatMap((f) => (f.rawData as NewsItem[]) ?? []);
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  return allItems.filter((item) =>
    lowerKeywords.some(
      (kw) =>
        item.title.toLowerCase().includes(kw) ||
        item.description.toLowerCase().includes(kw)
    )
  );
}
