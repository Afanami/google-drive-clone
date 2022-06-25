import React from "react";
import NavBarCustom from "./NavBarCustom";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../Hooks/useFolder";
import Folder from "./Folder";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders } = useFolder(folderId);

  return (
    <>
      <NavBarCustom></NavBarCustom>
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
        {childFolders?.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => {
              return (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: "250px" }}
                  className="p-2">
                  <Folder folder={childFolder} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
}
