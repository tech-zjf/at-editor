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
    const [atBeforeStr, setAtBeforeStr] = useState<Node>()

    // @的索引
    const [currentAtIdx, setCurrentAtIdx] = useState<number>()

    // 弹框的x,y轴的坐标
    const [cursorPosition, setCursorPosition] = useState<API.Position>({ x: 0, y: 0 })

    const atRef = useRef<any>()

    console.log(atBeforeStr, currentAtIdx, cursorPosition);

    // 首次加载获取options数据
    useEffect(() => {
        const _options = onRequest()
        setOptions(_options)
    }, [])

    // 编辑器change
    const editorChange = (event: any) => {
        const currentStr = event.nativeEvent.data
        if (currentStr === '@') {
            openSelectModal()
        }
    }

    const editorClick = (e: any) => {
        // 判断当前标签名是否为span 是的话选中当做一个整体
        if (e.target.localName === 'span') {
            window.getSelection()?.getRangeAt(0).selectNode(e.target as Node)
        }
    }

    // 展开弹框
    const openSelectModal = () => {
        const selection = window.getSelection() as Selection
        const range = selection?.getRangeAt(0) as Range
        const { focusNode, focusOffset } = selection
        const { x, y } = range.getBoundingClientRect()

        // 缓存光标所在节点
        setAtBeforeStr(focusNode as Node)

        // 缓存光标所在节点位置
        setCurrentAtIdx(focusOffset - 1)

        // 光标所在位置
        setCursorPosition({ x, y })

        // 弹框
        setVisible(true)
        // 输入框失去焦点
        // refAtInput.value.blur()

    }

    const onSelect = (item: API.Options) => {
        const selection = window.getSelection()
        const range = selection?.getRangeAt(0) as Range
        // 选中输入的 @ 符
        range.setStart(atBeforeStr!, currentAtIdx!)
        range.setEnd(atBeforeStr!, currentAtIdx! + 1)
        // 删除输入的 @ 符
        range.deleteContents()
        // 创建元素节点
        const element = document.createElement('span')
        element.className = 'atSpan'
        element.style.color = 'blue'
        element.contentEditable = 'false'
        element.innerText = `@${item.name}`
        // 选中元素节点
        range.insertNode(element)
        // 光标移动到末尾
        range.collapse()

        setVisible(false)
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
                onBlur={() => {

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