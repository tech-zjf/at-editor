import AtTextarea from './comments/at-textarea/'
import styles from './index.less'
const ReactDemo = () => {
    return (
        <div className={styles.page}>
            <AtTextarea
                height={300}
                onRequest={(e) => {
                    console.log('e', e);
                    return [
                        {
                            name: '张三',
                            id: 1
                        },
                        {
                            name: '李四',
                            id: 2
                        },
                        {
                            name: '王五',
                            id: 3
                        }
                    ]
                }}
                onSelect={(e) => {
                    console.log(e);
                }}
            />
        </div>
    )
}
export default ReactDemo