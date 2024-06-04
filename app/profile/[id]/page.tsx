"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiService from '@/app/services/apiService';
import { getUserId } from '@/app/lib/actions';
import { formatDate } from '@/app/components/forms/FormatDate';


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
      router.push(`/landlords/${params.id}`);
    } catch (error) {
      console.error('Failed to update profile', error);
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
    <main className="max-w-[1500px] mx-auto px-7 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-200 px-6 py-6">
        <aside className="col-span-1 mb-4">
          <p className="text-xl mb-6">Welcome {landlord.name}</p>
          <div className="flex gap-10 max-w-[350px] h-[220px] mx-auto justify-center p-4 rounded-2xl bg-white border border-gray-300 shadow-2xl">
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
      width={80}
      height={80}
      alt="Landlord image"
      className="rounded-full mt-6"
    />
  
  ) : (
    <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 hover:text-gray-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M15 7a3 3 0 11-6 0 3 3 0 016 0zM7 9a1 1 0 011-1h4a1 1 0 010 2H8a1 1 0 01-1-1z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.414a1 1 0 01-.707-.293l-2.293-2.293A1 1 0 0011.414 1H8.586a1 1 0 00-.707.293L5.586 3.586A1 1 0 015.5 4H4zm8 2h2v2h-2V7zm0 4h2v2h-2v-2z"
          clipRule="evenodd"
        />
      </svg>


    </div>
    
  )}

</label>
       
            <div className="flex- flex-col mt-20">
            <h1 className="font-bold">{formatDate(landlord.date_joined)}</h1>
            <p className="text-sm">on Airbnb</p>
            </div> 
            
          </div>
        </aside>

        <div className="mt-3 flex flex-col gap-2 text-lg px-2 md:px-4 lg:px-6">
          {userId === params.id ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Birthday:</label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Work:</label>
              <input
                type="text"
                name="work"
                value={formData.work || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Telephone:</label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>About me:</label>
              <textarea
                name="about_me"
                value={formData.about_me || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <label>Favorite song:</label>
              <input
                type="text"
                name="favorite_song"
                value={formData.favorite_song || ''}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
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
    </main>
  );
};

export default LandlordProfilePage;
