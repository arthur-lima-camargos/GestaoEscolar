import React from "react";
import PropTypes from "prop-types";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
import { IoBook, IoHome, IoPerson} from "react-icons/io5";

const ListSideBar = (props) => {
  return (
    <>
      <div className="flex flex-col justify-between h-11/12">
        <ul>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoHome} nameItem="Dashboard" route="/"/>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoPerson} nameItem="Alunos" route="/alunos"/>
          <ItemSideBar isOpen={props.isOpen} tagItem={IoBook} nameItem="Disciplinas" route="/disciplinas"/>          
        </ul>
      </div>
    </>
  );
};

ListSideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default ListSideBar;