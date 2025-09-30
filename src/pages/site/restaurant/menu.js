import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function RestaurantMenuPage() {
  const restaurantData = WEBSITES.find(
    (w) => w.id === "elegant-restaurant-website"
  );
  const { menu, navigation } = restaurantData.fullWebsite;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const currentCategory = selectedCategory || menu.categories[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-gray-900">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/restaurant${
                    link.href === "/" ? "/menu" : link.href
                  }`}
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-amber-600 to-red-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-amber-100 max-w-2xl mx-auto">
              Exquisite dishes crafted with passion and the finest ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {menu.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-semibold transition ${
                  currentCategory.name === category.name
                    ? "bg-red-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentCategory.name}
            </h2>
            <p className="text-xl text-gray-600">
              {currentCategory.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentCategory.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="grid grid-cols-3">
                  {/* Image */}
                  <div className="relative h-48">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.popular && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="col-span-2 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="text-lg font-bold text-red-600">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Dine With Us?</h2>
          <p className="text-xl mb-8 text-red-100">
            Book your table now for an unforgettable culinary experience
          </p>
          <Link
            href="/site/restaurant/reservations"
            className="inline-block bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Make a Reservation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            {restaurantData.fullWebsite.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
