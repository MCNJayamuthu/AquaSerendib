import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const RoadmapForm: React.FC<Props> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stage: "Planned"
  });

  useEffect(() => {

    if (initialData) {

      setFormData({
        title: initialData.title,
        description: initialData.description,
        stage: initialData.stage
      });

    }

  }, [initialData]);

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e: any) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-white rounded-2xl w-full max-w-lg p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Roadmap Item" : "Add Roadmap Item"}
          </h2>

          <button onClick={onCancel}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="border rounded-lg p-3"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="border rounded-lg p-3"
          />

          <select
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >

            <option value="Planned">Planned</option>
            <option value="Working">Working</option>
            <option value="Completed">Completed</option>
            <option value="Backlog">Backlog</option>

          </select>

          <button
            type="submit"
            className="bg-aqua-mid text-white py-3 rounded-lg"
          >
            {isEditing ? "Update Item" : "Add Item"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default RoadmapForm;