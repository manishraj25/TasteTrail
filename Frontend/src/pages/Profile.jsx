import { useEffect, useState } from "react";
import api from "../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [cuisineInput, setCuisineInput] = useState("");
  const [allergyInput, setAllergyInput] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile");
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addCuisine = (e) => {
    if (e.key === "Enter" && cuisineInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        cuisinePreferences: [
          ...(formData.cuisinePreferences || []),
          cuisineInput.trim()
        ]
      });
      setCuisineInput("");
    }
  };

  const removeCuisine = (cuisine) => {
    setFormData({
      ...formData,
      cuisinePreferences: formData.cuisinePreferences.filter(
        (c) => c !== cuisine
      )
    });
  };

  const addAllergy = (e) => {
    if (e.key === "Enter" && allergyInput.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        allergies: [...(formData.allergies || []), allergyInput.trim()]
      });
      setAllergyInput("");
    }
  };

  const removeAllergy = (allergy) => {
    setFormData({
      ...formData,
      allergies: formData.allergies.filter((a) => a !== allergy)
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await api.put("/users/profile", formData);
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
              {user.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 py-8">

          <ProfileField
            label="Full Name"
            name="name"
            value={editing ? formData.name : user.name}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileField
            label="Email"
            name="email"
            value={editing ? formData.email : user.email}
            editing={editing}
            onChange={handleChange}
          />

          <ProfileField
            label="Diet Preference"
            name="diet"
            value={editing ? formData.diet : user.diet || "Not set"}
            editing={editing}
            onChange={handleChange}
          />

          {/* ALLERGIES */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Allergies</p>
            {!editing ? (
              <p className="text-lg font-medium">
                {user.allergies?.length ? user.allergies.join(", ") : "None"}
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.allergies || []).map((allergy) => (
                    <span
                      key={allergy}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {allergy}
                      <button
                        onClick={() => removeAllergy(allergy)}
                        className="hover:text-red-900"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyDown={addAllergy}
                  placeholder="Type allergy and press Enter"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400"
                />
              </>
            )}
          </div>

          {/* CUISINES */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Cuisine Preferences</p>
            {!editing ? (
              <p className="text-lg font-medium">
                {user.cuisinePreferences?.length
                  ? user.cuisinePreferences.join(", ")
                  : "Not set"}
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.cuisinePreferences || []).map((cuisine) => (
                    <span
                      key={cuisine}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {cuisine}
                      <button
                        onClick={() => removeCuisine(cuisine)}
                        className="hover:text-red-500"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  value={cuisineInput}
                  onChange={(e) => setCuisineInput(e.target.value)}
                  onKeyDown={addCuisine}
                  placeholder="Type cuisine and press Enter"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                />
              </>
            )}
          </div>

        </div>

        {/* FOOTER */}
        <div className="border-t px-8 py-6 text-sm text-gray-500">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </div>

      </div>
    </div>
  );
};

export default Profile;

/* ===================== */
/* FIELD COMPONENT       */
/* ===================== */

const ProfileField = ({ label, name, value, editing, onChange }) => (
  <div>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    {editing ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
      />
    ) : (
      <p className="text-lg font-medium">{value}</p>
    )}
  </div>
);
