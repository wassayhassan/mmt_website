import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import axios from "axios";
import { CLIENT_URL, BASELINE } from "./util";


function Blogviewforedit() {
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
      axios.post(BASELINE+"blog/get/article", data)
      .then(function (response) {
        settitle(response.data.title);
        setdate(response.data.created_date);
        setsubject(response.data.subject);
        setauthor(response.data.author_id);
        setcontext(response.data.context);
      })
      .catch(function (error) {
        alert(error);
      });
    }

    callApi();
  }, []);

  return( 
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
        <div className="title font-medium font-bold leading-tight text-5xl mt-0 mb-2 text-center">
          {title}
        </div>
        <hr className="mt-6" />
          <div className="font-normal text-gray-700 mb-1">Date: {date}</div>
          <div className="font-normal text-gray-700 mb-1">Subject: {subject}</div>
          <div className="font-normal text-gray-700 mb-1">Author: {author}</div>
          <br />

        <CKEditor
          disabled={true}
          editor={DecoupledEditor}
          data={context}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
          }}
        />
      </div>
  </div>);
}

export default Blogviewforedit;
