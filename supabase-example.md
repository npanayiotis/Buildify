# Supabase Multi-Tenant Implementation

## 1. Database Setup with Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Websites: Users can only access their own websites
CREATE POLICY "Users can view own websites" ON websites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own websites" ON websites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own websites" ON websites
  FOR UPDATE USING (auth.uid() = user_id);

-- Pages: Users can only access pages of their websites
CREATE POLICY "Users can view own pages" ON pages
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );

-- Files: Users can only access files of their websites
CREATE POLICY "Users can view own files" ON files
  FOR SELECT USING (
    website_id IN (
      SELECT id FROM websites WHERE user_id = auth.uid()
    )
  );
```

## 2. File Storage with Tenant Isolation

```javascript
// Supabase Storage with folder structure
const supabase = createClient(url, key);

// Upload image for specific website
const uploadImage = async (websiteId, file) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("website-assets")
    .upload(`${websiteId}/${fileName}`, file);

  if (error) throw error;

  // Store file record in database
  await supabase.from("files").insert({
    website_id: websiteId,
    file_name: fileName,
    file_path: data.path,
    file_type: file.type,
    file_size: file.size,
  });

  return data.path;
};
```

## 3. Blog Functionality Example

```javascript
// Blog post management
const BlogManager = {
  // Create new blog post
  async createPost(websiteId, postData) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        website_id: websiteId,
        title: postData.title,
        content: postData.content,
        slug: postData.slug,
        featured_image: postData.featuredImage,
        published: postData.published,
        published_at: postData.published ? new Date() : null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all posts for a website
  async getPosts(websiteId) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("website_id", websiteId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update post
  async updatePost(postId, updates) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete post
  async deletePost(postId) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", postId);

    if (error) throw error;
  },
};
```

## 4. Contact Form Functionality

```javascript
// Contact form submissions
const ContactManager = {
  // Save contact form submission
  async saveSubmission(websiteId, formData) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        website_id: websiteId,
        name: formData.name,
        email: formData.email,
        message: formData.message,
        phone: formData.phone,
        submitted_at: new Date(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get submissions for website owner
  async getSubmissions(websiteId) {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("website_id", websiteId)
      .order("submitted_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};
```

## 5. Real-time Updates

```javascript
// Listen for real-time updates
const subscribeToWebsiteChanges = (websiteId, callback) => {
  const subscription = supabase
    .channel(`website-${websiteId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "pages",
        filter: `website_id=eq.${websiteId}`,
      },
      callback
    )
    .subscribe();

  return subscription;
};
```
