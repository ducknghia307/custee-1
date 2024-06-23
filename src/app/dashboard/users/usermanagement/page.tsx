"use client";

import styles from "../../../../components/ui/dashboard/usermanagement/users.module.css";
import Link from "next/link";
import Image from "next/image";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import logo from "../../../../assets/logo/avatar1.jpg";
import Search from "@/components/ui/dashboard/search/search";
import { useState, useEffect } from "react";
import ModalDelete from "@/components/ui/dashboard/usermanagement/deleteUser/deleteModal";
import { axiosInstance } from "@/utils/axiosInstance";
import { showToast } from "@/components/toast/toast";
import PaginationUser from "@/components/ui/dashboard/paginationuser/paginationuser";

const UserManagement = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      setUsers(response.data.metadata.users);
      console.log(setUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleReasonChange = (event) => {
    const { value } = event.target;
    setSelectedReason(value);
    if (value !== 'other') {
      setOtherReason('');
    }
  };

  const handleBanUser = async () => {
    try {
      await axiosInstance.patch(`/api/user/${selectedUser._id}`, { status: 'Non-Available' });
      setUsers(users.map(user => user._id === selectedUser._id ? { ...user, status: 'Non-Available' } : user));
      setOpen(false);
      showToast("Ban user successfully","success")
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())||user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>User Management</h3>
      <div className={styles.top}>
        {/* <Link href="/dashboard/users/usermanagement/add">
          <button className={styles.addButton}>
            <MdOutlineAdd />
            Add New User
          </button>
        </Link> */}
        <Search
          placeholder="Search for a user..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Avatar</td>
            <td>User Name</td>
            <td>Email</td>
            <td>Gender</td>
            <td>Date Of Birth</td>
            <td>Address</td>
            <td>Phone</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff" }}>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                  <Image src={user.avatar || logo} alt="" width={40} height={40} className={styles.userImage} />
                </div>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.dateOfBirth ? formatDate(user.dateOfBirth) : ""}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/usermanagement/edit/${user._id}`}>
                    <MdOutlineEdit size={20} className={styles.buttonEdit} />
                  </Link>
                  <MdDeleteOutline size={20} className={styles.buttonDelete} onClick={() => { setOpen(true); setSelectedUser(user); }} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationUser 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
        totalUsers={filteredUsers.length}
      />
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
            <button className={styles.buttonBan} onClick={handleBanUser}>
              Ban User
            </button>
          </div>
        </div>
      </ModalDelete>
    </div>
  );
};

export default UserManagement;
