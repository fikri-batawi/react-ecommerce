import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/reducers/user';
import { updateAlertMessage } from '../../redux/reducers/alertMessage';
import { updateUser as updateUserRequest } from '../../requests/user';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.value);

    const updatePasswordHandler = async (e) => {
        e.preventDefault();

        if(user.newPassword !== user.confirmPassword){
            dispatch(updateAlertMessage({
                status : true,
                message : 'Confirm password not match',
                alertType: 'alert alert-danger',
            }))
        }else{
            const data = {oldPassword: user.oldPassword, newPassword: user.newPassword}
            try {
                await updateUserRequest(data, user.id)
                dispatch(updateAlertMessage({
                    status : true,
                    message : 'Success update user',
                    alertType: 'alert alert-success',    
                }))
            } catch (error) {
                dispatch(updateAlertMessage({
                    status : true,
                    message : error.message,
                    alertType: 'alert alert-danger',
                }))
                
            }
        }
    }

    return(
        <div className="card">
            <div className="card-body">
                <h4 className="fw-bold">Change Password</h4>
                <hr/>
                <form onSubmit={updatePasswordHandler}>
                    <input type="text" className="form-control" hidden value={user.id} />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Old Password</label>
                                <input type="password" className="form-control" value={user.oldPassword} 
                                onChange={(e) => dispatch(updateUser({...user, oldPassword: e.target.value})) } required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input type="password" className="form-control" value={user.newPassword} 
                                onChange={(e) => dispatch(updateUser({...user, newPassword: e.target.value}))} required />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" className="form-control" value={user.confirmPassword} onChange={(e) => dispatch(updateUser({...user, confirmPassword: e.target.value}))} required />
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

export default UpdatePassword;