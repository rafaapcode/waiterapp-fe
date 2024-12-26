import logo from "../../assets/images/logo.svg";

function Header() {
  return (
    <header className="bg-[#D73035] flex justify-center h-[198px] items-center">
      <div className="w-full max-w-[1216px] flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Pedidos</h1>
          <h2 className="text-lg font-normal opacity-90 text-white">Acompanhe os pedidos do cliente</h2>
        </div>
        <img src={logo} alt="waiter logo" />
      </div>
    </header>
  );
}

export default Header;
