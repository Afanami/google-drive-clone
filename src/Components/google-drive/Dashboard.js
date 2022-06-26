import React from "react";
import NavBarCustom from "./NavBarCustom";
import File from "./File";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";
import AddFolderButton from "./AddFolderButton";
import useFolder from "../../Hooks/useFolder";
import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state?.folder
  );

  const renderChildFolders = () => {
    return (
      childFolders?.length > 0 && (
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
      )
    );
  };

  const renderChildFiles = () => {
    return (
      childFiles?.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFiles.map((childFile) => {
            return (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2">
                <File file={childFile} />
              </div>
            );
          })}
        </div>
      )
    );
  };

  return (
    <>
      <NavBarCustom></NavBarCustom>
      <Container className="mt-4">
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {renderChildFolders()}
        {childFolders?.length > 0 && childFiles?.length > 0 && <hr />}
        {renderChildFiles()}
      </Container>
    </>
  );
}
