"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "../../utils/blogData";

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

  return (
    <main className="app-container">
      {/* Blog Hero Description */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          TypeBangla Blog
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Explore articles, layout guides, typing tutorials, and technical SEO slug tips.
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Search input */}
        <div style={{ position: "relative", width: "100%" }}>
          <Search 
            size={16} 
            style={{ 
              position: "absolute", 
              left: "14px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              color: "var(--text-muted)" 
            }} 
          />
          <input
            type="text"
            placeholder="Search articles, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-area-glow"
            style={{ paddingLeft: "40px", fontSize: "0.9rem" }}
          />
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontWeight: "600",
                border: "1px solid var(--border)",
                backgroundColor: selectedCategory === cat ? "var(--accent)" : "var(--bg-surface)",
                color: selectedCategory === cat ? "white" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {filteredPosts.map((post) => (
          <article 
            key={post.slug} 
            className="glass-card" 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "14px",
              height: "100%",
              transition: "all 0.2s"
            }}
          >
            {/* Metadata bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                <Clock size={11} />
                {post.readTime}
              </span>
            </div>

            {/* Title & Excerpt */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.35 }}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }} className="blog-title-link">
                  {post.title}
                </Link>
              </h2>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {post.excerpt}
              </p>
            </div>

            {/* Footer details */}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              borderTop: "1px solid var(--border)", 
              paddingTop: "12px",
              marginTop: "8px" 
            }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={11} />
                {post.date}
              </span>
              
              <Link 
                href={`/blog/${post.slug}`} 
                style={{ 
                  fontSize: "0.78rem", 
                  fontWeight: 600, 
                  color: "var(--accent)", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "4px",
                  textDecoration: "none"
                }}
              >
                <span>Read More</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </article>
        ))}

        {filteredPosts.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px 0" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              No articles match your search or category selection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
