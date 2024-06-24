// Composant fonctionnel réutilisable pour un champ de saisie dans un formulaire de contact
const ContactInputBox = ({ type, name, placeholder, value, onChange, onBlur }) => {
    return (
      <div className="mb-9">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-3 border rounded border-yellow-600"
        />
      </div>
    );
  };

  export default ContactInputBox;