export default function ActionButton({ name, action }) {
    return (
        <div className="bg-sky-500 text-white font-semibold w-24 p-2 px-5 rounded-md text-center cursor-pointer"
        onClick={() => action()}>
            <p>{name}</p>
        </div>
    )
}