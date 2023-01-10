import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { BASELINE, CLIENT_URL } from "./util/index";
import axios from "axios";
import './App.css';

class Testmonial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: ""
        };
        this.bringcontext = this.bringcontext.bind(this);

    }

    bringcontext() {
        var self = this;
        axios.get(BASELINE + "dashboard/get/testmonial", {})
            .then(function (response) {
                self.setState({ context: response.data.data.context });
            })
            .catch(function (error) {
                alert(error);
            });
    }

    componentDidMount() {
        this.bringcontext();
    }

    render() {
        return (
            <div>
                <CKEditor
                    disabled={true}
                    editor={DecoupledEditor}
                    data={this.state.context}
                    onReady={(editor) => { }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                    }}
                />
            </div>
        );
    }
}

export default Testmonial;
