import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { MenuForm } from "../MenuForm";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./MenuItem.scss";

const menuController = new Menu();

export const MenuItem = (props) => {
  const { menu, onReload } = props;
  const { accessToken } = useAuth();

  //crear un estado para abrir el modal
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");

  //confirmacion del modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
  const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const openUdateMenu = () => {
    setTitleModal(`Actualizar menu: ${menu.title}`);
    onOpenCloseModal();
  };

  const openDesactivateActiveConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      menu.active
        ? `Desactivar el menu ${menu.title}`
        : `Activar el menu ${menu.title}`
    );
    onOpenCloseConfirm();
  }

  const onActivateDesactivate = async () => {
    try {
      await menuController.updateMenu(accessToken, menu._id, {
        active: !menu.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      throw error;
    }
  };

  const openDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Eliminar el menu ${menu.title}`)
    onOpenCloseConfirm()
  }

  const onDelete = async () => {
    try{
      await menuController.deleteMenu( accessToken, menu._id);
      onReload();
      onOpenCloseConfirm();
      
    } catch(error){
      throw error;
    }
  }

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{menu.title}</span>
          <span className="menu-item__info-path">{menu.path}</span>
        </div>

        <div>
          <Button icon primary onClick={openUdateMenu}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={menu.active ? "orange" : "teal"}
            onClick={onActivateDesactivate}
          >
            <Icon name={menu.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={openDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} menu={menu} />
      </BasicModal>

      <Confirm
        open={ showConfirm }
        onCancel= {onOpenCloseConfirm}
        onConfirm={ isDelete ? onDelete : onActivateDesactivate }
        content={confirmMessage}
        size='mini'
      />
    </>
  );
};
