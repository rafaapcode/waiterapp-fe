import { useUsersModel } from './users.model';
import UsersView from './users.view';

function UsersPage() {
  const { props } = useUsersModel();

  return (
    <UsersView props={props}/>
  )
}

export default UsersPage
