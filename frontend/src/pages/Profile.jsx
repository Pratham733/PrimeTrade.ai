import { useAuth } from '../context/useAuth'; // ✅ updated
import api from '../utils/api';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: user?.name || '', bio: user?.bio || '' }
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    reset({ name: user?.name || '', bio: user?.bio || '' });
  }, [user, reset]);

  const onSubmit = async (data) => {
    setMessage(null);
    try {
      const res = await api.put('/user/me', data);
      setUser(res.data);
      setMessage('Profile updated');
    } catch {
      setMessage('Update failed');
    }
  };


  return (
    <div className="dashboard-container">
      <h1 className="welcome-title">Your Profile</h1>

      <div className="section-card">
        {message && <div className="mb-4 text-sm text-gray-700 p-3 bg-gray-100 rounded">{message}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-100">
          <div>
            <label className="block mb-2 text-lg">Name</label>
            <input className="input p-3" {...register('name')} />
          </div>
          <div>
            <label className="block mb-2 text-lg">Bio</label>
            <textarea className="input p-3" rows={4} {...register('bio')} />
          </div>
          <button className="btn btn-primary w-full py-3 text-lg">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;