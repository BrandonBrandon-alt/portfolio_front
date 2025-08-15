// navigation/navLinks.js
import {
  FaSpaceShuttle,
  FaMicrochip,
  FaUserAstronaut,
  FaSatelliteDish,
  FaTools,
} from "react-icons/fa";

export const navLinks = [
  {
    to: "/",
    label: "Home",
    icon: <FaSpaceShuttle className="h-5 w-5 mr-3" />,
    exact: true,
  },
  {
    to: "/projects",
    label: "Proyectos",
    icon: <FaMicrochip className="h-5 w-5 mr-3" />,
  },
  {
    to: "/skills",
    label: "Habilidades",
    icon: <FaTools className="h-5 w-5 mr-3" />,
  },
  {
    to: "/about",
    label: "Acerca de",
    icon: <FaUserAstronaut className="h-5 w-5 mr-3" />,
  },
  {
    to: "/contact",
    label: "Contacto",
    icon: <FaSatelliteDish className="h-5 w-5 mr-3" />,
  },
];
