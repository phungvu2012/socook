import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { convertFromRaw } from 'draft-js';
import { convertToRaw } from 'draft-js';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => {
      this.setState({editorState});
      props.setContent()
      this.getContent()
    }
    
    this.getContent = () => {
      let x = convertToRaw(this.state.editorState.getCurrentContent())
      return x?.blocks[0]?.text || '';
    }
    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  // handleKeyCommand(command, editorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);

  //   if (newState) {
  //     this.onChange(newState);
  //     return 'handled';
  //   }

  //   return 'not-handled';
  // }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
      <div>
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

// const MyEditor = new MyEditorClass();

export default MyEditor