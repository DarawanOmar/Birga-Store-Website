import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://birgastoresystem.vercel.app";
  const currentDate = new Date();

  return [
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ckb`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
