import {
  faCalendarAlt,
  faExclamationCircle,
  faFileAlt,
  faFolderOpen,
  faTachometerAlt,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Sidebar = () => (
  <aside className="hidden lg:flex md:flex w-1/5 bg-white h-screen p-6 shadow-md  flex-col">
    <div className="flex items-center mb-8">
      <span className="text-xl font-bold text-blue-600">Jur</span>
    </div>
    <nav className="space-y-4 text-gray-600 font-medium">
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" /> Dashboard
      </a>
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faFolderOpen} className="mr-2" /> My Cases
      </a>
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faTasks} className="mr-2" /> Activities
      </a>
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Calendar
      </a>
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Files
      </a>
      <a href="#" className="flex items-center hover:text-blue-500">
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" /> Open a
        Dispute
      </a>
    </nav>
  </aside>
);
