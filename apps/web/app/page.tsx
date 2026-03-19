import type { Metadata } from "next";
import homeMessages from "@/messages/en.json";
import HomePage from "./[locale]/page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  pathname: "/",
  title: homeMessages.metadata.title,
  description: homeMessages.metadata.description,
});

export default HomePage;
