import FetchData from "./FetchData";
import Password from "./Password";
import UserAccountProps from "./UserAccountProps";
function FetchUser (){
  const userId = '76'; 

  return (
    <div className="App">
      <FetchData userId={userId} />
    </div>
  );
}

export default FetchUser;