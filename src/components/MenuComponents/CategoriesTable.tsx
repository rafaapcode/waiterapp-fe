import TableComponent from "../Table/Table";
import { columnsCategories } from "./columns";
import { categories } from "./data";
import MenuHeader from "./MenuHeader";

function CategoriesTable() {
  return (
    <div>
      <MenuHeader onClick={() => {}} title="Produtos"/>
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent data={categories} columns={columnsCategories} custom/>
      </div>
    </div>
  )
}

export default CategoriesTable
