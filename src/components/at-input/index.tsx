import StringTools from '../../tools/string-tools'
import { useEffect, useRef, useState } from 'react'
import SelectUser from './select-user'
import styles from './index.less'


const AtInput = (props: API.AtInputProps) => {
    const { height, onRequest, onChange } = props

    const [content, setContent] = useState<string>('')

    // 选择用户弹框
    const [visible, setVisible] = useState<boolean>(false)

    // 用户数据
    const [options, setOptions] = useState<API.Options[]>([])

    // @的索引
    const [currentAtIdx, setCurrentAtIdx] = useState<number>()

    // 输入@之前的字符串
    const [atBeforeStr, setAtBeforeStr] = useState<Node | string>()

    // @后关键字 @郑 = 郑
    const [keyStr, setkeyStr] = useState<string>('')

    // 弹框的x,y轴的坐标
    const [cursorPosition, setCursorPosition] = useState<API.Position>({ x: 0, y: 0 })

    // 选择的用户
    const [selected, setSelected] = useState<API.Options[]>([])

    const atRef = useRef<any>()

    // 首次加载获取options数据
    useEffect(() => {
        const _options = onRequest()
        setOptions(_options)
    }, [])

    // 编辑器change
    const editorChange = (event: any) => {
        const _content = event.target.innerText
        setContent(_content)
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

        // 选中输入的 @关键字  -> @郑
        range.setStart(atBeforeStr as Node, currentAtIdx!)
        range.setEnd(atBeforeStr as Node, currentAtIdx! + 1 + keyStr.length)

        // 删除输入的 @关键字
        range.deleteContents()

        // 创建元素节点
        const element = document.createElement('span')
        element.className = 'atSpan'
        element.style.color = 'blue'
        element.id = `${item.id}`
        element.contentEditable = 'false'
        element.innerText = `@${item.name}`
        // 插入元素节点
        range.insertNode(element)
        // 光标移动到末尾
        range.collapse()

        // 缓存已选中的用户
        setSelected([...selected, item])
        // 选择用户后重新计算content
        setContent(document.getElementById('atInput')?.innerText as string)
        // 关闭弹框
        setVisible(false)
        // 输入框聚焦
        atRef.current.focus()
    }

    const getAttrIds = () => {
        // 获取输入框中的span 数组
        const spanLabelArr = document.getElementById('atInput')?.innerHTML.match(StringTools.regSpanLabel)
        const surplusSelectedList: API.Options[] = []
        // 遍历输入框剩下的@过的用户
        spanLabelArr?.forEach(spanLabel => {
            // 拿到id
            const _id = StringTools.getSpanLabelId(spanLabel)
            // 和选择过的用户数据比较 将删除的用户从选择过的数据中剔除
            const _select = selected.find(e => e.id == _id)
            if (_select?.id) {
                surplusSelectedList.push(_select!)
            }
        })
        // 将输入框中剩下的被@用户，重新丢到选择过的数组中存起来，暴露给父组件
        onChange(content, surplusSelectedList)
    }

    // @的用户列表发生改变时，将最新值暴露给父组件
    useEffect(() => {
        getAttrIds()
    }, [selected, content])

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
export default AtInput