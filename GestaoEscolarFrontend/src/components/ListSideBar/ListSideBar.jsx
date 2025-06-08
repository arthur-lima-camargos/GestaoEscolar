import React from "react";
import PropTypes from "prop-types";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";

const ListSideBar = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar isOpen={props.isOpen} tagItem={LuLayoutDashboard} nameItem="Dashboard" route="/"/>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPersonOutline} nameItem="Alunos" route="/alunos"/>          
        </ul>
      </div>
    </>
  );
};

ListSideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default ListSideBar;