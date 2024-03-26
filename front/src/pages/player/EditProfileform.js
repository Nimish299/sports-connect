import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
} from '@chakra-ui/react';

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/player/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
        setFormData(data); // Initialize form data with fetched profile data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/player/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      navigate('/player/player-profile'); // Redirect to profile page after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <VStack spacing={4} align='flex-start'>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Heading as='h1' size='lg'>
          Edit Profile
        </Heading>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : error ? (
          <Text color='red.500'>{error}</Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                name='name'
                value={formData.name || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type='text'
                name='location'
                value={formData.location || ''}
                onChange={handleChange}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Gaming Statistics
            </Heading>
            <FormControl>
              <FormLabel>Game</FormLabel>
              <Input
                type='text'
                name='game1' // Assuming user can edit only one game stat for simplicity
                value={formData.gaming_statistics?.game1 || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Level</FormLabel>
              <Input
                type='text'
                name='level1'
                value={formData.gaming_statistics?.level1 || ''}
                onChange={handleChange}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Communication Preferences
            </Heading>
            <FormControl>
              <FormLabel>Preferred Language</FormLabel>
              <Input
                type='text'
                name='preferred_language'
                value={
                  formData.communication_preferences?.preferred_language || ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Social Interactions
            </Heading>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea
                name='bio'
                value={formData.social_interactions?.bio || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Interests</FormLabel>
              <Input
                type='text'
                name='interests'
                value={
                  formData.social_interactions?.interests?.join(', ') || ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Facebook</FormLabel>
              <Input
                type='text'
                name='facebook'
                value={
                  formData.social_interactions?.social_media_links?.facebook ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Twitter</FormLabel>
              <Input
                type='text'
                name='twitter'
                value={
                  formData.social_interactions?.social_media_links?.twitter ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Instagram</FormLabel>
              <Input
                type='text'
                name='instagram'
                value={
                  formData.social_interactions?.social_media_links?.instagram ||
                  ''
                }
                onChange={handleChange}
              />
            </FormControl>
            <Divider />

            <Button type='submit' colorScheme='blue'>
              Submit
            </Button>
          </form>
        )}
      </div>
    </VStack>
  );
};
export default EditProfile;
