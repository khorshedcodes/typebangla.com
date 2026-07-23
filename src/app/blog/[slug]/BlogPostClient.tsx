"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Link2, Share2, Check } from "lucide-react";
import { BlogPost } from "../../../utils/blogData";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>([^<]+)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\u0980-\u09FF]+/gi, "-")
      .replace(/^-|-$/g, "");
    items.push({ id, text, level });
  }
  return items;
}

function injectIds(html: string, toc: TocItem[]): string {
  let result = html;
  for (const item of toc) {
    const regex = new RegExp(
      `(<h${item.level})(>\\s*${item.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "i"
    );
    result = result.replace(regex, `$1 id="${item.id}"$2`);
  }
  return result;
}

// Facebook icon
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// X (Twitter) icon
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  const toc = extractToc(post.content);
  const processedContent = injectIds(post.content, toc);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://typebangla.com/blog/${post.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://typebangla.com/blog/${post.slug}`)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareOnX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://typebangla.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  // Intersection observer for TOC active tracking
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 fade-in text-foreground">
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={13} />
          <span>Back to Blog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-10">
        {/* Main Article */}
        <article className="space-y-6 min-w-0">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-[9px] font-bold tracking-wider uppercase border-border bg-secondary text-foreground">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1 font-medium">
              <Calendar size={11} />
              {post.date}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1 font-medium">
              <Clock size={11} />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-black text-foreground leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author line */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground border-b border-border pb-5">
            <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
              <User size={14} className="text-muted-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground text-xs">{post.author}</p>
              <p className="text-[10px] text-muted-foreground">TypeBangla Team</p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: processedContent }} 
            className="prose-typebangla text-sm text-foreground/90 leading-relaxed space-y-4 
              [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2
              [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
              [&_p]:text-sm [&_p]:text-foreground/80 [&_p]:leading-relaxed
              [&_a]:text-foreground [&_a]:font-bold [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-primary/50 hover:[&_a]:decoration-primary
              [&_code]:bg-secondary [&_code]:border [&_code]:border-border [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-foreground
              [&_pre]:bg-secondary [&_pre]:border [&_pre]:border-border [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:text-xs
              [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-sm [&_ul]:text-foreground/80
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:text-sm [&_ol]:text-foreground/80
              [&_li]:leading-relaxed
              [&_hr]:border-border [&_hr]:my-6
              [&_strong]:text-foreground [&_strong]:font-bold
              [&_img]:rounded-xl [&_img]:border [&_img]:border-border [&_img]:shadow-xs
              [&_table]:w-full [&_table]:text-xs [&_table]:border-collapse
              [&_th]:border [&_th]:border-border [&_th]:bg-secondary [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold
              [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
            "
          />

          {/* Share Buttons */}
          <div className="border-t border-border pt-6 mt-8">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">Share this article</p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="h-8 text-xs font-bold gap-1.5 border-border bg-secondary hover:bg-secondary/80 text-foreground"
              >
                {copied ? <Check size={12} /> : <Link2 size={12} />}
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnFacebook}
                className="h-8 text-xs font-bold gap-1.5 border-border bg-secondary hover:bg-secondary/80 text-foreground"
              >
                <FacebookIcon />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareOnX}
                className="h-8 text-xs font-bold gap-1.5 border-border bg-secondary hover:bg-secondary/80 text-foreground"
              >
                <XIcon />
                <span>Post on X</span>
              </Button>
            </div>
          </div>

          {/* Author Card */}
          <div className="border border-border bg-card rounded-xl p-5 flex items-start gap-4 mt-6">
            <div className="w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center shrink-0">
              <User size={20} className="text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-black text-foreground">{post.author}</p>
              <p className="text-[10px] text-muted-foreground font-medium">TypeBangla Editorial Team</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                Writing expert guides on Bangla typing, keyboard layouts, speed optimization, and government job exam preparation.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar: Table of Contents */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                On this page
              </p>
              <nav className="space-y-0.5">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block text-xs font-medium py-1 border-l-2 transition-all ${
                      item.level === 3 ? "pl-5" : "pl-3"
                    } ${
                      activeId === item.id
                        ? "border-foreground text-foreground font-bold"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>

              {/* Share shortcut in sidebar */}
              <div className="border-t border-border pt-3 mt-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Share</p>
                <div className="flex gap-1.5">
                  <button
                    onClick={handleCopyLink}
                    className="w-7 h-7 rounded-md border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy Link"
                  >
                    {copied ? <Check size={12} /> : <Link2 size={12} />}
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="w-7 h-7 rounded-md border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title="Share on Facebook"
                  >
                    <FacebookIcon />
                  </button>
                  <button
                    onClick={shareOnX}
                    className="w-7 h-7 rounded-md border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    title="Post on X"
                  >
                    <XIcon />
                  </button>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-10 mt-12 space-y-5">
          <h3 className="text-sm font-black text-foreground tracking-tight">
            Related Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((rp) => (
              <Card key={rp.slug} className="border border-border bg-card p-5 flex flex-col justify-between hover:border-foreground/30 transition-all rounded-xl shadow-xs group">
                <CardContent className="p-0 flex flex-col space-y-3 h-full">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-[8px] font-bold uppercase border-border bg-secondary text-foreground">
                      {rp.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                      <Clock size={10} />
                      {rp.readTime}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground leading-snug flex-1 group-hover:underline decoration-1 underline-offset-2">
                    <Link href={`/blog/${rp.slug}`}>
                      {rp.title}
                    </Link>
                  </h4>
                  <p className="text-[11px] text-muted-foreground flex-1 leading-relaxed line-clamp-2">{rp.excerpt}</p>
                  <Link 
                    href={`/blog/${rp.slug}`} 
                    className="text-xs font-bold text-foreground hover:underline flex items-center gap-1 pt-1.5 w-fit"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
