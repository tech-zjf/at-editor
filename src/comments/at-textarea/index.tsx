import StringTools from '../../tools/string-tools'
import { useEffect, useRef, useState } from 'react'
import SelectUser from '../select-user'
import styles from './index.less'


const AtTextarea = (props: API.AtTextareaProps) => {
    const { height, onRequest } = props

    // 选择用户弹框
    const [visible, setVisible] = useState<boolean>(false)

    // 用户数据
    const [options, setOptions] = useState<API.Options[]>([])

    // 输入@之前的字符串
    const [atBeforeStr, setAtBeforeStr] = useState<Node | string>()

    const [keyStr, setkeyStr] = useState<string>('')

    // @的索引 + 1
    const [currentAtIdx, setCurrentAtIdx] = useState<number>()

    // 弹框的x,y轴的坐标
    const [cursorPosition, setCursorPosition] = useState<API.Position>({ x: 0, y: 0 })

    const atRef = useRef<any>()

    // 首次加载获取options数据
    useEffect(() => {
        const _options = onRequest()
        setOptions(_options)
    }, [])

    // 编辑器change
    const editorChange = (event: any) => {
        editorClick()
    }

    const editorClick = (e?: any) => {
        const selection = window.getSelection() as Selection
        const { focusNode, focusOffset } = selection as { focusNode: Node | { data: string }, focusOffset: number }
        let cursorStr = ''
        if ((focusNode as { data: string })?.data) {
            cursorStr = (focusNode as { data: string })?.data.slice(0, focusOffset)
        }
        setAtBeforeStr(focusNode as Node)
        const lastAtIndex = cursorStr?.lastIndexOf('@')
        setCurrentAtIdx(lastAtIndex)
        if (lastAtIndex !== -1) {
            const range = selection?.getRangeAt(0) as Range
            const { x, y } = range.getBoundingClientRect()
            // 光标所在位置
            setCursorPosition({ x, y })
            const keyStr = cursorStr.slice(lastAtIndex + 1)
            if (!StringTools.isIncludeSpacesOrLineBreak(keyStr)) {
                setkeyStr(keyStr)
                const _options = onRequest(keyStr)
                setOptions(_options)
                setVisible(true)
            } else {
                setVisible(false)
                setkeyStr('')
            }

        } else {
            setVisible(false)
        }

        // 判断当前标签名是否为span 是的话选中当做一个整体
        if (e?.target?.localName === 'span') {
            window.getSelection()?.getRangeAt(0).selectNode(e.target as Node)
        }

    }

    const onSelect = (item: API.Options) => {
        const selection = window.getSelection()
        const range = selection?.getRangeAt(0) as Range
        // 选中输入的 @ 符
        range.setStart(atBeforeStr as Node, currentAtIdx!)
        range.setEnd(atBeforeStr as Node, currentAtIdx! + keyStr.length + 1)
        // 删除输入的 @ 符
        range.deleteContents()
        // 创建元素节点
        const element = document.createElement('span')
        element.className = 'atSpan'
        element.style.color = 'blue'
        element.contentEditable = 'false'
        element.innerText = `@${item.name}`
        // 插入元素节点
        range.insertNode(element)
        // 光标移动到末尾
        range.collapse()

        setVisible(false)

        // 输入框聚焦
        atRef.current.focus()
    }


    return (
        <div style={{ height, position: 'relative' }}>
            {/* 编辑器 */}
            <div
                id="atInput"
                ref={atRef}
                className={styles.editorDiv}
                contentEditable={true}
                onInput={editorChange}
                onClick={editorClick}
                onFocus={() => {
                    setVisible(false)
                }}
            >
            </div>
            {/* 选择用户框 */}
            <SelectUser
                options={options}
                visible={visible}
                cursorPosition={cursorPosition}
                onSelect={onSelect}
            />
        </div>
    )
}
export default AtTextarea