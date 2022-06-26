import { useEffect, useReducer } from "react";
import { db, documentFolder } from "../firebase";
import { getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};

export default function useFolder(folderId = null, folder = null) {
  const { currentUser } = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    folderId: null,
    folder: null,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    getDoc(documentFolder(folderId))
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: db.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    const userFoldersQuery = query(
      db.folders,
      where("parentId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );

    // onSnapshot returns unsubscribe function
    return onSnapshot(
      userFoldersQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push(db.formatDoc(doc)));
        // console.log(docs);
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: docs },
        });
      }
    );
  }, [folderId, currentUser]);

  useEffect(() => {
    const userFilesQuery = query(
      db.files,
      where("folderId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt")
    );

    // onSnapshot returns unsubscribe function
    return onSnapshot(
      userFilesQuery,
      { includeMetadataChanges: true },
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => docs.push(db.formatDoc(doc)));
        // console.log(docs);
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: docs },
        });
      }
    );
  }, [folderId, currentUser]);

  return state;
}
