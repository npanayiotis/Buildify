import React from "react";
import Head from "next/head";
import BuildifyLogo, {
  BuildifyLogo2D,
  BuildifyLogoWithText,
} from "../components/Logo/BuildifyLogo";

const LogoDemo = () => {
  return (
    <>
      <Head>
        <title>Buildify Logo Demo</title>
        <meta name="description" content="3D Three.js Logo for Buildify CRM" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Buildify Logo Showcase
            </h1>
            <p className="text-xl text-gray-600">
              Beautiful 3D Three.js logos for your CRM application
            </p>
          </div>

          {/* 3D Logo Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Small 3D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo size="small" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Medium 3D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo size="medium" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Large 3D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo size="large" />
              </div>
            </div>
          </div>

          {/* 2D Logo Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Small 2D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo2D size="small" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Medium 2D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo2D size="medium" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Large 2D Logo</h3>
              <div className="flex justify-center">
                <BuildifyLogo2D size="large" />
              </div>
            </div>
          </div>

          {/* Logo with Text Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Small with Text</h3>
              <div className="flex justify-center">
                <BuildifyLogoWithText size="small" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Medium with Text</h3>
              <div className="flex justify-center">
                <BuildifyLogoWithText size="medium" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h3 className="text-lg font-semibold mb-4">Large with Text</h3>
              <div className="flex justify-center">
                <BuildifyLogoWithText size="large" />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Usage Examples</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Navigation Header
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <BuildifyLogo2D size="small" />
                    <span className="text-xl font-bold text-gray-900">
                      Buildify
                    </span>
                    <nav className="ml-auto space-x-4">
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        Dashboard
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        Templates
                      </a>
                      <a href="#" className="text-gray-600 hover:text-blue-600">
                        Settings
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Hero Section</h3>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg text-white">
                  <div className="flex items-center justify-center space-x-6">
                    <BuildifyLogo size="large" showText={false} />
                    <div>
                      <h1 className="text-4xl font-bold mb-2">Buildify</h1>
                      <p className="text-xl opacity-90">
                        Build amazing websites with ease
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Footer</h3>
                <div className="bg-gray-900 p-6 rounded-lg text-white">
                  <div className="flex items-center space-x-3">
                    <BuildifyLogo2D size="small" />
                    <span className="text-sm text-gray-300">
                      © 2024 Buildify. All rights reserved.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-gray-900 rounded-xl p-8 text-white mt-8">
            <h2 className="text-2xl font-bold mb-6">Code Examples</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">3D Animated Logo</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`import BuildifyLogo from '../components/Logo/BuildifyLogo';

// Basic usage
<BuildifyLogo size="medium" />

// With custom props
<BuildifyLogo 
  size="large" 
  showText={true} 
  animated={true} 
  className="my-custom-class" 
/>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2D Logo</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`import { BuildifyLogo2D } from '../components/Logo/BuildifyLogo';

// Simple 2D logo
<BuildifyLogo2D size="medium" />

// In navigation
<div className="flex items-center space-x-2">
  <BuildifyLogo2D size="small" />
  <span>Buildify</span>
</div>`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Logo with Text</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`import { BuildifyLogoWithText } from '../components/Logo/BuildifyLogo';

// Logo with integrated text
<BuildifyLogoWithText 
  size="large" 
  textColor="text-white"
  showLogo={true} 
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoDemo;
