import React from "react";
import { FaFileUpload } from "react-icons/fa";

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-primary text-truncate w-100">
      <FaFileUpload className="mb-1 me-2" />
      {file.name}
    </a>
  );
}
