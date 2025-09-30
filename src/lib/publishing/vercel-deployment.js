/**
 * Vercel Deployment Integration
 * Handles deployment of static sites to Vercel
 */

import { createReadStream, readFileSync } from "fs";
import FormData from "form-data";

// ========================================
// VERCEL API CONFIGURATION
// ========================================

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

// ========================================
// UTILITY FUNCTIONS
// ========================================

async function makeVercelRequest(endpoint, options = {}) {
  const url = `https://api.vercel.com${endpoint}`;

  const headers = {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
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
    const error = await response.json();
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

export async function createVercelProject(projectName, options = {}) {
  try {
    const project = await makeVercelRequest("/v9/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: projectName,
        framework: options.framework || "static",
        gitRepository: options.gitRepository || null,
        rootDirectory: options.rootDirectory || null,
        installCommand: options.installCommand || null,
        buildCommand: options.buildCommand || null,
        outputDirectory: options.outputDirectory || null,
        publicSource: options.publicSource || false,
        serverlessFunctionRegion: options.serverlessFunctionRegion || "iad1",
        ...options,
      }),
    });

    return {
      success: true,
      project: project,
    };
  } catch (error) {
    console.error("Create Vercel project error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getVercelProject(projectId) {
  try {
    const project = await makeVercelRequest(`/v9/projects/${projectId}`);

    return {
      success: true,
      project: project,
    };
  } catch (error) {
    console.error("Get Vercel project error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function updateVercelProject(projectId, updates) {
  try {
    const project = await makeVercelRequest(`/v9/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    return {
      success: true,
      project: project,
    };
  } catch (error) {
    console.error("Update Vercel project error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function deleteVercelProject(projectId) {
  try {
    await makeVercelRequest(`/v9/projects/${projectId}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    console.error("Delete Vercel project error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// DEPLOYMENT MANAGEMENT
// ========================================

export async function deployToVercel(projectId, files, options = {}) {
  try {
    // Create deployment
    const deployment = await makeVercelRequest(`/v13/deployments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: options.name || `elevare-${projectId}`,
        project: projectId,
        target: options.target || "production",
        version: 2,
        files: files,
        ...options,
      }),
    });

    // Wait for deployment to complete
    const deploymentStatus = await waitForDeployment(deployment.id, projectId);

    return {
      success: deploymentStatus.success,
      deployment: deployment,
      url: deployment.url,
      status: deploymentStatus.status,
    };
  } catch (error) {
    console.error("Deploy to Vercel error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getDeploymentStatus(deploymentId, projectId) {
  try {
    const deployment = await makeVercelRequest(
      `/v13/deployments/${deploymentId}`
    );

    return {
      success: true,
      deployment: deployment,
    };
  } catch (error) {
    console.error("Get deployment status error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function waitForDeployment(
  deploymentId,
  projectId,
  maxWaitTime = 300000
) {
  const startTime = Date.now();
  const pollInterval = 5000; // 5 seconds

  while (Date.now() - startTime < maxWaitTime) {
    const status = await getDeploymentStatus(deploymentId, projectId);

    if (status.success) {
      const deployment = status.deployment;

      if (deployment.readyState === "READY") {
        return {
          success: true,
          status: "READY",
          deployment: deployment,
        };
      } else if (deployment.readyState === "ERROR") {
        return {
          success: false,
          status: "ERROR",
          error: deployment.error || "Deployment failed",
        };
      }
    }

    // Wait before next poll
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  return {
    success: false,
    status: "TIMEOUT",
    error: "Deployment timeout",
  };
}

// ========================================
// DOMAIN MANAGEMENT
// ========================================

export async function addDomain(projectId, domain) {
  try {
    const domainConfig = await makeVercelRequest(
      `/v9/projects/${projectId}/domains`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
        }),
      }
    );

    return {
      success: true,
      domain: domainConfig,
    };
  } catch (error) {
    console.error("Add domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function removeDomain(projectId, domain) {
  try {
    await makeVercelRequest(`/v9/projects/${projectId}/domains/${domain}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    console.error("Remove domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getDomainConfig(projectId, domain) {
  try {
    const domainConfig = await makeVercelRequest(
      `/v9/projects/${projectId}/domains/${domain}`
    );

    return {
      success: true,
      config: domainConfig,
    };
  } catch (error) {
    console.error("Get domain config error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function verifyDomain(projectId, domain) {
  try {
    const verification = await makeVercelRequest(
      `/v9/projects/${projectId}/domains/${domain}/verify`,
      {
        method: "POST",
      }
    );

    return {
      success: true,
      verification: verification,
    };
  } catch (error) {
    console.error("Verify domain error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ENVIRONMENT VARIABLES
// ========================================

export async function setEnvironmentVariables(
  projectId,
  envVars,
  target = ["production"]
) {
  try {
    const results = [];

    for (const [key, value] of Object.entries(envVars)) {
      const envVar = await makeVercelRequest(`/v9/projects/${projectId}/env`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          value,
          target,
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
    console.error("Set environment variables error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getEnvironmentVariables(projectId) {
  try {
    const envVars = await makeVercelRequest(`/v9/projects/${projectId}/env`);

    return {
      success: true,
      envVars: envVars,
    };
  } catch (error) {
    console.error("Get environment variables error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ANALYTICS
// ========================================

export async function getAnalytics(projectId, since, until) {
  try {
    const analytics = await makeVercelRequest(
      `/v1/analytics?projectId=${projectId}&since=${since}&until=${until}`
    );

    return {
      success: true,
      analytics: analytics,
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
// WEBHOOKS
// ========================================

export async function createWebhook(
  projectId,
  webhookUrl,
  events = ["deployment.created", "deployment.ready"]
) {
  try {
    const webhook = await makeVercelRequest(`/v1/integrations/webhooks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        url: webhookUrl,
        events,
      }),
    });

    return {
      success: true,
      webhook: webhook,
    };
  } catch (error) {
    console.error("Create webhook error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// ERROR HANDLING
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

  if (error.code === "PROJECT_NOT_FOUND") {
    return "Project not found. Please check your project ID.";
  }

  if (error.code === "INVALID_TOKEN") {
    return "Invalid Vercel token. Please check your API credentials.";
  }

  return error.message || "An unexpected error occurred with Vercel.";
}

// ========================================
// EXPORT ALL FUNCTIONS
// ========================================

export default {
  createVercelProject,
  getVercelProject,
  updateVercelProject,
  deleteVercelProject,
  deployToVercel,
  getDeploymentStatus,
  waitForDeployment,
  addDomain,
  removeDomain,
  getDomainConfig,
  verifyDomain,
  setEnvironmentVariables,
  getEnvironmentVariables,
  getAnalytics,
  createWebhook,
  formatVercelError,
};
