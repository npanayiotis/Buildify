/**
 * Vercel Integration for Domain Management
 * Simplified version using REST API
 */

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

// ========================================
// UTILITY FUNCTIONS
// ========================================

async function makeVercelRequest(endpoint, options = {}) {
  const url = `https://api.vercel.com${endpoint}`;

  const headers = {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (VERCEL_TEAM_ID) {
    headers["x-vercel-team-id"] = VERCEL_TEAM_ID;
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      `Vercel API error: ${response.status} ${response.statusText} - ${
        error.message || ""
      }`
    );
  }

  return response.json();
}

// ========================================
// PROJECT MANAGEMENT
// ========================================

export async function createVercelProject(websiteData) {
  try {
    const project = await makeVercelRequest("/v9/projects", {
      method: "POST",
      body: JSON.stringify({
        name: `elevare-${websiteData.id}`,
        framework: "static",
        publicSource: false,
      }),
    });

    return {
      success: true,
      projectId: project.id,
      projectUrl: project.url,
    };
  } catch (error) {
    console.error("Vercel project creation error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateVercelProject(projectId, websiteData) {
  try {
    const project = await makeVercelRequest(`/v9/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: `elevare-${websiteData.id}`,
        framework: "static",
      }),
    });

    return {
      success: true,
      project,
    };
  } catch (error) {
    console.error("Vercel project update error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// DOMAIN MANAGEMENT
// ========================================

export async function addVercelDomain(projectId, domain) {
  try {
    const domainConfig = await makeVercelRequest(
      `/v9/projects/${projectId}/domains`,
      {
        method: "POST",
        body: JSON.stringify({
          name: domain,
        }),
      }
    );

    return {
      success: true,
      domain: domainConfig.domain,
      status: domainConfig.status,
      dnsRecords: domainConfig.dnsRecords,
    };
  } catch (error) {
    console.error("Add Vercel domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function removeVercelDomain(projectId, domain) {
  try {
    await makeVercelRequest(`/v9/projects/${projectId}/domains/${domain}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    console.error("Remove Vercel domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getVercelDomainConfig(projectId, domain) {
  try {
    const domainConfig = await makeVercelRequest(
      `/v9/projects/${projectId}/domains/${domain}`
    );

    return {
      success: true,
      config: domainConfig,
    };
  } catch (error) {
    console.error("Get Vercel domain config error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function verifyVercelDomain(projectId, domain) {
  try {
    const verification = await makeVercelRequest(
      `/v9/projects/${projectId}/domains/${domain}/verify`,
      {
        method: "POST",
      }
    );

    return {
      success: true,
      verified: verification.verified,
      status: verification.status,
    };
  } catch (error) {
    console.error("Verify Vercel domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// DEPLOYMENT MANAGEMENT
// ========================================

export async function deployToVercel(projectId, files) {
  try {
    // Create deployment
    const deployment = await makeVercelRequest("/v13/deployments", {
      method: "POST",
      body: JSON.stringify({
        projectId,
        files,
        name: `elevare-${projectId}`,
        target: "production",
        version: 2,
      }),
    });

    // Wait for deployment to complete
    let deploymentStatus = "building";
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes max

    while (deploymentStatus === "building" && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds

      const status = await makeVercelRequest(
        `/v13/deployments/${deployment.id}`
      );
      deploymentStatus = status.readyState;
      attempts++;
    }

    return {
      success: deploymentStatus === "ready",
      deploymentId: deployment.id,
      url: deployment.url,
      status: deploymentStatus,
    };
  } catch (error) {
    console.error("Vercel deployment error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getVercelDeploymentStatus(projectId, deploymentId) {
  try {
    const deployment = await makeVercelRequest(
      `/v13/deployments/${deploymentId}`
    );

    return {
      success: true,
      status: deployment.readyState,
      url: deployment.url,
      createdAt: deployment.createdAt,
    };
  } catch (error) {
    console.error("Get deployment status error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ENVIRONMENT VARIABLES
// ========================================

export async function setVercelEnvVars(projectId, envVars) {
  try {
    const results = [];

    for (const [key, value] of Object.entries(envVars)) {
      const envVar = await makeVercelRequest(`/v9/projects/${projectId}/env`, {
        method: "POST",
        body: JSON.stringify({
          key,
          value,
          target: ["production", "preview"],
          type: "encrypted",
        }),
      });

      results.push(envVar);
    }

    return {
      success: true,
      envVars: results,
    };
  } catch (error) {
    console.error("Set Vercel env vars error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ANALYTICS
// ========================================

export async function getVercelAnalytics(projectId, domain) {
  try {
    const analytics = await makeVercelRequest(
      `/v1/analytics?projectId=${projectId}&since=${
        Date.now() - 30 * 24 * 60 * 60 * 1000
      }&until=${Date.now()}`
    );

    return {
      success: true,
      analytics,
    };
  } catch (error) {
    console.error("Get Vercel analytics error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

export function formatVercelError(error) {
  if (error.code === "DOMAIN_ALREADY_EXISTS") {
    return "This domain is already in use by another project.";
  }

  if (error.code === "DOMAIN_NOT_FOUND") {
    return "Domain not found. Please check your DNS configuration.";
  }

  if (error.code === "INVALID_DOMAIN") {
    return "Invalid domain format. Please check your domain name.";
  }

  if (error.code === "DNS_NOT_CONFIGURED") {
    return "DNS records are not properly configured. Please add the required DNS records.";
  }

  return error.message || "An unexpected error occurred.";
}

export async function getVercelProjectInfo(projectId) {
  try {
    const project = await makeVercelRequest(`/v9/projects/${projectId}`);

    return {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        url: project.url,
        domains: project.domains,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    };
  } catch (error) {
    console.error("Get Vercel project info error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
