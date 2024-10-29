import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';

const Step1 = ({ control, errors }) => (
  <Box mb={3}>
    <Typography variant="h5" mb={2}>Basic Details</Typography>
    <Box mb={2}>
      <Controller
        name="firstName"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ''}
          />
        )}
      />
    </Box>
    <Box mb={2}>
      <Controller
        name="lastName"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ''}
          />
        )}
      />
    </Box>
    <Box mb={2}>
      <Controller
        name="age"
        control={control}
        rules={{ required: 'Age is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Age"
            variant="outlined"
            fullWidth
            error={!!errors.age}
            helperText={errors.age ? errors.age.message : ''}
          />
        )}
      />
    </Box>
  </Box>
);

const Step2 = ({ control, errors }) => (
  <Box mb={3}>
    <Typography variant="h5" mb={2}>Step 2: Contact Information</Typography>
    <Box mb={2}>
      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email is invalid',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />
        )}
      />
    </Box>
    <Box mb={2}>
      <Controller
        name="phone"
        control={control}
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number is invalid',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            type="tel"
            label="Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ''}
          />
        )}
      />
    </Box>
  </Box>
);

const Step3 = ({ control, errors }) => (
  <Box mb={3}>
    <Typography variant="h5" mb={2}>Step 3: Address Details</Typography>
    <Box mb={2}>
      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            variant="outlined"
            fullWidth
            error={!!errors.address}
            helperText={errors.address ? errors.address.message : ''}
          />
        )}
      />
    </Box>
    <Box mb={2}>
      <Controller
        name="zip"
        control={control}
        rules={{
          required: 'Zip code is required',
          pattern: {
            value: /^[0-9]{5}$/,
            message: 'Zip code is invalid',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Zip Code"
            variant="outlined"
            fullWidth
            error={!!errors.zip}
            helperText={errors.zip ? errors.zip.message : ''}
          />
        )}
      />
    </Box>
  </Box>
);

const App = () => {
  const [step, setStep] = useState(1);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      phone: '',
      address: '',
      zip: '',
    },
  });

  const onSubmit = (data) => {
    if (step === 3) {
      console.log('Form data: ', data);
      alert('Form submitted successfully!');
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={3}>Multi-Step Form with MUI</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%" maxWidth="500px">
        {step === 1 && <Step1 control={control} errors={errors} />}
        {step === 2 && <Step2 control={control} errors={errors} />}
        {step === 3 && <Step3 control={control} errors={errors} />}

        <Box display="flex" justifyContent="space-between" mt={3}>
          {step > 1 && (
            <Button variant="contained" color="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button variant="contained" color="primary" type="submit">
            {step === 3 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default App;