import { useEffect } from 'react';

const AdminRedirect = () => {
  useEffect(() => {
    window.location.href = 'http://localhost:8000/admin/';
  }, []);

  return <p>Redirecting to Django Admin...</p>;
};

export default AdminRedirect;