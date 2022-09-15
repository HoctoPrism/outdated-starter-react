const defineTitle = (props) => {
    if (typeof window !== "undefined" && props) {
        document.title = props
    }
}

export default defineTitle