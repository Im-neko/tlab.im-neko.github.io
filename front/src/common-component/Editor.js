import React, {Component} from 'react';
import SimpleMDE from 'react-simplemde-editor';
import "simplemde/dist/simplemde.min.css";
import './css/Editor.css';

const defaultText ='# Title\n ## introduction\n - item1\n - item2\n ```js\n function main() {\n   console.log("HelloWorld!")\n }\n ```\n';

export default class extends Component {
    constructor(props) {
      super(props);
      this.state = {text: defaultText};
    }

    onChangeText (value) {
        this.setState({mdeValue: value})
    }

    render () {
        return (
            <div className="editor_container" >
                <script src="https://cdn.jsdelivr.net/highlight.js/latest/highlight.min.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/highlight.js/latest/styles/github.min.css" />
                    <SimpleMDE
                        value={this.state.text}
                        onChange={this.onChangeText.bind(this)}
                        options={{
                            autofocus: true,
                            spellChecker: false,
                            insertTexts: {
                                horizontalRule: ["", "\n\n-----\n\n"],
                                image: ["![](http://", ")"],
                                link: ["[", "](http://)"],
                                table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
                            }
                        }}
                    />
            </div>
        )
    }
  }