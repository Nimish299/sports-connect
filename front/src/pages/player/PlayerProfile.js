import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
  Box,
  Flex,
} from '@chakra-ui/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
const PlayerProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const renderInterests = (interests) => {
    return <Text>Interests: {interests.join(', ')}</Text>;
  };
  const renderSocialMediaLink = (platform, link) => {
    let iconClass;
    switch (platform) {
      case 'Facebook':
        iconClass = 'fa-facebook';
        break;
      case 'Twitter':
        iconClass = 'fa-twitter';
        break;
      case 'Instagram':
        iconClass = 'fa-instagram';
        break;
      default:
        iconClass = '';
    }

    return (
      <div key={platform}>
        <a href={link} className={`fa ${iconClass}`} />
      </div>
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/player/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
          Player Profile
        </Heading>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : error ? (
          <Text color='red.500'>{error}</Text>
        ) : (
          <>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Text>{profileData.name}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Text>{profileData.emailID}</Text>
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Text>{profileData.location}</Text>
            </FormControl>
            <Divider />
            {profileData.gaming_statistics ? (
              Object.entries(profileData.gaming_statistics).map(
                ([game, level]) => (
                  <div
                    key={game}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <Text>{game}</Text>
                    <Box
                      ml={2}
                      minWidth='100px'
                      borderWidth='1px'
                      borderRadius='md'
                      p={1}
                      textAlign='center'
                    >
                      <Text>{level}</Text>
                    </Box>
                  </div>
                )
              )
            ) : (
              <Text>No gaming statistics available</Text>
            )}
            <Divider />
            <Heading as='h2' size='md'>
              Communication Preferences
            </Heading>
            <Text>
              {profileData.communication_preferences?.preferred_language}
            </Text>
            <Divider />
            <Heading as='h2' size='md'>
              Social Interactions
            </Heading>
            <Text>Bio: {profileData.social_interactions?.bio}</Text>
            {profileData.social_interactions?.interests &&
              renderInterests(profileData.social_interactions.interests)}
            {profileData.social_interactions?.social_media_links && (
              <>
                {Object.entries(
                  profileData.social_interactions.social_media_links
                ).map(([platform, link]) =>
                  renderSocialMediaLink(platform, link)
                )}
              </>
            )}
            <Divider />
            <Divider />
            <Heading as='h2' size='md'>
              Feedback and Ratings
            </Heading>
            <Text>Ratings: {profileData.feedback_and_ratings?.ratings}</Text>
            <Text>
              Reviews: {profileData.feedback_and_ratings?.reviews?.join(', ')}
            </Text>
            <Button colorScheme='blue'>
              <a href='/player/player-Edit-profile'>Profile</a>
            </Button>
          </>
        )}
      </div>
    </VStack>
  );
};

export default PlayerProfile;
