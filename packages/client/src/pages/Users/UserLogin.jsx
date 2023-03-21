/* eslint-disable no-console */

import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/UserService';

export const UserLogin = () => {

  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    const returned = UserService.submit(data);
    returned.then(result => {
      if (result.token) {
        UserService.setToken(result.token);
        navigate(`/assessment/list`);
      }
      else if (result === -1) {
        document.getElementById(`passwordHelpBlock`).innerHTML = `Wrong Username or password`;
      }
    }).catch(error => {
      console.error(error);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <ul>
          <li>
            <Form.Label>
              User Name :
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              id="userName"
              {...register(`userName`)} />
          </li>
          <li>
            <Form.Label>
              Password :
            </Form.Label>
            <Form.Control type="Password"
              placeholder="Enter your password"
              id="password"
              {...register(`password`)}
            />
          </li>
          <small id="passwordHelpBlock" className="form-text text-muted" color="red" />
        </ul>
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
    </Form>
  );
};
