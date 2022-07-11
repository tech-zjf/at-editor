import styles from './index.less'
const SelectUser = (props: API.SelectComProps) => {

    const { options } = props

    return (
        <div className={styles.selectWrap}>
            <ul>
                {
                    options.map((item, idx) => {
                        return (
                            <li key={item.id}>{idx} - {item.name}</li>
                        )
                    })
                }

            </ul>
        </div>
    )
}
export default SelectUser