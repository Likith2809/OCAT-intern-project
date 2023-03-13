/* eslint-disable sort-keys */
import React, { useMemo } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {

  // const [ catName, setCatName ] = useState(``);
  // const [ catDateOfBirth, setCatDateOfBirth ] = useState(``);
  const [ responses, setResponses ] = useState(Array(5).fill(0));

  const { handleSubmit, register } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  async function onSubmit(data) {

    const score = parseInt(data.radioOption1) +
    parseInt(data.radioOption2) +
    parseInt(data.radioOption3) +
    parseInt(data.radioOption4) +
    parseInt(data.radioOption5);

    let riskLevel = ``;
    if (score < 1) {
      riskLevel = `Low`;
    } else if (score >= 3 & score <= 4) {
      riskLevel = `Medium`;
    } else if (score > 4 & score <= 5) {
      riskLevel = `High`;
    }

    const instrumentType = `Cat Behavioral Instrument`;
    const createdAt = new Date();
    const updatedAt = new Date() - createdAt;

    await AssessmentService.submit({
      instrumentType,
      score,
      riskLevel,
      catName: data.catName,
      catDateOfBirth: data.catDateOfBirth,
      createdAt,
      updatedAt,
    });
  }

  return <Form onSubmit={handleSubmit(onSubmit)}>
    <Form.Group controlId="instrument" >
      <Form.Label>
        <h3>Instrument</h3>
        <ul>
          <li>Cat Behavioral Instrument</li>
        </ul>
      </Form.Label>
    </Form.Group>
    <Form.Group controlId="catDetails">
      <Form.Label>
        <h3>Cat Details</h3>
      </Form.Label>
    </Form.Group>
    <Form.Group >
      <ul>
        <li>
          <Form.Label>
            Cat Name :
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Cat's name"
            id="catName"
            {...register(`catName`)} />
        </li>
        <li>
          <Form.Label>
            Cat Date of Birth :
          </Form.Label>
          <Form.Control type="Date"
            placeholder="Enter Cat's Date of birth"
            id="catDateOfBirth"
            {...register(`catDateOfBirth`)}
          />
        </li>
      </ul>
    </Form.Group>
    <Form.Group controlId="Questions">
      <Form.Label>
        <h2>Questions & Responses : </h2>
      </Form.Label>
      <ol>
        <Form.Group controlId="QuestionOne">
          <li>
            <Form.Label>
              Previous contact with the Cat Judicial System
            </Form.Label>
            <Form.Check type="radio"
              label="Yes"
              name="radioOption1"
              value="1"
              id="contactYes"
              {...register(`radioOption1`)} />
            <Form.Check type="radio" label="No" name="radioOption1"
              value="0"
              id="contactNo"
              {...register(`radioOption1`)} />
          </li>
        </Form.Group>
        <Form.Group controlId="QuestionTwo">
          <li>
            <Form.Label>
              Physical altercations with other cats
            </Form.Label>
            <Form.Check type="radio" label="0-3 altercations" name="radioOption2"
              value="0"
              id="altCatsNo"
              {...register(`radioOption2`)} />
            <Form.Check type="radio" label="3+ altercations" name="radioOption2" value="1"
              id="altCatsYes"
              {...register(`radioOption2`)} />
          </li>
        </Form.Group>
        <Form.Group controlId="QuestionThree">
          <li>
            <Form.Label>
              Physical altercations with owner (scratching, biting, etc...)
            </Form.Label>
            <Form.Check type="radio" label="10+ altercations" name="radioOption3" value="1"
              id="palt_OwnerYes"
              {...register(`radioOption3`)} />
            <Form.Check
              type="radio"
              label="0-10 altercations"
              name="radioOption3"
              value="0"
              id="palt_OwnerNo"
              {...register(`radioOption3`)} />
          </li>
        </Form.Group>
        <Form.Group controlId="QuestionFour">
          <li>
            <Form.Label>
              Plays well with dogs
            </Form.Label>
            <Form.Check type="radio" label="No" name="radioOption4" value="1"
              id="dogsYes"
              {...register(`radioOption4`)} />
            <Form.Check type="radio" label="Yes" name="radioOption4" value="0"
              id="dogsNo"
              {...register(`radioOption4`)} />
          </li>
        </Form.Group>
        <Form.Group controlId="QuestionFive">
          <li>
            <Form.Label>
              Hisses at strangers
            </Form.Label>
            <Form.Check type="radio" label="Yes" name="radioOption5" value="1"
              id="hissYes"
              {...register(`radioOption5`)} />
            <Form.Check type="radio" label="No" name="radioOption5" value="0"
              id="hissYes"
              {...register(`radioOption5`)} />
          </li>
        </Form.Group>
      </ol>

    </Form.Group>
    <Button variant="primary" type="submit">Submit</Button>
  </Form>;
};

export default NewAssessment;
