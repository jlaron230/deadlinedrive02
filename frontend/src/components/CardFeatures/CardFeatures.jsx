import { Link } from 'react-router-dom';
import calendrierImg from "../../assets/calendrierImg.jpg";
import goalImg from "../../assets/goalImg.jpg";
import addingImg from "../../assets/addingImg.jpg";

function CardFeatures() {
  return (
    <ul className="list-disc flex flex-row flex-wrap justify-center p-2 space-x-4">
      <li className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-96 min-h-80 flex flex-col">
        <h3>Cliquez ici pour :</h3>
        <p>
          Accéder à un calendrier interactif pour visualiser vos deadlines et
          planifier vos actions.
        </p>
        <Link to="/deadlines">
          <img
            src={calendrierImg}
            alt="Photo d'un calendrier sur une tablette"
            className="rounded-md max-w-120 max-h-80 hover:opacity-50"
          />
        </Link>
      </li>
      <li className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-96 min-h-80 flex flex-col">
        <h3>Cliquez ici pour :</h3>
        <p>
          Trouvez les citations qui vous inspirent grâce à notre page dédiée !
        </p>
        <Link to="/quotes">
          <img
            src={goalImg}
            alt="Photo d'un stylo qui écrit GOALS"
            className="rounded-md max-w-120 max-h-80 hover:opacity-50"
          />
        </Link>
      </li>
      <li className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-96 min-h-40 flex flex-col">
        <h3>Cliquez ici pour :</h3>
        <p>
          Ajouter une nouvelle citation pour partager vos coups de cœur !
        </p>
        <Link to="/customize-quotes">
          <img
            src={addingImg}
            alt="Photo d'un crayon"
            className="rounded-md max-w-120 max-h-80 hover:opacity-50"
          />
        </Link>
      </li>
    </ul>
  );
}

export default CardFeatures;
