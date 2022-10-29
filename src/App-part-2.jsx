import { Input } from '@mui/material';
import React from 'react'
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

const App = () => {
    const {control , reset, handleSubmit, formState: { errors, touchedFields} } = useForm({
        mode:'onBlur' , defaultValues:{
            name: 'Your name:',
            email: 'email:',
            age:'age:',
            select:{value: "chocolate", label: "Chocolate"}
        }});

    const onValid=(data)=>{
        console.log('Valid',data);
        reset()
      }
      const inValid=(data)=>{
        console.log('Invalid',data);
      }

 // input area
 const InputText = ({name , label, type , ...field}) =>{
    return(
        <div>
            <label htmlFor={name}>{label}:</label>
            <input type={type} id={name} {...field} /> {/* props  */}
        </div>
    )
 }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onValid, inValid)}>
            <Controller 
             name='name'
             control={control}
             render={({field})=> <Input {...field} /> }
            /> <br />
            <Controller 
             name='email'
             control={control}
             render={({field})=> <Input {...field} />}
            /> <br />
            <Controller 
             name='age'
             control={control}
             render={({field})=> <Input {...field} />}
            /> <br />
            <Controller
                name="select"
                control={control}
                render={({ field }) => <Select 
                {...field} 
                options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" }
                ]} 
                />}
             />
            {/* <Controller 
             name='age'
             control={control}
             render={( {field})=> <InputText {...field} age={'age'} label={'Age'} type={'text'} />}
            /> */}
      
          <button type='submit'>Submit</button>
        </form>
        
      </div>
    </>
  )
}

export default App