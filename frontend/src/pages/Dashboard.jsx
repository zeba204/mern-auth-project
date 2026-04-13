import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0,
  });

  const [items, setItems] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const [loading, setLoading] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchStats = async () => {
    const res = await API.get("/items/stats");
    setStats(res.data.stats);
  };

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data.items);
  };

  const addItem = async () => {
    if (!title.trim()) return alert("Title required");

    setLoading(true);
    await API.post("/items", { title, description, status });

    setTitle("");
    setDescription("");
    setStatus("active");

    fetchItems();
    fetchStats();
    setLoading(false);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete item?")) return;

    await API.delete(`/items/${id}`);
    fetchItems();
    fetchStats();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/items/${id}`, { status });
    fetchItems();
    fetchStats();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const updateItem = async () => {
    if (!editTitle.trim()) return alert("Title required");

    setLoading(true);
    await API.put(`/items/${editId}`, {
      title: editTitle,
      description: editDescription,
    });

    setEditId(null);
    fetchItems();
    fetchStats();
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return navigate("/");
    fetchItems();
    fetchStats();
  }, []);

  const filteredItems = items
    .filter((item) => item.title && item.description)
    .filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <div
        className={`flex justify-between items-center p-4 ${
          darkMode
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-indigo-600 text-white"
        }`}
      >
        <h1 className="text-xl font-bold">Dashboard</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded border"
          >
            {darkMode ? "Light" : "Dark"}
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {["total", "active", "pending", "completed"].map((key) => (
          <div
            key={key}
            className={`p-4 rounded-lg text-center ${
              darkMode ? "bg-gray-800" : "bg-white shadow"
            }`}
          >
            <p className="text-sm capitalize">{key}</p>
            <p className="text-xl font-bold">{stats[key]}</p>
          </div>
        ))}
      </div>

      {/* CREATE */}
      <div className="p-6">
        <div
          className={`p-4 rounded-lg flex gap-2 flex-wrap ${
            darkMode ? "bg-gray-800" : "bg-white shadow"
          }`}
        >
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`p-2 rounded border ${
              darkMode ? "bg-gray-700 text-white" : ""
            }`}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`p-2 rounded border ${
              darkMode ? "bg-gray-700 text-white" : ""
            }`}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`p-2 rounded border ${
              darkMode ? "bg-gray-700 text-white" : ""
            }`}
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={addItem}
            className="bg-blue-500 text-white px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="px-6">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-3 rounded border ${
            darkMode ? "bg-gray-800 text-white" : ""
          }`}
        />
      </div>

      {/* TABLE */}
      <div className="p-6">
        <div
          className={`rounded-lg overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white shadow"
          }`}
        >
          <table className="w-full">
            <thead
              className={`${
                darkMode ? "bg-gray-700 text-white" : "bg-gray-200"
              }`}
            >
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="text-left">Description</th>
                <th className="text-left">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No items
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t border-gray-600 hover:bg-gray-700 transition"
                  >
                    <td className="p-3">
                      {editId === item.id ? (
                        <input
                          value={editTitle}
                          onChange={(e) =>
                            setEditTitle(e.target.value)
                          }
                          className="w-full p-2 rounded border"
                        />
                      ) : (
                        item.title
                      )}
                    </td>

                    <td className="p-3">
                      {editId === item.id ? (
                        <input
                          value={editDescription}
                          onChange={(e) =>
                            setEditDescription(e.target.value)
                          }
                          className="w-full p-2 rounded border"
                        />
                      ) : (
                        item.description
                      )}
                    </td>

                    <td className="p-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus(item.id, e.target.value)
                        }
                        className={`w-full p-2 rounded border ${
                          darkMode
                            ? "bg-gray-700 text-white border-gray-500"
                            : "bg-white text-black border-gray-300"
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>

                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        {editId === item.id ? (
                          <button
                            onClick={updateItem}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() => startEdit(item)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}

                        <button
                          onClick={() => deleteItem(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;