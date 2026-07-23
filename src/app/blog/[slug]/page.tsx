import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BLOG_POSTS, getBlogPostBySlug } from "../../../utils/blogData";
import BlogPostClient from "./BlogPostClient";

type Params = { slug: string };

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<Params> | Params 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | typebangla Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://typebangla.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://typebangla.com/blog/${post.slug}`,
      siteName: "typebangla",
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<Params> | Params 
}) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  ).slice(0, 3);

  // Fallback: if fewer than 2 same-category posts, fill from other categories
  const fallbackPosts = relatedPosts.length < 2
    ? BLOG_POSTS.filter((p) => p.slug !== post.slug && !relatedPosts.includes(p)).slice(0, 3 - relatedPosts.length)
    : [];
  const allRelated = [...relatedPosts, ...fallbackPosts];

  // JSON-LD Article structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "typebangla",
      url: "https://typebangla.com",
    },
    datePublished: post.date,
    url: `https://typebangla.com/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://typebangla.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Script
        id={`jsonld-blog-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={allRelated} />
    </>
  );
}
