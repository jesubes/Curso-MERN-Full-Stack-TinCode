import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./CourseForm.form.js";
import "./CourseForm.scss";

export const CourseForm = () => {
  //inicializar formik
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        console.log(formValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  //
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    formik.setFieldValue("miniature", URL.createObjectURL(file)); // lo mustra provisorio en el formulario
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  //TRAE miniatura del curso
  const getMiniature = () => {
    if( formik.values.file ){
      return formik.values.miniature;
    }
    return null;
  };

  
  //
  return (
    <Form className="course-form" onSubmit={formik.handleSubmit}>
      <div className="course-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Arrastra tu miniatura...</span>
          </div>
        )}
      </div>

      <Form.Input
        name="title"
        placeholder="Nombre del curso"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
      />
      <Form.Input
        name="url"
        placeholder="Link del curso"
        onChange={formik.handleChange}
        value={formik.values.url}
        error={formik.errors.url}
      />
      <Form.TextArea
        name="description"
        placeholder="Pequeña descripción del curso"
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
      />

      <Form.Group widths="equal">
        <Form.Input
          type="number"
          name="price"
          placeholder="Precio del curso"
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
        />
        <Form.Input
          type="number"
          name="score"
          placeholder="Puntuación del curso"
          onChange={formik.handleChange}
          value={formik.values.score}
          error={formik.errors.score}
        />
      </Form.Group>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear curso
      </Form.Button>
    </Form>
  );
};
