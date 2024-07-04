"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

type Params = {
  setError: (error: string) => void;
  error: string;
  value: string;
  handleChange: (value: string) => void;
  name: string;
  update: boolean;
};

export default function RichText({
  setError,
  error,
  value,
  handleChange,
  name,
  update,
}: Params) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
      ],
    },
    formats: [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "indent",
      "link",
    ],
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = value;
      quill.on("text-change", () => {
        const text = quill.getText().trim();
        if (text === "") {
          setError(`${name} is required`);
        } else {
          setError("");
          handleChange(quill.root.innerHTML);
        }
      });

      quill.root.addEventListener("click", () => {
        const text = quill.getText().trim();
        if (text === "") {
          setError(`${name} is required`);
        } else {
          setError("");
        }
      });
    }
  }, [quill, name, setError, handleChange]);

  useEffect(() => {
    if (quill && update === true) {
      quill.root.innerHTML = value;
    }
  }, [quill, update, value]);

  return (
    <div className="grid grid-cols-1 gap-2 mb-3 w-full">
      <div className="flex flex-col gap-x-2 w-full">
        <label className="inline-block mb-[9px] text-gray-500 dark:text-gray-400 text-[15px] font-medium tracking-[0] leading-[1]">
          {name}*
        </label>

        <div className="w-full flex flex-col min-h-[200px]">
          <div ref={quillRef} className="w-full"></div>
        </div>

        {error && (
          <span className="text-danger text-[12px] font-normal tracking-[0] mt-1 italic leading-[1] w-full">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}
