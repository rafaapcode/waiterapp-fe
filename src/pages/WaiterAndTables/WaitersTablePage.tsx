import { useWaitersTableModel } from "./WaitersTable.model";
import WaitersTableView from "./WaitersTable.view";

function WaitersTablePage() {
  const { props } = useWaitersTableModel();

  return (
    <WaitersTableView props={props}/>
  )
}

export default WaitersTablePage
