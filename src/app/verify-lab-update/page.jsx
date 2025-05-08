'use client';

import { useState, useEffect } from 'react';
import { fetchLabById, updateLabData } from '../lib/airtable';
import { useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import Loader from '../components/Loader';

function VerifyLab() {
  const router = useRouter();
  const [lab, setLab] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [expires, setExpires] = useState('');
  const [labId, setLabId] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const labIdFromURL = searchParams.get('labId');
    const expiresFromURL = searchParams.get('expires');

    if (!labIdFromURL || !expiresFromURL) {
      setError('Invalid verification link');
      setLoading(false);
      return;
    }

    setLabId(labIdFromURL);
    setExpires(expiresFromURL);

    // Check if link is expired
    const currentTime = Date.now();
    if (currentTime > parseInt(expiresFromURL)) {
      setIsExpired(true);
      setLoading(false);
      return;
    }

    const fetchLab = async () => {
      try {
        const labData = await fetchLabById(labIdFromURL);
        if (labData) {
          setLab(labData);
          setName(labData.Name || labData.name || '');
        } else {
          setError('Lab not found');
        }
      } catch (err) {
        console.error('Error fetching lab:', err);
        setError('Failed to load lab data');
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');

    try {
      const updatedLab = await updateLabData(labId, { Name: name });
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      console.error('Error updating lab:', err);
      setError('Failed to update lab data');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Clock className="w-12 h-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Link Expired</h1>
        <p className="text-gray-600 mb-6">
          This verification link has expired. Please request a new one.
        </p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Successful!</h1>
        <p className="text-gray-600 mb-6">The lab information has been updated.</p>
        <p className="text-gray-500 text-sm">You will be redirected shortly...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Verify and Update Lab</h1>
        <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded text-sm">
          <Clock className="inline mr-2" size={16} />
          This link expires in {expires ? Math.round((parseInt(expires) - Date.now()) / (1000 * 60 * 60)) : 0} hours
        </div>

        {lab && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lab Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">
                Verify the information and submit to update <strong>{lab.Name || lab.name}</strong>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center"
            >
              {isUpdating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </>
              ) : (
                'Confirm Update'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyLab;
