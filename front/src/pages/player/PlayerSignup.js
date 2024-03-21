import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  useToast,
  VStack,
} from '@chakra-ui/react';

const PlayerSignup = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const [name, setName] = useState('');
  const [cpassword, setCpassword] = useState('');

  const navigate = useNavigate();

  const LoginFormSubmit = async (e) => {
    if (cpassword == password) {
      e.preventDefault();
      const user = { name, emailID, password };
      const response = await fetch(`/api/player/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);

        return navigate('/player/home');
      } else {
        console.log(json.error);
        seterrDisplay(json.error);
      }
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <VStack spacing={2}>
      <FormControl onSubmit={LoginFormSubmit}>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          className='form-control'
          id='name'
          aria-describedby='emailHelp'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter name'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          value={emailID}
          onChange={(e) => setEmailID(e.target.value)}
          placeholder='Enter email'
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder='Enter password'
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm password</FormLabel>
        <Input
          type='password'
          className='form-control'
          id='exampleInputPassword1'
          value={cpassword}
          onChange={(e) => {
            setCpassword(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input type='file' p={0.5} />
      </FormControl>
      <Button
        width='100%'
        colorScheme='blue'
        style={{ marginTop: 15 }}
        onClick={LoginFormSubmit}
      >
        Sign Up
      </Button>
      <Link class='btn btn-primary' to='/' role='button'>
        Back
      </Link>
      <div>{errDisplay && <p>{errDisplay}</p>}</div>
    </VStack>
  );
};

export default PlayerSignup;
