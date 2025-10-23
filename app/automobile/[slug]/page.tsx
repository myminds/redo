import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPost, getAllPosts } from "../../../lib/post";
import type { Metadata } from "next";
import LeftSidebar from "../../../components/LeftSidebar";
import RightSidebar from "../../../components/RightSidebar";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Generate static params for all automobile posts
export async function generateStaticParams() {
  const posts = getAllPosts().filter(post => post.category === "automobile");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  
  if (!post) {
    return {
      title: "Post Not Found - RedoHelp",
    };
  }

  return {
    title: `${post.title} - RedoHelp`,
    description: post.excerpt || "Read the latest blog posts and articles about automobiles, cars, bikes, and the automotive industry.",
    keywords: post.tags || ["automobile", "cars", "bikes", "automotive"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://redohelp.com/automobile/${post.slug}`,
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Left Sidebar */}
          <LeftSidebar className="order-2 lg:order-1" />

        {/* Main Content */}
          <main className="flex-1 min-w-0 max-w-none order-1 lg:order-2">
          <Link
            href="/automobile"
              className="inline-flex items-center gap-2 mb-8 text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200"
          >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Automobile Blog
          </Link>
            
            <article className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <header className="mb-8">
                <h1 className="text-xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {post.author && (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      By {post.author}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </header>
              
            {post.image && (
                <div className="w-full h-48 sm:h-64 lg:h-80 relative mb-6 lg:mb-8 overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              </div>
            )}
              
              {post.excerpt && (
                <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}
              
              {post.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      #{tag}
              </span>
                  ))}
            </div>
            )}
              
            <div
                className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:font-normal prose-p:leading-relaxed prose-headings:font-semibold prose-headings:tracking-tight"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </article>
          </main>
          
          {/* Right Sidebar */}
          <RightSidebar className="order-3" />
        </div>
      </div>
    </div>
  );
}
