/**
 * Storage Management
 * Handles file storage and CDN operations
 */

import AWS from "aws-sdk";
import { v2 as cloudinary } from "cloudinary";

// ========================================
// CONFIGURATION
// ========================================

// AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || "us-east-1",
});

const S3_BUCKET = process.env.S3_BUCKET_NAME;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ========================================
// AWS S3 FUNCTIONS
// ========================================

export async function uploadToS3(filePath, fileContent, options = {}) {
  try {
    const key = options.key || filePath;
    const contentType = options.contentType || getContentType(filePath);

    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
      ACL: options.acl || "public-read",
      CacheControl: options.cacheControl || "max-age=31536000",
      ...options,
    };

    const result = await s3.upload(params).promise();

    return {
      success: true,
      url: result.Location,
      key: result.Key,
      etag: result.ETag,
    };
  } catch (error) {
    console.error("S3 upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteFromS3(key) {
  try {
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
    };

    await s3.deleteObject(params).promise();

    return { success: true };
  } catch (error) {
    console.error("S3 delete error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function listS3Objects(prefix = "") {
  try {
    const params = {
      Bucket: S3_BUCKET,
      Prefix: prefix,
    };

    const result = await s3.listObjectsV2(params).promise();

    return {
      success: true,
      objects: result.Contents || [],
    };
  } catch (error) {
    console.error("S3 list objects error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function generateS3PresignedUrl(key, expiresIn = 3600) {
  try {
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Expires: expiresIn,
    };

    const url = await s3.getSignedUrlPromise("getObject", params);

    return {
      success: true,
      url: url,
    };
  } catch (error) {
    console.error("S3 presigned URL error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// CLOUDINARY FUNCTIONS
// ========================================

export async function uploadToCloudinary(filePath, fileContent, options = {}) {
  try {
    const uploadOptions = {
      folder: options.folder || "elevare-websites",
      public_id: options.publicId || generatePublicId(filePath),
      resource_type: options.resourceType || "auto",
      transformation: options.transformation || [],
      ...options,
    };

    const result = await cloudinary.uploader.upload(fileContent, uploadOptions);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteFromCloudinary(publicId, resourceType = "image") {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return {
      success: result.result === "ok",
      result: result,
    };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function generateCloudinaryUrl(publicId, transformations = {}) {
  try {
    const url = cloudinary.url(publicId, {
      secure: true,
      ...transformations,
    });

    return {
      success: true,
      url: url,
    };
  } catch (error) {
    console.error("Cloudinary URL generation error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// WEBSITE DEPLOYMENT FUNCTIONS
// ========================================

export async function deployWebsiteFiles(websiteId, files, options = {}) {
  try {
    const results = [];
    const basePath = options.basePath || `websites/${websiteId}`;

    for (const file of files) {
      const filePath = `${basePath}/${file.path}`;
      let result;

      if (options.storage === "cloudinary") {
        result = await uploadToCloudinary(filePath, file.content, {
          folder: `elevare-websites/${websiteId}`,
          publicId: file.path.replace(/\.[^/.]+$/, ""), // Remove extension
          resourceType: getCloudinaryResourceType(file.path),
        });
      } else {
        result = await uploadToS3(filePath, file.content, {
          key: filePath,
          contentType: getContentType(file.path),
        });
      }

      results.push({
        path: file.path,
        success: result.success,
        url: result.url,
        error: result.error,
      });
    }

    const successCount = results.filter((r) => r.success).length;
    const totalCount = results.length;

    return {
      success: successCount === totalCount,
      results: results,
      summary: {
        total: totalCount,
        successful: successCount,
        failed: totalCount - successCount,
      },
    };
  } catch (error) {
    console.error("Deploy website files error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteWebsiteFiles(websiteId, options = {}) {
  try {
    const basePath = `websites/${websiteId}`;
    let result;

    if (options.storage === "cloudinary") {
      // Delete folder in Cloudinary
      result = await cloudinary.api.delete_folder(
        `elevare-websites/${websiteId}`
      );
    } else {
      // List and delete all objects in S3
      const listResult = await listS3Objects(basePath);

      if (listResult.success) {
        const deletePromises = listResult.objects.map((obj) =>
          deleteFromS3(obj.Key)
        );

        const deleteResults = await Promise.all(deletePromises);
        const successCount = deleteResults.filter((r) => r.success).length;

        result = {
          success: successCount === deleteResults.length,
          deletedCount: successCount,
          totalCount: deleteResults.length,
        };
      } else {
        result = listResult;
      }
    }

    return result;
  } catch (error) {
    console.error("Delete website files error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// CDN FUNCTIONS
// ========================================

export async function purgeCDNCache(urls, options = {}) {
  try {
    if (options.cdn === "cloudflare") {
      // Cloudflare cache purge
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${process.env.CLOUDFLARE_ZONE_ID}/purge_cache`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            files: urls,
          }),
        }
      );

      const result = await response.json();

      return {
        success: result.success,
        result: result,
      };
    } else if (options.cdn === "cloudinary") {
      // Cloudinary cache purge
      const results = await Promise.all(
        urls.map((url) => cloudinary.uploader.destroy(getPublicIdFromUrl(url)))
      );

      return {
        success: results.every((r) => r.result === "ok"),
        results: results,
      };
    }

    return {
      success: false,
      error: "Unsupported CDN provider",
    };
  } catch (error) {
    console.error("Purge CDN cache error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function getContentType(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();

  const contentTypes = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    ico: "image/x-icon",
    txt: "text/plain",
    xml: "application/xml",
    pdf: "application/pdf",
  };

  return contentTypes[ext] || "application/octet-stream";
}

function getCloudinaryResourceType(filePath) {
  const ext = filePath.split(".").pop().toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(ext)) {
    return "image";
  } else if (["mp4", "webm", "mov", "avi"].includes(ext)) {
    return "video";
  } else if (["pdf", "doc", "docx", "txt"].includes(ext)) {
    return "raw";
  }

  return "auto";
}

function generatePublicId(filePath) {
  return filePath
    .replace(/[^a-zA-Z0-9]/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_|_$/g, "");
}

function getPublicIdFromUrl(url) {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  return filename.split(".")[0];
}

// ========================================
// EXPORT ALL FUNCTIONS
// ========================================

export default {
  // S3 functions
  uploadToS3,
  deleteFromS3,
  listS3Objects,
  generateS3PresignedUrl,

  // Cloudinary functions
  uploadToCloudinary,
  deleteFromCloudinary,
  generateCloudinaryUrl,

  // Website deployment
  deployWebsiteFiles,
  deleteWebsiteFiles,

  // CDN functions
  purgeCDNCache,
};
