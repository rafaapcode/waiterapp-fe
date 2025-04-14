import TableComponent from "../Table/Table";
import { columnsProducts } from "./columns";
import { products } from "./data";
import MenuHeader from "./MenuHeader";

function ProductsTable() {
  return (
    <div>
      <MenuHeader onClick={() => {}} title="Produtos"/>
      <div className="mt-2 max-h-full overflow-y-auto">
        <TableComponent data={products} columns={columnsProducts}/>
      </div>
    </div>
  )
}

export default ProductsTable
