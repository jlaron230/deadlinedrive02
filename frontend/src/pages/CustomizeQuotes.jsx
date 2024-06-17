import ChooseTheme from "@components/ChooseTheme/ChooseTheme";
import ChooseAuthor from "@components/ChooseAuthor/ChooseAuthor";

export default function CustomizeQuotes() {
  return (
    <>
      <div className="flex">
        <div className="flex flex-col space-y-6 p-6 sm:p-10">
          <h1>Créer une citation</h1>
          <ChooseAuthor />
          <ChooseTheme />
        </div>
      </div>
    </>
  );
}
