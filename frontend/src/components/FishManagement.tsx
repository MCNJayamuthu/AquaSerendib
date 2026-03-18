import React, { useEffect, useState } from "react";
import { Plus, CreditCard as Edit, Trash2, MapPin, AlertCircle } from "lucide-react";
import FishForm from "./FishForm";

interface Fish {
  id: string;
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
  onOpenAddForm: () => void;
  onOpenEditForm: (fish: Fish) => void;
}

const FishManagement: React.FC<Props> = ({ onOpenAddForm, onOpenEditForm }) => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFish = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/fish");
      const data = await res.json();
      setFish(data);
    } catch (error) {
      console.error("Error fetching fish:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFish();
  }, []);

  const handleAddOrUpdateFish = async (formData: any) => {
  const token = localStorage.getItem("adminToken");
    try {
      if (editingFish) {
        await fetch(`http://localhost:5000/api/fish/${editingFish.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch("http://localhost:5000/api/fish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
      }

      setShowForm(false);
      setEditingFish(null);
      fetchFish();
    } catch (error) {
      console.error("Error saving fish:", error);
    }
  };

  const handleDelete = async (id: string) => {

    const token = localStorage.getItem("adminToken");

    if (!confirm("Are you sure you want to delete this fish?")) return;

    try {
      await fetch(`http://localhost:5000/api/fish/${id}`, {
        method: "DELETE",
        headers: {
        "Authorization": `Bearer ${token}`
        }
      });
      fetchFish();
    } catch (error) {
      console.error("Error deleting fish:", error);
    }
  };

  const handleEdit = (fish: Fish) => {
    setEditingFish(fish);
    setShowForm(true);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Critically Endangered":
        return "bg-red-100 text-red-800 border-red-200";
      case "Endangered":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Vulnerable":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Near Threatened":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aqua-mid"></div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-aqua-deep mb-2">
            Fish Management
          </h1>
          <p className="text-gray-600">
            Manage your fish species database
          </p>
        </div>
        <button
          onClick={() => {
            setEditingFish(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-aqua-mid to-aqua-deep text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add New Fish
        </button>
      </div>

      {fish.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Fish Species Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start building your fish database by adding your first species
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-aqua-mid text-white px-6 py-3 rounded-xl font-semibold hover:bg-aqua-deep transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add First Fish
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {fish.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-aqua-pale to-aqua-light flex items-center justify-center overflow-hidden">
                  {f.image_url ? (
                    <img
                      src={f.image_url}
                      alt={f.english_name}
                      className="w-full h-full object-fit-cover"
                    />
                  ) : (
                    <AlertCircle className="w-16 h-16 text-aqua-mid/30" />
                  )}
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {f.english_name}
                      </h3>
                      <p className="text-gray-500 italic text-sm">
                        {f.scientific_name}
                      </p>
                      {f.sinhala_name && (
                        <p className="text-gray-600 text-sm mt-1">
                          {f.sinhala_name}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingFish(f);
                          setShowForm(true);
                        }}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {f.conservation_status && (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          f.conservation_status
                        )}`}
                      >
                        {f.conservation_status}
                      </span>
                    )}
                    <span className="flex items-center gap-1 px-3 py-1 bg-aqua-pale text-aqua-deeper rounded-full text-xs font-medium">
                      <MapPin className="w-3 h-3" />
                      {f.location}
                    </span>
                    {f.habitat && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {f.habitat}
                      </span>
                    )}
                  </div>

                  {f.description && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {f.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (

        <FishForm
          initialData={
            editingFish
              ? {
                  english_name: editingFish.english_name,
                  scientific_name: editingFish.scientific_name,
                  sinhala_name: editingFish.sinhala_name || "",
                  habitat: editingFish.habitat || "",
                  location: editingFish.location,
                  description: editingFish.description,
                  image_url: editingFish.image_url,
                  conservation_status: editingFish.conservation_status || ""
                }
              : undefined
          }

          onSubmit={handleAddOrUpdateFish}

          onCancel={() => {
            setShowForm(false);
            setEditingFish(null);
          }}

          isEditing={!!editingFish}
        />

      )}

    </div>
  );
};

export default FishManagement;
