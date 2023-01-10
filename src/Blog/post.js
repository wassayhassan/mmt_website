import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "../util";


function Post() {
  const [title, settitle] = useState('')
  const [titleimg, settitleimg] = useState('')
  const [date, setdate] = useState('')
  const [author, setauthor] = useState('')
  const [context, setcontext] = useState('')
  const [subject, setsubject] = useState('')
  const { id } = useParams();

  useEffect(() => {
    function callApi() {
      var data = {
        aid: id
      }
      axios.post(BASELINE + "blog/get/article", data)
        .then(function (response) {
          settitle(response.data.title);
          setdate(response.data.date);
          setsubject(response.data.subject);
          setauthor(response.data.author_id);
          setcontext(response.data.context);
          settitleimg(response.data.img);
        })
        .catch(function (error) {
          alert(error);
        });
    }

    callApi();
  }, []);

  return (
    <div className="bg-[#E5E5E5]">
      <div
        className="article bg-white"
        style={{
          marginLeft: "20%",
          marginRight: "20%",
          marginBottom: "100px",
          paddingLeft: "40px",
          paddingRight: "40px"
        }}
      >

        <div class="pt-[150px] flex flex-col items-center sm:px-5 md:flex-row">
          <div class="w-full md:w-1/2">
            <a class="block">
              <img class="object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96" src={titleimg} />
            </a>
          </div>
          <div class="flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2">
            <div class="flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5">
              <div class="bg-pink-500 flex items-center pl-2 pr-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
                <svg class="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span>{subject}</span>
              </div>
              <h1 class="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl"><a>{title}</a></h1>
              <p class="pt-2 text-sm font-medium">by <a class="mr-1 underline">{author}</a> · <span class="mx-1">{date}</span></p>
            </div>
          </div>
        </div>

        <br />
        <br />
        <hr />

        <CKEditor
          disabled={true}
          editor={DecoupledEditor}
          data={context}
          onReady={(editor) => { }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>);
}

export default Post;
