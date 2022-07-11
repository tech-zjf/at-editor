import { useEffect, useState } from 'react'
import SelectUser from '../select-user'
import styles from './index.less'


let content: string = ""

let cursorIndex!: number

let atIndex!: number

const AtTextarea = (props: API.AtTextareaProps) => {
    const { height, onRequest, onSelect } = props

    const [value, setValue] = useState<string>('')

    const [optionsList, setOptionsList] = useState<API.Options[]>([])

    const [selectModal, setSelectModal] = useState<boolean>(false)

    console.log(onRequest, onSelect, setSelectModal);

    // 获取光标索引
    const getCursorIndex = () => {
        return (document.getElementById('textareaRef') as any).selectionStart - 1
    }

    // 编辑器change
    const editorChange = (e: any) => {
        content = e.target.value
        setValue(content)
        editorClick()
    }

    const editorClick = () => {
        // 1.点击、change 获取光标的索引
        cursorIndex = getCursorIndex()

        // 获取光标左边的
        atIndex = content.slice(0, cursorIndex + 1).lastIndexOf('@')

        if (atIndex !== -1) {
            console.log(atIndex, cursorIndex);
            // @|
            if (atIndex === cursorIndex) {
                setSelectModal(true)
            }
        }

    }


    useEffect(() => {
        const list = onRequest!()
        setOptionsList(list)
    }, [])

    return (
        <div style={{ height: `${height}px` }}>
            {/* 编辑器 */}
            <textarea
                id="textareaRef"
                className={styles.editorDiv}
                placeholder={'请输入...'}
                value={value}
                onInput={editorChange}
                onClick={editorClick}
            >
            </textarea>
            {
                selectModal && <SelectUser options={optionsList} />
            }
        </div>
    )
}
export default AtTextarea