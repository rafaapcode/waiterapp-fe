import { useHistoryModel } from "./history.model";
import HistoryView from "./history.view";

function HistoryPage() {
  const { props } = useHistoryModel();
  return (
    <HistoryView props={props}/>
  )
}

export default HistoryPage
