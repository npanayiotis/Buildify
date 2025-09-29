import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/blog/posts/${slug}?tenantId=default-tenant`
      );
      const data = await response.json();

      if (response.ok) {
        setPost(data);
        setComments(data.comments || []);
      } else {
        console.error("Error fetching post:", data.error);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmittingComment(true);
    try {
      const response = await fetch("/api/blog/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: "default-tenant",
          postId: post.id,
          author: "Anonymous", // This would come from auth
          email: "user@example.com",
          content: comment,
        }),
      });

      if (response.ok) {
        setComment("");
        // Refresh comments
        fetchPost();
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.seoTitle || post.title}</title>
        <meta
          name="description"
          content={post.seoDescription || post.excerpt}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                My Blog
              </Link>
              <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                ← Back to Blog
              </Link>
            </div>
          </div>
        </header>

        {/* Article */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{post.readTime}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500">{post.viewCount} views</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">
                    {post.author?.email || "Author"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  ❤️ Like
                </button>
                <button className="text-gray-500 hover:text-blue-500 transition-colors">
                  🔗 Share
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative h-96 mb-12 rounded-lg overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <section className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-12">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  Leave a Comment
                </h4>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {comment.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Newsletter Signup */}
        <section className="bg-blue-600 text-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Enjoyed this post?</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to get more content like this delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
