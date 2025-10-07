import { useState } from "react";
import style from "../assets/styles/TDCURD.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from "../features/UserApi";

// ✅ Define User type (adjust to match your backend model)
interface User {
  _id: string;
  name: string;
}

function TDCURD() {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");

  // ✅ RTK Query hooks
  const { data, isLoading, isError } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // ✅ Add user
  const handleAddUser = async () => {
  if (!name.trim()) {
    alert("Please enter a name");
    return;
  }
  try {
    await addUser({ name }).unwrap();
    setName("");
    setShowAdd(false);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const handleDelete = async (id: string) => {
  try {
    await deleteUser(id).unwrap();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users</p>;

  // ✅ type-safe users
  const users: User[] = data?.users || [];

  return (
    <div className={style.mainDiv}>
      <div className={style.mainContainer}>
        <div>
          {!showAdd && (
            <IoMdAdd
              onClick={() => setShowAdd(true)}
              className={style.openBtn}
            />
          )}

          {showAdd && (
            <MdCancel
              onClick={() => setShowAdd(false)}
              className={style.closeBtn}
            />
          )}

          {showAdd && (
            <div className={style.inputDiv}>
              <input
                className={style.addInput}
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <MdOutlineDone
                className={style.addBtn}
                onClick={handleAddUser}
              />
            </div>
          )}
        </div>

        {/* ✅ Show user list */}
        <div className={style.dataDiv}>
          <h3 style={{ marginLeft: "12rem", fontSize: "22px" }}>Users</h3>
          <hr style={{ width: "80%" }} />
          {users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul style={{ listStyle: "none", fontSize: "18px" }}>
              {users.map((user) => (
                <li key={user._id}>
                  {user.name}
                  <div className={style.deleteBtnDiv}>
                    <GrUpdate className={style.updateBtn} />
                    <RiDeleteBin6Line
                      className={style.deleteBtn}
                      onClick={() => handleDelete(user._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TDCURD;
