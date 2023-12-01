import { useState } from 'react';
import { Button, Stack, Form } from 'react-bootstrap';
import { useDataContext } from "../contexts/dataContext";

function UserForm() {
  const { formData, setFormData } = useDataContext();
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   attachFile: null
  // });

  const handleChange = (e) => {
    setFormData(prvState => ({
      ...prvState,
      [e.target.name]: e.target.value
    }))
  }

  // const handleFile = (e) => {
  //   setFormData(prvState => ({
  //     ...prvState,
  //     [e.target.name]: e.target.files[0]
  //   }))
  // }

  const SumbitForm = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const clearForm = (e) => {
    setFormData(() => ({
      firstName: "",
      lastName: "",
      // attachFile: ""
    }))
  }

  return (
    <Form onSubmit={SumbitForm} method="POST" encType="multipart/form-data">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label htmlFor='attachFile'>Attach File</Form.Label>
        <Form.Control id="attachFile" name="attachFile" type="file" onChange={handleFile} />
      </Form.Group> */}
      <Stack direction='horizontal' gap={3}>
        <Button variant="primary" type="submit">
          Save
        </Button>
        <Button variant="danger" type="button" onClick={clearForm}>
          Clear
        </Button>
      </Stack>
    </Form>
  );
}

export default UserForm;