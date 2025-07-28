import alova from "../index.ts";
import {ReviewWordData} from "../types/review.types.ts";

export const checkCollected =
  (word: string) =>
    alova.Get<null>(`/word/review/check?word=${word}`)

export const collectWord =
  (word: string) =>
    alova.Post<null>('/word/review/collect', { word: word })

export const getReviewWords =
  () =>
    alova.Get<Array<ReviewWordData>>('/word/review/words', { meta: { gzip: true } })

export const reviewWord =
  (word: string, rating: number) =>
    alova.Post<null>('/word/review/review', { word: word, rating: rating })