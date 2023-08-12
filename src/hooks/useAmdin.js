import { useEffect, useState } from "react";

// is users admin or not 
const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  
  useEffect(() => {
    if (email) {
      fetch(`https://doctors-portal-server-two-wine.vercel.app/users/admin/${email}`)
        .then(res => res.json())
        .then(data => {
          console.log("is admin", data.isAdmin);
          setIsAdmin(data.isAdmin);
          setIsAdminLoading(false)
        });
    }
  }, [email]);
  return [isAdmin, isAdminLoading]
};


export default useAdmin;
