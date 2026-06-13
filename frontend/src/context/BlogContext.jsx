import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { blogPosts as defaultBlogs } from "../data/blogPosts.js";
import { logActivity } from "../utils/activityLogger";

const BLOG_STORAGE_KEY = "prime-holiday-blogs";

const BlogContext = createContext(null);

const createLocalId = () => globalThis.crypto?.randomUUID?.() ?? `blog-${Date.now()}`;

const readStoredBlogs = () => {
  try {
    const stored = localStorage.getItem(BLOG_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultBlogs;
  } catch {
    return defaultBlogs;
  }
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(readStoredBlogs);

  const addBlog = useCallback((newBlog) => {
    const blogWithId = {
      ...newBlog,
      id: createLocalId(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    setBlogs((currentBlogs) => {
      const updatedBlogs = [blogWithId, ...currentBlogs];
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });

    logActivity(`Published blog post: ${newBlog.title}`);
  }, []);

  const deleteBlog = useCallback((id) => {
    setBlogs((currentBlogs) => {
      const updatedBlogs = currentBlogs.filter((blog) => blog.id !== id);
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });

    logActivity("Deleted a blog post");
  }, []);

  const editBlog = useCallback((updatedBlog) => {
    setBlogs((currentBlogs) => {
      const updatedBlogs = currentBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });

    logActivity(`Edited blog post: ${updatedBlog.title}`);
  }, []);

  const value = useMemo(
    () => ({ blogs, addBlog, deleteBlog, editBlog }),
    [addBlog, blogs, deleteBlog, editBlog]
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogs must be used within BlogProvider");
  }
  return context;
};
