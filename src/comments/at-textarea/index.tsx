import StringTools from '../../tools/string-tools.js'
import { useEffect, useState } from 'react'
import SelectUser from '../select-user'
import styles from './index.less'

let content: string = ""

let cursorIndex!: number

let atIndex!: number

const AtTextarea = (props: API.AtTextareaProps) => {
    const { height, onRequest, } = props

    const [value, setValue] = useState<string>('')

    const [optionsList, setOptionsList] = useState<API.Options[]>([])

    const [selectModal, setSelectModal] = useState<boolean>(false)

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

    }

    useEffect(() => {
        if (atIndex !== -1) {
            // 获取@到光标之间的字符串
            const keyStr = value.substring(
                atIndex + 1,
                cursorIndex + 1
            )
            // 不包含空格或者换行符的话 当关键词查询用户列表接口
            if (StringTools.isIncludeSpacesOrLineBreak(keyStr)) {
                console.log(atIndex, cursorIndex);
                const _options = onRequest(keyStr)
                setOptionsList(_options)
                setSelectModal(true)
            } else {
                setSelectModal(false)
            }
        } else {
            setSelectModal(false)
        }
    }, [value])

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