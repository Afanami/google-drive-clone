import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../Contexts/AuthContext";
import { ROOT_FOLDER } from "../../Hooks/useFolder";
import { RiFolderAddFill } from "react-icons/ri";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  const toggleModal = () => {
    setName("");
    setOpen(!open);
  };

  // const closeModal = () => {
  //   setOpen(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentFolder == null) return;

      const path = [...currentFolder.path];
      if (currentFolder !== ROOT_FOLDER) {
        path.push({ id: currentFolder.id, name: currentFolder.name });
      }

      await toast.promise(
        db.addToCollection(db.folders, {
          createdAt: db.getCurrentTimestamp(),
          userId: currentUser.uid,
          name: name?.trim(),
          path: path,
          parentId: currentFolder.id,
        }),
        {
          loading: "Creating folder...",
          success: <b>Folder created</b>,
          error: <b>Failed to create folder</b>,
        }
      );
    } catch (e) {
      toast.error(`Your folder could not be created.`);
      console.error("Error adding document: ", e);
    }

    setName("");
    toggleModal();
  };

  return (
    <>
      <Button onClick={toggleModal} variant="primary" size="sm">
        <RiFolderAddFill />
      </Button>
      <Modal show={open} onHide={toggleModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
