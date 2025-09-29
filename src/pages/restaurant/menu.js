import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    popular: false,
    available: true,
  });

  useEffect(() => {
    fetchMenuItems();
  }, [filters]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        tenantId: "default-tenant",
        ...(filters.category && { category: filters.category }),
        ...(filters.popular && { popular: "true" }),
        ...(filters.available && { available: "true" }),
      });

      const response = await fetch(`/api/restaurant/menu?${params}`);
      const data = await response.json();

      if (response.ok) {
        setMenuItems(data);
      } else {
        console.error("Error fetching menu items:", data.error);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Appetizer", "Main Course", "Dessert", "Beverage"];
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Menu - Fine Dining Experience</title>
        <meta
          name="description"
          content="Explore our exquisite menu featuring carefully crafted dishes with the finest ingredients."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Elegant Restaurant
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/menu" className="text-gray-900 font-medium">
                  Menu
                </Link>
                <Link
                  href="/reservations"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Reservations
                </Link>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-gray-900"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Menu</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Carefully crafted dishes with the finest ingredients
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: category === "All" ? "" : category,
                    }))
                  }
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === (category === "All" ? "" : category)
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() =>
                  setFilters((prev) => ({ ...prev, popular: !prev.popular }))
                }
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filters.popular
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ⭐ Popular
              </button>
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="space-y-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 bg-gray-300 rounded w-48 mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="h-48 bg-gray-300"></div>
                        <div className="p-6">
                          <div className="h-4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : Object.keys(groupedItems).length > 0 ? (
            <div className="space-y-16">
              {Object.entries(groupedItems).map(([category, items]) => (
                <section key={category} className="space-y-8">
                  <h2 className="text-3xl font-bold text-gray-900 text-center">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {item.imageUrl && (
                          <div className="relative h-48">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {item.isPopular && (
                              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                Popular
                              </div>
                            )}
                            {!item.isAvailable && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <span className="text-white font-medium">
                                  Currently Unavailable
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="text-2xl font-bold text-amber-600">
                              ${item.price}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {item.description}
                          </p>

                          {item.ingredients && item.ingredients.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Ingredients:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {item.ingredients.map((ingredient, index) => (
                                  <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {ingredient}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {item.allergens && item.allergens.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Allergens:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {item.allergens.map((allergen, index) => (
                                  <span
                                    key={index}
                                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs"
                                  >
                                    {allergen}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {item.isAvailable ? (
                                <span className="text-green-600 text-sm font-medium">
                                  ✓ Available
                                </span>
                              ) : (
                                <span className="text-red-600 text-sm font-medium">
                                  ✗ Unavailable
                                </span>
                              )}
                            </div>
                            <button
                              disabled={!item.isAvailable}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                item.isAvailable
                                  ? "bg-amber-600 text-white hover:bg-amber-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Add to Order
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No menu items found
              </h3>
              <p className="text-gray-600">
                {filters.category || filters.popular
                  ? "Try adjusting your filters"
                  : "No menu items are available at the moment"}
              </p>
            </div>
          )}
        </main>

        {/* Call to Action */}
        <section className="bg-amber-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience Our Cuisine?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Make a reservation and let us create an unforgettable dining
              experience for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reservations"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Make Reservation
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-amber-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
