/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { deleteAllCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authen";
import { useEffect } from "react";

function Logout(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookie();
  
  useEffect(() => {
    dispatch(checkAuthen(false));
    navigate("/");
  }, []);

  return (
    <>
    </>
  )
}
export default Logout;