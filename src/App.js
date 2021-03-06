import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from '../src/pic/warning.png'
import { useForm } from "react-hook-form";
import { Month } from '../src/units/month';
import { Day } from '../src/units/Day';
import { Year } from '../src/units/year'

function App() {

  const {register, handleSubmit, formState: { errors }} = useForm();

  const [data, setData] = useState({});

  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');

  const [pass, setPass] = useState('');

  const [confirm, setConfirm] = useState('');

  const [day, setDay] = useState('Day');

  const [year, setYear] = useState('Year');

  const [moon, setMoon] = useState('Month');

  const dayList = (x) => {
    return <option key={x} value={x}>{x}</option>
  }

  const yearList = (x) => {
    return <option key={x} value={x}>{x}</option>
  }

  const items = (x) => {
    return <option key={x} value={x}>{x}</option>
  }

  const onSubmit = (e) => {
    axios.post('https://my-json-server.typicode.com/typicode/demo/posts', e)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.log(error);
    })
    console.log(e);
  }

  console.log(data)

  useEffect(() => {
    onSubmit()
  }, [])

  return (
    <>
    <div className='main'>
      <div className='container'>
      <input className='close' type={'button'} value={'X'}/>
      <p className='title'>Sign up</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='label'>Username: </label>
          <br/>
          {errors.username && <img src={logo} alt={''} className={'error'}/>}
          <input 
            autoFocus={true}
            onChange={(e) => {setUserName(e.target.value())}}
            className={errors.username? 'input-error': 'input'}
            type={'text'} 
            placeholder={'Enter your username'}
            {...register('username', {minLength: {
              value : 3,
              message: 'Username have to 3 characters or more',
            },
            maxLength: {
              value: 12,
              message: 'maximum of your username is 12 characters',
            }, 
            required: 'username is required'})}
            />
            <div className='error-div'>
              {errors.username && <p className='p-error'>{errors.username.message}</p>}
            </div>
          <br/>
          <label className='label'>Email: </label>
          <br/>
          {errors.email && <img src={logo} alt={''} className={'error'}/>}
          <input
            onChange={(e) => {setEmail(e.target.value())}}
            className={errors.email? 'input-error': 'input'}
            type={'text'} 
            placeholder={'example@gamil.com'}
            {...register('email', {pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email'
            },
            required: 'Email is required'
            })}
            />
            <div className='error-div'>
              {errors.email && <p className='p-error'>{errors.email.message}</p>}
            </div>
          <br/>
          <label className='label'>Password: </label>
          <br/>
          {errors.password && <img src={logo} alt={''} className={'error'}/>}
          <input
            className={errors.password? 'input-error': 'input'}
            type={'password'}
            placeholder={'Enter your password'}
            {...register('password',{minLength: {
              value: 8,
              message: 'Password must have 8 characters',
            },
            required: 'Password is required',
            })}
            onChange={(e) => {setPass(e.target.value)}}
            />
            <div className='error-div'>
              {errors.password && <p className='p-error'>{errors.password.message}</p>}
            </div>
          <br/>
          <label className='label'>Password Confirm: </label>
          <br/>
          {errors.passwordConfirm && <img src={logo} alt={''} className={'error'}/>}
          <input
           className={errors.passwordConfirm? 'input-error': 'input'}
           type={'password'} 
           placeholder={'Confirm your password'}
           {...register('passwordConfirm',{
            validate : val => val === pass && val === confirm || 'not matched',
            required : 'Password is not confirmed',
           })}
           onChange={(e) => {setConfirm(e.target.value)}}
           />
           <div>
            {errors.passwordConfirm && <p className='p-error'>{errors.passwordConfirm.message}</p>}
           </div>
          <br/>
          <label className='label'>When's your birthday?</label>
          <br/>
          <table>
            <tr>
              <td>
                <select
                 className={errors.month? 'error-brith': 'birth'}
                 {...register('month', {validate: val => val !== 'Month' || 'Select your birth day'})}
                 onChange={(e) => {setMoon(e.target.value)}}
                >
                <option value={'Month'}>Month</option>
                {Month.map(items)}
                </select>
              </td>
              <td>
                <select
                  className={errors.day? 'error-brith': 'birth'}
                  {...register('day', {validate: val => val !== 'Day' || 'Select your birth day'})}
                  onChange={(e) => {setDay(e.target.value)}}
                >
                <option value={'Day'}>Day</option>
                {Day.map(dayList)}
                </select>
              </td>
              <td>
                <select
                  className={errors.year? 'error-brith': 'birth'}
                  {...register('year', {validate: val => val !== 'Year' || 'Select your birth day'})}
                  onChange={(e) => {setYear(e.target.value)}}
                >
                <option value={'Year'}>Year</option>
                {Year.map(yearList)}
                </select>
                
              </td>
            </tr>
          </table>
          <ul>
            {errors.month && <li className='p-birth-error'>{errors.month.message || errors.day.message || errors.year.message}</li>}
          </ul>
          <input className='btn' type={'submit'} value={'Submit'} />
        </form>
      </div>
    </div>
    </>
  );
}

export default App;
