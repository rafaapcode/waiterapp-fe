import { Table } from "@tanstack/react-table";

interface InputTableFilter<T> {
  table: Table<T>
}

function InputFilter<T>({ table }: InputTableFilter<T>) {

  const column = table.getColumn("name");
  const value = column?.getFilterValue() as string | undefined;

  return (
    <input onChange={(e) => column?.setFilterValue(e.target.value)} value={value ?? ''} type="text" className="p-1 border border-gray-300 rounded-sm w-full px-2 outline-none focus:outline-none text-gray-600"/>
  )
}

export default InputFilter
