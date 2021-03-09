import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class AnswerController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { value } = request.params;
    const { s } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(s),
    });

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export default AnswerController;
