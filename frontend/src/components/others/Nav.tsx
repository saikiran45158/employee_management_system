import { Link } from "react-router-dom";

export default function Nav(){
  return (
    <div className="nav-class">
      <Link to='home'>Home</Link>
      <Link to='add'>Add</Link>
      <Link to='update'>Update</Link>
      <Link to='delete'>Delete</Link>
    </div>
  );
}
