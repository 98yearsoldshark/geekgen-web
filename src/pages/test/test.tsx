import {getArticle} from "../../api/methods/article.methods.ts";

export default function Test () {
  getArticle('3950').then(data => {
    console.log(data);
  }).catch(error => {
    console.log(error);
  })
  return (<></>);
}