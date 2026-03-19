import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import RoadmapForm from "./RoadmapForm";

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  stage: string;
}

const RoadmapManagement: React.FC = () => {

  const [items, setItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null);

  const token = localStorage.getItem("adminToken");

  const fetchRoadmap = async () => {

    try {

      const res = await fetch("http://localhost:5000/api/roadmap");

      const data = await res.json();

      setItems(Array.isArray(data) ? data : []);

    } catch (error) {

      console.error("Error fetching roadmap:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this roadmap item?")) return;

    await fetch(`http://localhost:5000/api/roadmap/${id}`, {
      method: "DELETE",
        headers: {
        Authorization: `Bearer ${token}`
      }

    });

    fetchRoadmap();
  };

  const openAddForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const openEditForm = (item: RoadmapItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleSubmit = async (data: any) => {

    if (editingItem) {

      await fetch(`http://localhost:5000/api/roadmap/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data),
      });

    } else {

      await fetch("http://localhost:5000/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
         },
        body: JSON.stringify(data),
      });

    }

    closeForm();
    fetchRoadmap();
  };

  if (loading) {
    return <p className="p-8">Loading roadmap...</p>;
  }

  return (
    <div className="p-8 w-full">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-aqua-deep mb-2">
            Roadmap Management
          </h1>
          <p className="text-gray-600">
            Manage the project roadmap
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-aqua-mid text-white px-6 py-3 rounded-xl"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>

      </div>

      <div className="grid gap-6">

        {items.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 border"
          >

            <div className="flex justify-between items-start mb-4">

              <div>

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="text-sm text-gray-500">{item.stage}</p>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => openEditForm(item)}
                  className="p-2 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>

              </div>

            </div>

            <p className="text-gray-600">{item.description}</p>

          </div>

        ))}

      </div>

      {showForm && (

        <RoadmapForm
          initialData={editingItem}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          isEditing={!!editingItem}
        />

      )}

    </div>
  );
};

export default RoadmapManagement;