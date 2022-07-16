import React from 'react'
import styles from './index.less'
const SelectUser = React.memo((props: API.SelectComProps) => {

    const { options, visible, cursorPosition, onSelect } = props

    const { x, y } = cursorPosition

    return (
        <div
            className={styles.selectWrap}
            style={{
                'display': `${visible ? 'block' : 'none'}`,
                'position': 'absolute',
                'left': x,
                'top': y + 20
            }}>
            <ul>
                {
                    options.map((item, idx) => {
                        return (
                            <li key={item.id} onClick={() => { onSelect(item) }}>{idx} - {item.name}</li>
                        )
                    })
                }

            </ul>
        </div>
    )
})
export default SelectUser