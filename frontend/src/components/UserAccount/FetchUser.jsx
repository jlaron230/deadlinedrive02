import FetchData from "./FetchData";
import Password from "./Password";
function FetchUser (){

  const userId = '11'; 

  return (
    <div className="App">
      <FetchData userId={userId} />
    </div>
  );
}

export default FetchUser;