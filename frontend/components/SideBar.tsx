import { FaCoins, FaTaxi, FaTools, FaUserTie } from "react-icons/fa";
import { FaCar, FaCarBurst, FaFilePen, FaPenToSquare, FaRegCopyright, FaUserLarge,} from "react-icons/fa6";
const SideBar = () => {
  const menu = [];

  const items = [
    { name: "Owners", icon: <FaUserTie />, href: "/admit" },
    { name: "Vehicles", icon: <FaCar />, href: "/admit" },
    { name: "Drivers", icon: <FaUserLarge />, href: "/teach" },
    { name: "Service Providers", icon: <FaTools />, href: "/exams" },
    { name: "Leases", icon: <FaFilePen />, href: "/graduate" },
    { name: "Invoices", icon: <FaFilePen />, href: "/graduate" },
    { name: "Collections", icon: <FaCoins />, href: "/graduate" },
    { name: "Incidents", icon: <FaCarBurst />, href: "/graduate" },
    { name: "Service Request", icon: <FaFilePen />, href: "/graduate" },
    { name: "Payments", icon: <FaCoins />, href: "/graduate" },
    {
      name: "Termination Notices",
      icon: <FaFilePen />,
      href: "/graduate",
    },
    { name: "Settings", icon: <FaPenToSquare />, href: "/admin" },
  ];

  items.map((item, key) => {
    menu.push(
      <div key={key} className="flex items-center p-1 bg-amber-50 space-x-3 m-2">
        <p>{item.icon}</p>
        <p>{item.name}</p>
      </div>                                                                                                                                                                          
    );
  });

  return (
    <div className="fixed top-0 flex flex-col justify-between  left-0 w-64 bg-gray-500 min-h-screen">
      <div>
        {/* Header */}
        <div className="flex m-2 p-2 items-center bg-gray-100 rounded space-x-2 border-b-2">
          <FaTaxi className="text-red-600 bg-black text-3xl p-1" />
          <p className="text-blue-600 font-bold text-lg">Car Lease Central</p>
        </div>

        {/* Menu */}
        <div>{menu}</div>
      </div>

      {/* Footer */}
      <div className="relative bottom-0 left-0 m-2 bg-amber-50">
        <p className='flex items-center space-x-2 font-semibold justify-center'><FaRegCopyright/><span>2026</span></p>
      </div>
    </div>
  );
};

export default SideBar;
