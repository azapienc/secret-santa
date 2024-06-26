
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
    <div className='container-sm full-page'>
      <h1 className="mt-5">The most restrictive Secret Santa</h1>
      <h3 className="highlight-text">for Bettercloud</h3>
      <div className="col form-group mt-5 w-50">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="santaId"
              value={FormData.santaId}
              onChange={handleInputChange}
              placeholder='do you know the id?'
            />
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="submit">have a look</button>
            </div>
          </div>
        </form>
        {data && !Object.keys(data).length && 
          <div className="alert alert-info" role="alert">
            sorry this does not exists, ho ho ho...
          </div>
        }
      </div>
    </div>
  )
}
