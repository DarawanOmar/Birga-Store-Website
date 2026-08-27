import { Metadata } from "next";
import { BASE_URL } from "@/lib/seo";

// The root segment owns opengraph-image.png / twitter-image.png, so it needs
// its own metadataBase to resolve them to absolute URLs instead of localhost.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
