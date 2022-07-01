import React, { useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { useAuth } from "../../Contexts/AuthContext";
import { addOrUpdateFile, db, uploadFile } from "../../firebase";
import { ROOT_FOLDER } from "../../Hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function AddFileButton({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const { currentUser } = useAuth();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);

    const parentPath = currentFolder.path.reduce((prev, path) => {
      return prev === "" ? path.name : `${prev}/${path.name}`;
    }, "");

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${parentPath}/${file.name}`
        : `${parentPath}/${currentFolder.name}/${file.name}`;

    const uploadTask = uploadFile(
      `/files/${currentUser.uid}/${filePath}`,
      file
    );

    // 3 functions
    // 1st during upload, 2nd error, 3rd after upload complete
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          snapshot.totalBytes < 200000
            ? 0.99
            : snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }

            return uploadFile;
          });
        });

        toast.error("Failed to upload file.");
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });

        db.getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addOrUpdateFile(file.name, currentUser.uid, currentFolder.id, url);
        });
      }
    );

    // this will allow user to upload same selected file again if needed otherwise onChange won't detect a value change between current and previous file
    // maybe some error uploading first time around...
    e.target.value = null;
  };

  const renderProgress = () => {
    return (
      uploadingFiles?.length > 0 &&
      ReactDOM.createPortal(
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "1rem",
            maxWidth: "250px",
          }}>
          {uploadingFiles.map((file) => {
            return (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles) => {
                    return prevUploadingFiles.filter((uploadFile) => {
                      return uploadFile.id !== file.id;
                    });
                  });
                }}>
                <Toast.Header
                  className="text-truncate w-100 justify-content-between"
                  closeButton={file.error}>
                  Uploading: {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "primary"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            );
          })}
        </div>,
        document.getElementById("root")
      )
    );
  };

  return (
    <>
      <label className="btn btn-primary btn-sm me-2 upload-file-btn">
        <FaFileUpload />
        <input className="d-none" type="file" onChange={handleUpload} />
      </label>
      {renderProgress()}
    </>
  );
}
