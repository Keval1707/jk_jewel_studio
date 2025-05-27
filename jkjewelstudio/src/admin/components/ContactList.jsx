import { useState, useEffect } from "react";
import { fetchContact } from "../utils/api";
import { useToast } from "../../features/ToastContext";


const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();


  const loadContact = async () => {
    setLoading(true);
    try {
      setContacts((await fetchContact()).data.data);
    } catch (err) {
      showToast("Failed to load Contact us list","error");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContact();
  }, []);
  if (loading)
    return <div className="admin-loading">Loading inquirys ...</div>;

  if (contacts.length === 0)
    return <div className="admin-empty-state">No inquiry found.</div>;

  return (
    <div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((co, i) => (
            <tr key={co._id}>
              <td>{i + 1}</td>
              <td>{co.name}</td>
              <td>{co.email}</td>
              <td>{co.phone}</td>
              <td>{co.subject}</td>
              <td>{co.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
