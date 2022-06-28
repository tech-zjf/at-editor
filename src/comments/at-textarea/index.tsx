import styles from './index.less'
const AtTextarea = () => {
    const editorChange = (e: any) => {
        const str = e.target.value
        console.log(str)
    }
    const editorClick = (e: any) => {
        console.log('click', e);
    }
    return (
        <div>
            {/* 编辑器 */}
            <textarea className={styles.editorDiv} rows={5} onInput={editorChange} onClick={editorClick}></textarea>
        </div>
    )
}
export default AtTextarea