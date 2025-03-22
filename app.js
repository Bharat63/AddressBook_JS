class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        if (!Contact.validateName(firstName) || !Contact.validateName(lastName)) {
            throw new Error('First name and last name must start with a capital letter and be at least 3 characters long.');
        }
        if (!Contact.validateAddress(address) || !Contact.validateAddress(city) || !Contact.validateAddress(state)) {
            throw new Error('Address, city, and state must be at least 4 characters long.');
        }
        if (!Contact.validateZip(zip)) {
            throw new Error('Invalid ZIP code. It should be a 6-digit number.');
        }
        if (!Contact.validatePhone(phone)) {
            throw new Error('Invalid phone number. It should be a 10-digit number.');
        }
        if (!Contact.validateEmail(email)) {
            throw new Error('Invalid email format.');
        }

        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    displayContact() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, Phone: ${this.phone}, Email: ${this.email}`;
    }

    static validateName(name) {
        return /^[A-Z][a-zA-Z]{2,}$/.test(name);
    }

    static validateAddress(value) {
        return /^.{4,}$/.test(value);
    }

    static validateZip(zip) {
        return /^\d{6}$/.test(zip);
    }

    static validatePhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    static validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        if (this.contacts.some(c => c.firstName === firstName && c.lastName === lastName)) {
            console.error('Duplicate contact entry detected. Contact not added.');
            return;
        }
        try {
            const contact = new Contact(firstName, lastName, address, city, state, zip, phone, email);
            this.contacts.push(contact);
            console.log('Contact added successfully:', contact);
        } catch (error) {
            console.error('Error adding contact:', error.message);
        }
    }

    displayContacts() {
        return this.contacts.map(contact => contact.displayContact());
    }

    findAndEditContact(name, updatedDetails) {
        const contact = this.contacts.find(c => c.firstName === name || c.lastName === name);
        if (contact) {
            Object.assign(contact, updatedDetails);
            console.log('Contact updated successfully:', contact);
        } else {
            console.error('Contact not found.');
        }
    }
///delete contact from the array
    findAndDeleteContact(name) {
        const index = this.contacts.findIndex(c => c.firstName === name || c.lastName === name);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log(`Contact '${name}' deleted successfully.`);
        } else {
            console.error('Contact not found.');
        }
    }

    //count the number of contacts

    getContactCount() {
        return this.contacts.reduce(count => count + 1, 0);
    }

    //search person using cityname or statename
    searchByCityOrState(location) {
        return this.contacts.filter(contact => contact.city === location || contact.state === location);
    }

    //search persons using city or state name

    viewPersonsByCityOrState() {
        const groupedByCity = this.contacts.reduce((acc, contact) => {
            acc[contact.city] = acc[contact.city] || [];
            acc[contact.city].push(contact.displayContact());
            return acc;
        }, {});

        const groupedByState = this.contacts.reduce((acc, contact) => {
            acc[contact.state] = acc[contact.state] || [];
            acc[contact.state].push(contact.displayContact());
            return acc;
        }, {});

        return { groupedByCity, groupedByState };
    }

    //count persons by city or state name
    getContactCountByCityOrState() {
        const countByCity = this.contacts.reduce((acc, contact) => {
            acc[contact.city] = (acc[contact.city] || 0) + 1;
            return acc;
        }, {});

        const countByState = this.contacts.reduce((acc, contact) => {
            acc[contact.state] = (acc[contact.state] || 0) + 1;
            return acc;
        }, {});

        return { countByCity, countByState };
    }

    //sort person by name
    sortContactsByName() {
        this.contacts.sort((a, b) => a.firstName.localeCompare(b.firstName));
        console.log('Sorted Contacts:', this.contacts.map(contact => contact.displayContact()));
    }
    // Sort contacts by city
sortByCity() {
    this.contacts.sort((a, b) => a.city.localeCompare(b.city));
    console.log('Sorted Contacts by City:', this.contacts.map(contact => contact.displayContact()));
}

// Sort contacts by state
sortByState() {
    this.contacts.sort((a, b) => a.state.localeCompare(b.state));
    console.log('Sorted Contacts by State:', this.contacts.map(contact => contact.displayContact()));
}

// Sort contacts by zip
sortByZip() {
    this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
    console.log('Sorted Contacts by Zip:', this.contacts.map(contact => contact.displayContact()));
}

}

const addressBook = new AddressBook();

console.log(JSON.stringify(addressBook.contacts));
addressBook.addContact("Bharat", "Kumar", "Mathura", "CityName", "UttarPradesh", "281502", "1234567890", "Bharat@gmail.com");
addressBook.addContact("bharat 2", "kumar", "Mathura", "CityName", "UttarPradesh", "281001", "1234567890", "Bharat2@gmail.com");
addressBook.addContact("Bharat 3", "Kumar", "Mathura", "CityName", "UttarPradesh", "281001", "1234567890", "Bharat3@gmail.com");
addressBook.addContact("Bharat 4", "Sharma", "Mathura", "CityName", "UttarPradesh", "281001", "1234567890", "Bharat4@gmail.com");
addressBook.addContact("Bharat 5", "kumar", "Mathura", "CityName", "UttarPradesh", "281001", "1234567890", "Bharat5@gmail.com");

console.log(JSON.stringify(addressBook.contacts));
console.log();

addressBook.findAndEditContact("Bharat",{city: "NewCity", phone: "9876543210"});
console.log(JSON.stringify(addressBook.contacts,null,2));

addressBook.findAndDeleteContact("bharat 2");
console.log(JSON.stringify(addressBook.contacts,null,2));

// Display contact count
console.log("Number of contacts in address book:", addressBook.getContactCount());

addressBook.addContact("Bharat 6", "kumar", "Mathura", "CityName", "UttarPradesh", "281001", "1234567890", "Bharat6@gmail.com");

// searching contacts by city or state
console.log("Contacts in CityName:", addressBook.searchByCityOrState("Mathura"));
console.log("Contacts in StateName:", addressBook.searchByCityOrState("Agra"));

//viewing persons by city or state
console.log("Persons grouped by city and state:", addressBook.viewPersonsByCityOrState());

//getting count by city and state
console.log("Count of contacts by city and state:", addressBook.getContactCountByCityOrState());

// Sorting contacts by name
addressBook.sortContactsByName();

// Sorting contacts by city, state, and zip
addressBook.sortByCity();
addressBook.sortByState();
addressBook.sortByZip();