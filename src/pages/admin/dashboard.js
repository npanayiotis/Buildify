import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blog: { posts: 0, comments: 0, subscribers: 0 },
    restaurant: { reservations: 0, reviews: 0, menuItems: 0 },
    gym: { members: 0, programs: 0, trainers: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch from your APIs
      // For now, we'll use mock data
      setStats({
        blog: { posts: 25, comments: 156, subscribers: 1250 },
        restaurant: { reservations: 89, reviews: 23, menuItems: 45 },
        gym: { members: 234, programs: 12, trainers: 8 },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, link }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`text-4xl ${color}`}>{icon}</div>
      </div>
      {link && (
        <Link
          href={link}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
        >
          View Details →
        </Link>
      )}
    </div>
  );

  const QuickAction = ({ title, description, icon, color, link }) => (
    <Link
      href={link}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center">
        <div className={`text-3xl ${color} mr-4`}>{icon}</div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <Head>
        <title>Admin Dashboard - Website Management</title>
        <meta
          name="description"
          content="Manage your websites, content, and analytics from one central dashboard."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  View Website
                </Link>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "overview", name: "Overview", icon: "📊" },
                { id: "blog", name: "Blog", icon: "📝" },
                { id: "restaurant", name: "Restaurant", icon: "🍽️" },
                { id: "gym", name: "Gym", icon: "💪" },
                { id: "analytics", name: "Analytics", icon: "📈" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stats Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Website Statistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    title="Blog Posts"
                    value={stats.blog.posts}
                    icon="📝"
                    color="text-blue-500"
                    link="/admin/blog"
                  />
                  <StatCard
                    title="Newsletter Subscribers"
                    value={stats.blog.subscribers}
                    icon="📧"
                    color="text-green-500"
                    link="/admin/blog"
                  />
                  <StatCard
                    title="Restaurant Reservations"
                    value={stats.restaurant.reservations}
                    icon="🍽️"
                    color="text-orange-500"
                    link="/admin/restaurant"
                  />
                  <StatCard
                    title="Gym Members"
                    value={stats.gym.members}
                    icon="💪"
                    color="text-purple-500"
                    link="/admin/gym"
                  />
                  <StatCard
                    title="Menu Items"
                    value={stats.restaurant.menuItems}
                    icon="🍴"
                    color="text-red-500"
                    link="/admin/restaurant"
                  />
                  <StatCard
                    title="Fitness Programs"
                    value={stats.gym.programs}
                    icon="🏃‍♀️"
                    color="text-indigo-500"
                    link="/admin/gym"
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <QuickAction
                    title="Create Blog Post"
                    description="Write and publish a new blog post"
                    icon="✍️"
                    color="text-blue-500"
                    link="/admin/blog/new"
                  />
                  <QuickAction
                    title="Add Menu Item"
                    description="Add a new item to the restaurant menu"
                    icon="🍽️"
                    color="text-orange-500"
                    link="/admin/restaurant/menu/new"
                  />
                  <QuickAction
                    title="Create Program"
                    description="Add a new fitness program"
                    icon="💪"
                    color="text-purple-500"
                    link="/admin/gym/programs/new"
                  />
                  <QuickAction
                    title="View Reservations"
                    description="Manage restaurant reservations"
                    icon="📅"
                    color="text-green-500"
                    link="/admin/restaurant/reservations"
                  />
                  <QuickAction
                    title="Manage Members"
                    description="View and manage gym members"
                    icon="👥"
                    color="text-indigo-500"
                    link="/admin/gym/members"
                  />
                  <QuickAction
                    title="Analytics"
                    description="View website analytics and reports"
                    icon="📊"
                    color="text-gray-500"
                    link="/admin/analytics"
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="space-y-4">
                    {[
                      {
                        type: "blog",
                        action: "New blog post published",
                        time: "2 hours ago",
                        icon: "📝",
                      },
                      {
                        type: "restaurant",
                        action: "New reservation received",
                        time: "3 hours ago",
                        icon: "🍽️",
                      },
                      {
                        type: "gym",
                        action: "New member registered",
                        time: "5 hours ago",
                        icon: "💪",
                      },
                      {
                        type: "blog",
                        action: "Comment received on blog post",
                        time: "1 day ago",
                        icon: "💬",
                      },
                      {
                        type: "restaurant",
                        action: "Menu item updated",
                        time: "2 days ago",
                        icon: "🍴",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Blog Management
                </h2>
                <Link
                  href="/admin/blog/new"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  New Post
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Total Posts"
                  value={stats.blog.posts}
                  icon="📝"
                  color="text-blue-500"
                />
                <StatCard
                  title="Comments"
                  value={stats.blog.comments}
                  icon="💬"
                  color="text-green-500"
                />
                <StatCard
                  title="Subscribers"
                  value={stats.blog.subscribers}
                  icon="📧"
                  color="text-purple-500"
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "The Art of Slow Living",
                      status: "Published",
                      views: 1250,
                      comments: 23,
                    },
                    {
                      title: "Lessons from a Year of Travel",
                      status: "Published",
                      views: 2100,
                      comments: 45,
                    },
                    {
                      title: "Building Better Habits",
                      status: "Draft",
                      views: 0,
                      comments: 0,
                    },
                  ].map((post, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              post.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span>{post.views} views</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "restaurant" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Restaurant Management
                </h2>
                <Link
                  href="/admin/restaurant/menu/new"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  Add Menu Item
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Reservations"
                  value={stats.restaurant.reservations}
                  icon="🍽️"
                  color="text-orange-500"
                />
                <StatCard
                  title="Menu Items"
                  value={stats.restaurant.menuItems}
                  icon="🍴"
                  color="text-red-500"
                />
                <StatCard
                  title="Reviews"
                  value={stats.restaurant.reviews}
                  icon="⭐"
                  color="text-yellow-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Reservations
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "John Smith",
                        date: "Today, 7:00 PM",
                        party: 4,
                        status: "Confirmed",
                      },
                      {
                        name: "Sarah Johnson",
                        date: "Tomorrow, 8:30 PM",
                        party: 2,
                        status: "Pending",
                      },
                      {
                        name: "Mike Davis",
                        date: "Friday, 6:00 PM",
                        party: 6,
                        status: "Confirmed",
                      },
                    ].map((reservation, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {reservation.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {reservation.date} • Party of {reservation.party}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            reservation.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Popular Menu Items
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: "Truffle Risotto", orders: 45, price: "$28" },
                      {
                        name: "Wagyu Beef Tenderloin",
                        orders: 32,
                        price: "$45",
                      },
                      { name: "Lobster Bisque", orders: 28, price: "$18" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.orders} orders this week
                          </p>
                        </div>
                        <span className="font-medium text-gray-900">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "gym" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Gym Management
                </h2>
                <Link
                  href="/admin/gym/programs/new"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Add Program
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                  title="Members"
                  value={stats.gym.members}
                  icon="👥"
                  color="text-purple-500"
                />
                <StatCard
                  title="Programs"
                  value={stats.gym.programs}
                  icon="🏃‍♀️"
                  color="text-green-500"
                />
                <StatCard
                  title="Trainers"
                  value={stats.gym.trainers}
                  icon="👨‍🏫"
                  color="text-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Recent Members
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Jessica Martinez",
                        plan: "Premium",
                        joinDate: "2 days ago",
                      },
                      {
                        name: "David Thompson",
                        plan: "Basic",
                        joinDate: "1 week ago",
                      },
                      {
                        name: "Lisa Park",
                        plan: "Elite",
                        joinDate: "2 weeks ago",
                      },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {member.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {member.plan} Plan • Joined {member.joinDate}
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Popular Programs
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Personal Training",
                        bookings: 45,
                        price: "$80/session",
                      },
                      {
                        name: "Group Classes",
                        bookings: 32,
                        price: "$25/class",
                      },
                      {
                        name: "Nutrition Coaching",
                        bookings: 28,
                        price: "$60/session",
                      },
                    ].map((program, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {program.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {program.bookings} bookings this month
                          </p>
                        </div>
                        <span className="font-medium text-gray-900">
                          {program.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Analytics & Reports
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Visitors"
                  value="12,450"
                  icon="👥"
                  color="text-blue-500"
                />
                <StatCard
                  title="Page Views"
                  value="45,230"
                  icon="👁️"
                  color="text-green-500"
                />
                <StatCard
                  title="Conversion Rate"
                  value="3.2%"
                  icon="📈"
                  color="text-purple-500"
                />
                <StatCard
                  title="Bounce Rate"
                  value="42%"
                  icon="📉"
                  color="text-red-500"
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Website Performance
                </h3>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-600">
                    Analytics dashboard coming soon...
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
