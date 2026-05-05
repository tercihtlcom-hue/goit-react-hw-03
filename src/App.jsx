import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'; // ID oluşturmak için şart
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  // ADIM 5: Local Storage'dan veriyi "lazy initialization" ile oku
  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem('saved-contacts');
    return savedContacts !== null ? JSON.parse(savedContacts) : initialContacts;
  });
  
  const [filter, setFilter] = useState('');

  // ADIM 5: Her kişi eklendiğinde veya silindiğinde Local Storage'ı güncelle
  useEffect(() => {
    window.localStorage.setItem('saved-contacts', JSON.stringify(contacts));
  }, [contacts]);

  // ADIM 3: Kişi Ekleme (ID nanoid ile oluşturulur)
  const addContact = (newContact) => {
    const finalContact = { 
      ...newContact, 
      id: nanoid() 
    };
    setContacts((prev) => [...prev, finalContact]);
  };

  // ADIM 4: Kişi Silme
  const deleteContact = (contactId) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
  };

  // ADIM 2: İsim ile Arama (Case-insensitive)
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    /* Buradaki maxWidth ve margin ayarı videodaki gibi yan yana dizilimi sağlar */
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0' }}>
      <h1>Phonebook</h1>
      
      {/* Formik & Yup ile hazırladığın form */}
      <ContactForm onAdd={addContact} />
      
      {/* Kontrollü bileşen (Arama Kutusu) */}
      <SearchBox value={filter} onFilter={setFilter} />
      
      {/* Kişi Listesi */}
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </div>
  );
};

export default App;