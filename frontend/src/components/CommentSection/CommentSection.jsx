import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function CommentSection({ quote, category, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <div className="bg-white max-w-7xl w-full p-6 border border-2 border-slate-200 flex flex-row h-3/4 justify-between">
        <div className="flex flex-col w-full border-2 border-custom-main-orange px-24 pt-8 gap-8 rounded-lg ">
          <button
            className="bg-red-500 text-white rounded p-1 w-6 h-6"
            onClick={onClose}
          >
            <XMarkIcon />
          </button>
          <section className="flex flex-wrap gap-36">
            <p className="break-words">Quote n°{quote.id}</p>
            <p className="inline break-words">{quote.text}</p>
          </section>
          <section className="flex flex-wrap gap-40">
            <p className="break-words">Tirée de</p>
            <p>{quote.author}</p>
          </section>
          <section className="flex flex-wrap gap-40">
            <p className="break-words">Catégorie</p>
            <p>{category}</p>
          </section>
          <footer className="mt-4 text-lg font-semibold flex w-full gap-6">
            <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-1">
              <ChevronUpIcon className="w-6 hover:fill-green-500 cursor-pointer" />
              <p className=" px-1">{quote.vote}</p>
              <ChevronDownIcon className="w-6 hover:fill-red-500 cursor-pointer" />
            </section>
            <button className="rounded bg-custom-main-orange w-32 text-white font-normal cursor-copy">
              Partager
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default CommentSection;
