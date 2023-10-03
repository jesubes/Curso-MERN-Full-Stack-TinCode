import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import "./PostForm.scss";

export const PostForm = () => {
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    console.log(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getMiniature = () => {
    return null;
  };

  return (
    <Form className="post-form">
      <Form.Group widths="equal">
        <Form.Input name="title" placeholder="Titulo del post" />
        <Form.Input name="path" placeholder="Path del post" />
      </Form.Group>

      {/* Editor del post  TINYMCE*/}
      <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help",
        }}
      />
      {/* MINIATURE */}
      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>
          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid>
        Crear post
      </Form.Button>
    </Form>
  );
};
