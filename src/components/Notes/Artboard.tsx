import React, { Component } from 'react';
import { receiveMessage } from '../../events/MessageService';
import OakSelect from '../../oakui/OakSelect';
import Canvas from '../Canvas';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';

interface Props {
  note: any;
  deleteNote: Function;
  saveNote: Function;
  notebooks: any;
}

interface State {
  editNote: boolean;
  preview: boolean;

  newNotebook: string;

  id?: string;
  title: string;
  tags: string;
  attributes: any;
  content: any;
  notebook: string;
  flags: any;
  flag: string;
}

class Artboard extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      editNote: false,
      preview: true,
      newNotebook: '',
      title: this.props.note.title,
      attributes: this.props.note.attributes ? this.props.note.attributes : {},
      content: this.props.note.content,
      tags: this.props.note.tags,
      notebook: this.props.note.notebook,
      flag: '',

      flags: [
        {
          key: 'one',
          value: <div className="select-palette one" />,
        },
        {
          key: 'two',
          value: <div className="select-palette two" />,
        },
        {
          key: 'three',
          value: <div className="select-palette three" />,
        },
        {
          key: 'four',
          value: <div className="select-palette four" />,
        },
        {
          key: 'five',
          value: <div className="select-palette five" />,
        },
        {
          key: 'six',
          value: <div className="select-palette six" />,
        },
      ],
    };
  }

  componentWillMount() {
    receiveMessage().subscribe(message => {
      if (message.name === 'closeNoteEditView' && message.signal) {
        this.hideEdit();
        this.setState({ newNotebook: '' });
      }
    });
  }

  delete = () => {
    this.props.deleteNote(this.props.note.id);
  };

  showEdit = () => {
    this.setState({
      editNote: true,
    });
  };

  hideEdit = () => {
    this.setState({
      editNote: false,
    });
  };

  save = () => {
    let { notebook } = this.state;

    if (notebook === '<create new>') {
      notebook = this.state.newNotebook;
    }

    this.props.saveNote(
      {
        id: this.props.note.id,
        title: this.state.title,
        attributes: this.state.attributes,
        content: this.state.content,
        tags: this.state.tags,
        flag: this.state.flag,
        notebook,
      },
      true
    );
  };

  togglepreview = () => {
    this.setState({
      preview: !this.state.preview,
    });
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  attributeChange = event => {
    this.setState({
      attributes: {
        ...this.state.attributes,
        [event.target.name]: event.target.value,
      },
    });
  };

  contentChange = (attributes, content) => {
    this.setState({
      attributes,
      content,
    });
  };

  render() {
    const tags: any = [];
    if (this.props.note.tags) {
      this.props.note.tags.split(' ').map(item => {
        tags.push(
          <div key={item} className="tag">
            {item}
          </div>
        );
      });
    }

    return (
      <div className="artboard">
        {!this.state.editNote && (
          <>
            <div className="notebook">
              <i className="material-icons">insert_drive_file</i>
              {this.props.note.notebook}
            </div>
            {/* <div className="space-bottom-2" /> */}
            <div className="typography-3 space-bottom-1">
              {this.props.note.title}
            </div>
            {tags}
            <div className="space-bottom-2" />
            <OakButton
              action={this.showEdit}
              theme="secondary"
              variant="animate in"
            >
              <i className="material-icons">edit</i>Edit
            </OakButton>
            <OakButton
              action={this.delete}
              theme="secondary"
              variant="animate in"
            >
              <i className="material-icons">delete</i>Delete
            </OakButton>
            <div className="space-top-2" />
            <Canvas
              attributes={this.state.attributes}
              data={this.state.content}
              handleChange={this.contentChange}
            />
          </>
        )}

        {this.state.editNote && (
          <div className="canvas-edit">
            <div className="typography-3 space-bottom-1">
              {this.state.title}
            </div>

            <OakButton action={this.save} theme="primary" variant="animate in">
              <i className="material-icons">double_arrow</i>Save
            </OakButton>
            <OakButton
              action={this.showEdit}
              theme="default"
              variant="animate none"
            >
              <i className="material-icons">refresh</i>Undo All
            </OakButton>
            <OakButton
              action={this.hideEdit}
              theme="default"
              variant="animate none"
            >
              <i className="material-icons">close</i>Cancel
            </OakButton>

            <div>
              <OakSelect
                label="Flag"
                data={this.state}
                id="flag"
                handleChange={e => this.handleChange(e)}
                objects={this.state.flags}
              />
            </div>
            <div>
              <OakSelect
                label="Notebook"
                data={this.state}
                id="notebook"
                handleChange={e => this.handleChange(e)}
                elements={this.props.notebooks}
                firstAction="<create new>"
              />
            </div>
            <div>
              {this.state.notebook === '<create new>' && (
                <OakText
                  label="Notebook name"
                  data={this.state}
                  id="newNotebook"
                  handleChange={e => this.handleChange(e)}
                />
              )}
            </div>
            <OakText
              label="Title"
              data={this.state}
              id="title"
              handleChange={e => this.handleChange(e)}
            />
            <OakText
              label="Tags (separated by blank spaces)"
              data={this.state}
              id="tags"
              handleChange={e => this.handleChange(e)}
            />

            {/* <OakText label="Height" data={this.state.attributes} id="height" handleChange={e => this.attributeChange(e)} />
                    <OakText label="Width" data={this.state.attributes} id="width" handleChange={e => this.attributeChange(e)} /> */}
            <OakText
              label="Background color"
              data={this.state.attributes}
              id="backgroundColor"
              handleChange={e => this.attributeChange(e)}
            />
            <Canvas
              attributes={this.state.attributes}
              data={this.state.content}
              handleChange={this.contentChange}
              edit
            />
          </div>
        )}
      </div>
    );
  }
}

export default Artboard;
