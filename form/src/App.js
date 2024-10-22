import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Step1 = ({ register, errors }) => (
  <div>
    <h2>Basic Details</h2>
    <div class="form-group">
      <label class="form-label">First Name</label>
      <input class="form-control" {...register('firstName', { required: 'First name is required' })} />
      {errors.name && <p class="text-danger">{errors.firstName.message}</p>}
    </div>
    <div class="form-group">
      <label class="form-label">Second Name</label>
      <input class="form-control" {...register('secondName', { required: 'Second name is required' })} />
      {errors.name && <p class="text-danger">{errors.secondName.message}</p>}
    </div>
    <div class="form-group">
      <label class="form-label">Age</label>
      <input class="form-control" type="number" {...register('age', { required: 'Age is required' })} />
      {errors.age && <p class="text-danger">{errors.age.message}</p>}
    </div>
  </div>
);

const Step2 = ({ register, errors }) => (
  <div class="form-group">
    <h2>Contact Information</h2>
    <div>
      <label class="form-label">Email</label>
      <input
        class="form-control"
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Email is invalid',
          },
        })}
      />
      {errors.email && <p class="text-danger">{errors.email.message}</p>}
    </div>
    <div class="form-group">
      <label class="form-label">Phone Number</label>
      <input
        class="form-control"
        type="tel"
        {...register('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number is invalid',
          },
        })}
      />
      {errors.phone && <p class="text-danger">{errors.phone.message}</p>}
    </div>
  </div>
);

const Step3 = ({ register, errors }) => (
  <div class="form-group">
    <h2>Address Details</h2>
    <div>
      <label class="form-label">Address</label>
      <input class="form-control" {...register('address', { required: 'Address is required' })} />
      {errors.address && <p class="text-danger">{errors.address.message}</p>}
    </div>
    <div class="form-group">
      <label class="form-label">Zip Code</label>
      <input
        class="form-control"
        type="text"
        {...register('zip', {
          required: 'Zip code is required',
          pattern: {
            value: /^[0-9]{5}$/,
            message: 'Zip code is invalid',
          },
        })}
      />
      {errors.zip && <p class="text-danger">{errors.zip.message}</p>}
    </div>
  </div>
);

const App = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      secondName: '',
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
    <div className="App" class="container">
      <h1>Wizard Multi-Step Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <Step1 register={register} errors={errors} />}
        {step === 2 && <Step2 register={register} errors={errors} />}
        {step === 3 && <Step3 register={register} errors={errors} />}

        <div className="buttons">
          {step > 1 && <button type="button" class="btn btn-primary mt-3" onClick={handleBack}>Back</button>}
          <button type="submit" class="btn btn-primary mt-3">{step === 3 ? 'Submit' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
};

export default App;