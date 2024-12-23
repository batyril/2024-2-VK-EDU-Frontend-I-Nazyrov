import { Link } from "react-router-dom";
import PAGES from "../const/pages.ts";

const NotFound = () => {
  return (
    <section>
      NotFound <Link to={PAGES.TRANSLATION}>На главную</Link>
    </section>
  );
};

export default NotFound;
