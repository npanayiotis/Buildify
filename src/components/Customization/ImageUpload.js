import React from "react";

const ImageUpload = ({ label, value, onChange, aspectRatio = "16:9" }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        {value ? (
          <div className="space-y-3">
            <img
              src={value}
              alt="Uploaded"
              className="mx-auto max-h-32 rounded-lg"
            />
            <button
              onClick={() => onChange("")}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-4xl text-gray-400">📷</div>
            <div>
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Choose File
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
