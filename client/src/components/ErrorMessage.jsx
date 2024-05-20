
function ErrorMessage(props) {
    let errorMessageStyle = {maxWidth:"20%", margin:"0", textAlign:"left"};

    return <p style={errorMessageStyle}>{props.message}</p>
}

export default ErrorMessage;