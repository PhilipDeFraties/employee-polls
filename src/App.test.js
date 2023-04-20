import { _saveQuestion, _saveQuestionAnswer } from './utils/_DATA';

describe('_saveQuestion', () => {
  it('will return an object containing formatted question', async () => {
    const question = {
      optionOneText: "work remotely?",
      optionTwoText: "work in-office?",
      author: "Bob Belcher",
    }

    const result = await _saveQuestion(question)
    expect(result.id).toBeString()
    expect(new Date(result.timestamp)).toBeDate()
    expect(result.author).toEqual(question.author)
    expect(result.optionOne.votes).toBeArray()
    expect(result.optionOne.text).toEqual(question.optionOneText)
    expect(result.optionTwo.votes).toBeArray()
    expect(result.optionTwo.text).toEqual(question.optionTwoText)
  })

  it('will return an error if incorrect data is passed', async () => {
    const question = {
      optionOneText: "work remotely?",
      optionTwoText: "work in-office?",
    }

    await expect(_saveQuestion(question)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
  })
})

describe('_saveQuestionAnswer', () => {
  it('will return true', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: 'xj352vofupe1dqz9emx13r',
      answer: 'optionOne',
    }

    const result = await _saveQuestionAnswer(answer)
    expect(result).toEqual(true)
  })

  it('will return an error if incorrect data is passed', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: 'xj352vofupe1dqz9emx13r',
    }

    await expect(_saveQuestionAnswer(answer)).rejects.toEqual("Please provide authedUser, qid, and answer")
  })
})
