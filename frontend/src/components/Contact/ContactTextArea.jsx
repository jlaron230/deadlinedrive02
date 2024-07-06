
// Reusable functional component for a textarea in a contact form
const ContactTextArea = ({ rows, name, placeholder, value, onChange, onBlur }) => {
    return (
      <div className="mb-4">
        <textarea
          rows={rows}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full p-3 border border-yellow-600 rounded"
        />
      </div>
    );
  };
  
export default ContactTextArea