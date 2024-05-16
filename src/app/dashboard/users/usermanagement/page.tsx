"use client"

import styles from "../../../../components/ui/dashboard/usermanagement/users.module.css"
// import Search from "../../../components/ui/dashboard/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/components/ui/dashboard/pagination/pagination";
import { MdDeleteOutline, MdOutlineAdd, MdOutlineEdit } from "react-icons/md";
import logo from "../../../../assets/logo/avatar1.jpg";
import Search from "@/components/ui/dashboard/search/search";
import { useState } from "react";
import ModalDelete from "@/components/ui/dashboard/usermanagement/deleteUser/deleteModal";
import ModalEditStatus from "@/components/ui/dashboard/orderlists/modalstatus/modalstatus";

const UserManagement = () => {

  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const handleReasonChange = (event) => {
    const { value } = event.target;
    setSelectedReason(value);
    // Reset other reason input when other options are selected
    if (value !== 'other') {
      setOtherReason('');
    }
  };

  const [open, setOpen] = useState<boolean>(false)

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
            <td>Gender</td>
            <td>Phone</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff" }}>
          <tr>
            <td>
              <div className={styles.user}>
                <Image src={logo} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>John Smith</td>
            <td>johnsmith@gmail.com</td>
            <td>Male</td>
            <td>012345678</td>
            <td>Available</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/users/usermanagement/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)}/>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image src={logo} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>John Smith</td>
            <td>johnsmith@gmail.com</td>
            <td>Male</td>
            <td>012345678</td>
            <td>Available</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/users/usermanagement/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)}/>
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={logo} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>John Smith</td>
            <td>johnsmith@gmail.com</td>
            <td>Male</td>
            <td>012345678</td>
            <td>Available</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/users/usermanagement/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)}/>
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={logo} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>John Smith</td>
            <td>johnsmith@gmail.com</td>
            <td>Male</td>
            <td>012345678</td>
            <td>Available</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/users/usermanagement/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)}/>
              </div>
            </td>
          </tr><tr>
            <td>
              <div className={styles.user}>
                <Image src={logo} alt="" width={40} height={40} className={styles.userImage} />
              </div>
            </td>
            <td>John Smith</td>
            <td>johnsmith@gmail.com</td>
            <td>Male</td>
            <td>012345678</td>
            <td>Available</td>
            <td>
              <div className={styles.buttons}>
                <Link href="/dashboard/users/usermanagement/edit">
                  <MdOutlineEdit size={5} className={styles.buttonEdit} />
                </Link>
                
                <MdDeleteOutline size={5} className={styles.buttonDelete} onClick={() => setOpen(true)}/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
      <ModalDelete open={open} onClose={() => setOpen(false)}>
        <div className={styles.modal}>
          <h1 className={styles.h1}>Ban Reason</h1>
          <h3 className={styles.h3header}>
            Why are you banning this user?
          </h3>
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
              <textarea className={styles.otherReason}
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter other reason..."
                rows={1}
              />
            )}
          </div>
          {/* <hr className="border-t-solid border-1 border-grey" /> */}
          <div className="flex flex-row justify-center">
            {/* <button className={styles.buttonBan} onClick={() => setOpen(false)}> */}
            <button className={styles.buttonBan} >
              Ban User
            </button>
          </div>
        </div>
      </ModalDelete>
    </div>
  );
}

export default UserManagement
