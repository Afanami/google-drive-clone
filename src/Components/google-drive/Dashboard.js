import React from "react";
import NavBarCustom from "./NavBarCustom";
import { Container } from "react-bootstrap";
import AddFolderButton from "./AddFolderButton";

export default function Dashboard() {
  return (
    <>
      <NavBarCustom></NavBarCustom>
      <Container fluid>
        <AddFolderButton />
      </Container>
    </>
  );
}
