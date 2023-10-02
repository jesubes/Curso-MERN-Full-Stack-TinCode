import React, {useCallback} from "react";
import { Form, Image } from "semantic-ui-react";
import {useDropzone} from 'react-dropzone'
import "./PostForm.scss";

export const PostForm = () => {
  const onDrop = useCallback((acceptedFile) =>{
    const file = acceptedFile[0]
    console.log(file);
  })

  const { getRootProps, getInputProps } =useDropzone({
    accept:'image/jpeg, image/png',
    onDrop
  })

  const getMiniature = () => {
    return null
  }

  return (
    <Form className="post-form">
      <Form.Group widths='equal'>
        <Form.Input name='title' placeholder='Titulo del post' />
        <Form.Input name='path' placeholder='Path del post' />
      </Form.Group>

      {/* Editor del post */}

      {/* MINIATURE */}
      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()}/>
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu imagen</span>

            {/*  ------- AQUI  */}

          </div>
        )}
      </div>

      <Form.Button type="submit" primary fluid>
        Crear post 
      </Form.Button>
    </Form>
  );
};
