import React, { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface FormData {
  english_name: string;
  scientific_name: string;
  sinhala_name: string;
  habitat: string;
  location: string;
  description: string;
  image_url: string;
  conservation_status: string;
}

interface Props {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const FishForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<FormData>({
    english_name: "",
    scientific_name: "",
    sinhala_name: "",
    habitat: "",
    location: "",
    description: "",
    image_url: "",
    conservation_status: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem("adminToken");
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/fish/upload-image", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataUpload,
      });

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        image_url: data.imageUrl,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-aqua-deep to-aqua-mid text-white p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Fish" : "Add New Fish"}
          </h2>
          <button
            onClick={onCancel}
            className="hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                English Name *
              </label>
              <input
                name="english_name"
                value={formData.english_name}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors"
                placeholder="e.g., Lionfish"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scientific Name *
              </label>
              <input
                name="scientific_name"
                value={formData.scientific_name}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors italic"
                placeholder="e.g., Pterois volitans"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sinhala Name
              </label>
              <input
                name="sinhala_name"
                value={formData.sinhala_name}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors"
                placeholder="සිංහල නම"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Habitat
              </label>
              <input
                name="habitat"
                value={formData.habitat}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors"
                placeholder="e.g., Coral reefs"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors"
                placeholder="e.g., Indo-Pacific"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Conservation Status *
              </label>
              <select
                name="conservation_status"
                value={formData.conservation_status}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors bg-white"
              >
                <option value="">Select Status</option>
                <option value="Near Threatened">Near Threatened</option>
                <option value="Vulnerable">Vulnerable</option>
                <option value="Endangered">Endangered</option>
                <option value="Critically Endangered">
                  Critically Endangered
                </option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-aqua-mid focus:outline-none transition-colors resize-none"
              placeholder="Detailed description of the fish species..."
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Fish Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-aqua-mid transition-colors">
              {formData.image_url ? (
                <div className="flex items-center gap-4">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-green-600 font-medium mb-2">
                      Image uploaded successfully
                    </p>
                    <label className="cursor-pointer inline-flex items-center gap-2 bg-aqua-mid text-white px-4 py-2 rounded-lg hover:bg-aqua-deep transition-colors">
                      <Upload className="w-4 h-4" />
                      Change Image
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-3">
                  {uploading ? (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-mid"></div>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload image
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-aqua-mid to-aqua-deep text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              {isEditing ? "Update Fish" : "Add Fish"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FishForm;
