import React from "react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <Button
      as={Link}
      to={`/folder/${folder.id}`}
      state={{ folder: folder }}
      className="text-truncate w-100">
      <FaFolder className="mb-1 me-2" />
      {folder.name}
    </Button>
  );
}
