import AtTextarea from './comments/at-textarea/'
import DEFAULT_USERS_LIST from './constant/default-user'
import styles from './index.less'
const ReactDemo = () => {
    return (
        <div className={styles.page}>
            <AtTextarea
                height={300}
                onRequest={(e) => {
                    const keyWord = e || ''
                    return DEFAULT_USERS_LIST.filter(item => item.name.includes(keyWord))
                }}
                onChange={(content, selectUserList) => {
                    console.log('selectUserList', content, selectUserList);
                }}
            />
        </div>
    )
}
export default ReactDemo