import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/reducers/user';
import { updateAlertMessage } from '../../redux/reducers/alertMessage';
    
const UpdateProfile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        await axios
        .put(`http://localhost:8000/api/users/${user.id}`, {name:user.name, email:user.email})
        .then(() => {
            dispatch(updateAlertMessage({
                status : true,
                message : 'Success update user',
                alertType: 'alert alert-success',
            }))
            history.push('/');
        })
        .catch(error=> {
            dispatch(updateAlertMessage({
                status : true,
                message : error.response.data.message,
                alertType: 'alert alert-danger',
            }))
        });
    }

    return(
        <div className="card">
            <div className="card-body">
                <h4 className="fw-bold">Update Profile</h4>
                <hr/>
                <form onSubmit={updateProfileHandler}>
                    <input type="text" className="form-control" hidden value={user.id} />
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">NAME</label>
                                <input type="text" className="form-control" value={user.name} 
                                onChange={(e) => dispatch(updateUser({...user, name: e.target.value}))} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">E-MAIL</label>
                                <input type="email" className="form-control" value={user.email} onChange={(e) => dispatch(updateUser({...user, email: e.target.value}))} />
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;