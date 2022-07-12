import { useEffect, useState } from 'react'
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
            console.log('输入的@');
            openSelectModal()
        }
    }

    const editorClick = () => {

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
        setCurrentAtIdx(focusOffset)

        // 光标所在位置
        setCursorPosition({ x, y })

        // 弹框
        setVisible(true)
        // 输入框失去焦点
        // refAtInput.value.blur()

    }


    return (
        <div style={{ height, position: 'relative' }}>
            {/* 编辑器 */}
            <div
                id="atInput"
                className={styles.editorDiv}
                contentEditable={true}
                onInput={editorChange}
                onClick={editorClick}
                onBlur={() => {
                    setVisible(false)
                }}
            >
            </div>
            {/* 选择用户框 */}
            <SelectUser
                options={options}
                visible={visible}
                cursorPosition={cursorPosition}
            />
        </div>
    )
}
export default AtTextarea