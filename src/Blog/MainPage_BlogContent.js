import React, { Component } from "react";
import { withRouter  } from "react-router-dom";
import axios from "axios";
import { BASELINE } from "../util/index";


class BlogContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.news_card_gen = this.news_card_gen.bind(this);
  }

  news_card_gen(data) {
    var main = document.getElementById("main_news");
    for(let i = 0; i < data.aidlst.length; i++) {
      var div = document.createElement("div");
      div.className = "relative";

      var alink = document.createElement("a");
      alink.addEventListener("click", (event) => {
        this.props.history.push('/post/'+data.aidlst[i]);
      });
      alink.className = "block overflow-hidden group rounded-xl";

      var imag = document.createElement("img");
      imag.src = data.path[i];
      imag.className = "object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110";
      alink.appendChild(imag);
      div.appendChild(alink);

      var div2 = document.createElement("div");
      div2.className = "relative mt-5";

      var p = document.createElement("p");
      p.className = "relative mt-5";
      p.innerText = data.date[i];

      var titlea = document.createElement("a");
      titlea.className = "block mb-3 hover:underline";

      var titleh2 = document.createElement("h2");
      titleh2.className = "text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-deep-purple-accent-700";
      titleh2.innerText = data.title[i];

      var readmore = document.createElement("a");
      readmore.className = "font-medium underline";
      readmore.innerText = "Read More";
      readmore.addEventListener("click", (event) => {
        this.props.history.push('/post/'+data.aidlst[i]);
      });

      div2.appendChild(p);
      div2.appendChild(titlea);
      div2.appendChild(titleh2);
      div2.appendChild(readmore);
      div.appendChild(div2);
      
      main.appendChild(div);
    }
  }

  componentDidMount() {
    var self = this;
    axios.post(BASELINE + "blog/get/articles", [])
      .then(function (response) {
        self.news_card_gen(response.data);
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    return (
      <div>
        <section className="bg-white">
          <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16">
            <div id="main_news" className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">

            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(BlogContent);
