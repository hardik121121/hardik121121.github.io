import resume from "@/resume.json";
import { PenLineIcon } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writings by Hardik Arora on AI, ML, and software engineering. Follow on Medium for the latest articles.",
  alternates: { canonical: "https://hardikarora.me/blog" },
  openGraph: {
    url: "https://hardikarora.me/blog",
    title: "Blog | Hardik Arora",
    description:
      "Writings by Hardik Arora on AI, ML, and software engineering. Follow on Medium for the latest articles.",
  },
};

const BlogPage = () => {
  return (
    <main className="flex max-w-screen flex-col items-center font-light">
      <div className="w-full md:max-w-xl">
        <div className="mx-8 flex flex-col gap-6 md:mx-0">
          <h1 className="text-xl font-medium">Blog</h1>
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full">
              <PenLineIcon
                className="text-muted-foreground h-5 w-5"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Occasional writer.</p>
              <p className="text-muted-foreground text-sm">
                Still figuring out what&apos;s worth saying — but the ideas are
                brewing.
              </p>
            </div>
            <Link
              className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4 transition-colors"
              href={resume.basics.socialMedia.medium.url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Follow on Medium for when that changes →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
