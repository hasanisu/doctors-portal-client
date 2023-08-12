import React from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const AllUsers = () => {
    const url = ('https://doctors-portal-server-two-wine.vercel.app/users');
    const {data: users = [], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async ()=>{
            const res = await fetch(url);
            const data = await res.json();
            return data
        }
       
    })
    console.log(users)

    const handleMakeAdmin = id =>{
        fetch(`https://doctors-portal-server-two-wine.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                toast.success('Make admin successful')
                refetch();
            }
        })
    }



    return (
        <div>
            <h2>All users coming.....</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Update/Delete</th>
      </tr>
    </thead>
    <tbody>
      
      {
        users.map((user, i)=> 
        <tr key={user._id}>
        <th>
          {i + 1}
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
            </div>
          </div>
        </td>
        <td>
          {user.email}
        </td>
        <td>{user?.role !== 'admin' && <button onClick={()=> handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>Make Admin</button>}</td>
        <th>
          <button className="btn btn-danger btn-xs">delete</button>
        </th>
      </tr>
        )
      }
      
    </tbody>

  </table>
</div>
        </div>
    );
};

export default AllUsers;