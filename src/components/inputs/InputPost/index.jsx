import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Rx from 'rx'
import reactStringReplace from 'react-string-replace'
import StarRatingComponent from 'react-star-rating-component'
import Dropzone from 'react-dropzone'
import { Editor, EditorState, CompositeDecorator, convertFromRaw, convertToRaw, stateToHTML } from 'draft-js'
import createMentionPlugin from 'draft-js-mention-plugin'
import { fromJS } from 'immutable'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import 'style-loader!css-loader!draft-js-mention-plugin/lib/plugin.css'




const mentionPlugin = createMentionPlugin()
const { MentionSuggestions } = mentionPlugin
const plugins = [mentionPlugin]

const compositeDecorator = new CompositeDecorator([
  {
    strategy: handleStrategy,
    component: HandleSpan,
  }, {
    strategy: hashtagStrategy,
    component: HashtagSpan,
  },
])

const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

const HandleSpan = (props) => {
  return (
    <span
      style={{color: 'red'}}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};

const HashtagSpan = (props) => {
  return (
    <span
      style={styles.hashtag}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};


const userListMentions = fromJS([
  {
    name: 'Matthew Russell',
    link: 'https://twitter.com/mrussell247',
    avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'Julian Krispel-Samsel',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  },
  {
    name: 'Jyoti Puri',
    link: 'https://twitter.com/jyopur',
    avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
  },
  {
    name: 'Max Stoiber',
    link: 'https://twitter.com/mxstbr',
    avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
  },
  {
    name: 'Nik Graf',
    link: 'https://twitter.com/nikgraf',
    avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
  },
  {
    name: 'Pascal Brandt',
    link: 'https://twitter.com/psbrandt',
    avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
  },
])

import {
  TextPost,
  TextMention,
} from '../../'

import {
  inputPostWrapper,
  inputPostWrapperImageBox,
  input,
  inputMirror,
  inputWrapper,
  boxOptional,
  imageUser,
  suggestion,
  suggestionItem,
  icon,
  mention,
  dropZone,
  filename,
} from './style'


export default class InputPost extends Component {

  state = {
    editorState: EditorState.createEmpty(compositeDecorator),
    postionSuggestionCurrent: -1,
    suggestions: userListMentions,
    // later feature
    isOpenSuggestion: false,
    form: {
      rating: 5,
      file: null,
    }
  }

  onChange(editorState) {
    this.setState({
      editorState,
    })
  }

  onDropFile(event) {
    const file = event[0]
    this.setState({
      form: {
        file: file,
      }
    })
  }

  onSearchChange({ value }) {
    console.log(value)
  }

  keyBindingFn(event) {
    if (event.keyCode === 13) {
      if (event.nativeEvent.shiftKey) {

      } else {
        event.preventDefault()
        this.onSubmit()
        return
      }
    }
    return getDefaultKeyBinding(event)
  }

  onSubmit() {
    const { currentPostType } = this.props
    const rawDraftContentState = JSON.stringify( convertToRaw(this.state.editorState.getCurrentContent()))

    const plainText = this.state.editorState.getCurrentContent().getPlainText()

    if (currentPostType === 'ALL') {
      this.props.onPostSubmit({
        postType: 'POST',
        text: plainText,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {
      if (!this.state.form.file) {
        // if file is not uploaded.
      }

      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
        classNote: this.state.form.file,
      })
    }

    if (currentPostType === 'REVIEW') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
        rating: this.state.form.rating,
      })
    }

    if (currentPostType === 'QUESTION') {
      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText,
      })
    }

    if (currentPostType === 'CLASS_NOTE') {

      if (!this.state.form.file) {
        // if file is not uploaded.
      }

      this.props.onPostSubmit({
        postType: currentPostType,
        text: plainText ,
        classNote: this.state.form.file,
      })
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({
      form: {
        rating: nextValue
      }
    })
  }

  render() {
    let BoxOptional
    const { currentPostType } = this.props
    if (currentPostType === 'REVIEW') {
      BoxOptional = (
        <StarRatingComponent
          name={'Review'} /* name of the radio input, it is required */
          value={5} /* number of selected icon (`0` - none, `1` - first) */
          starCount={5} /* number of icons in rating, default `5` */
          starColor={'#FFDD00'} /* color of selected icons, default `#ffb400` */
          emptyStarColor={'gray'} /* color of non-selected icons, default `#333` */
          onStarClick={::this.onStarClick}
          editing
       />)
    }

    if (currentPostType === 'QUESTION') {

    }

    if (currentPostType === 'CLASS_NOTE') {
      BoxOptional =  (
        <Dropzone
          onDrop={::this.onDropFile}
          className={dropZone}
          multiple={false}
        >
          {!this.state.form.file ?
            <div>
              <h4>Drop the file or click here to find on your computer</h4>
            </div> :
            <div>
              <h4 className={filename}>{this.state.form.file.name}</h4>
              <h4>{`${(this.state.form.file.size / 1024 / 1024).toFixed(3)}MB`}</h4>
              <h4>X</h4>
            </div>
          }
        </Dropzone>
      )
    }

    const { imgUrl, hashtag } = this.props
    return (
      <span className={inputPostWrapper}>
        <span className={inputPostWrapperImageBox}>
          <img src={imgUrl || 'loading'} />
        </span>
        {BoxOptional ? <span className={boxOptional}>{BoxOptional}</span> : null}
        <div className={inputWrapper}>
          <Editor
            editorState={this.state.editorState}
            onChange={::this.onChange}
            keyBindingFn={::this.keyBindingFn}
            plugins={plugins}
          />
          <MentionSuggestions
            onSearchChange={::this.onSearchChange}
            suggestions={this.state.suggestions}
          />
        </div>
        {this.state.isOpenSuggestion &&
          <ul className={suggestion}>
          {this.props.suggestionedUsers.map((user, index) =>
            <li
              key={user.id}
              data-select={ index === this.state.postionSuggestionCurrent}
              className={suggestionItem}
              onClick={() => ::this.onSelectSuggestionedUser(user)}
            >
              {user.name}
            </li>)
          }
          </ul>
        }
      </span>
    )
  }
}
