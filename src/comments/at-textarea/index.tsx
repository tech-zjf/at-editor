import styles from './index.less'

let content: string = ""

let cursorIndex!: number

let atIndex!: number

const AtTextarea = () => {


    const editorClick = () => {
        // 1.点击、change 获取光标的索引
        cursorIndex = getCursorIndex()

        // 获取光标左边的
        atIndex = content.slice(0, cursorIndex + 1).lastIndexOf('@')

        if (atIndex !== -1) {
            console.log(atIndex, cursorIndex);
        }

    }

    // 编辑器change
    const editorChange = (e: any) => {
        content = e.target.value
        editorClick()
    }

    // 获取光标索引
    const getCursorIndex = () => {
        return (document.getElementById('textareaRef') as any).selectionStart - 1
    }

    return (
        <div>
            {/* 编辑器 */}
            <textarea
                id="textareaRef"
                className={styles.editorDiv}
                rows={5}
                onInput={editorChange}
                onClick={editorClick} >
            </textarea>
        </div>
    )
}
export default AtTextarea