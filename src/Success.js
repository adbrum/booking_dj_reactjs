import React from 'react'

const Success = (props) => {
    return (
        <div>
            {JSON.stringify(props.data)}
            {props.typeRedirect !== 'exclude' &&
            props.data.map((item, index) => {
                return (
                    <ul key={index} className="list-group">
                        <li className="list-group-item">Nome: {item.name}</li>
                        <li className="list-group-item">Data: {item.date}</li>
                        <li className="list-group-item">Descrição: {item.description}</li>
                    </ul>
                )
            })}
            <div className="list-group-item list-group-item-success">Ação realizada com sucesso.</div>
        </div>
    )
}

export default Success