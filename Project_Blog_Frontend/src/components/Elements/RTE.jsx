import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ onChange, value = "" }) {
  return (
    <Editor
      apiKey='6wwu3x38xrqys51k9zesm21l2gc7p8vue6lh8jh6pdoyrywo'

      value={value}

      init={{
        height: 500,
        menubar: false,

        directionality: "ltr",

        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "preview",
          "help",
          "wordcount",
        ],

        toolbar:
          "undo redo | blocks | bold italic forecolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | removeformat | help",

        content_style: `
          body {
            direction: ltr !important;
            text-align: left !important;
            unicode-bidi: bidi-override !important;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
          }
        `,

        setup: (editor) => {
          editor.on("init", () => {
            editor.getBody().dir = "ltr";
            editor.getBody().style.direction = "ltr";
            editor.getBody().style.textAlign = "left";
          });
        },
      }}

      onEditorChange={(content) => {
        onChange(content);
      }}
    />
  );
}