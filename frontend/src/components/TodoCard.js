export default function TodoCard({ id, name, deleteTodos }) {
    return (
        <div className="w-100 p-3 mb-5 rounded border-yellow-500 border-2 border-solid">
            <p className="font-semibold text-white text-xl mb-2">{name}</p>
            
            <div className="text-white w-32 p-2 px-5 rounded-md text-center cursor-pointer border-2 border-red-300
                        hover:bg-red-600 hover:border-red-600 transition ease-in-out delay-75 hover:scale-105 duration-150"
            onClick={() => deleteTodos(id)}>
                <p>Delete</p>
            </div>
        </div>
    )
}