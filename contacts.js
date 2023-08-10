const fs = require("fs");
const path = require("path");

//ścieżka do pliku z danymi
const contactsPath = path.join(__dirname, "db", "contacts.json");

//zwraca listę kontaktów
function listContacts() {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }

    const contacts = JSON.parse(data);
    console.log("Contacts list:");
    console.table(contacts);
  });
}

//znajduje kontakt o podanym  ID
function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((item) => item.id === contactId);
    if (contact) {
      console.log("Contact by ID:", contact);
    } else {
      console.log("Contact not found");
    }
  });
}

//usuwa kontakt o podanym ID
function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }

    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter((item) => item.id !== contactId);

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts),
      "utf8",
      (writeError) => {
        if (writeError) {
          console.error("Error writing contacts:", writeError);
          return;
        }

        console.log("Contact removed successfully");
      }
    );
  });
}

//dodaje nowy kontakt
function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf8", (error, data) => {
    if (error) {
      console.error("Error reading contacts:", error);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];

    fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts),
      "utf8",
      (writeError) => {
        if (writeError) {
          console.error("Error writing contacts:", writeError);
          return;
        }

        console.log("Contact added successfully");
      }
    );
  });
}

// Testowanie czasu wykonania funkcji listContacts
console.time("listContacts"); // Rozpoczęcie pomiaru czasu
listContacts();
console.timeEnd("listContacts"); // Zakończenie pomiaru czasu i wyświetlenie wyniku

// Testowanie czasu wykonania funkcji getContactById
console.time("getContactById"); // Rozpoczęcie pomiaru czasu
getContactById("AeHIrLTr6JkxGE6SN-0Rw"); // Przykładowe ID, dostosuj do swoich danych
console.timeEnd("getContactById"); // Zakończenie pomiaru czasu i wyświetlenie wyniku

// Testowanie czasu wykonania funkcji removeContact
console.time("removeContact"); // Rozpoczęcie pomiaru czasu
removeContact("AeHIrLTr6JkxGE6SN-0Rw"); // Przykładowe ID, dostosuj do swoich danych
console.timeEnd("removeContact"); // Zakończenie pomiaru czasu i wyświetlenie wyniku

// Testowanie czasu wykonania funkcji addContact
console.time("addContact"); // Rozpoczęcie pomiaru czasu
addContact("John Doe", "john@example.com", "123-456-7890"); // Przykładowe dane, dostosuj do swoich danych
console.timeEnd("addContact"); // Zakończenie pomiaru czasu i wyświetlenie wyniku

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
