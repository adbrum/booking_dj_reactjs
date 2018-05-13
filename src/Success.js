import React from 'react'

const Success = (props) => {
    return (
        <div>
            {!props.exclude &&
            <ul className="list-group">
                <li className="list-group-item">Nome: {props.data.name}</li>
                <li className="list-group-item">Data: {props.data.date}</li>
                <li className="list-group-item">Descrição: {props.data.description}</li>
            </ul>
            }
            <div className="list-group-item list-group-item-success">Ação realizada com sucesso.</div>
        </div>
    )
}

export default Success