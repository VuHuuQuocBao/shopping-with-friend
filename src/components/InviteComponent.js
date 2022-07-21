import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import useFirestore from "../hooks/useFirestore";
export default function InviteComponent() {
  const { userId, setUserId } = React.useContext(AppContext);
  const navigate = useNavigate();
  // take the invite code
  const location = useLocation();
  var currentPath = location.pathname;
  currentPath = currentPath.substring(1);
  console.log(currentPath);
  console.log(typeof currentPath);
  // check the code in the database
  const linkCondition = React.useMemo(() => {
    return {
      fieldName: "code",
      operator: "==",
      compareValue: currentPath,
    };
  }, [currentPath]);
  console.log(JSON.stringify(linkCondition));
  // render lan' dau items trong cart la rong~
  const linkInvitation = useFirestore("link", linkCondition);
  console.log(JSON.stringify(linkInvitation));
  // linkInvitation tra ve mang?
  if (linkInvitation.length > 0) {
    window.alert("BAN DA DIEN' DUNG CODE");

    // reactjs bi confuse ??
    setUserId(linkInvitation[0].userId);
    navigate("/mainPage");
  }

  return <div>InviteComponent</div>;
}
