import React from "react"

export default function Delete_Button(props) {
    if (props.done == "Done") {
        return <button className="delete_button">Delete</button>
    } else {
        return
    }

};

