import React, { useEffect,useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import FishForm from "../components/FishForm";
import { Outlet,useNavigate } from "react-router-dom";


interface Fish {
  id: string;
  english_name: string;
  scientific_name: string;
  sinhala_name?: string;
  habitat?: string;
  location: string;
  description: string;
  image_url: string;
  conservation_status?: string;
}

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


const AdminDashboard: React.FC = () => {

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {

    localStorage.removeItem("adminToken");

    // Clear browser history stack
    window.history.pushState(null, "", "/");

    navigate("/", { replace: true });

  };

  const openAddForm = () => {
    setEditingFish(null);
    setShowForm(true);
  };

  const openEditForm = (fish: Fish) => {
    setEditingFish(fish);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingFish(null);
  };

  const handleSubmit = async (formData: FormData) => {

    const token = localStorage.getItem("adminToken");

    if (editingFish) {

      await fetch(`http://localhost:5000/api/fish/${editingFish.id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

    } else {

      await fetch("http://localhost:5000/api/fish",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

    }

    setShowForm(false);
    setEditingFish(null);

    // refresh FishManagement
    setRefreshKey(prev => prev + 1);
  };

  return (

    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <AdminSidebar onLogout={handleLogout}/>

      <div className="flex-1 overflow-y-auto">

        <Outlet />

      </div>

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
                  conservation_status: editingFish.conservation_status
                }
              : {
                  english_name: "",
                  scientific_name: "",
                  sinhala_name: "",
                  habitat: "",
                  location: "",
                  description: "",
                  image_url: "",
                  conservation_status: ""
                }
          }

          onSubmit={handleSubmit}
          onCancel={closeForm}
          isEditing={!!editingFish}
        />

      )}

    </div>
  );
};

export default AdminDashboard;
