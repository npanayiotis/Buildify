import { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function PortfolioProjectsAdmin() {
  const [projects, setProjects] = useState([
    {
      id: "1",
      title: "Eco-Friendly Brand Identity",
      category: "Brand Identity",
      client: "Green Earth Co.",
      status: "completed",
      startDate: "2023-11-01",
      completionDate: "2023-12-15",
      budget: "$3,500",
      tags: ["Logo Design", "Brand Guidelines"],
      featured: true,
    },
    {
      id: "2",
      title: "Modern E-commerce Platform",
      category: "Web Design",
      client: "Fashion Retailer",
      status: "in-progress",
      startDate: "2024-01-05",
      completionDate: null,
      budget: "$5,000",
      tags: ["UI/UX", "E-commerce"],
      featured: true,
    },
    {
      id: "3",
      title: "Art Exhibition Poster Series",
      category: "Print Design",
      client: "City Art Gallery",
      status: "completed",
      startDate: "2023-10-10",
      completionDate: "2023-11-05",
      budget: "$1,200",
      tags: ["Poster Design", "Typography"],
      featured: false,
    },
  ]);

  const [filter, setFilter] = useState({ status: "all", category: "all" });
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      "in-progress": "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      "on-hold": "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors["in-progress"];
  };

  const filteredProjects = projects.filter((project) => {
    if (filter.status !== "all" && project.status !== filter.status)
      return false;
    if (filter.category !== "all" && project.category !== filter.category)
      return false;
    return true;
  });

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === "in-progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    featured: projects.filter((p) => p.featured).length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Portfolio Projects
            </h1>
            <p className="text-gray-600">
              Manage your creative projects and portfolio
            </p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + New Project
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Projects</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.inProgress}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">
              {stats.featured}
            </div>
            <div className="text-sm text-gray-600">Featured</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filter.category}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                <option value="Brand Identity">Brand Identity</option>
                <option value="Web Design">Web Design</option>
                <option value="Print Design">Print Design</option>
                <option value="Illustration">Illustration</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilter({ status: "all", category: "all" })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="text-yellow-500">⭐</span>
                        )}
                        <div>
                          <div className="font-bold text-gray-900">
                            {project.title}
                          </div>
                          <div className="flex gap-2 mt-1">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.client}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-600">
                          Start:{" "}
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                        {project.completionDate && (
                          <div className="text-gray-600">
                            End:{" "}
                            {new Date(
                              project.completionDate
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
