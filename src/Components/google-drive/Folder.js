import React from "react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <Button
      as={Link}
      to={`/folder/${folder.id}`}
      className="text-truncate w-100">
      <FaFolder className="mb-1" style={{ marginRight: "0.75rem" }} />
      {folder.name}
    </Button>
  );
}
