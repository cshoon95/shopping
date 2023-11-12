import styled from '@emotion/styled'
import dynamic from "next/dynamic"
import { Dispatch, SetStateAction } from 'react'
import { EditorProps, EditorState } from "react-draft-wysiwyg"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from './Button'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor), 
  {
    ssr: false
  }
)

export default function CustomEditor({
  editorState, 
  readOnly = false,
  onSave,
  onEditorStateChange,
}: {
  editorState: EditorState, 
  readOnly?: boolean,
  onSave?: () => void
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>
}) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        toolbarHidden={readOnly}
        editorState={editorState}
        wrapperClassName="wrapper-class"
        toolbarClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link']
        }}
        localization={{
          locale: 'ko'
        }}
      />
      {!readOnly && <button onClick={onSave}>Save</button>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`