
import React from 'react'
import { useForm } from "react-hook-form";

const App = () => {
  const { register, reset, handleSubmit, watch, formState: { errors, touchedFields} } = useForm({reValidateMode:'onBlur'});
 
  const onValid=(data, obj)=>{
    console.log('Valid',data);
    console.log('OBJ', obj);
    reset()
  }
  const inValid=(data)=>{
    console.log('Invalid',data);
  }

  // console.log('Watch:', watch())
  // console.log('Errors:', errors);
  // console.log('Touched:', touchedFields)

  return (
    <>
      <h1>React Hook Form</h1> <hr />
      <div>
        <form onSubmit={handleSubmit(onValid, inValid)}>
          <div>
            <label htmlFor="name">Name:</label>
            <input {...register("name", { required:'Name field is required', maxLength:25,  minLength:{value:3, message:'Minimum length 3' }})} type="text" id='name' />
            <p>{errors?.name?.message}</p>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input {...register("email" , {pattern:/^[A-Za-z\.@]+$/i})} type="email" id='email' />
            {errors?.email?.type === 'pattern' && (<p>Invalid Email Pattern</p>)}
        
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input {...register("age" , {max:100 , min:18, valueAsNumber: true, required: true })} type="text" id='age' />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input {...register("password" , {pattern:/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/})} type="password" id='password' />
            {errors?.password?.type === 'pattern' && (<p>Minimum 8 letter password, with at least a symbol, upper and lower case letters and a number</p>)}
        
          </div>
          <div>
            <label htmlFor="cPassword">CPassword:</label>
            <input {...register("cPassword" , {required: true, validate: data =>{
              if(watch('password')!== data){ return 'Password Not Matching'}
            } })} type="password" id='cPassword' />
            <p>{errors?.cPassword?.message}</p>
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App