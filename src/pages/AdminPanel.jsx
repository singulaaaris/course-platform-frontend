import React, { useEffect, useReducer } from "react";
import axios from "../axios";
import "../style/AdminPanel.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    default:
      return state;
  }
};

const AdminPanel = () => {
  const [state, dispatch] = useReducer(reducer, { users: [] });

  useEffect(() => {
    axios
      .get("/admin/users")
      .then((res) => dispatch({ type: "SET_USERS", payload: res.data }))
      .catch((err) => console.error("Ошибка загрузки пользователей:", err));
  }, []);

  const handleRoleChange = (id, role) => {
    axios
      .put(`/admin/users/${id}/role?role=${role}`)
      .then(() => dispatch({ type: "UPDATE_USER", payload: { id, role } }))
      .catch((err) => console.error("Ошибка изменения роли:", err));
  };

  const handleBlockToggle = (id, blocked) => {
    axios
      .put(`/users/${id}/block?blocked=${!blocked}`)
      .then(() => dispatch({ type: "UPDATE_USER", payload: { id, blocked: !blocked } }))
      .catch((err) => console.error("Ошибка блокировки:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`/admin/users/${id}`)
      .then(() => dispatch({ type: "DELETE_USER", payload: id }))
      .catch((err) => console.error("Ошибка удаления пользователя:", err));
  };

  return (
    <div className="admin-panel">
      <h2>Админ-панель: управление пользователями</h2>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Блок</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => handleRoleChange(u.id, e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleBlockToggle(u.id, u.blocked)}>
                  {u.blocked ? "Разблокировать" : "Заблокировать"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
