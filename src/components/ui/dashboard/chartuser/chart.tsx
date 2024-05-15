"use client"
import { ButtonIcon } from "@radix-ui/react-icons";
import styles from "../chartuser/chart.module.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MdCalendarMonth, MdErrorOutline, MdLogout, MdOutlineFileDownload } from "react-icons/md";

const data = [
  {
    name: 'Jan',
    users: 4000,
    new: 2400,
    active: 1000,
  },
  {
    name: 'Feb',
    users: 3000,
    new: 1398,
    active: 2000,
  },
  {
    name: 'Mar',
    users: 2000,
    new: 9800,
    active: 1500,
  },
  {
    name: 'Apr',
    users: 2780,
    new: 3908,
    active: 1088,
  },
  {
    name: 'May',
    users: 1890,
    new: 4800,
    active: 3400,
  },
  {
    name: 'Jun',
    users: 2390,
    new: 3800,
    active: 3567,
  },
  {
    name: 'Jul',
    users: 3490,
    new: 4300,
    active: 3675,
  },
  {
    name: 'Aug',
    users: 2390,
    new: 3800,
    active: 1233,
  },
  {
    name: 'Sep',
    users: 3490,
    new: 4300,
    active: 1246,
  },
  {
    name: 'Oct',
    users: 4000,
    new: 2400,
    active: 1239,
  },
  {
    name: 'Nov',
    users: 3000,
    new: 1398,
    active: 1239,
  },
  {
    name: 'Dec',
    users: 3490,
    new: 4300,
    active: 1567,
  },
];


const ChartUser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>User Statistics</span>
        <div className={styles.controls}>
          <button className={styles.button}>1/2023 - 12/2023  <MdCalendarMonth /></button>
          <button className={styles.button}>Export <MdOutlineFileDownload /></button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" style={{ fontSize: '10px' }} />
          <YAxis style={{ fontSize: '10px' }} />
          <Tooltip contentStyle={{ fontSize: '13px', fontWeight: 500 }} />
          <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 500 }} />
          <Line type="monotone" dataKey="users" stroke="#82ca9d" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="active" stroke="#8884d8" strokeDasharray="3 4 5 2" />
          <Line type="monotone" dataKey="new" stroke="violet" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
export default ChartUser