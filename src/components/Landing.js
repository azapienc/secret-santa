
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom/dist'
import { search } from '../redux/actions/santaActions';

export const Landing = () => {
  const { data } = useSelector(store => store.santa);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (data && Object.keys(data).length) {
      navigate("/secret");
    }
  }, [data]);

  const [formData, setFormData] = useState({
    santaId: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const {santaId} = formData;
    dispatch(search(santaId));
  };

  return (
    <div className='container-sm'>
      <div>
        <h1>Secret santa</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            name="santaId"
            value={FormData.santaId}
            onChange={handleInputChange}
            placeholder='your secret santa id here'
          />
          <button type="submit">Go for it</button>
        </form>
        <Link>
        create a new family
        </Link>
        <p>{JSON.stringify(data)}</p>
        {data && !Object.keys(data).length && <h2>sorry this does not exists= ho ho ho...</h2>}
      </div>
    </div>
  )
}
