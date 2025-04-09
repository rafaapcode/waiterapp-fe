
interface MenuTabProps {
  tabSelected: "products" | "categories";
  handleTab: (tab: "products" | "categories") => void;
}

function Menutab({ handleTab, tabSelected }: MenuTabProps) {

  const styles = {
    selected: {
      btn: "w-[142px] h-[53px] rounded-lg shadow-inner bg-white transition-all duration-150",
      text: "text-sm text-[#D73035] font-semibold"
    },
    notSelected:  {
      btn: "w-[142px] h-[53px] rounded-lg transition-all duration-150",
      text: "text-sm text-[#666666]"
    },
  }

  return (
    <section className="w-full flex mt-16 border-b">
      <button onClick={() => handleTab("products")} className={tabSelected === "products" ? styles.selected.btn : styles.notSelected.btn}>
        <p className={tabSelected === "products" ? styles.selected.text : styles.notSelected.text}>Produtos</p>
      </button>
      <button onClick={() => handleTab("categories")} className={tabSelected === "categories" ? styles.selected.btn : styles.notSelected.btn}>
        <p className={tabSelected === "categories" ? styles.selected.text : styles.notSelected.text}>Categorias</p>
      </button>
    </section>
  )
}

export default Menutab
