// Reusable functional component for an input field in a contact form
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