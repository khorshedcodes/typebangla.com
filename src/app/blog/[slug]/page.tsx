import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "../../../utils/blogData";

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
    title: `${post.title} | TypeBangla Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://typebangla.com/blog/${post.slug}`,
    }
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

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="app-container">
      {/* Back button */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link 
          href="/blog" 
          style={{ 
            fontSize: "0.85rem", 
            color: "var(--text-muted)", 
            display: "flex", 
            alignItems: "center", 
            gap: "6px",
            textDecoration: "none"
          }}
          className="btn-icon"
        >
          <ArrowLeft size={14} />
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Main Prose Article */}
      <article className="prose">
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
          <span 
            style={{ 
              fontSize: "0.68rem", 
              fontWeight: 700, 
              letterSpacing: "0.05em",
              textTransform: "uppercase", 
              color: "var(--accent)", 
              backgroundColor: "var(--accent-subtle)", 
              padding: "2px 8px", 
              borderRadius: "4px" 
            }}
          >
            {post.category}
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={11} />
            {post.date}
          </span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>·</span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "20px" }}>
          {post.title}
        </h1>

        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "32px", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
          <span>Written by</span>
          <strong style={{ color: "var(--text-secondary)" }}>{post.author}</strong>
        </div>

        {/* Content Injector */}
        <div 
          dangerouslySetInnerHTML={{ __html: post.content }} 
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        />
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "40px", maxWidth: "680px", margin: "40px auto 0" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "20px" }}>
            Related Articles
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {relatedPosts.map((rp) => (
              <div 
                key={rp.slug} 
                className="glass-card"
                style={{ 
                  padding: "16px", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "10px",
                  textDecoration: "none"
                }}
              >
                <span style={{ fontSize: "0.62rem", color: "var(--accent)", fontWeight: 700, textTransform: "uppercase" }}>{rp.category}</span>
                <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--text-primary)", margin: 0, lineHeight: 1.3 }}>
                  <Link href={`/blog/${rp.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {rp.title}
                  </Link>
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, flexGrow: 1 }}>{rp.excerpt}</p>
                <Link 
                  href={`/blog/${rp.slug}`} 
                  style={{ 
                    fontSize: "0.75rem", 
                    color: "var(--accent)", 
                    fontWeight: 600, 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "2px",
                    textDecoration: "none",
                    marginTop: "6px"
                  }}
                >
                  <span>Read Article</span>
                  <ArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
