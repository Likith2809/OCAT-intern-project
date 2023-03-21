/* eslint-disable no-console */
const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  try {
    console.log(`entered microservice`);
    console.log(assessment);
    // create a new instance of the Assessment model with the assessment data
    const assessmentObj = {
      catDateOfBirth: assessment.assessment.catDateOfBirth,
      catName: assessment.assessment.catName,
      createdAt: assessment.assessment.createdAt,
      instrumentType: assessment.assessment.instrumentType,
      riskLevel: assessment.assessment.riskLevel,
      score: assessment.assessment.score,
      updatedAt: assessment.assessment.updatedAt,
    };
    console.log(assessmentObj);
    const newAssessment = await Assessment.create(assessmentObj);
    console.log(newAssessment);
    console.log(`Assessment saved successfully:`, newAssessment.toJSON()); }
  catch (error) {
    console.error(`Error saving assessment:`, error);
    throw error;
  }
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database

};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll();
  return assessments;
};

exports.deleteAssessment = async (data) => {
  try {
    const record = await Assessment.findByPk(data.id);
    await record.destroy();
  }
  catch (error) {
    console.log(error);
  }
};
