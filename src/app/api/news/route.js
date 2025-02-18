import { NextResponse } from "next/server";

export async function GET() {
  try {
    const API_KEY = process.env.NEWS_API_KEY;
    if (!API_KEY) {
      console.error("Missing API Key");
      return NextResponse.json({ error: "API key is missing. Please configure it in your environment variables." }, { status: 500 });
    }

    const url = `https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=byline,headline,bodyText,wordcount,shortUrl,thumbnail&show-tags=keyword,section,tone&show-blocks=all&page-size=50&order-by=newest&show-references=all`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error fetching news: ${response.status} ${response.statusText}`);
      return NextResponse.json({ error: `Failed to fetch news. Guardian API returned ${response.statusText}.` }, { status: response.status });
    }

    const data = await response.json();

    if (!data?.response?.results) {
      console.error("Unexpected API response structure:", data);
      return NextResponse.json({ error: "Invalid response format from The Guardian API." }, { status: 500 });
    }

    const formattedData = data.response.results.map((article) => ({
      title: article.webTitle || "No title available",
      headline: article.fields?.headline || "No headline available",
      author: article.fields?.byline || "Unknown",
      publishedAt: article.webPublicationDate || "Unknown date",
      source: "The Guardian",
      url: article.webUrl || "#",
      bodyText: article.fields?.bodyText || "No body text available",
      categories: article.tags?.map((tag) => tag.webTitle) || [],
      section: article.tags?.find((tag) => tag.type === "section")?.webTitle || "Unknown section",
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Unexpected error in news API:", error);
    return NextResponse.json({ error: "An unexpected error occurred while fetching news." }, { status: 500 });
  }
}
