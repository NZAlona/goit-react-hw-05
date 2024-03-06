import { Field, Formik, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesPage() {
  const handleSubmit = (values, actions) => {
    if (values.searchQuery === '') {
      toast.error('Please submit your query');
      return;
    }
    actions.resetForm();
  };

  return (
    <>
      <div>
        <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
          <Form>
            <Field type="text" name="searchQuery" placeholder="Search movie"></Field>
            <button type="submit">Search</button>
            <Toaster />
          </Form>
        </Formik>
      </div>
    </>
  );
}
