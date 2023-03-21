
/* eslint-disable no-console */
const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();
assessmentRouter.post(
  `/assessment/submit`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters
      const returned = await AssessmentService.submit(req.body);
      console.log(returned);
      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/assessment/list`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      console.log(`hi`);
      const assessments = await AssessmentService.getList();
      ResponseHandler(
        res,
        `Fetched assessments`,
        assessments,
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.delete(
  `/assessment/delete/:id`,
  async (req, res, next) => {
    try {
      console.log(req.params);
      const result = await AssessmentService.deleteAssessment(req.params);
      ResponseHandler(
        res,
        `Deleted Assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
