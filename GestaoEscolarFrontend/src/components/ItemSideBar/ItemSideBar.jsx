import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

/**
 * @typedef {Object} ItemSideBarProps
 * @property {string} route
 * @property {boolean} isOpen
 * @property {React.ElementType} tagItem
 * @property {string} nameItem
 */

/**
 * @param {ItemSideBarProps} props
 */
const ItemSideBar = (props) => {
  const location = useLocation();
  const isActive = location.pathname === props.route;

  return (
    <div>
      <Link to={props.route}>
        <li
          className={`${
            props.isOpen
              ? "w-[200px] flex flex-nowrap items-center gap-4 p-2"
              : "p-1"
          } ${
            isActive
              ? "bg-gray-300 text-black"
              : "hover:bg-white hover:text-black"
          } py-2 hover:cursor-pointer rounded-sm font-medium`}
        >
          <props.tagItem />
          {props.isOpen ? props.nameItem : ""}
        </li>
      </Link>
    </div>
  );
};

ItemSideBar.propTypes = {
  route: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  tagItem: PropTypes.elementType.isRequired,
  nameItem: PropTypes.string.isRequired,
};

export default ItemSideBar;
