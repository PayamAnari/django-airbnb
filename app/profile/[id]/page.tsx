"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import { formatDate } from '@/app/components/forms/FormatDate';
import { toast} from 'react-toastify';



const LandlordProfilePage = ({ params }: { params: { id: string }}) => {
  const router = useRouter();
  const [landlord, setLandlord] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landlordData, currentUserID] = await Promise.all([
          apiService.get(`/api/auth/${params.id}`),
          getUserId()
        ]);
        setLandlord(landlordData);
        setFormData(landlordData);
        setUserId(currentUserID);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [params.id]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.put(`/api/auth/${params.id}/profile/`, formData);
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      router.push(`/landlords/${params.id}`);
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error("Failed to update profile", {
        position: "top-center",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; 
    const formData = new FormData();
    formData.append('avatar', file); 
    
    try {
      const response = await apiService.uploadProfilePhoto(`/api/auth/${params.id}/upload-profile/`, formData);
      
      setLandlord((prevLandlord) => ({
        ...prevLandlord,
        avatar_url: response.avatar_url,
      }));
    } catch (error) {
      console.error('Failed to upload avatar', error);
    }
  };
  

  return (
    <main className="max-w-[1500px] mx-auto px-7 p-6 mt-0 md:mt-8 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 px-6 py-6 mt-6">
        <aside className="col-span-1 mt-6 ">
          <p className="text-xl mb-6">Welcome {landlord.name ? (
            landlord.name
          ) : (
            'Guest'
          
          )}</p>
          <div className="flex items-center justify-center gap-8 max-w-[350px] h-[220px] mx-auto p-4 rounded-2xl bg-white border border-gray-300 shadow-2xl">
          <div className="flex flex-col gap-2">
          <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e)}
           />
     <label htmlFor="avatar" className="cursor-pointer">

      {landlord.avatar_url ? (
    <Image
      src={landlord.avatar_url}
      width={60}
      height={60}
      alt="Landlord image"
      className="rounded-full mt-6"
    />
  ) : (
    <div className="w-[60px] h-[60px] rounded-full bg-gray-300 flex items-center justify-center">
      <span>Upload</span>
    </div>
  )}
   </label>

         <div className="flex flex-col items-center">
           <p className="text-lg font-bold ">{landlord.name}</p>
           <p className="text-sm font-bold">Guest</p>
           </div>
          </div>
          <div className="flex- flex-col items-center">
            <h1 className="font-bold">{formatDate(landlord.date_joined)}</h1>
            <p className="text-sm">on Airbnb</p>
            </div> 
          </div>
        </aside>

        <div className="col-span-1 mt-2 lg:mt-10 md:col-span-3 pl-0 md:pl-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {userId === params.id ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">  
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email:</label>
              <input
                type="email"
                id="floating_filled" 
                name="email"
                placeholder=""
                value={formData.email || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer"
              />
               </div>
              <div className="relative">
              <input
                type="text"
                id="floating_filled"
                name="name"
                
                value={formData.name || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
              </div>
              <div className="relative">
              <input
                type="date"
                name="birthday"
                value={formData.birthday || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Birthday</label>

              </div>
              <div className="relative">
              <input
                type="text"
                name="work"
                value={formData.work || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Work</label>

              </div>

              <div className="relative">
              <input
                type="text"
                name="telephone"
                value={formData.telephone || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Telephone</label>

              </div>

              <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Address</label>

              </div>
              
              <div className="relative">
              <input
                type="text"
                name="favorite_song"
                value={formData.favorite_song || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer" placeholder=""
              />
              <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Favorite song</label>

              </div>
                <div className="relative">
              <textarea
                name="about_me"
                value={formData.about_me || ''}
                onChange={handleChange}
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-airbnb appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-airbnb-dark peer resize-none" placeholder=""
              />
               <label htmlFor="floating_filled" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-airbnb peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">About me</label>

              </div>

              <button type="submit" className="mt-4 px-4 py-2 bg-airbnb hover:bg-airbnb-dark text-white rounded-lg">
                Save Changes
              </button>
            </form>
          ) : (
            <>
              <p>Email: {landlord.email}</p>
              <p>Born in: {landlord.birthday}</p>
              <p>My work: {landlord.work}</p>
              <p>Telephone: {landlord.telephone}</p>
              <p>Address: {landlord.address}</p>
              <p>Joined: {landlord.date_joined}</p>
              <p>About me: {landlord.about_me}</p>
              <p>Favorite song: {landlord.favorite_song}</p>
            </>
          )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandlordProfilePage;
