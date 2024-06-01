"use client"

import styles from "../../../../components/ui/dashboard/usermanagement/users.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import logo from "../../../../assets/logo/avatar1.jpg";
import Search from "@/components/ui/dashboard/search/search";
import { useState, useEffect } from "react";
import ModalDelete from "@/components/ui/dashboard/usermanagement/deleteUser/deleteModal";
import { axiosInstance } from "@/utils/axiosInstance";

const UserManagement = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/user"); 
        setUsers(response.data.metadata.users);
        console.log(setUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleReasonChange = (event) => {
    const { value } = event.target;
    setSelectedReason(value);
    if (value !== 'other') {
      setOtherReason('');
    }
  };
  

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>User Management</h3>
      <div className={styles.top}>
        <Link href="/dashboard/users/usermanagement/add">
          <button className={styles.addButton}>
            <MdOutlineAdd />
            Add New User
          </button>
        </Link>
        <Search placeholder="Search for a user..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Avatar</td>
            <td>User Name</td>
            <td>Email</td>
            {/* <td>Gender</td> */}
            <td>Phone</td>
            {/* <td>Status</td> */}
            <td>Action</td>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff" }}>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image src={user.avatar || logo} alt="" width={40} height={40} className={styles.userImage} />
                </div>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {/* <td>{user.gender}</td> */}
              <td>{user.phone}</td>
              {/* <td>{user.status}</td> */}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/usermanagement/edit/${user._id}`}>
                    <MdOutlineEdit size={5} className={styles.buttonEdit} />
                  </Link>
                  <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
      <ModalDelete open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h1 className={styles.h1}>Ban Reason</h1>
          <h3 className={styles.h3header}>Why are you banning this user?</h3>
          <div className={styles.sizeSelector}>
            <label>
              <input type="radio" name="reason" value="reason 1" onChange={handleReasonChange} /> Providing false information
            </label>
            <label>
              <input type="radio" name="reason" value="reason 2" onChange={handleReasonChange} /> Offensive and abusive behavior
            </label>
            <label>
              <input type="radio" name="reason" value="reason 3" onChange={handleReasonChange} /> Cheat
            </label>
            <label>
              <input type="radio" name="reason" value="reason 4" onChange={handleReasonChange} /> Create multiple virtual accounts
            </label>
            <label>
              <input type="radio" name="reason" value="reason 5" onChange={handleReasonChange} /> Returning goods is not according to regulations
            </label>
            <label>
              <input type="radio" name="reason" value="other" onChange={handleReasonChange} /> Other
            </label>
            {selectedReason === 'other' && (
              <textarea
                className={styles.otherReason}
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter other reason..."
                rows={1}
              />
            )}
          </div>
          <div className="flex flex-row justify-center">
            <button className={styles.buttonBan}>
              Ban User
            </button>
          </div>
        </div>
      </ModalDelete>
    </div>
  );
};

export default UserManagement;
