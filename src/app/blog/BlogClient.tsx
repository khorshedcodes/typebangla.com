"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookMarked, User } from "lucide-react";
import { BLOG_POSTS } from "../../utils/blogData";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Typing Tips", "SEO & Dev", "Layouts"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const heroPost = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 fade-in text-foreground">
      {/* Blog Hero Header */}
      <section className="text-center space-y-3 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-secondary border border-border px-3.5 py-1.5 rounded-full text-xs font-bold text-foreground">
          <BookMarked size={14} />
          <span>TYPEBANGLA BLOG & GUIDES</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Guides & Tutorials
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Explore speed drills, keyboard layout guides, BCS exam preparation, and technical SEO slug tips.
        </p>
      </section>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search 
            size={14} 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="Search articles, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs border-border"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground border-primary shadow-xs" 
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Hero Post */}
      {heroPost && (
        <Link href={`/blog/${heroPost.slug}`} className="block group">
          <Card className="border border-border bg-card hover:border-foreground/30 transition-all rounded-xl shadow-xs overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                {/* Left: Decorative gradient panel */}
                <div className="md:col-span-2 bg-secondary flex flex-col items-center justify-center p-8 md:p-12 space-y-4 border-r border-border">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-border flex items-center justify-center">
                    <BookMarked size={28} className="text-foreground" />
                  </div>
                  <Badge variant="outline" className="text-[9px] font-bold tracking-wider uppercase border-border bg-background text-foreground">
                    {heroPost.category}
                  </Badge>
                </div>

                {/* Right: Content */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-primary-foreground text-[9px] font-extrabold tracking-wider uppercase shadow-none px-2.5 py-0.5">
                      Featured
                    </Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                      <Clock size={11} />
                      {heroPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-foreground leading-tight group-hover:underline decoration-2 underline-offset-4">
                    {heroPost.title}
                  </h2>

                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {heroPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                      <div className="w-5 h-5 rounded-full bg-secondary border border-border flex items-center justify-center">
                        <User size={10} />
                      </div>
                      <span>{heroPost.author}</span>
                      <span className="text-border">·</span>
                      <Calendar size={10} />
                      <span>{heroPost.date}</span>
                    </div>
                    <span className="text-xs font-bold text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Article <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridPosts.map((post) => (
          <article key={post.slug} className="h-full">
            <Card className="border border-border bg-card p-6 flex flex-col justify-between h-full hover:border-foreground/30 transition-all rounded-xl shadow-xs group">
              <CardContent className="p-0 flex flex-col space-y-4 h-full">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-[9px] font-bold tracking-wider uppercase border-border bg-secondary text-foreground">
                    {post.category}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex-1 space-y-2">
                  <h2 className="text-base font-bold text-foreground leading-snug group-hover:underline decoration-1 underline-offset-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-border pt-4 mt-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                    <div className="w-4 h-4 rounded-full bg-secondary border border-border flex items-center justify-center">
                      <User size={8} />
                    </div>
                    <span>{post.author}</span>
                    <span className="text-border">·</span>
                    <Calendar size={10} />
                    <span>{post.date}</span>
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-xs font-bold text-foreground hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-xs text-muted-foreground">
              No articles match your search or category selection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
