"use client";

type FileProps = {
  fileType?: "img" | "doc";
  fileName?: string;
  onDelete?: () => void;
  file?: File;
};

const dummyFiles: any[] = [
  { fileName: "testsadfasdfasd.doc", fileType: "doc" },
  { fileName: "pic.jpg", fileType: "img" },
];

type UploadedFilesProps = { files: File[]; onDelete: (i: number) => void };

const UploadedFiles = ({ files, onDelete }: UploadedFilesProps) => {
  return (
    <div
      className={`${
        !files.length && "hidden"
      } max-w-5xl m-auto w-full bg-white mb-1 py-1 pt-2 px-4 rounded-lg border border-slate-200 flex gap-3 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500`}
    >
      {files.map((f, i) => (
        <FileCard
          key={i}
          fileName={f.name}
          onDelete={() => {
            onDelete(i);
          }}
          file={f}
        />
      ))}
    </div>
  );
};

export default UploadedFiles;

//checking whether the file is image or document
function getFileType(fileName: any) {
  const fileExtension = fileName.split(".").pop().toLowerCase();
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
  ];

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (documentExtensions.includes(fileExtension)) {
    return "document";
  } else {
    return "unknown";
  }
}

function getFileSize(file: any) {
  const fileSizeInBytes = file.size;
  const fileSizeInKb = fileSizeInBytes / 1024; // Convert bytes to KB
  const fileSizeInMb = fileSizeInKb / 1024; // Convert KB to MB

  return {
    bytes: fileSizeInBytes,
    kb: fileSizeInKb.toFixed(2), // Rounded to 2 decimal places
    mb: fileSizeInMb.toFixed(2), // Rounded to 2 decimal places
  };
}

const FileCard = ({ fileName, onDelete, file }: FileProps) => {
  const fileType = getFileType(fileName);
  const fileSize = getFileSize(file);

  return (
    <div className="hover:text-slate-700 text-slate-600 dark:text-slate-300 relative max-w-16 group">
      {/* CloseButton */}
      <button
        className="hidden group-hover:inline absolute top-[-.5rem] right-[-.5rem] text-slate-500 hover:text-red-800 dark:hover:text-red-400 z-10 dark:text-slate-300 "
        onClick={(e) => {
          e.preventDefault();
          onDelete?.();
        }}
      >
        <CloseIcon />
      </button>

      <div className="w-16 h-16 border border-slate-300 rounded-md hover:bg-slate-100 flex justify-center items-center relative dark:bg-slate-600 dark:border-slate-400">
        {/* File Type */}
        {fileType === "image" && <ImageIcon />}
        {fileType === "document" && <FilesIcon />}

        {/* File size */}
        <p className="absolute bottom-0 left-1 text-xs text-slate-400 max-w-full overflow-clip text-ellipsis text-nowrap">
          {fileSize.kb}kb
        </p>
      </div>

      {/* File Name */}
      <p className="mt-1 text-xs text-center px-1 text-slate-600 dark:text-slate-300 truncate relative group">
        {fileName}
      </p>
      {/* Tooltip */}
      <span className="text-xs hidden group-hover:block absolute bottom-[calc(100%+0.5rem)] left-1/2 transform -translate-x-1/2 text-slate-600 bg-white p-1 rounded-sm border shadow-sm dark:bg-slate-600 dark:text-slate-300 text-nowrap">
        {fileName}
      </span>
    </div>
  );
};

const FilesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6.905 9.97a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72V18a.75.75 0 0 0 1.5 0v-4.19l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
        clipRule="evenodd"
      />
      <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
    </svg>
  );
};

const ImageIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
