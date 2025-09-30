/**
 * Cloudflare Integration for Domain Management
 */

// ========================================
// CLOUDFLARE API CONFIGURATION
// ========================================

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID;
const CLOUDFLARE_EMAIL = process.env.CLOUDFLARE_EMAIL;

// ========================================
// UTILITY FUNCTIONS
// ========================================

async function makeCloudflareRequest(endpoint, options = {}) {
  const url = `https://api.cloudflare.com/client/v4${endpoint}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(
      `Cloudflare API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// ========================================
// DNS MANAGEMENT
// ========================================

export async function createDNSRecord(domain, type, content, ttl = 1) {
  try {
    const record = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/dns_records`,
      {
        method: "POST",
        body: JSON.stringify({
          type,
          name: domain,
          content,
          ttl,
        }),
      }
    );

    return {
      success: true,
      record: record.result,
    };
  } catch (error) {
    console.error("Create DNS record error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateDNSRecord(
  recordId,
  domain,
  type,
  content,
  ttl = 1
) {
  try {
    const record = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          type,
          name: domain,
          content,
          ttl,
        }),
      }
    );

    return {
      success: true,
      record: record.result,
    };
  } catch (error) {
    console.error("Update DNS record error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteDNSRecord(recordId) {
  try {
    await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/dns_records/${recordId}`,
      {
        method: "DELETE",
      }
    );

    return { success: true };
  } catch (error) {
    console.error("Delete DNS record error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function listDNSRecords(domain) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/dns_records?name=${domain}`
    );

    return {
      success: true,
      records: response.result,
    };
  } catch (error) {
    console.error("List DNS records error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// SSL CERTIFICATES
// ========================================

export async function enableSSL(domain) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/ssl/universal/settings`,
      {
        method: "PATCH",
        body: JSON.stringify({
          enabled: true,
        }),
      }
    );

    return {
      success: true,
      settings: response.result,
    };
  } catch (error) {
    console.error("Enable SSL error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getSSLStatus(domain) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/ssl/universal/settings`
    );

    return {
      success: true,
      sslStatus: response.result,
    };
  } catch (error) {
    console.error("Get SSL status error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// PAGE RULES
// ========================================

export async function createPageRule(domain, targets, actions, priority = 1) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/pagerules`,
      {
        method: "POST",
        body: JSON.stringify({
          targets,
          actions,
          priority,
          status: "active",
        }),
      }
    );

    return {
      success: true,
      pageRule: response.result,
    };
  } catch (error) {
    console.error("Create page rule error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ANALYTICS
// ========================================

export async function getAnalytics(domain, since, until) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/analytics/dashboard?since=${since}&until=${until}`
    );

    return {
      success: true,
      analytics: response.result,
    };
  } catch (error) {
    console.error("Get analytics error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// DOMAIN VALIDATION
// ========================================

export async function validateDomain(domain) {
  try {
    // Check if domain exists in Cloudflare
    const records = await listDNSRecords(domain);

    if (!records.success) {
      return {
        success: false,
        error: "Domain validation failed",
      };
    }

    // Check for required DNS records
    const hasA = records.records.some((record) => record.type === "A");
    const hasCNAME = records.records.some((record) => record.type === "CNAME");

    return {
      success: true,
      isValid: hasA || hasCNAME,
      records: records.records,
    };
  } catch (error) {
    console.error("Validate domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// CACHE MANAGEMENT
// ========================================

export async function purgeCache(domain, files = []) {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
      {
        method: "POST",
        body: JSON.stringify({
          files,
        }),
      }
    );

    return {
      success: true,
      result: response.result,
    };
  } catch (error) {
    console.error("Purge cache error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function purgeAllCache() {
  try {
    const response = await makeCloudflareRequest(
      `/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
      {
        method: "POST",
        body: JSON.stringify({
          purge_everything: true,
        }),
      }
    );

    return {
      success: true,
      result: response.result,
    };
  } catch (error) {
    console.error("Purge all cache error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ERROR HANDLING
// ========================================

export function formatCloudflareError(error) {
  if (error.code === 1009) {
    return "Domain not found in Cloudflare zone.";
  }

  if (error.code === 1004) {
    return "Invalid domain format.";
  }

  if (error.code === 1001) {
    return "Invalid API token or insufficient permissions.";
  }

  return error.message || "An unexpected error occurred with Cloudflare.";
}

// ========================================
// EXPORT ALL FUNCTIONS
// ========================================

export default {
  createDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
  listDNSRecords,
  enableSSL,
  getSSLStatus,
  createPageRule,
  getAnalytics,
  validateDomain,
  purgeCache,
  purgeAllCache,
  formatCloudflareError,
};
